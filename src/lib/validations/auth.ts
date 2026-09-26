import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d+$/, "Code must be numeric"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;
