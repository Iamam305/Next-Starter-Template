import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

/** Minimal config for `auth generate` CLI (no database connection). */
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP() {},
    }),
  ],
});
