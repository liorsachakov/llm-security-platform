'use client';

import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Info, Sparkles } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

function MessageBubble({ message }: { message: Message }) {
  const roleStyles = {
    user: 'bg-cyan-500/10 border border-cyan-500/50 text-white',
    system: 'bg-purple-500/10 border border-purple-500/50 text-purple-300 w-full',
    assistant: 'bg-slate-800/50 border border-slate-700 text-slate-200',
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${roleStyles[message.role]}`}>
        {message.role === 'system' && (
          <div className="flex items-center gap-2 mb-2">
            {message.flagged ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : (
              <Info className="w-4 h-4 text-purple-400" />
            )}
            <span className="text-xs uppercase tracking-wider">System</span>
          </div>
        )}
        {message.role === 'assistant' && (
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-xs text-slate-400">AI Assistant</span>
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs text-slate-500 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          <span className="text-xs text-slate-400">AI Assistant</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-6 pb-10">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}

