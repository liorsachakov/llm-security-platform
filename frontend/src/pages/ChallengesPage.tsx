import { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../components/DashboardLayout';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import { Target, Clock, Users, Award, Send, Lightbulb, MessageSquare } from 'lucide-react';

export default function ChallengesPage() {
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [payload, setPayload] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '> System initialized',
    '> Waiting for input...',
  ]);

  const challenges = [
    {
      id: 1,
      title: 'Prompt Injection Basics',
      category: 'Injection',
      points: 100,
      attempts: 1245,
      solves: 892,
      description: 'Learn the basics of prompt injection by bypassing a simple content filter.',
      hints: ['Try using role-playing instructions', 'Think about system prompts'],
    },
    {
      id: 2,
      title: 'Context Window Manipulation',
      category: 'Exploitation',
      points: 250,
      attempts: 567,
      solves: 234,
      description: 'Exploit context window limitations to extract hidden information.',
      hints: ['Consider token limits', 'Think about attention mechanisms'],
    },
    {
      id: 3,
      title: 'Model Extraction Attack',
      category: 'Advanced',
      points: 500,
      attempts: 234,
      solves: 45,
      description: 'Attempt to extract model weights or training data through clever queries.',
      hints: ['API behavior analysis', 'Statistical inference methods'],
    },
    {
      id: 4,
      title: 'Bias Detection Challenge',
      category: 'Analysis',
      points: 200,
      attempts: 789,
      solves: 456,
      description: 'Identify and document bias patterns in model responses.',
      hints: ['Test with diverse inputs', 'Look for systematic patterns'],
    },
    {
      id: 5,
      title: 'Adversarial Input Crafting',
      category: 'Exploitation',
      points: 450,
      attempts: 345,
      solves: 67,
      description: 'Craft adversarial inputs that cause unexpected model behavior.',
      hints: ['Unicode manipulation', 'Encoding tricks'],
    },
    {
      id: 6,
      title: 'Token Smuggling',
      category: 'Injection',
      points: 300,
      attempts: 456,
      solves: 178,
      description: 'Smuggle unauthorized tokens past input validation.',
      hints: ['Tokenization boundaries', 'Special characters'],
    },
    {
      id: 7,
      title: 'Jailbreak Challenge',
      category: 'Advanced',
      points: 600,
      attempts: 890,
      solves: 123,
      description: 'Break through model safety guardrails and content policies.',
      hints: ['Indirect prompting', 'Hypothetical scenarios'],
    },
    {
      id: 8,
      title: 'Information Leakage',
      category: 'Exploitation',
      points: 150,
      attempts: 1023,
      solves: 678,
      description: 'Extract information the model should not reveal.',
      hints: ['Social engineering', 'Question framing'],
    },
  ];

  const handleSubmit = () => {
    setConsoleOutput((prev) => [
      ...prev,
      `> Input: ${payload}`,
      '> Processing...',
      '> [MOCK] Challenge validation in progress',
      Math.random() > 0.5
        ? '✓ Success! Vulnerability exploited. +' + selectedChallenge.points + ' points'
        : '✗ Failed. Try a different approach.',
    ]);
    setPayload('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl text-white mb-2">Challenges</h1>
          <p className="text-slate-400">
            Test your skills against real-world LLM vulnerabilities
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="p-6 bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer"
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-500" />
                    <h3 className="text-white">{challenge.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-4">{challenge.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {challenge.attempts}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {challenge.solves} solved
                    </span>
                  </div>
                  <span className="text-cyan-500">{challenge.points} pts</span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800">
                  <Badge variant="outline" className="border-slate-700 text-slate-400">
                    {challenge.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge Detail Dialog */}
      <Dialog open={!!selectedChallenge} onOpenChange={() => setSelectedChallenge(null)}>
        <DialogContent className="max-w-4xl bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedChallenge?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg mb-2 text-white">Description</h3>
              <p className="text-slate-400">{selectedChallenge?.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-slate-400">Points</span>
                <p className="text-xl text-cyan-500 mt-1">{selectedChallenge?.points}</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-slate-400">Attempts</span>
                <p className="text-xl text-white mt-1">{selectedChallenge?.attempts}</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-slate-400">Solves</span>
                <p className="text-xl text-emerald-500 mt-1">{selectedChallenge?.solves}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-2 text-white">Input Area</h3>
              <Textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                placeholder="Enter your payload or attack vector here..."
                className="min-h-[120px] bg-slate-950 border-slate-800 text-white font-mono text-sm"
              />
            </div>

            <div>
              <h3 className="text-lg mb-2 text-white">Console Output</h3>
              <ScrollArea className="h-48 bg-slate-950 border border-slate-800 rounded-lg p-4">
                <div className="space-y-1 font-mono text-sm">
                  {consoleOutput.map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.includes('Success')
                          ? 'text-emerald-500'
                          : line.includes('Failed')
                          ? 'text-red-500'
                          : 'text-slate-400'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Show Hints ({selectedChallenge?.hints?.length})
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => router.push({
                    pathname: '/chat',
                    query: { challenge: JSON.stringify(selectedChallenge) }
                  })}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chat Challenge
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="outline"
                  className="border-cyan-600 text-cyan-400 hover:bg-cyan-600/10"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Quick Submit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}