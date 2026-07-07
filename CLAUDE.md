# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start Vite dev server
npm run build        # production build → dist/
npm run lint         # ESLint (quiet)
npm run lint:fix     # ESLint with auto-fix
npm run typecheck    # tsc check (no emit) — runs against jsconfig.json, not tsconfig
npm run preview      # preview the production build
npm run build && vercel --prod  # deploy to Vercel production
```

There are no tests.

ESLint ignores `**/*.ts`/`**/*.tsx` — `src/utils/index.ts` is only checked by `npm run typecheck`, so run both before considering a change clean.

## Architecture

**Fiat Lux – Quote the Saints** is a fully client-side React + Vite + Tailwind PWA with no backend. All persistence is `localStorage`. The project is JavaScript (`.js`/`.jsx`) with a single TypeScript file (`src/utils/index.ts`); `jsconfig.json` drives type-checking.

### Data layer (`src/api/`)

- `saintsData.js` — static array of fixed-date saints; each entry has `id`, `feast_date` (MM-DD), `name`, `quote`, `prayer`, `reflection`, `biography`, `patron_of`, `virtue`. Spanish variants use `_es` suffix fields (e.g. `quote_es`, `biography_es`).
- `liturgicalData.js` — static array of fixed-date liturgical days keyed by `date` (MM-DD); each entry carries parallel Novus Ordo (NO) and Vetus Ordo (VO) fields: `*_season`, `*_feast`, `*_rank`, `*_color`.
- `movableFeasts.js` — computes Easter via the Anonymous Gregorian algorithm (valid 1583–4099) and derives all moveable feasts for the current year (Ash Wednesday through Christ the King). Returns parallel arrays via `getMovableSaints(year)` and `getMovableLiturgicalDays(year)`; both return `[]` on error so the app always loads. Also exports `computeSeason(mmdd, year, rite)` — a pure function that maps any `MM-DD` to its liturgical season string; `Today.jsx` imports it directly rather than going through the entity layer.
- `readingsData.js` — Sunday/feast Mass readings keyed by full ISO date (`YYYY-MM-DD`, not MM-DD — the NO lectionary cycle and movable calendar change readings year to year). Each entry has parallel `no` and `vo` blocks with a `readings` array (`label`/`label_es`, `citation`, `text`, `text_es`; section labels live in the data because the rites have different sections; `text_es: ''` falls back to English in the UI). Helpers: `getReadingsForDate(isoDate)`, `getUpcomingReadings(now?)` (today's entry or the nearest within 7 days). Sources: NO from bible.usccb.org (per-date URLs like `MMDDYY.cfm`, `/es/bible/lecturas/` for Spanish), VO from divinumofficium.com (1962 Missal; English/Latin only — Spanish VO propers come from rinconliturgico.blogspot.com, a Latin-Spanish 1962 missal blog with per-Sunday posts). Rendered by `ReadingsModal.jsx` via a banner on the Today tab.
- `entities.js` — loads `saintsData.js` / `liturgicalData.js` via dynamic `import()` (module-level singleton promises, so each data file becomes a separate cacheable chunk), computes moveable feasts for the current year at module load, and exposes thin CRUD wrappers that merge moveable + static arrays per call:
  - `Saint` and `LiturgicalDay` are read-only (`createStaticEntity`)
  - `UserFavorite` is read-write to `localStorage` (`createLocalEntity`)
  - `getSaintsForYear(year, rite?)` and `getLiturgicalForYear(year)` — exported for year-scoped queries; `Calendar.jsx` uses these (not `Saint.list()`) so moveable feasts are recomputed for the correct year. Passing `rite` filters out saints whose optional `rite` field doesn't match (entries without a `rite` field appear in both calendars). `getLiturgicalForYear` also re-derives `*_season` fields for fixed-date entries via `computeSeason`.

All entity methods are `async` and pages consume them through TanStack Query. The `QueryClient` instance (`src/lib/query-client.js`) uses `staleTime: 5 min` and `retry: 1`.

### Auth (`src/lib/AuthContext.jsx`)

Local-only auth stored under `fiat_lux_session` and `fiat_lux_users` in `localStorage`. Google login is a mock. The `AuthProvider` wraps the entire app; unauthenticated users are redirected to `/login`.

### Provider stack ordering (`src/App.jsx`)

`ThemeProvider → LanguageProvider → AuthProvider → QueryClientProvider`. The ordering matters: `AuthContext` reads localStorage but does not depend on Query; `LanguageContext` sits outside `AuthProvider` so unauthenticated pages still get translations.

### App startup sequence

`App.jsx` renders a `SplashScreen` for 1.2 s (framer-motion `AnimatePresence`), then an `Onboarding` flow on first launch (until `fiat_lux_onboarded` is set), then the main app. `initFontSize()` is called synchronously at the top of `App.jsx` to restore the saved font size before the first render. `OfflineBanner` (fixed top, z-[100], slides in from top) is rendered inside `QueryClientProvider` and is always mounted — it hides itself when online. The whole tree is wrapped in `ErrorBoundary` (`src/components/ErrorBoundary.jsx`).

### Directory layout

- `src/pages/` — full-page views (`Home.jsx` (tab shell), `Today.jsx`, `Calendar.jsx`, `SearchPage.jsx`, `Favorites.jsx`, `SettingsPage.jsx`, auth pages)
- `src/components/` — shared/reusable UI (`SaintDetailModal.jsx`, `PrayerModal.jsx`, `ReadingsModal.jsx`, `BottomNav.jsx`, `Onboarding.jsx`, `ProtectedRoute.jsx`, `AuthLayout.jsx`, `ScrollToTop.jsx`, etc.) and `ui/` (shadcn primitives)
- `src/api/` — data layer (see above)
- `src/lib/` — `AuthContext.jsx`, `LanguageContext.jsx`, `translations.js`, `query-client.js`, `utils.js` (shadcn `cn()`), `app-params.js` (exports `config.appName`), `PageNotFound.jsx` (404 route)
- `src/hooks/` — all `use-*.jsx` hooks (except `ui/use-toast.jsx` inside shadcn)
- `src/utils/index.ts` — pure utility functions

### Routing & navigation (`src/App.jsx`)

Public routes (`/login`, `/register`, `/forgot-password`, `/reset-password`) are rendered outside `AuthenticatedApp`. The authenticated shell has a single `/` route that renders `Home`, which manages five tabs — Today, Calendar, Saints (Browse/Search), Favorites, Settings — via a `BottomNav`. Tab switches use framer-motion `AnimatePresence mode="wait"` with a subtle y-slide. The Saints tab renders `SearchPage`, which supports full-text search and sort by upcoming date, name, patron, or virtue.

### i18n (`src/lib/LanguageContext.jsx`, `src/lib/translations.js`)

`useLanguage()` returns `[lang, changeLang]` where `lang` is `'en'` or `'es'`, persisted under `fiat_lux_language`. All UI strings live in the `T` object keyed by language (`T[lang].some_key`). A `tx()` helper handles interpolation. `VIRTUES_ES` (also exported from `translations.js`) maps virtue keys to Spanish display strings and is used by `SearchPage` and `Today`. Some saint/feast data objects carry `_es`-suffixed content fields for Spanish content.

### Rite preference (`src/hooks/use-rite.jsx`)

`useRite()` returns `[rite, setRite]` where `rite` is `'NO'` (Novus Ordo) or `'VO'` (Vetus Ordo), persisted under `fiat_lux_rite`. Both `Today` and `Calendar` use this hook to switch between the two forms.

### Other hooks

- `use-font-size.jsx` — `useFontSize()` returns `[size, setSize]` where size is `'small' | 'normal' | 'large'`; sets `document.documentElement.style.fontSize` on change; persisted under `fiat_lux_font_size`.
- `use-name-day.jsx` — `useNameDay()` stores the user's patron saint name under `fiat_lux_name_day`; the Settings page uses it to show a countdown to the next feast for that name.
- `use-patron-saint.jsx` — `usePatronSaint()` returns `[id, set, feastDate]`; `set(newId, newFeastMMDD)` stores both the patron saint ID and their feast date so downstream components (BottomNav) can compute days-until-feast without loading saints data. Persisted under `fiat_lux_patron_saint_id` and `fiat_lux_patron_feast_date`.
- `use-mobile.jsx` — `useIsMobile()` breakpoint hook (< 768 px); used by shadcn sidebar components, not by the main app tabs.
- `use-notifications.jsx` — `useNotifications()` returns `{ permission, enabled, requestAndEnable, disable, markNotified, isAlreadyNotifiedToday }`. Manages Web Notifications API permission state and the enabled toggle. Also exports `notifSupported()`. `Today.jsx` calls `markNotified()` + `new Notification(…)` on first open each day; `SettingsPage.jsx` exposes the toggle UI.
- `use-online.jsx` — `useIsOnline()` tracks `navigator.onLine` via `online`/`offline` window events. Used by `OfflineBanner.jsx`.
- `use-today.jsx` — `useToday()` returns today's `MM-DD` string and re-derives it on window focus, visibility change, and a 1-minute heartbeat — handles the PWA resume-from-memory case where React never remounts across midnight.

### localStorage keys (full inventory)

| Key | Purpose |
|---|---|
| `fiat_lux_session` | Current auth session |
| `fiat_lux_users` | Registered user accounts |
| `fiat_lux_favorites` | Saved favorite saints |
| `fiat_lux_rite` | `'NO'` or `'VO'` rite preference |
| `fiat_lux_language` | `'en'` or `'es'` |
| `fiat_lux_font_size` | `'small'`, `'normal'`, or `'large'` |
| `fiat_lux_name_day` | User's patron saint name (text string for name-match banners) |
| `fiat_lux_patron_saint_id` | Selected patron saint ID (e.g. `s-0601`) |
| `fiat_lux_patron_feast_date` | Patron saint feast date `MM-DD` (cached so BottomNav avoids a query) |
| `fiat_lux_onboarded` | Set to `'true'` after first-launch onboarding |
| `fiat_lux_notifications` | `'true'` when user has enabled daily saint notifications |
| `fiat_lux_last_notification` | `Date.toDateString()` of the last shown notification (deduplicates per day) |

### Utilities (`src/utils/index.ts`)

- `todayMMDD()` — returns today as `'MM-DD'`
- `formatFeastDate(mmDd, lang?)` — locale-aware full date string (e.g. `"June 13"` / `"13 de junio"`)
- `formatFeastDateParts(mmDd, lang?)` — returns `{ month, day }` strings for split display
- `capitalize(str)` — uppercases first character
- `liturgicalColorClass(color)` / `liturgicalColorDotClass(color)` — map liturgical color names (`white`, `red`, `green`, `purple`, `rose`, `black`) to Tailwind text/bg classes
- `rankPriority(rank, rite)` — numeric sort key; separate maps for `'NO'` (Solemnity=1) and `'VO'` (Duplex I Classis=1) rites

`src/lib/utils.js` is the shadcn `cn()` helper (separate from the above).

> Note: `daysUntilFeast(feastMMDD)` lives in `src/utils/index.ts` and is imported by `Today.jsx`, `SearchPage.jsx`, `SettingsPage.jsx`, and `Favorites.jsx`.

### Theming

Dark/light/system theme is managed by `next-themes` (`useTheme()`). The `SettingsPage` exposes the toggle; theme classes are applied via Tailwind's `dark:` variants.

### Styling

- `@/` alias → `src/`
- Fonts: **Playfair Display** (`font-playfair`) for headings/quotes, **Inter** (`font-inter`) for UI text
- Custom color: `text-gold` / `bg-gold` / `border-gold` (defined in CSS variables)
- Component library: shadcn/ui (Radix UI primitives + Tailwind)
- `.no-scrollbar` utility class defined in `src/index.css` (hides scrollbars cross-browser on overflow elements)
- Use `date-fns` for all date operations (already a dependency)
- `react-markdown` and `react-hot-toast` are in `package.json` but are not imported anywhere in `src/` — do not reach for them

### PWA

`vite-plugin-pwa` is configured in `vite.config.js` with `registerType: 'autoUpdate'`. The manifest is supplied from `public/manifest.json` (not auto-generated). Workbox pre-caches all JS/CSS/HTML/SVG/PNG/woff2 and uses CacheFirst for Google Fonts.

### `entities/` root directory

The project root contains an `entities/` folder with three JSON schema stub files (`Saint`, `LiturgicalDay`, `UserFavorite`). These are base44 platform scaffolding artifacts — they define the entity schemas used when the project was generated. They are **not imported at runtime**; the actual data and CRUD logic live entirely in `src/api/`.

### Content backlog (`Z-FUTURE_IMPROVMENTS.txt`)

Tracked list of known gaps and planned features: July–December saints, missing liturgical entries, virtue/patron filter chips on Browse, a "no saint today" fallback, and upcoming-feasts section on the Today tab. Check this file before adding new features to avoid duplicating planned work.

### Adding new saints or liturgical days

Add entries directly to `src/api/saintsData.js` and `src/api/liturgicalData.js`. IDs follow the pattern `s-MMDD` and `ld-MMDD`. `feast_date` / `date` fields use `MM-DD` format (e.g. `'03-19'`). Moveable feasts (Easter cycle) belong in `movableFeasts.js` instead. Always add a matching `ld-MMDD` entry in `liturgicalData.js` alongside any new saint entry.

Full saint entry shape (all fields required; leave unknown values as `''`):
```js
{
  id, name, feast_date,        // 'MM-DD'
  birth_year, death_year,      // strings, e.g. '329' or ''
  biography, quote, prayer, reflection,
  patron_of, canonization_year, virtue,
  image_url,                   // '' until images are added
  // Spanish variants for all content fields:
  biography_es, quote_es, prayer_es, reflection_es,
}
```

Optionally add `rite: 'VO'` (or `'NO'`) to restrict an entry to one calendar — entries without a `rite` field show in both.

### Adding new Sunday readings

Add entries to the `SUNDAY_READINGS` array in `src/api/readingsData.js`. Key must be a full ISO date (`YYYY-MM-DD`). Each entry has parallel `no` (Novus Ordo) and `vo` (Vetus Ordo) blocks.

**Fetching source text** — both sources 403 WebFetch; use curl with a browser user-agent:
```bash
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

