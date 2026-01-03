import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export interface Challenge {
  challenge_id: string;
  title: string;
  description: string;
}

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/challenges', {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch challenges');
      }

      const data = await res.json();
      setChallenges(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load challenges');
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  return { challenges, loading, refresh: fetchChallenges };
}

