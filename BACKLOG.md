# Backlog

Planned features, content gaps, and polish items for Fiat Lux – Quote the Saints.

---

## Completed

- [x] July–December saints — 30 major saints added to `saintsData.js`
- [x] Rose liturgical color — Gaudete (3rd Sunday of Advent) and Laetare (4th Sunday of Lent) correctly use `rose` in `movableFeasts.js`
- [x] Feria state — Today tab shows a daily inspiration saint and persistent Daily Prayer card when there is no feast
- [x] Onboarding — 5-slide flow: Welcome → Language & Rite → Patron Saint → Features → Begin Today
- [x] Responsive layout — icon-only sidebar at `md` (768 px+), full sidebar with labels at `lg` (1024 px+); bottom nav on mobile only
- [x] Sunday Mass readings — August 2026 entries added (NO + VO, EN only)
- [x] Daily Prayer always accessible — `PrayerModal` works without a saint; persistent card on Today tab
- [x] Filter chips on Browse — virtue filter chips narrow the saint list; sort pills reorder by Upcoming / Name / Patron / Virtue
- [x] Browse sort & filter bugs fixed — scroll-to-results on change, `touch-manipulation` for iOS tap reliability, `lang` dep added
- [x] Birthday saint in Settings — "By Name / By Birthday" tabs under Patron Saint; birthday stored as `fiat_lux_birthday`
- [x] Saint images — public-domain Wikimedia Commons images added for ~40 major saints; displayed as a painting banner on the Today card and detail modal, and as circular avatars on Browse rows; image URLs live in `src/api/saintImages.js` and are applied at load time in `entities.js`

---

## Open

### Content

- [ ] **More saints** — many dates still show "Feria" with no saint entry; priority dates to fill: January, February, most of March–June outside major feasts
- [ ] **Liturgical entries for new saint dates** — some saints added in July–December lack a matching `ld-MMDD` entry in `liturgicalData.js`; audit and fill gaps
- [ ] **Sunday readings — September 2026 onward** — `readingsData.js` currently ends at August 30; continue adding NO + VO entries

### Features

- [ ] **Upcoming feasts on Today tab** — a small strip showing the next 2–3 feast days coming up; data is already available via `getSaintsForYear`
- [ ] **Patron category filter on Browse** — filter by patron category (e.g. "students", "sick") in addition to virtue; requires adding a `patron_category` field or parsing `patron_of`

### Polish

- [ ] **Rose color in the legend** — the liturgical color legend (if displayed) should include rose alongside purple, green, white, red, and black
- [ ] **"No readings" state** — Calendar readings card could note when no readings entry exists for a Sunday rather than silently omitting the `BookOpen` icon