# NO English (curl works)
curl -s -A "$UA" "https://bible.usccb.org/bible/readings/MMDDYY.cfm"

# NO Spanish — curl is Cloudflare-blocked on the /es/ subdomain; use Playwright instead:
node -e "
const { chromium } = require('./node_modules/playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto('https://bible.usccb.org/es/bible/lecturas/MMDDYY.cfm', { waitUntil: 'networkidle' });
  console.log(await p.locator('body').innerText());
  await b.close();
})();
"

# VO English (1962 Missal; curl works)
curl -s -A "$UA" "https://www.divinumofficium.com/cgi-bin/missa/missa.pl?date1=MM-DD-YYYY&command=prayLow&lang2=English"
```

VO has no Spanish edition on Divinum Officium. Spanish VO propers come from `rinconliturgico.blogspot.com` (per-Sunday posts, URL pattern varies — search the blog). If no Spanish VO source is found, leave `text_es: ''`; the UI falls back to English.

**NO block shape:**
```js
{
  title, title_es, lectionary, cycle,           // e.g. '94', 'A'
  source_url, source_url_es, source_name,
  verse, verse_es, verse_citation, verse_citation_es,  // Gospel highlight for the Today card
  readings: [{ label, label_es, citation, citation_es, text, text_es }]
  // sections: Reading 1, Responsorial Psalm, Reading 2, Alleluia, Gospel
}
```

**VO block shape:**
```js
{
  title, title_es, rank, color,
  source_url, source_url_es, source_name, source_name_es,
  verse, verse_es, verse_citation, verse_citation_es,
  readings: [{ label, label_es, citation, citation_es, text, text_es }]
  // sections: Introit, Collect, Epistle, Gradual & Alleluia, Gospel, Offertory, Communion, Postcommunion
}
```

`ReadingsModal.jsx` renders a sticky header (title + rite tabs + horizontal section-jump chips) that stays pinned while the user scrolls through readings. A "Prayer before Mass" block (`t.prayer_before_mass`, EN/ES) appears first. Gospel readings get a gold left-border and `✝` marker; Psalm `R.` refrains are rendered in gold italic by a `PsalmText` component. The Today banner shows the Gospel `verse` / `verse_es` snippet beneath the title.
