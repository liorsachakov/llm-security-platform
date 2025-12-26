'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { activeChallenges } from '@/lib/data';
import { useEffect, useState } from 'react';
import { apiMe } from '@/lib/auth-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

type AdminChallenge = {
  challenge_id: string;
  title: string;
  description: string;
  system_prompt: string;
  created_at: string;
};

export default function ActiveChallengesList() {
  const [href, setHref] = useState('/challenges');
  const [isOwner, setIsOwner] = useState(false);
  const [loadingOwnerChallenges, setLoadingOwnerChallenges] = useState(false);
  const [ownerChallenges, setOwnerChallenges] = useState<AdminChallenge[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await apiMe();
      if (cancelled) return;
      const owner = me?.role === 'Owner';
      setIsOwner(owner);
      setHref(owner ? '/owner/challenges' : '/challenges');

      if (!owner) return;

      setLoadingOwnerChallenges(true);
      try {
        const res = await fetch('/api/admin/challenges', { method: 'GET', cache: 'no-store' });
        const data = (await res.json()) as { items?: AdminChallenge[] };
        if (!cancelled) setOwnerChallenges(Array.isArray(data.items) ? data.items : []);
      } catch {
        if (!cancelled) setOwnerChallenges([]);
      } finally {
        if (!cancelled) setLoadingOwnerChallenges(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const topOwnerChallenges = ownerChallenges
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4);

  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Active Challenges</h2>
        <Link href={href}>
          <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-400">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {isOwner ? (
          loadingOwnerChallenges ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))
          ) : topOwnerChallenges.length === 0 ? (
            <div className="text-slate-400 text-sm">No owner challenges found yet.</div>
          ) : (
            topOwnerChallenges.map((challenge) => (
              <div
                key={challenge.challenge_id}
                className="p-4 bg-slate-950 border border-slate-800 rounded-lg hover:border-cyan-500/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-white">{challenge.title}</h3>
                  <Badge variant="outline" className="border-amber-500/50 text-amber-500 shrink-0">
                    Owner
                  </Badge>
                </div>
                <div className="text-sm text-slate-400 line-clamp-2">{challenge.description}</div>
                <div className="text-xs text-slate-500 mt-2">
                  Created {new Date(challenge.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )
        ) : (
          activeChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-lg hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white">{challenge.title}</h3>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{challenge.attempts} attempts</span>
                <span className="text-cyan-500">{challenge.points} pts</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}











