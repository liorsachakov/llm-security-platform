'use client';

import { useCallback } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { AdminChallenge } from './types';

export function ChallengeCard(props: {
  challenge: AdminChallenge;
  deleting: boolean;
  onOpenEdit: (challenge: AdminChallenge) => void;
  onDelete: (challengeId: string) => Promise<void>;
  markIgnoreEditClicks: (ms?: number) => void;
}) {
  const { challenge, deleting, onOpenEdit, onDelete, markIgnoreEditClicks } = props;

  const openEdit = useCallback(() => onOpenEdit(challenge), [challenge, onOpenEdit]);

  return (
    <Card className="p-4 bg-slate-950 border-slate-800 hover:border-cyan-500/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 cursor-pointer" onClick={openEdit}>
          <div className="text-white text-lg truncate">{challenge.title}</div>
          <div className="text-slate-400 text-sm mt-1">{challenge.description}</div>
          <div className="text-slate-500 text-xs mt-2">
            Created: {new Date(challenge.created_at).toLocaleString()}
          </div>
        </div>

        <div className="shrink-0 flex items-start gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                aria-label="Delete challenge"
                disabled={deleting}
                onClick={(e) => e.stopPropagation()}
                onPointerDownCapture={() => markIgnoreEditClicks()}
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this challenge?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="border-slate-700 text-slate-200 hover:bg-slate-800"
                  onPointerDownCapture={() => markIgnoreEditClicks()}
                >
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onPointerDownCapture={() => markIgnoreEditClicks()}
                  onClick={(e) => {
                    e.stopPropagation();
                    markIgnoreEditClicks();
                    void onDelete(challenge.challenge_id);
                  }}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={(e) => e.stopPropagation()}
                onPointerDownCapture={() => markIgnoreEditClicks()}
              >
                View system prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-slate-900 border-slate-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-xl">System prompt</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[50vh] bg-slate-950 border border-slate-800 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-slate-200 font-mono">
                  {challenge.system_prompt}
                </pre>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}


