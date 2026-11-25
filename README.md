# Strike Yard Booking

Booking platform for Strike Yard's futsal and pickleball courts, built with Next.js, NextAuth, Prisma, and PostgreSQL.

Production: [https://strikeyard.vercel.app](https://strikeyard.vercel.app)

The app supports:
- public futsal booking for 1 or 2 continuous hours
- public booking for two independent pickleball courts
- account signup and login
- NPR 1,200 futsal and NPR 800 pickleball hourly pricing
- user account management
- admin customer booking, slot, and sales management

## Project Overview

This project is organized around a few core flows:

- `Book a slot`
  Users choose futsal or pickleball, pick a date and available time, add booking details, and confirm the reservation.

- `Manage bookings`
  Users can view active bookings in their account and cancel eligible bookings before the lock window.

- `Run venue operations from admin`
  Admin can create bookings for customers, manage futsal and both pickleball courts, mark payments as paid, block or unblock slots, and review sales.

## Tech Stack

- `Next.js 16`
- `React 19`
- `NextAuth v5 beta`
- `Prisma`
- `PostgreSQL`
- `Tailwind CSS 4`
- `Framer Motion`

## Environment Variables

Create a `.env.local` file in the project root.

Required app variables:

- `DATABASE_URL`
  PostgreSQL connection string used by Prisma.

- `DIRECT_URL`
  Direct PostgreSQL connection string used by Prisma for migrations.

- `ADMIN_EMAIL`
  Email used for admin login.

- `ADMIN_PASSWORD`
  Password used for admin login.

- `NEXT_PUBLIC_ADMIN_EMAIL`
  Public admin email hint used by the login page to redirect admin login toward `/admin`.

Required for production auth:

- `AUTH_SECRET`
  Required by NextAuth/Auth.js in production.

Recommended for deployed auth:

- `AUTH_URL`
  Public base URL of the deployed app. Production value: `https://strikeyard.vercel.app`

Required for new signups and booking confirmation email:

- `RESEND_API_KEY`
  Server-side API key from Resend. Never use a `NEXT_PUBLIC_` prefix.
- `EMAIL_FROM`
  Sender on a domain verified in Resend, for example `Strike Yard <bookings@your-domain.com>`.

The `vercel.app` subdomain and a Gmail address are not sender domains you control. Verify your own domain with Resend, set `EMAIL_FROM` to an address on it, then set `EMAIL_VERIFICATION_ENABLED=true`. Until then, leave the flag false: signup works without verification and booking confirmation email is skipped for known public-mail senders. If verification is enabled without email configuration, new signup fails closed with a 503. Booking succeeds even if a configured confirmation email fails, with the failure logged separately.

An example file is included at [.env.example](/Users/risabtajale/futsal-booking/.env.example).

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and fill in your values.

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

Useful commands:

```bash
npm run lint
npm run build
```

## Admin Notes

Admin login is handled through the credentials values in:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

After login, admin can access:

- `/admin`
- `/admin/bookings`
- `/admin/slots`
- `/admin/sales`

Important admin behavior:

- finished bookings can still be marked as paid from admin
- cancelled or expired bookings cannot be marked as paid
- slot blocking is manual and prevents conflicting bookings

## Known Flows

### User Booking Flow

1. Choose a date on `/book`
2. Select one or two continuous slots
3. Continue to booking details
4. Confirm name and phone number
5. Confirm booking
6. Land on the booking success page

### Paused Open Game Flow

The open-game implementation remains in the codebase, but its public and admin
entry points are currently disabled through `OPEN_GAMES_ENABLED` in
`lib/features.ts`. New open bookings are rejected by the booking API,
`/games` redirects to `/book`, and `/admin/open-games` redirects to `/admin`.
Set the feature flag to `true` and restore the public and admin navigation
before relaunching it.

### User Account Flow

Users can:

- edit profile name and phone
- view active bookings
- cancel eligible future bookings

### Admin Operations Flow

Admin can:

- search and filter bookings
- mark bookings as paid
- cancel bookings
- block and unblock slots
- review daily sales totals

## Deployment Notes

This project no longer uses Vercel cron configuration.

The paused open-game feature does not use a cron job, so a Vercel Pro cron setup is not required.

Before deploying, make sure:

- production database env vars are set
- `AUTH_SECRET` is set
- `AUTH_URL` is exactly `https://strikeyard.vercel.app`
- admin credentials are configured
- `npm run build` passes locally
- the `20261125090000_email_verification_and_limits` migration is deployed (existing password accounts are backfilled as verified)
- the sender domain is verified and `RESEND_API_KEY` and `EMAIL_FROM` are configured in Vercel
- `EMAIL_VERIFICATION_ENABLED=true` is set only after a live verification email has been delivered successfully

Run `npm test` for booking-rule unit tests. Sampled mobile and desktop LCP, INP, and CLS measurements appear as `WEB_VITAL` entries in server logs; no URL query strings or customer identifiers are included. Email delivery and full booking-flow integration must be validated against a reachable database and configured Resend account before production rollout.

## Current Status

The app is past mockup stage and works as a real MVP:

- booking flow is functional
- admin flow is functional
- public and admin UI have been heavily polished
- loading, empty, error, and success states have been improved
- build and lint are currently passing

The next best work is usually:

- full end-to-end QA on a deployed URL
- reporting and sales accuracy review
- route-level `error.tsx` / `not-found.tsx` polish

