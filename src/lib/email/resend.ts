import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

type OtpEmailType =
  | "sign-in"
  | "email-verification"
  | "forget-password"
  | "change-email";

function subjectForType(type: OtpEmailType): string {
  switch (type) {
    case "email-verification":
      return "Verify your email";
    case "forget-password":
      return "Reset your password";
    case "sign-in":
      return "Your sign-in code";
    case "change-email":
      return "Confirm your email change";
  }
}

export function sendOtpEmail({
  email,
  otp,
  type,
}: {
  email: string;
  otp: string;
  type: OtpEmailType;
}) {
  const from = process.env.RESEND_FROM;
  if (!from) {
    console.error("RESEND_FROM is not set");
    return;
  }

  const resend = getResendClient();
  if (!resend) {
    console.error("RESEND_API_KEY is not set");
    return;
  }

  void resend.emails.send({
    from,
    to: email,
    subject: subjectForType(type),
    html: `<p>Your verification code is:</p><p style="font-size:24px;font-weight:bold;letter-spacing:4px">${otp}</p><p>This code expires in 5 minutes.</p>`,
  });
}
