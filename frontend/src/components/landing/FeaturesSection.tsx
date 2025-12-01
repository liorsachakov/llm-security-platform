import { Target, Shield, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl mb-4 text-white">Why Choose Our Platform?</h2>
        <p className="text-xl text-slate-400">Everything you need to test and improve LLM security</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="p-8 bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6">
            <Target className="w-6 h-6 text-cyan-500" />
          </div>
          <h3 className="text-xl mb-3 text-white">Adversarial Challenges</h3>
          <p className="text-slate-400">
            Engage in CTF-style challenges designed to test LLM vulnerabilities. 
            From prompt injection to model manipulation, sharpen your skills.
          </p>
        </Card>

        <Card className="p-8 bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-xl mb-3 text-white">Upload and Test Models</h3>
          <p className="text-slate-400">
            Model providers can upload their LLMs and observe real-time performance 
            under adversarial conditions. Get detailed vulnerability reports.
          </p>
        </Card>

        <Card className="p-8 bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6">
            <Trophy className="w-6 h-6 text-amber-500" />
          </div>
          <h3 className="text-xl mb-3 text-white">Earn Rewards and Recognition</h3>
          <p className="text-slate-400">
            Climb the leaderboard, earn badges, and gain recognition in the AI security 
            community. Top contributors get exclusive perks.
          </p>
        </Card>
      </div>
    </section>
  );
}

