'use client';

import { Card } from '@/components/ui/card';
import { Target, Terminal } from 'lucide-react';
import type { Challenge } from '../types';

interface ChatSidebarProps {
  challenge: Challenge;
  onQuickAction: (text: string) => void;
  onReset: () => void;
}

export function ChatSidebar({ challenge }: ChatSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-4">
      {/* Challenge Info */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-500" />
          Challenge Info
        </h3>
        <div>
          <p className="text-slate-400 text-sm mb-1">Objective</p>
          <p className="text-slate-200 text-sm">{challenge.description}</p>
        </div>
      </Card>

      {/* Attacker Playbook */}
      <Card className="bg-slate-900/60 border border-cyan-900/40 backdrop-blur-sm p-6 shadow-lg shadow-cyan-500/5">
        <h3 className="text-white mb-3 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-500" />
          Attacker Playbook
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Push harder. Probe the guardrails. Chain your requests until the model slips.
          Stay curious, stay noisy, and keep trying complete the challenge.
        </p>
        <div className="mt-4 border border-slate-800/80 rounded-md bg-slate-950/40 p-3 text-xs text-slate-400">
          Tip: Chain the ideas above. If it resists, paraphrase, narrow the ask, and keep the pressure on.
        </div>
      </Card>
    </div>
  );
}

