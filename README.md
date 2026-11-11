# Strike Yard Booking

Premium futsal booking platform built with Next.js, NextAuth, Prisma, and PostgreSQL.

The app supports:
- public futsal booking for 1 or 2 continuous hours
- account signup and login
- standard 10-player slot reservations
- user account management
- admin booking, slot, open-game, and sales management
- manual open-game expiry from the admin dashboard

## Project Overview

This project is organized around a few core flows:

- `Book a slot`
  Users pick a date, choose an available time, add booking details, and confirm the reservation.

- `Manage bookings`
  Users can view active bookings in their account and cancel eligible bookings before the lock window.

- `Run venue operations from admin`
  Admin can review bookings, mark payments as paid, block or unblock slots, manage open games, and review sales.

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
  Public base URL of the deployed app. Example: `https://your-app.vercel.app`

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
- `/admin/open-games`
- `/admin/slots`
- `/admin/sales`

Important admin behavior:

- finished bookings can still be marked as paid from admin
- cancelled or expired bookings cannot be marked as paid
- open games can be manually expired from the admin dashboard
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

The open-game implementation and admin tools remain in the codebase, but the
customer feature is currently disabled through `OPEN_GAMES_ENABLED` in
`lib/features.ts`. New open bookings are rejected by the booking API, and
`/games` redirects to `/book`. Set the feature flag to `true` and restore the
public navigation and booking choice before relaunching it.

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
- review open-game fill status
- block and unblock slots
- review daily sales totals

## Deployment Notes

This project no longer uses Vercel cron configuration.

Open-game expiry is handled manually from admin through the dashboard action, so a Vercel Pro cron setup is not required.

Before deploying, make sure:

- production database env vars are set
- `AUTH_SECRET` is set
- `AUTH_URL` points to the deployed domain
- admin credentials are configured
- `npm run build` passes locally

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

