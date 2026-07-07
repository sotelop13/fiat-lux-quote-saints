import { getMovableSaints, getMovableLiturgicalDays, computeSeason } from './movableFeasts';

const _year = new Date().getFullYear();
const _movableSaints = getMovableSaints(_year);
const _movableLiturgical = getMovableLiturgicalDays(_year);

// Dynamic imports so saintsData / liturgicalData are separate cacheable chunks.
// Both promises are module-level singletons — the import only fires once.
const saintsPromise = import('./saintsData').then(m => m.SAINTS);
const liturgicalPromise = import('./liturgicalData').then(m => m.LITURGICAL_DAYS);

function matches(item, conditions) {
  return Object.entries(conditions).every(([k, v]) => item[k] === v);
}

function createStaticEntity(dataPromise, movable) {
  return {
    async list() {
      const data = await dataPromise;
      return [...movable, ...data];
    },
    async filter(conditions) {
      const data = await dataPromise;
      return [...movable, ...data].filter(item => matches(item, conditions));
    },
    async get(id) {
      const data = await dataPromise;
      return [...movable, ...data].find(d => d.id === id) ?? null;
    },
    async create() { throw new Error('Read-only'); },
    async update() { throw new Error('Read-only'); },
    async delete() { throw new Error('Read-only'); },
  };
}

function createLocalEntity(storageKey) {
  const load = () => JSON.parse(localStorage.getItem(storageKey) || '[]');
  const save = (data) => localStorage.setItem(storageKey, JSON.stringify(data));

  return {
    async list() { return load(); },
    async filter(conditions) { return load().filter(item => matches(item, conditions)); },
    async get(id) { return load().find(d => d.id === id) ?? null; },
    async create(data) {
      const items = load();
      const newItem = { ...data, id: `${storageKey}-${Date.now()}` };
      items.push(newItem);
      save(items);
      return newItem;
    },
    async update(id, data) {
      const items = load();
      const idx = items.findIndex(d => d.id === id);
      if (idx >= 0) { items[idx] = { ...items[idx], ...data }; save(items); return items[idx]; }
      return null;
    },
    async delete(id) {
      save(load().filter(d => d.id !== id));
    },
  };
}

export const Saint = createStaticEntity(saintsPromise, _movableSaints);
export const LiturgicalDay = createStaticEntity(liturgicalPromise, _movableLiturgical);
export const UserFavorite = createLocalEntity('fiat_lux_favorites');

export async function getSaintsForYear(year, rite = null) {
  const SAINTS = await saintsPromise;
  const all = [...getMovableSaints(year), ...SAINTS];
  if (!rite) return all;
  return all.filter(s => !s.rite || s.rite === rite);
}

export async function getLiturgicalForYear(year) {
  const LITURGICAL_DAYS = await liturgicalPromise;
  const movable = getMovableLiturgicalDays(year);
  const fixed = LITURGICAL_DAYS.map(l => ({
    ...l,
    novus_ordo_season: computeSeason(l.date, year, 'NO') ?? l.novus_ordo_season,
    vetus_ordo_season: computeSeason(l.date, year, 'VO') ?? l.vetus_ordo_season,
  }));
  return [...movable, ...fixed];
}
