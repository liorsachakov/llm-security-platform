import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { apiJsonFetch } from '@/lib/client-api';

export interface Challenge {
  challenge_id: string;
  title: string;
  description: string;
}

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchChallenges = useCallback(async () => {
    setLoading(true);
    try {
      const [challengesData, completedData] = await Promise.all([
        apiJsonFetch<{ items?: Challenge[] }>('/api/challenges', { method: 'GET', cache: 'no-store' }),
        apiJsonFetch<{ 'completed challenges'?: string[] }>('/api/challenges/completedchallenges', {
          method: 'GET',
          cache: 'no-store',
        }),
      ]);

      setChallenges(Array.isArray(challengesData.items) ? challengesData.items : []);
      const completedList = completedData['completed challenges'] || [];
      setCompletedIds(new Set(completedList));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load challenges');
      setChallenges([]);
      setCompletedIds(new Set());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return { challenges, completedIds, loading, refresh: fetchChallenges };
}
