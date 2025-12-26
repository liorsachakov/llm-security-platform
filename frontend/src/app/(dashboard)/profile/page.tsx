'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { apiMe } from '@/lib/auth-client';
import type { PublicUser } from '@/lib/mock-db';
import {
  User,
  Mail,
  Calendar,
  Award,
  Target,
  CheckCircle2,
  Clock,
  TrendingUp,
  Shield,
  Edit,
} from 'lucide-react';

export default function ProfilePage() {
  const [me, setMe] = useState<PublicUser | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const user = await apiMe();
      if (!cancelled) setMe(user);
      if (!cancelled) setLoadingMe(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const userProfile = {
    username: me?.username ?? 'YouAreHere',
    email: me?.email ?? 'you@example.com',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(me?.username ?? 'User')}`,
    joinDate: '2025-09-01',
    role: me?.role ?? 'Attacker',
    rank: 8,
    badge: me?.role === 'Owner' ? 'Owner' : 'Intermediate',
    bio:
      me?.role === 'Owner'
        ? 'Platform owner with full access to model management and admin views.'
        : 'Security researcher focused on LLM vulnerabilities and prompt injection techniques.',
  };

  const stats = {
    totalPoints: 4250,
    challengesSolved: 28,
    successRate: 78.2,
    modelsUploaded: 2,
    avgResponseTime: '2.3h',
    streak: 7,
  };

  const badges = [
    { id: 1, name: 'First Blood', description: 'Solved first challenge', earned: true, icon: '🎯' },
    { id: 2, name: 'Speed Demon', description: 'Solved 5 challenges in 24h', earned: true, icon: '⚡' },
    { id: 3, name: 'Persistent', description: '7-day streak', earned: true, icon: '🔥' },
    { id: 4, name: 'Challenger', description: 'Completed 25 challenges', earned: true, icon: '🏆' },
    { id: 5, name: 'Expert', description: 'Solved a hard challenge', earned: false, icon: '🎓' },
    { id: 6, name: 'Contributor', description: 'Uploaded 5 models', earned: false, icon: '📦' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'challenge',
      title: 'Prompt Injection Level 1',
      points: 100,
      status: 'completed',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'challenge',
      title: 'Token Smuggling',
      points: 300,
      status: 'attempted',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'model',
      title: 'Uploaded SecureLLM-Beta',
      status: 'completed',
      time: '2 days ago',
    },
    {
      id: 4,
      type: 'challenge',
      title: 'Bias Detection Challenge',
      points: 200,
      status: 'completed',
      time: '3 days ago',
    },
  ];

  const solvedChallenges = [
    { category: 'Injection', solved: 8, total: 12 },
    { category: 'Exploitation', solved: 6, total: 15 },
    { category: 'Analysis', solved: 7, total: 10 },
    { category: 'Advanced', solved: 7, total: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        {loadingMe && (
          <div className="text-slate-400 text-sm mb-4">Loading profile…</div>
        )}
        <div className="flex items-start justify-between">
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
                <Badge variant="outline" className="border-slate-700 text-slate-400">
                  #{userProfile.rank}
                </Badge>
              </div>
              <p className="text-slate-400 mb-4 max-w-2xl">{userProfile.bio}</p>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {userProfile.email}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {userProfile.role}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Joined {userProfile.joinDate}
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          <div className="text-2xl text-cyan-500 mb-1">{stats.totalPoints}</div>
          <div className="text-xs text-slate-400">Total Points</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          <div className="text-2xl text-purple-500 mb-1">{stats.challengesSolved}</div>
          <div className="text-xs text-slate-400">Solved</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          <div className="text-2xl text-emerald-500 mb-1">{stats.successRate}%</div>
          <div className="text-xs text-slate-400">Success Rate</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          <div className="text-2xl text-amber-500 mb-1">{stats.modelsUploaded}</div>
          <div className="text-xs text-slate-400">Models</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          <div className="text-2xl text-white mb-1">{stats.avgResponseTime}</div>
          <div className="text-xs text-slate-400">Avg. Time</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800 text-center">
          <div className="text-2xl text-orange-500 mb-1">{stats.streak}</div>
          <div className="text-xs text-slate-400">Day Streak</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-800">
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-slate-800">
            Activity
          </TabsTrigger>
          <TabsTrigger value="badges" className="data-[state=active]:bg-slate-800">
            Badges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge Progress */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-500" />
                Challenge Progress by Category
              </h2>
              <div className="space-y-4">
                {solvedChallenges.map((category) => (
                  <div key={category.category}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">{category.category}</span>
                      <span className="text-slate-400">
                        {category.solved}/{category.total}
                      </span>
                    </div>
                    <Progress
                      value={(category.solved / category.total) * 100}
                      className="bg-slate-800"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
                Performance Metrics
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Overall Skill Level</span>
                    <span className="text-white">Intermediate</span>
                  </div>
                  <Progress value={65} className="bg-slate-800" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-slate-400">Best Streak</span>
                    <p className="text-xl text-white mt-1">12 days</p>
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-slate-400">Fastest Solve</span>
                    <p className="text-xl text-white mt-1">8 min</p>
                  </div>
                </div>
                <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-cyan-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-white mb-1">Next Milestone</h4>
                      <p className="text-xs text-slate-400">
                        Complete 2 more challenges to reach Advanced level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <h2 className="text-xl text-white mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.type === 'challenge'
                          ? 'bg-cyan-500/10'
                          : 'bg-purple-500/10'
                      }`}
                    >
                      {activity.type === 'challenge' ? (
                        <Target className="w-5 h-5 text-cyan-500" />
                      ) : (
                        <Shield className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white">{activity.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </span>
                        {activity.points && (
                          <span className="text-cyan-500">+{activity.points} pts</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {activity.status === 'completed' && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className={`p-6 text-center ${
                  badge.earned
                    ? 'bg-slate-900/50 border-cyan-500/50'
                    : 'bg-slate-900/30 border-slate-800 opacity-50'
                }`}
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="text-white mb-1">{badge.name}</h3>
                <p className="text-xs text-slate-400">{badge.description}</p>
                {badge.earned && (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/50 text-emerald-500 mt-3"
                  >
                    Earned
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}











