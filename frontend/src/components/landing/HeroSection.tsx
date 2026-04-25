import Link from 'next/link';
import { Zap, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="container mx-auto px-6 pt-24 pb-0">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
          <Zap className="w-4 h-4 text-cyan-500" />
          <span className="text-sm text-cyan-400">AI Security Research Platform</span>
        </div>
        
        <h1 className="text-6xl mb-6 text-white bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
        LLM Security Arena<br />
        Hack Model. Capture the Flag.
        </h1>
        
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Break, bypass, and exploit LLMs in a controlled CTF environment. 
          Master the art of prompt injection and adversarial attacks through hands-on
          security challenges.
        </p>
      </div>
    </section>
  );
}




