import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { emailOTP } from "better-auth/plugins";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendOtpEmail } from "@/lib/email/resend";

export const auth = betterAuth({
  appName: "starter-code",
  baseURL: process.env.BETTER_AUTH_URL,
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "build-time-placeholder-secret-min-32-chars",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        sendOtpEmail({ email, otp, type });
      },
    }),
  ],
});
