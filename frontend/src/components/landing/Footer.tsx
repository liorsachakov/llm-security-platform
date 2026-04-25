import Link from 'next/link';
import { Shield, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8 justify-items-center">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-cyan-500" />
              <span className="text-white">LLM Security CTF</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              Open-source platform for testing and improving LLM security
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/challenges" className="hover:text-cyan-500">Challenges</Link></li>
              <li><Link href="/leaderboard" className="hover:text-cyan-500">Leaderboard</Link></li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com/liorsachakov/llm-security-platform" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-500">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {[
                { name: 'Lior', email: 'liorxm@gmail.com' },
                { name: 'Asaf', email: 'asafbaruch81@gmail.com' },
                { name: 'Rudy', email: 'rudikkukuliev123@gmail.com' },
                { name: 'Or', email: 'orrlevari@gmail.com' },
              ].map(({ name, email }) => (
                <li key={name}>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 hover:text-cyan-500 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © 2026 LLM Security CTF.
        </div>
      </div>
    </footer>
  );
}