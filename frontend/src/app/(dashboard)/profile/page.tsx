'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { apiMe } from '@/lib/auth-client';
import { apiJsonFetch } from '@/lib/client-api';
import type { AuthUser } from '@/lib/auth';
import { User, Calendar, Shield, Target, CheckCircle2 } from 'lucide-react';

type Challenge = {
  challenge_id: string;
  title: string;
  description: string;
};

export default function ProfilePage() {
  const [me, setMe] = useState<AuthUser | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);
  const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const user = await apiMe();
      if (!cancelled) {
        setMe(user);
        setLoadingMe(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingActivity(true);
      try {
        const [allData, completedData] = await Promise.all([
          apiJsonFetch<{ items?: Challenge[] }>('/api/challenges', { method: 'GET', cache: 'no-store' }),
          apiJsonFetch<{ 'completed challenges'?: string[] }>('/api/challenges/completedchallenges', { method: 'GET', cache: 'no-store' }),
        ]);
        if (cancelled) return;
        const allChallenges = Array.isArray(allData.items) ? allData.items : [];
        const completedIds = new Set(completedData['completed challenges'] ?? []);
        setCompletedChallenges(allChallenges.filter((c) => completedIds.has(c.challenge_id)));
      } catch {
        if (!cancelled) setCompletedChallenges([]);
      } finally {
        if (!cancelled) setLoadingActivity(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const userProfile = {
    username: me?.username ?? '—',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(me?.username ?? 'User')}`,
    role: me?.role ?? 'Attacker',
    badge: me?.role === 'Owner' ? 'Owner' : 'Attacker',
    bio:
      me?.role === 'Owner'
        ? 'Platform owner with full access to model management and admin views.'
        : 'Security researcher focused on LLM vulnerabilities and prompt injection techniques.',
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        {loadingMe ? (
          <div className="flex items-start gap-6">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-3 flex-1 pt-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-80" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 border-4 border-cyan-500">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl text-white">{userProfile.username}</h1>
                <Badge variant="outline" className="border-cyan-500/50 text-cyan-500">
                  {userProfile.badge}
                </Badge>
              </div>
              <p className="text-slate-400 mb-4 max-w-2xl">{userProfile.bio}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          {loadingActivity ? (
            <Skeleton className="h-8 w-12 mx-auto mb-1" />
          ) : (
            <div className="text-2xl text-purple-500 mb-1">{completedChallenges.length}</div>
          )}
          <div className="text-xs text-slate-400">Challenges Solved</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          {loadingMe ? (
            <Skeleton className="h-8 w-20 mx-auto mb-1" />
          ) : (
            <div className="text-2xl text-cyan-500 mb-1">{userProfile.role}</div>
          )}
          <div className="text-xs text-slate-400">Role</div>
        </Card>
      </div>

      {/* Completed Challenges */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h2 className="text-xl text-white mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-500" />
          Completed Challenges
        </h2>

        {loadingActivity ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : completedChallenges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Target className="w-12 h-12 text-slate-700 mb-4" />
            <p className="text-slate-400 mb-1">No completed challenges yet</p>
            <p className="text-sm text-slate-500">Head to the Challenges page to start solving!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedChallenges.map((challenge) => (
              <div
                key={challenge.challenge_id}
                className="p-4 bg-slate-950 border border-emerald-500/20 rounded-lg flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{challenge.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{challenge.description}</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
