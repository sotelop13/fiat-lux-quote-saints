# Fiat Lux — Quote the Saints

A bilingual (English/Spanish) Catholic devotional Progressive Web App.

**Live app:** [fiat-lux-quote-saints.vercel.app](https://fiat-lux-quote-saints.vercel.app)

## Features

- **Today** — daily saint with quote, prayer, and reflection; liturgical day info (season, feast, rank, color); Gospel verse banner for upcoming Sunday Mass
- **Calendar** — monthly feast calendar with movable feasts (Easter cycle) computed automatically; clickable saint cards and Mass readings
- **Browse / Search** — full-text search across saints with sort by name, upcoming date, patron, or virtue
- **Favorites** — save and revisit saints
- **Settings** — dark/light theme, language (EN/ES), rite (Novus Ordo / Vetus Ordo), font size, patron saint selection, and daily notifications

Supports both the **Novus Ordo** (1969) and **Vetus Ordo** (1962) liturgical calendars with a single toggle.

## Tech Stack

- React 18 + Vite
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- TanStack Query
- Framer Motion
- PWA via vite-plugin-pwa

No backend — fully client-side. All data is static; all persistence is `localStorage`.

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # production build → dist/
npm run lint      # ESLint
npm run typecheck # TypeScript check
```

See [`CLAUDE.md`](./CLAUDE.md) for full architecture, data-layer details, and contribution notes.
