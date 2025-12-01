import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { activeChallenges } from '@/lib/data';

export default function ActiveChallengesList() {
  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">Active Challenges</h2>
        <Link href="/challenges">
          <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-400">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {activeChallenges.map((challenge) => (
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
        ))}
      </div>
    </Card>
  );
}

