# Quanterminal

Quanterminal is a cryptocurrency market dashboard built with React, TypeScript, and Vite. It reads public market data from the CoinGecko API and presents market overview, top coins, gainers, and losers.

> **Project status:** early frontend prototype. It is not a trading terminal, broker integration, portfolio tracker, or execution system. Prices are public market snapshots fetched from CoinGecko; this app does not use a streaming market-data feed.

## Features

- Global market overview and BTC dominance
- Top 50 cryptocurrencies by market capitalization
- Top 20 gainers and losers by 24-hour price change
- Manual refresh and optional 30-second polling
- Responsive dashboard UI

## Tech stack

- React 18, TypeScript, Vite
- Tailwind CSS
- CoinGecko public API
- React Router and Lucide icons

Supabase is listed as a dependency for possible future use; no Supabase backend is currently configured or required.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
git clone https://github.com/Sirkho/Quanterminal.git
cd Quanterminal
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Known limitations

- CoinGecko rate limits and API availability affect data freshness.
- The app currently fetches global data and three market lists separately.
- The `/admin` route is a static UI mockup with placeholder metrics and activity. It has no authentication, authorization, database, or operational admin functionality. Do not use it to manage real users or systems.
- No trade execution, exchange API keys, wallet connection, or financial advice is provided.

## License

No license has been declared yet. All rights remain with the repository owner unless a license is added.
