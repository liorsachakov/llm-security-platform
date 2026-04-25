'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { apiMe } from '@/lib/auth-client';
import { apiJsonFetch } from '@/lib/client-api';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

type Challenge = {
  challenge_id: string;
  title: string;
  description: string;
};

type AdminChallenge = Challenge & {
  system_prompt: string;
  created_at: string;
};

const ChallengeSkeleton = () => (
  <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
    <Skeleton className="h-5 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-3 w-1/3" />
  </div>
);

export default function ActiveChallengesList() {
  const router = useRouter();
  const [href, setHref] = useState('/challenges');
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [ownerChallenges, setOwnerChallenges] = useState<AdminChallenge[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await apiMe();
      if (cancelled) return;
      const owner = me?.role === 'Owner';
      setIsOwner(owner);
      setHref(owner ? '/owner/challenges' : '/challenges');

      setLoading(true);
      try {
        if (owner) {
          const data = await apiJsonFetch<{ items?: AdminChallenge[] }>('/api/admin/challenges', {
            method: 'GET',
            cache: 'no-store',
          });
          if (!cancelled) setOwnerChallenges(Array.isArray(data.items) ? data.items : []);
        } else {
          const data = await apiJsonFetch<{ items?: Challenge[] }>('/api/challenges', {
            method: 'GET',
            cache: 'no-store',
          });
          if (!cancelled) setChallenges(Array.isArray(data.items) ? data.items : []);
        }
      } catch {
        if (!cancelled) {
          setChallenges([]);
          setOwnerChallenges([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
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

  const topChallenges = challenges.slice(0, 4);

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
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <ChallengeSkeleton key={i} />)
        ) : isOwner ? (
          topOwnerChallenges.length === 0 ? (
            <div className="text-slate-400 text-sm">No challenges found yet.</div>
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
        ) : topChallenges.length === 0 ? (
          <div className="text-slate-400 text-sm">No challenges available yet.</div>
        ) : (
          topChallenges.map((challenge) => (
            <div
              key={challenge.challenge_id}
              className="p-4 bg-slate-950 border border-slate-800 rounded-lg hover:border-cyan-500/50 transition-colors cursor-pointer"
              onClick={() => router.push(`/chat?challenge_id=${encodeURIComponent(challenge.challenge_id)}`)}
            >
              <h3 className="text-white mb-1">{challenge.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{challenge.description}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}










