# Santa's Magical Wish List

A festive Next.js app where you write holiday wishes, watch them appear on parchment, and get Santa’s Naughty or Nice verdict. Seal the list with a wax stamp when you’re done.

## Features

- Add wishes one at a time (Enter to submit, Shift+Enter for a new line)
- Animated “write-in” rows on a parchment Nice List
- Simple Naughty / Nice rating (wishes that mention “candy” are Naughty; everything else is Nice)
- Wax seal that stamps when you seal the list
- Falling sparkle snow and optional bell sound
- Reduced-motion support (snow and write-in animations turn off)

Wishes live only in the browser. Refreshing the page restores the three starter wishes.

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4 and shadcn/ui
- Lucide icons
- Vercel Analytics in production

## Getting started

Requirements: Node.js 18+ (or a current LTS).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The repo also lists `pnpm` as the package manager, so `pnpm install` and `pnpm dev` work as well.

### Other scripts

```bash
npm run build   # production build
npm start       # serve the production build
```

No environment variables are required for local development.

## Project layout

```
app/
  layout.tsx          # metadata, fonts, analytics
  page.tsx            # home page
  globals.css         # theme tokens and Santa/parchment styles
components/
  santa-wish-list.tsx # main UI and client state
  ui/button.tsx       # shadcn button
```

## How it works

The home page renders `SantaWishList`, a client component. Adding a wish waits briefly (as if Santa is writing), then appends the item and plays a short Web Audio bell if sound is on. Sealing the list toggles the stamp class on the wax seal.

Starter wishes:

1. A telescope to explore the stars — Nice
2. A surprise trip somewhere snowy — Nice
3. Unlimited hot cocoa (with marshmallows!) — Naughty
