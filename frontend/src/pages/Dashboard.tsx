import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Target, Upload, Activity, TrendingUp, Clock, Shield, Award, Zap, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const activeChallenges = [
    { id: 1, title: 'Prompt Injection Level 1', points: 100, attempts: 245 },
    { id: 2, title: 'Model Extraction Attack', points: 500, attempts: 67 },
    { id: 3, title: 'Bias Detection Challenge', points: 250, attempts: 134 },
    { id: 4, title: 'Adversarial Input Crafting', points: 450, attempts: 89 },
  ];

  const myModels = [
    { id: 1, name: 'GPT-Defense-v1', status: 'Active', vulnerabilities: 3, tests: 156 },
    { id: 2, name: 'SecureLLM-Beta', status: 'Testing', vulnerabilities: 1, tests: 45 },
  ];

  const recentAttacks = [
    { id: 1, challenge: 'SQL Injection via Prompt', user: 'h4x0r_99', result: 'Success', time: '5m ago' },
    { id: 2, challenge: 'Context Window Overflow', user: 'sec_researcher', result: 'Failed', time: '12m ago' },
    { id: 3, challenge: 'Token Smuggling', user: 'ai_auditor', result: 'Success', time: '18m ago' },
  ];

  const topUsers = [
    { rank: 1, username: 'CyberNinja', points: 8750, badge: '🥇' },
    { rank: 2, username: 'SecMaster', points: 7890, badge: '🥈' },
    { rank: 3, username: 'AIHunter', points: 6420, badge: '🥉' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Challenges */}
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

          {/* My Models */}
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">My Models</h2>
              <Link href="/models">
                <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-400">
                  Upload New
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {myModels.map((model) => (
                <div
                  key={model.id}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white mb-1">{model.name}</h3>
                      <Badge
                        variant="outline"
                        className={
                          model.status === 'Active'
                            ? 'border-emerald-500/50 text-emerald-500'
                            : 'border-amber-500/50 text-amber-500'
                        }
                      >
                        {model.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Vulnerabilities</span>
                      <p className="text-white mt-1">{model.vulnerabilities}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Tests Run</span>
                      <p className="text-white mt-1">{model.tests}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-6 border-2 border-dashed border-slate-800 rounded-lg text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Upload a new model</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Attacks */}
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

          {/* Mini Leaderboard */}
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
        </div>
      </div>
    </DashboardLayout>
  );
}
