import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Sign up with your email and password"
    >
      <SignUpForm />
    </AuthCard>
  );
}
