import { Shield, Github, MessageSquare, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-cyan-500" />
              <span className="text-white">LLM Security CTF</span>
            </div>
            <p className="text-sm text-slate-400">
              Open-source platform for testing and improving LLM security
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-500">Challenges</a></li>
              <li><a href="#" className="hover:text-cyan-500">Leaderboard</a></li>
              <li><a href="#" className="hover:text-cyan-500">Models</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-500">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-500">API Reference</a></li>
              <li><a href="#" className="hover:text-cyan-500">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Community</h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-500">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-500">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-500">
                <FileText className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © 2025 LLM Security CTF. Open-source and MIT licensed.
        </div>
      </div>
    </footer>
  );
}





