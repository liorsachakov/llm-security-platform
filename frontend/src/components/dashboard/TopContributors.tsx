import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { topUsers } from '@/lib/data';

export default function TopContributors() {
  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl text-white">Top Contributors</h2>
        </div>
        <Link href="/leaderboard">
          <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-400">
            Full Board
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {topUsers.map((user) => (
          <div
            key={user.rank}
            className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-4"
          >
            <span className="text-2xl">{user.badge}</span>
            <div className="flex-1">
              <p className="text-white">{user.username}</p>
              <p className="text-xs text-slate-400">Rank #{user.rank}</p>
            </div>
            <div className="text-right">
              <p className="text-cyan-500">{user.points.toLocaleString()}</p>
              <p className="text-xs text-slate-400">points</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}









