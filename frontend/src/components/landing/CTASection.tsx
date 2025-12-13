import Link from 'next/link';
import { Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-12 text-center">
        <Lock className="w-16 h-16 text-cyan-500 mx-auto mb-6" />
        <h2 className="text-4xl mb-4 text-white">Ready to Test Your Skills?</h2>
        <p className="text-xl text-slate-400 mb-8">
          Join the community of AI security researchers and help build safer LLMs
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
            Join the Platform
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}








