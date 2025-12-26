'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { apiMe } from '@/lib/auth-client';
import type { PublicUser } from '@/lib/mock-db';
import { Loader2 } from 'lucide-react';

type AdminChallenge = {
  challenge_id: string;
  title: string;
  description: string;
  system_prompt: string;
  created_at: string;
};

export default function OwnerChallengesPage() {
  const router = useRouter();
  const [me, setMe] = useState<PublicUser | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const [items, setItems] = useState<AdminChallenge[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');

  const canCreate = useMemo(() => {
    return title.trim().length > 0 && description.trim().length > 0 && systemPrompt.trim().length > 0;
  }, [title, description, systemPrompt]);

  const loadChallenges = async () => {
    setLoadingList(true);
    try {
      const res = await fetch('/api/admin/challenges', { method: 'GET', cache: 'no-store' });
      const data = (await res.json()) as { items?: AdminChallenge[]; error?: string };
      if (!res.ok) throw new Error(data.error || 'Failed to load challenges');
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load challenges');
      setItems([]);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const user = await apiMe();
      if (cancelled) return;
      setMe(user);
      setLoadingMe(false);
      if (user?.role === 'Owner') {
        await loadChallenges();
      } else {
        setLoadingList(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async () => {
    if (!canCreate) return;
    setCreating(true);
    try {
      const res = await fetch('/api/admin/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          system_prompt: systemPrompt.trim(),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || 'Failed to create challenge');

      toast.success('Challenge created');
      setIsCreateOpen(false);
      setTitle('');
      setDescription('');
      setSystemPrompt('');
      await loadChallenges();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create challenge');
    } finally {
      setCreating(false);
    }
  };

  if (loadingMe) {
    return (
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="text-slate-300">Loading…</div>
      </Card>
    );
  }

  if (!me) {
    return (
      <Card className="p-6 bg-slate-900/50 border-slate-800 space-y-3">
        <div className="text-white text-xl">Owner Challenges</div>
        <div className="text-slate-400">You need to sign in to view this page.</div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" onClick={() => router.push('/login')}>
          Go to Login
        </Button>
      </Card>
    );
  }

  if (me.role !== 'Owner') {
    return (
      <Card className="p-6 bg-slate-900/50 border-slate-800 space-y-3">
        <div className="text-white text-xl">Owner Challenges</div>
        <div className="text-slate-400">
          Access denied. Your role is <span className="text-white">{me.role}</span>.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-white mb-2">Challenges</h1>
          <p className="text-slate-400">Owner-only management view.</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
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
                  onClick={() => setIsCreateOpen(false)}
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
      </div>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="text-xl text-white">Your challenges</div>
            <Badge variant="outline" className="border-slate-700 text-slate-300">
              {items.length}
            </Badge>
          </div>
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={loadChallenges}
            disabled={loadingList}
          >
            {loadingList ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Refreshing…
              </span>
            ) : (
              'Refresh'
            )}
          </Button>
        </div>

        {loadingList ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-4 bg-slate-950 border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-3 w-1/3 mt-2" />
                  </div>
                  <Skeleton className="h-9 w-40 shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-slate-400">No challenges found.</div>
        ) : (
          <div className="space-y-4">
            {items.map((c) => (
              <Card key={c.challenge_id} className="p-4 bg-slate-950 border-slate-800">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-white text-lg truncate">{c.title}</div>
                    <div className="text-slate-400 text-sm mt-1">{c.description}</div>
                    <div className="text-slate-500 text-xs mt-2">
                      Created: {new Date(c.created_at).toLocaleString()}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 shrink-0"
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
                          {c.system_prompt}
                        </pre>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}


