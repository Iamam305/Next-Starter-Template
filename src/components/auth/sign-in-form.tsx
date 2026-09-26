"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { signInSchema, type SignInValues } from "@/lib/validations/auth";

export function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (error.status === 403) {
        toast.error("Verify your email before signing in");
        router.push(
          `/verify-email?email=${encodeURIComponent(values.email)}`,
        );
        return;
      }
      toast.error(error.message ?? "Could not sign in");
      return;
    }

    toast.success("Signed in");
    router.push("/dashboard");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
          <FieldError errors={[form.formState.errors.email]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...form.register("password")}
          />
          <FieldError errors={[form.formState.errors.password]} />
        </Field>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          No account yet?{" "}
          <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
