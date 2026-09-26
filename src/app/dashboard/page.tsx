import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth/auth";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Signed in as {session.user.email}
          </p>
        </div>
        <SignOutButton />
      </div>
      <Link href="/" className={cn(buttonVariants({ variant: "secondary" }))}>
        Back home
      </Link>
    </main>
  );
}
