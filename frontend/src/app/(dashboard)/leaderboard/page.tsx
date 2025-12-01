'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy, Medal, Award, TrendingUp, Crown } from 'lucide-react';

export default function LeaderboardPage() {
  const leaderboardData = [
    {
      rank: 1,
      username: 'CyberNinja',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberNinja',
      points: 8750,
      solved: 87,
      successRate: 92.5,
      badge: 'Legend',
      trend: 'up',
    },
    {
      rank: 2,
      username: 'SecMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecMaster',
      points: 7890,
      solved: 76,
      successRate: 89.3,
      badge: 'Expert',
      trend: 'up',
    },
    {
      rank: 3,
      username: 'AIHunter',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AIHunter',
      points: 6420,
      solved: 64,
      successRate: 87.1,
      badge: 'Expert',
      trend: 'down',
    },
    {
      rank: 4,
      username: 'PromptBreaker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PromptBreaker',
      points: 5980,
      solved: 59,
      successRate: 85.4,
      badge: 'Advanced',
      trend: 'up',
    },
    {
      rank: 5,
      username: 'TokenMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TokenMaster',
      points: 5340,
      solved: 53,
      successRate: 83.8,
      badge: 'Advanced',
      trend: 'same',
    },
    {
      rank: 6,
      username: 'SecurityBug',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SecurityBug',
      points: 4890,
      solved: 48,
      successRate: 82.2,
      badge: 'Advanced',
      trend: 'up',
    },
    {
      rank: 7,
      username: 'LLMHacker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LLMHacker',
      points: 4250,
      solved: 42,
      successRate: 80.5,
      badge: 'Intermediate',
      trend: 'down',
    },
    {
      rank: 8,
      username: 'YouAreHere',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      points: 4250,
      solved: 28,
      successRate: 78.2,
      badge: 'Intermediate',
      trend: 'up',
      highlight: true,
    },
    {
      rank: 9,
      username: 'AIAuditor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AIAuditor',
      points: 3780,
      solved: 37,
      successRate: 77.9,
      badge: 'Intermediate',
      trend: 'same',
    },
    {
      rank: 10,
      username: 'CodeBreaker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeBreaker',
      points: 3560,
      solved: 35,
      successRate: 76.3,
      badge: 'Intermediate',
      trend: 'up',
    },
  ];

  const renderTopThree = () => (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* 2nd Place */}
      <Card className="p-6 bg-slate-900/50 border-slate-700 text-center">
        <div className="relative inline-block mb-4">
          <Avatar className="w-20 h-20 border-4 border-slate-700">
            <AvatarImage src={leaderboardData[1].avatar} />
            <AvatarFallback>2</AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center">
            <Medal className="w-5 h-5 text-slate-400" />
          </div>
        </div>
        <h3 className="text-xl text-white mb-1">{leaderboardData[1].username}</h3>
        <Badge variant="outline" className="border-slate-700 text-slate-400 mb-3">
          {leaderboardData[1].badge}
        </Badge>
        <p className="text-3xl text-slate-300 mb-1">{leaderboardData[1].points.toLocaleString()}</p>
        <p className="text-sm text-slate-500">{leaderboardData[1].solved} challenges</p>
      </Card>

      {/* 1st Place */}
      <Card className="p-6 bg-gradient-to-b from-amber-500/10 to-slate-900/50 border-amber-500/50 text-center">
        <div className="relative inline-block mb-4">
          <Avatar className="w-24 h-24 border-4 border-amber-500">
            <AvatarImage src={leaderboardData[0].avatar} />
            <AvatarFallback>1</AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2 w-12 h-12 bg-amber-500 border-2 border-amber-400 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl text-white mb-1">{leaderboardData[0].username}</h3>
        <Badge variant="outline" className="border-amber-500/50 text-amber-500 mb-3">
          {leaderboardData[0].badge}
        </Badge>
        <p className="text-4xl text-amber-500 mb-1">{leaderboardData[0].points.toLocaleString()}</p>
        <p className="text-sm text-slate-400">{leaderboardData[0].solved} challenges</p>
      </Card>

      {/* 3rd Place */}
      <Card className="p-6 bg-slate-900/50 border-slate-700 text-center">
        <div className="relative inline-block mb-4">
          <Avatar className="w-20 h-20 border-4 border-slate-700">
            <AvatarImage src={leaderboardData[2].avatar} />
            <AvatarFallback>3</AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center">
            <Medal className="w-5 h-5 text-orange-400" />
          </div>
        </div>
        <h3 className="text-xl text-white mb-1">{leaderboardData[2].username}</h3>
        <Badge variant="outline" className="border-slate-700 text-slate-400 mb-3">
          {leaderboardData[2].badge}
        </Badge>
        <p className="text-3xl text-slate-300 mb-1">{leaderboardData[2].points.toLocaleString()}</p>
        <p className="text-sm text-slate-500">{leaderboardData[2].solved} challenges</p>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500" />
            Leaderboard
          </h1>
          <p className="text-slate-400">Top security researchers and contributors</p>
        </div>
      </div>

      <Tabs defaultValue="all-time" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="all-time" className="data-[state=active]:bg-slate-800">
            All Time
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-slate-800">
            This Month
          </TabsTrigger>
          <TabsTrigger value="weekly" className="data-[state=active]:bg-slate-800">
            This Week
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-time">
          {renderTopThree()}

          <Card className="bg-slate-900/50 border-slate-800">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                  <TableHead className="text-slate-400">Rank</TableHead>
                  <TableHead className="text-slate-400">User</TableHead>
                  <TableHead className="text-slate-400">Badge</TableHead>
                  <TableHead className="text-slate-400 text-right">Points</TableHead>
                  <TableHead className="text-slate-400 text-right">Solved</TableHead>
                  <TableHead className="text-slate-400 text-right">Success Rate</TableHead>
                  <TableHead className="text-slate-400 text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user) => (
                  <TableRow
                    key={user.rank}
                    className={`border-slate-800 ${
                      user.highlight
                        ? 'bg-cyan-500/5 border-l-4 border-l-cyan-500'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.rank <= 3 ? (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              user.rank === 1
                                ? 'bg-amber-500/20 text-amber-500'
                                : user.rank === 2
                                ? 'bg-slate-700 text-slate-300'
                                : 'bg-orange-500/20 text-orange-400'
                            }`}
                          >
                            {user.rank}
                          </div>
                        ) : (
                          <span className="text-slate-400 ml-3">#{user.rank}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-slate-700">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-white">{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.badge === 'Legend'
                            ? 'border-amber-500/50 text-amber-500'
                            : user.badge === 'Expert'
                            ? 'border-purple-500/50 text-purple-500'
                            : user.badge === 'Advanced'
                            ? 'border-cyan-500/50 text-cyan-500'
                            : 'border-slate-700 text-slate-400'
                        }
                      >
                        {user.badge}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-cyan-500">{user.points.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-white">{user.solved}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-slate-300">{user.successRate}%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      {user.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-emerald-500 ml-auto" />
                      )}
                      {user.trend === 'down' && (
                        <TrendingUp className="w-4 h-4 text-red-500 ml-auto rotate-180" />
                      )}
                      {user.trend === 'same' && (
                        <div className="w-4 h-0.5 bg-slate-600 ml-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          {renderTopThree()}
          <Card className="p-8 bg-slate-900/50 border-slate-800 text-center">
            <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Monthly leaderboard data</p>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          {renderTopThree()}
          <Card className="p-8 bg-slate-900/50 border-slate-800 text-center">
            <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Weekly leaderboard data</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

