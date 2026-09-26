# Starter app

Next.js 16 starter with Drizzle ORM, Neon Postgres, Better Auth (email/password + email OTP), Resend, shadcn/ui, React Hook Form, Zod, TanStack Query, and nuqs.

## Prerequisites

- Node.js 20+
- [Neon](https://neon.tech) Postgres database
- [Resend](https://resend.com) API key and verified sender domain

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local`:

- `DATABASE_URL` – Neon connection string (pooled URL recommended)
- `BETTER_AUTH_SECRET` – run `openssl rand -base64 32`
- `BETTER_AUTH_URL` – `http://localhost:3000` for local dev
- `RESEND_API_KEY` – from the Resend dashboard
- `RESEND_FROM` – verified sender, e.g. `App <onboarding@yourdomain.com>`

4. Apply database migrations:

```bash
npm run db:migrate
```

5. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Auth flows

- **Sign up** – `/sign-up` creates an account and sends a verification OTP via Resend.
- **Verify email** – `/verify-email?email=...` accepts the 6-digit code (resend supported).
- **Sign in** – `/sign-in` after the email is verified.
- **Dashboard** – `/dashboard` (protected via `proxy.ts` cookie check and server session validation).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run db:generate` | Generate SQL migrations from Drizzle schema |
| `npm run db:migrate` | Apply migrations to Neon |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run auth:generate` | Regenerate Better Auth Drizzle schema after plugin changes |

## Project structure

- `src/db` – Drizzle client and schema (`src/db/schema/auth.ts` from Better Auth CLI)
- `src/lib/auth` – Better Auth server (`auth.ts`) and client (`auth-client.ts`)
- `src/app/api/auth/[...all]` – Better Auth API handler
- `src/components/auth` – Auth UI forms
- `proxy.ts` – Next.js 16 route guard for `/dashboard`

## Regenerating auth schema

After changing Better Auth plugins in `src/lib/auth/auth-generate.ts`:

```bash
npm run auth:generate
npm run db:generate
npm run db:migrate
```
