'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { useChatSession } from './hooks/useChatSession';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatSkeleton } from './components/ChatSkeleton';

function BackgroundEffects() {
  return (
    <>
      <div className="fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
    </>
  );
}

function ChatInterface() {
  const searchParams = useSearchParams();
  const challengeId = searchParams.get('challenge_id');

  const {
    challenge,
    initializing,
    messages,
    isLoading,
    attempts,
    timeElapsed,
    sendMessage,
    resetConversation,
    formatTime,
  } = useChatSession(challengeId);

  if (initializing) {
    return <ChatSkeleton />;
  }

  if (!challenge) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <BackgroundEffects />

      <div className="relative">
        <ChatHeader
          challenge={challenge}
          timeElapsed={formatTime(timeElapsed)}
          attempts={attempts}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-[1800px] mx-auto">
          <div className="lg:col-span-3">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm h-[calc(100vh-220px)] flex flex-col">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <ChatInput onSend={sendMessage} disabled={isLoading} />
            </Card>
          </div>

          <ChatSidebar
            challenge={challenge}
            onQuickAction={sendMessage}
            onReset={resetConversation}
          />
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatInterface />
    </Suspense>
  );
}
