# Fiat Lux — Quote the Saints

A bilingual (English/Spanish) Catholic devotional PWA built with React, Vite, and Tailwind CSS.

## Features

- **Today** — daily saint, liturgical day info, and Gospel verse for both Novus Ordo and Vetus Ordo calendars
- **Calendar** — monthly feast calendar with movable feasts (Easter cycle) computed automatically
- **Browse/Search** — full-text search across saints with sort by name, upcoming date, patron, or virtue
- **Favorites** — save and revisit saints
- **Settings** — theme, language (EN/ES), rite (NO/VO), font size, patron saint, and daily notifications

## Tech Stack

- React + Vite
- Tailwind CSS + shadcn/ui
- TanStack Query
- Framer Motion
- PWA via vite-plugin-pwa

No backend — all data is static and all persistence is `localStorage`.

## Development

```bash
npm install
npm run dev
```

See `CLAUDE.md` for full architecture and contribution notes.
