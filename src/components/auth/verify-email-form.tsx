"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth/auth-client";
import {
  verifyOtpSchema,
  type VerifyOtpValues,
} from "@/lib/validations/auth";

export function VerifyEmailForm() {
  const router = useRouter();
  const [emailFromQuery, setEmailFromQuery] = useQueryState(
    "email",
    parseAsString.withDefault(""),
  );

  const form = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: emailFromQuery,
      otp: "",
    },
  });

  useEffect(() => {
    if (emailFromQuery) {
      form.setValue("email", emailFromQuery);
    }
  }, [emailFromQuery, form]);

  const resendMutation = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      if (error) {
        throw new Error(error.message ?? "Could not resend code");
      }
    },
    onSuccess: () => {
      toast.success("Verification code sent");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await setEmailFromQuery(values.email);

    const { error } = await authClient.emailOtp.verifyEmail({
      email: values.email,
      otp: values.otp,
    });

    if (error) {
      toast.error(error.message ?? "Invalid or expired code");
      return;
    }

    toast.success("Email verified");
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
          <FieldLabel>Verification code</FieldLabel>
          <Controller
            control={form.control}
            name="otp"
            render={({ field }) => (
              <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          <FieldError errors={[form.formState.errors.otp]} />
        </Field>
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Verifying…" : "Verify email"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={resendMutation.isPending || !form.watch("email")}
          onClick={() => {
            const email = form.getValues("email");
            if (!email) {
              toast.error("Enter your email first");
              return;
            }
            resendMutation.mutate(email);
          }}
        >
          {resendMutation.isPending ? "Sending…" : "Resend code"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
