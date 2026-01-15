'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = useCallback(() => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput('');
  }, [input, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-800 p-4">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your prompt or attack payload..."
          className="min-h-[60px] max-h-[200px] resize-none bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-cyan-500 hover:bg-cyan-600 text-black self-end"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{input.length} characters</span>
      </div>
    </div>
  );
}

