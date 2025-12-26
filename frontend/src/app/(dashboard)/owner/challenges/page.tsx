'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiMe } from '@/lib/auth-client';
import type { PublicUser } from '@/lib/mock-db';
import { Loader2 } from 'lucide-react';
import type { AdminChallenge } from '@/components/owner/challenges/types';
import { useAdminChallenges } from '@/components/owner/challenges/useAdminChallenges';
import { CreateChallengeDialog } from '@/components/owner/challenges/CreateChallengeDialog';
import { EditChallengeDialog } from '@/components/owner/challenges/EditChallengeDialog';
import { ChallengeCard } from '@/components/owner/challenges/ChallengeCard';
import { ChallengesSkeletonList } from '@/components/owner/challenges/ChallengesSkeletonList';

export default function OwnerChallengesPage() {
  const router = useRouter();
  const ignoreEditClicksUntilRef = useRef(0);

  const markIgnoreEditClicks = (ms = 500) => {
    ignoreEditClicksUntilRef.current = Date.now() + ms;
  };
  const [me, setMe] = useState<PublicUser | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  const {
    items,
    loading: loadingList,
    creating,
    updating,
    deletingId,
    refresh,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    setLoading: setLoadingList,
  } = useAdminChallenges();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<AdminChallenge | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const user = await apiMe();
      if (cancelled) return;
      setMe(user);
      setLoadingMe(false);
      if (user?.role === 'Owner') {
        await refresh();
      } else {
        setLoadingList(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openEdit = (c: AdminChallenge) => {
    if (Date.now() < ignoreEditClicksUntilRef.current) return;
    setEditTarget(c);
    setIsEditOpen(true);
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

        <CreateChallengeDialog
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          creating={creating}
          onCreate={createChallenge}
        />
      </div>

      <EditChallengeDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) setEditTarget(null);
        }}
        challenge={editTarget}
        saving={updating}
        onSave={updateChallenge}
      />

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
            onClick={refresh}
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
          <ChallengesSkeletonList count={3} />
        ) : items.length === 0 ? (
          <div className="text-slate-400">No challenges found.</div>
        ) : (
          <div className="space-y-4">
            {items.map((c) => (
              <ChallengeCard
                key={c.challenge_id}
                challenge={c}
                deleting={deletingId === c.challenge_id}
                onOpenEdit={openEdit}
                onDelete={deleteChallenge}
                markIgnoreEditClicks={markIgnoreEditClicks}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}


