import { TrendingUp, Award, Target, Shield, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Total Points</p>
            <p className="text-3xl text-white">4,250</p>
            <p className="text-xs text-cyan-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +320 this week
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Award className="w-6 h-6 text-cyan-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Challenges Solved</p>
            <p className="text-3xl text-white">28</p>
            <p className="text-xs text-purple-500 mt-1">12 this month</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Target className="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Models Tested</p>
            <p className="text-3xl text-white">5</p>
            <p className="text-xs text-amber-500 mt-1">2 active</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">Success Rate</p>
            <p className="text-3xl text-white">78%</p>
            <p className="text-xs text-emerald-500 mt-1">Above average</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </Card>
    </div>
  );
}








