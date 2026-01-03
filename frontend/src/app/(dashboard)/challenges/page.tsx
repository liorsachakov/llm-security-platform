'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Target } from 'lucide-react';
import { toast } from 'sonner';

interface Challenge {
  challenge_id: string;
  title: string;
  description: string;
}

export default function ChallengesPage() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchChallenges() {
      try {
        const res = await fetch('/api/challenges', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch challenges');
        }

        const data = await res.json();
        if (cancelled) return;

        setChallenges(Array.isArray(data.items) ? data.items : []);
      } catch (error) {
        if (cancelled) return;
        toast.error(error instanceof Error ? error.message : 'Failed to load challenges');
        setChallenges([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchChallenges();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChallengeClick = (challengeId: string) => {
    router.push(`/chat?challenge_id=${encodeURIComponent(challengeId)}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-2">Challenges</h1>
        <p className="text-slate-400">
          Test your skills against real-world LLM vulnerabilities
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 bg-slate-900/50 border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-5 w-2/3" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </Card>
            ))}
          </div>
        ) : challenges.length === 0 ? (
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <p className="text-slate-400">No challenges available.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card
                key={challenge.challenge_id}
                className="p-6 bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer"
                onClick={() => handleChallengeClick(challenge.challenge_id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-500" />
                    <h3 className="text-white font-medium">{challenge.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-400">{challenge.description}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
