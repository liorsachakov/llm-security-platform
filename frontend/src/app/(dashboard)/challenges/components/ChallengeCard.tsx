'use client';

import { Card } from '@/components/ui/card';
import { Target } from 'lucide-react';
import type { Challenge } from '../hooks/useChallenges';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
}

export function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  return (
    <Card
      className="p-6 bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-500" />
          <h3 className="text-white font-medium">{challenge.title}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-400">{challenge.description}</p>
    </Card>
  );
}

