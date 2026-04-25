'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lock, ChevronRight, Swords, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiMe } from '@/lib/auth-client';
import type { AuthUser } from '@/lib/auth';

export default function CTASection() {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    apiMe()
      .then((me) => { if (!cancelled) setUser(me); })
      .catch(() => { if (!cancelled) setUser(null); });
    return () => { cancelled = true; };
  }, []);

  if (user === undefined) {
    return (
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-12 text-center">
          <Lock className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
          <div className="h-10 w-64 bg-slate-800 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-slate-800/60 rounded mx-auto mb-8 animate-pulse" />
          <div className="h-12 w-44 bg-slate-800 rounded-lg mx-auto animate-pulse" />
        </div>
      </section>
    );
  }

  const content = user
    ? user.role === 'Owner'
      ? {
          icon: <Crown className="w-16 h-16 text-amber-500 mx-auto mb-6" />,
          heading: 'Manage Your Challenges',
          description: 'Create and configure adversarial challenges, review submissions, and monitor how attackers interact with your models.',
          href: '/owner/challenges',
          label: 'Go to Owner Challenges dashboard',
        }
      : {
          icon: <Swords className="w-16 h-16 text-cyan-500 mx-auto mb-6" />,
          heading: 'Ready for Your Next Challenge?',
          description: 'Pick up where you left off — explore new adversarial scenarios, climb the leaderboard, and sharpen your LLM security skills.',
          href: '/challenges',
          label: 'Browse Challenges',
        }
    : {
        icon: <Lock className="w-16 h-16 text-cyan-500 mx-auto mb-6" />,
        heading: 'Ready to Test Your Skills?',
        description: 'Join the community of AI security researchers and help build safer LLMs',
        href: '/signup',
        label: 'Join the Platform',
      };

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-12 text-center">
        {content.icon}
        <h2 className="text-4xl mb-4 text-white">{content.heading}</h2>
        <p className="text-xl text-slate-400 mb-8">{content.description}</p>
        <Link href={content.href}>
          <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
            {content.label}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
