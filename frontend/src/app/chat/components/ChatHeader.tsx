'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Zap, Terminal, Shield } from 'lucide-react';
import type { Challenge } from '../types';

interface ChatHeaderProps {
  challenge: Challenge;
  timeElapsed: string;
  attempts: number;
}

export function ChatHeader({ challenge, timeElapsed, attempts }: ChatHeaderProps) {
  return (
    <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/challenges">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Challenges
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6 bg-slate-800" />
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyan-500" />
              <h1 className="text-white">{challenge.title}</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Time: {timeElapsed}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Zap className="w-4 h-4" />
            <span>Attempts: {attempts}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-4 h-4" />
            <span>Model: GPT-4-Defense-v1</span>
          </div>
        </div>
      </div>
    </header>
  );
}

