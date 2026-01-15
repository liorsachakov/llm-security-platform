'use client';

import { useRouter } from 'next/navigation';
import { Trophy, Clock, Sparkles, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Challenge } from '../types';

interface ChallengeCompletedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: Challenge | null;
  timeElapsed: string;
}

export function ChallengeCompletedDialog({
  open,
  onOpenChange,
  challenge,
  timeElapsed,
}: ChallengeCompletedDialogProps) {
  const router = useRouter();

  const handleReturnToChallenges = () => {
    onOpenChange(false);
    router.push('/challenges');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white overflow-hidden">
        {/* Celebration background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-[60px]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/15 rounded-full blur-[60px]" />
        </div>

        <div className="relative z-10">
          <DialogHeader className="text-center space-y-4">
            {/* Trophy icon with glow effect */}
            <div className="mx-auto relative">
              <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl scale-150" />
              <div className="relative bg-gradient-to-br from-cyan-500 to-emerald-500 p-4 rounded-full w-fit mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-cyan-400 animate-pulse delay-300" />
            </div>

            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Challenge Completed!
            </DialogTitle>

            <DialogDescription className="text-slate-300 text-base">
              Congratulations! You successfully broke the AI&apos;s defenses and extracted the protected information.
            </DialogDescription>
          </DialogHeader>

          {/* Challenge info */}
          {challenge && (
            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Challenge</h3>
              <p className="text-white font-semibold">{challenge.title}</p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-4">
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Time</p>
                <p className="text-sm font-semibold text-white">{timeElapsed}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={handleReturnToChallenges}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium py-5 group"
            >
              Return to Challenges
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

