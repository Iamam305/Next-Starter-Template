"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        const { error } = await authClient.signOut();
        if (error) {
          toast.error(error.message ?? "Could not sign out");
          return;
        }
        router.push("/sign-in");
        router.refresh();
      }}
    >
      Sign out
    </Button>
  );
}
