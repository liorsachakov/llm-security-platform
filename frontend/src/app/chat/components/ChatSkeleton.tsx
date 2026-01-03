'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function ChatSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />

      <div className="relative">
        <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-32" />
                <Separator orientation="vertical" className="h-6 bg-slate-800" />
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-[1800px] mx-auto">
          <div className="lg:col-span-3">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm h-[calc(100vh-220px)] flex flex-col">
              <div className="flex-1 p-6 space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-12 w-3/4 ml-auto" />
                <Skeleton className="h-20 w-4/5" />
              </div>
              <div className="border-t border-slate-800 p-4">
                <Skeleton className="h-[60px] w-full" />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
              <Skeleton className="h-5 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </Card>
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6">
              <Skeleton className="h-5 w-28 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

