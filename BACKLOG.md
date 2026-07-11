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
- [x] June saints filled — 12 saints added for the remaining June dates (4, 7, 8, 10, 12, 15, 16, 17, 18, 20, 23, 25); June now has full daily coverage in `saintsData.js` with matching `ld-MMDD` entries in `liturgicalData.js`
- [x] July saints filled — 9 saints added for the remaining July dates (10, 12, 17, 18, 19, 20, 27, 28, 30), including separate NO/VO cards for 19 (Macrina the Younger / Vincent de Paul) and 20 (Apollinaris of Ravenna / Jerome Emiliani); July now has full daily coverage with matching `ld-MMDD` entries
- [x] Upcoming feasts on Today tab — `upcomingFeasts` strip shows the next 3 non-Feria feast days (excluding today and an already-shown patron), clickable into the saint detail modal
- [x] Liturgical entries for new saint dates — audited; every `saintsData.js` entry now has a matching `ld-MMDD` entry in `liturgicalData.js`, no gaps remain

---

## Open

### Content

- [ ] **More saints** — January–July now have full daily coverage; August–December still show "Feria" on many dates (Aug 8, Sep 9, Oct 13, Nov 8, Dec 11 missing as of 2026-07-10)
- [ ] **Sunday readings — September 2026 onward** — `readingsData.js` currently ends at August 30; continue adding NO + VO entries

### Features

- [ ] **Patron category filter on Browse** — filter by patron category (e.g. "students", "sick") in addition to virtue; requires adding a `patron_category` field or parsing `patron_of`

### Polish

- [ ] **Rose color in the legend** — the liturgical color legend (if displayed) should include rose alongside purple, green, white, red, and black
- [ ] **"No readings" state** — Calendar readings card could note when no readings entry exists for a Sunday rather than silently omitting the `BookOpen` icon
