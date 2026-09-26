import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-6 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Starter app</h1>
        <p className="text-muted-foreground">
          Next.js, Drizzle, Neon, Better Auth, shadcn/ui, React Query, and nuqs.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/sign-up" className={cn(buttonVariants())}>
          Sign up
        </Link>
        <Link href="/sign-in" className={cn(buttonVariants({ variant: "outline" }))}>
          Sign in
        </Link>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
