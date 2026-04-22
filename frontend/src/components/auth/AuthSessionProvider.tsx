"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Your session has expired. Please sign in again to continue.");
  const [returnToPath, setReturnToPath] = useState("/dashboard");

  useEffect(() => {
    function handleAuthExpired(event: Event) {
      const detail = event instanceof CustomEvent ? (event.detail as { error?: string } | undefined) : undefined;
      const nextPath =
        typeof window === "undefined"
          ? "/dashboard"
          : `${window.location.pathname}${window.location.search}`;
      setMessage(detail?.error ?? "Your session has expired. Please sign in again to continue.");
      setReturnToPath(nextPath || "/dashboard");
      setOpen(true);
    }

    window.addEventListener("auth-expired", handleAuthExpired);
    return () => window.removeEventListener("auth-expired", handleAuthExpired);
  }, []);

  const handleSignIn = () => {
    setOpen(false);
    router.push(`/login?next=${encodeURIComponent(returnToPath)}`);
  };

  return (
    <>
      {children}
      <AlertDialog open={open}>
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
          <AlertDialogHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <ShieldAlert className="h-7 w-7 text-cyan-400" />
            </div>
            <AlertDialogTitle className="text-center text-xl">Sign in again to continue</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-slate-400">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleSignIn}
            >
              Go to Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
