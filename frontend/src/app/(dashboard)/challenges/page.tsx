'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { useChallenges } from './hooks/useChallenges';
import { ChallengeCard } from './components/ChallengeCard';
import { ChallengesSkeleton } from './components/ChallengesSkeleton';

export default function ChallengesPage() {
  const router = useRouter();
  const { challenges, loading } = useChallenges();

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
          <ChallengesSkeleton />
        ) : challenges.length === 0 ? (
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <p className="text-slate-400">No challenges available.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.challenge_id}
                challenge={challenge}
                onClick={() => handleChallengeClick(challenge.challenge_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
