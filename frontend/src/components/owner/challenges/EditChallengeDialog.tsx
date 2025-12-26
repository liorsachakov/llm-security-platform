'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AdminChallenge } from './types';

export function EditChallengeDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: AdminChallenge | null;
  saving: boolean;
  onSave: (
    challengeId: string,
    changes: Partial<Pick<AdminChallenge, 'title' | 'description' | 'system_prompt'>>,
  ) => Promise<void>;
}) {
  const { open, onOpenChange, challenge, saving, onSave } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');

  // keep local fields in sync when opening / changing challenge
  useEffect(() => {
    if (!challenge) return;
    setTitle(challenge.title);
    setDescription(challenge.description);
    setSystemPrompt(challenge.system_prompt);
  }, [challenge]);

  const changes = useMemo(() => {
    if (!challenge) return {};
    const out: Partial<Pick<AdminChallenge, 'title' | 'description' | 'system_prompt'>> = {};
    if (title.trim() !== challenge.title) out.title = title.trim();
    if (description.trim() !== challenge.description) out.description = description.trim();
    if (systemPrompt.trim() !== challenge.system_prompt) out.system_prompt = systemPrompt.trim();
    return out;
  }, [challenge, description, systemPrompt, title]);

  const canSave = useMemo(() => {
    if (!challenge) return false;
    const hasAnyChange = Object.keys(changes).length > 0;
    const allNonEmpty = title.trim() && description.trim() && systemPrompt.trim();
    return Boolean(hasAnyChange && allNonEmpty);
  }, [challenge, changes, description, systemPrompt, title]);

  const handleSave = async () => {
    if (!challenge || !canSave) return;
    await onSave(challenge.challenge_id, changes);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit challenge</DialogTitle>
        </DialogHeader>

        {!challenge ? (
          <div className="text-slate-400">No challenge selected.</div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-slate-300">Title</div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-slate-300">Description</div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-slate-300">System prompt</div>
              <Textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="bg-slate-950 border-slate-800 text-white min-h-[140px] font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={() => onOpenChange(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                onClick={handleSave}
                disabled={!canSave || saving}
              >
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


