'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function CreateChallengeDialog(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creating: boolean;
  onCreate: (payload: { title: string; description: string; system_prompt: string }) => Promise<void>;
}) {
  const { open, onOpenChange, creating, onCreate } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');

  const canCreate = useMemo(() => {
    return title.trim().length > 0 && description.trim().length > 0 && systemPrompt.trim().length > 0;
  }, [title, description, systemPrompt]);

  const handleCreate = async () => {
    if (!canCreate) return;
    await onCreate({
      title: title.trim(),
      description: description.trim(),
      system_prompt: systemPrompt.trim(),
    });
    // If create succeeded, close + reset
    onOpenChange(false);
    setTitle('');
    setDescription('');
    setSystemPrompt('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Create new challenge</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Create new challenge</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-slate-300">Title</div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter challenge title"
              className="bg-slate-950 border-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm text-slate-300">Description</div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter challenge description"
              className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm text-slate-300">System prompt</div>
            <Textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt"
              className="bg-slate-950 border-slate-800 text-white min-h-[140px] font-mono"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={() => onOpenChange(false)}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleCreate}
              disabled={!canCreate || creating}
            >
              {creating ? 'Creating…' : 'Create'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


