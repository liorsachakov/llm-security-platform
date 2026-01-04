'use client';

import { Card } from '@/components/ui/card';
import { Target, CheckCircle2 } from 'lucide-react';
import type { Challenge } from '../hooks/useChallenges';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onClick: () => void;
}

export function ChallengeCard({ challenge, isCompleted, onClick }: ChallengeCardProps) {
  return (
    <Card
      className={`p-6 bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer relative ${
        isCompleted ? 'border-emerald-500/30' : ''
      }`}
      onClick={onClick}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </div>
      )}
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
