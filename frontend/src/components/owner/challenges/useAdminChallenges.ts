import { useCallback, useState } from "react";
import { toast } from "sonner";
import { apiJsonFetch } from "@/lib/client-api";
import type { AdminChallenge } from "./types";

export function useAdminChallenges() {
  const [items, setItems] = useState<AdminChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiJsonFetch<{ items?: AdminChallenge[] }>("/api/admin/challenges", {
        method: "GET",
        cache: "no-store",
      });
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load challenges");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createChallenge = useCallback(
    async (payload: { title: string; description: string; system_prompt: string }) => {
      setCreating(true);
      try {
        await apiJsonFetch("/api/admin/challenges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.success("Challenge created");
        await refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to create challenge");
        throw err;
      } finally {
        setCreating(false);
      }
    },
    [refresh],
  );

  const updateChallenge = useCallback(
    async (challengeId: string, changes: Partial<Pick<AdminChallenge, "title" | "description" | "system_prompt">>) => {
      setUpdating(true);
      try {
        await apiJsonFetch(`/api/admin/challenges/${encodeURIComponent(challengeId)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changes),
        });
        toast.success("Challenge updated");
        await refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to update challenge");
        throw err;
      } finally {
        setUpdating(false);
      }
    },
    [refresh],
  );

  const deleteChallenge = useCallback(
    async (challengeId: string) => {
      setDeletingId(challengeId);
      try {
        await apiJsonFetch(`/api/admin/challenges/${encodeURIComponent(challengeId)}`, {
          method: "DELETE",
        });
        toast.success("Challenge deleted");
        await refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete challenge");
        throw err;
      } finally {
        setDeletingId((cur) => (cur === challengeId ? null : cur));
      }
    },
    [refresh],
  );

  return {
    items,
    loading,
    creating,
    updating,
    deletingId,
    setItems,
    setLoading,
    refresh,
    createChallenge,
    updateChallenge,
    deleteChallenge,
  };
}

