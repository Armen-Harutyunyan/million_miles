# Million Miles

Test task implementation for ENCAR parsing, data storage, and vehicle landing page delivery.

## Overview

The project imports cars from ENCAR, saves them to MongoDB through Payload CMS, and renders them on a responsive landing page inspired by `millionmiles.ae`.

## Implemented

- ENCAR vehicle import
- field mapping for `brand`, `model`, `year`, `mileage`, `price`, and `photo`
- storage in MongoDB
- Payload CMS admin panel
- responsive landing page with vehicle cards
- daily sync endpoint for scheduled updates

## Stack

- Next.js 16
- Payload CMS 3
- MongoDB
- Tailwind CSS 4
- TypeScript
- Biome
- Jest

## Local запуск

### 1. Install

```bash
npm install
```

### 2. Configure env

Create `.env.local` from `.env.example`.

Required variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYLOAD_SECRET=replace-with-a-long-random-string
CRON_SECRET=replace-with-a-separate-long-random-string
MONGODB_URI=mongodb://127.0.0.1:27017/million_miles
ENCAR_SYNC_PAGES=3
ENCAR_PAGE_SIZE=24
ENCAR_QUERY=(And.Hidden.N._.CarType.N.)
```

### 3. Start MongoDB

```bash
mongod --config /opt/homebrew/etc/mongod.conf
```

### 4. Import ENCAR data

```bash
npm run encar:sync
```

### 5. Start application

```bash
npm run dev
```

Available routes:

- `/` landing page
- `/admin` Payload admin panel

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run encar:sync
npm run lint
npm run typecheck
npm run test
```

## Daily Sync

The project exposes a protected cron route:

```txt
/api/cron/encar-sync
```

Vercel schedule:

```json
{
  "crons": [
    {
      "path": "/api/cron/encar-sync",
      "schedule": "0 3 * * *"
    }
  ]
}
```

Current sync behavior:

- creates new cars
- updates existing cars by `sourceId`
- runs once per day after deployment

## Deployment

Recommended setup:

- Vercel
- MongoDB Atlas

Required production env variables:

- `NEXT_PUBLIC_SITE_URL`
- `PAYLOAD_SECRET`
- `CRON_SECRET`
- `MONGODB_URI`
- `ENCAR_SYNC_PAGES`
- `ENCAR_PAGE_SIZE`
- `ENCAR_QUERY`

## Project Flow

`ENCAR -> sync script / cron -> MongoDB -> Payload CMS -> landing page`
