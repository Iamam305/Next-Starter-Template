import { Suspense } from "react";

import { AuthCard } from "@/components/auth/auth-card";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Verify your email"
      description="Enter the 6-digit code we sent to your inbox"
    >
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
        <VerifyEmailForm />
      </Suspense>
    </AuthCard>
  );
}
