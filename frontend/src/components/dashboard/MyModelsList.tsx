import Link from 'next/link';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { myModels } from '@/lib/data';

export default function MyModelsList() {
  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white">My Models</h2>
        <Link href="/models">
          <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-400">
            Upload New
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {myModels.map((model) => (
          <div
            key={model.id}
            className="p-4 bg-slate-950 border border-slate-800 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white mb-1">{model.name}</h3>
                <Badge
                  variant="outline"
                  className={
                    model.status === 'Active'
                      ? 'border-emerald-500/50 text-emerald-500'
                      : 'border-amber-500/50 text-amber-500'
                  }
                >
                  {model.status}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Vulnerabilities</span>
                <p className="text-white mt-1">{model.vulnerabilities}</p>
              </div>
              <div>
                <span className="text-slate-400">Tests Run</span>
                <p className="text-white mt-1">{model.tests}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="p-6 border-2 border-dashed border-slate-800 rounded-lg text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-400">Upload a new model</p>
        </div>
      </div>
    </Card>
  );
}

