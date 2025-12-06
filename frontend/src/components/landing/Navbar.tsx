import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span className="text-xl text-white">LLM Security CTF</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/leaderboard">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Leaderboard
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                GitHub
              </Button>
            </a>
            <Link href="/login">
              <Button variant="outline" className="border-slate-700 text-black hover:bg-slate-800">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}




