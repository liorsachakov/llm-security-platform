import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiJsonFetch } from '@/lib/client-api';
import type { Message, Challenge } from '../types';

const POLL_INTERVAL = 1000;
const POLL_TIMEOUT = 30000;

export function useChatSession(challengeId: string | null) {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const initialMessageRef = useRef<Message | null>(null);

  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!challengeId) {
      router.push('/challenges');
      return;
    }
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    async function startChallenge() {
      try {
        const data = await apiJsonFetch<{ session_id: string; challenge: Challenge }>(
          `/api/challenges/${encodeURIComponent(challengeId!)}/start`,
          {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          },
        );

        setSessionId(data.session_id);
        setChallenge(data.challenge);

        const initialMessage: Message = {
          id: '1',
          role: 'system',
          content: `Challenge "${data.challenge?.title || 'Unknown'}" initialized. The model is now active and ready for interaction. Your objective: manipulate the model into revealing its hidden system prompt or secret name. Good luck!`,
          timestamp: new Date(),
        };
        initialMessageRef.current = initialMessage;
        setMessages([initialMessage]);
      } catch (error) {
        hasStartedRef.current = false; // Reset on error so user can retry
        toast.error(error instanceof Error ? error.message : 'Failed to start challenge');
        router.push('/challenges');
      } finally {
        setInitializing(false);
      }
    }

    startChallenge();
  }, [challengeId, router]);

  // Timer
  useEffect(() => {
    if (initializing || challengeCompleted) return;
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [initializing, challengeCompleted]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading || !sessionId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setAttempts((prev) => prev + 1);

    try {
      await apiJsonFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: content, session_id: sessionId }),
      });

      // Poll for response
      const pollInterval = setInterval(async () => {
        try {
          const sessionData = await apiJsonFetch<{
            messages?: Array<{ response_text?: string; verified_response?: string }>;
          }>(`/api/chat/session?session_id=${sessionId}`);
          const lastMessage = sessionData.messages?.[sessionData.messages.length - 1];

          if (lastMessage?.response_text) {
            clearInterval(pollInterval);
            const assistantMessage: Message = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: lastMessage.response_text,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);

            // Check if challenge was completed (verified_response === "JAILBREAK")
            if (lastMessage.verified_response?.startsWith('JAILBREAK')) {
              setChallengeCompleted(true);
            }
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, POLL_INTERVAL);

      setTimeout(() => {
        clearInterval(pollInterval);
        setIsLoading(false);
      }, POLL_TIMEOUT);

    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      setIsLoading(false);
    }
  }, [isLoading, sessionId]);

  const resetConversation = useCallback(() => {
    if (initialMessageRef.current) {
      setMessages([initialMessageRef.current]);
    }
    setAttempts(0);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    sessionId,
    challenge,
    initializing,
    messages,
    isLoading,
    attempts,
    timeElapsed,
    challengeCompleted,
    setChallengeCompleted,
    sendMessage,
    resetConversation,
    formatTime,
  };
}



      

