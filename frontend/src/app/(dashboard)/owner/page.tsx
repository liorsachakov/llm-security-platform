'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiMe } from '@/lib/auth-client';
import type { PublicUser } from '@/lib/mock-db';
import type { MockModel } from '@/lib/mock-models';

export default function OwnerConsolePage() {
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [models, setModels] = useState<MockModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await apiMe();
      if (cancelled) return;
      setUser(me);
      if (!me) {
        setLoading(false);
        return;
      }
      const res = await fetch('/api/models/mine');
      const data = (await res.json()) as { models: MockModel[] };
      if (!cancelled) setModels(data.models ?? []);
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="text-slate-300">Loading Owner Console…</div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-6 bg-slate-900/50 border-slate-800 space-y-3">
        <div className="text-white text-xl">Owner Console</div>
        <div className="text-slate-400">You need to sign in to view this page.</div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 text-white" onClick={() => router.push('/login')}>
          Go to Login
        </Button>
      </Card>
    );
  }

  if (user.role !== 'Owner') {
    return (
      <Card className="p-6 bg-slate-900/50 border-slate-800 space-y-3">
        <div className="text-white text-xl">Owner Console</div>
        <div className="text-slate-400">
          Access denied. Your role is <span className="text-white">{user.role}</span>.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-2">Owner Console</h1>
        <p className="text-slate-400">Owner-only controls and visibility checks.</p>
      </div>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white text-lg">Signed in as</div>
            <div className="text-slate-300">{user.username} ({user.email})</div>
          </div>
          <Badge variant="outline" className="border-amber-500/50 text-amber-500">
            Owner
          </Badge>
        </div>
      </Card>

      <Card className="p-6 bg-slate-900/50 border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white text-lg">Models you own</div>
          <Badge variant="outline" className="border-slate-700 text-slate-300">
            {models.length}
          </Badge>
        </div>

        {models.length === 0 ? (
          <div className="text-slate-400">No owned models found.</div>
        ) : (
          <div className="space-y-3">
            {models.map((m) => (
              <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white">{m.name}</div>
                    <div className="text-slate-400 text-sm">{m.description}</div>
                    <div className="text-slate-500 text-xs mt-1">Uploaded {m.uploaded}</div>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={m.status === 'Active' ? 'border-emerald-500/50 text-emerald-500' : 'border-amber-500/50 text-amber-500'}
                    >
                      {m.status}
                    </Badge>
                    <Badge variant="outline" className="border-slate-700 text-slate-400">
                      {m.visibility}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}


