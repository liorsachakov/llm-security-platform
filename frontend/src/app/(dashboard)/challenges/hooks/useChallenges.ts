import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

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
      // Fetch challenges and completed challenges in parallel
      const [challengesRes, completedRes] = await Promise.all([
        fetch('/api/challenges', { method: 'GET', cache: 'no-store' }),
        fetch('/api/challenges/completedchallenges', { method: 'GET', cache: 'no-store' }),
      ]);

      if (!challengesRes.ok) {
        throw new Error('Failed to fetch challenges');
      }

      const challengesData = await challengesRes.json();
      setChallenges(Array.isArray(challengesData.items) ? challengesData.items : []);

      // Handle completed challenges (don't fail if this errors)
      if (completedRes.ok) {
        const completedData = await completedRes.json();
        const completedList = completedData['completed challenges'] || [];
        setCompletedIds(new Set(completedList));
      }
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

  return { challenges, completedIds, loading, refresh: fetchChallenges };
}
