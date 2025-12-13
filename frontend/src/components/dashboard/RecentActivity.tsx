import { Activity, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { recentAttacks } from '@/lib/data';

export default function RecentActivity() {
  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-cyan-500" />
        <h2 className="text-xl text-white">Recent Attacks</h2>
      </div>
      <div className="space-y-3">
        {recentAttacks.map((attack) => (
          <div
            key={attack.id}
            className="p-3 bg-slate-950 border border-slate-800 rounded-lg"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-white">{attack.challenge}</span>
              <Badge
                variant="outline"
                className={
                  attack.result === 'Success'
                    ? 'border-emerald-500/50 text-emerald-500'
                    : 'border-red-500/50 text-red-500'
                }
              >
                {attack.result}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>by {attack.user}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {attack.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}









