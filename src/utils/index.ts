import { format, parseISO, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatFeastDate(mmDd: string, lang?: string): string {
  const [month, day] = mmDd.split('-').map(Number);
  const date = new Date(new Date().getFullYear(), month - 1, day);
  if (lang === 'es') return format(date, "d 'de' MMMM", { locale: es });
  return format(date, 'MMMM d');
}

export function formatFeastDateParts(mmDd: string, lang?: string): { month: string; day: string } {
  const [month, day] = mmDd.split('-').map(Number);
  const date = new Date(new Date().getFullYear(), month - 1, day);
  const locale = lang === 'es' ? es : undefined;
  return {
    month: format(date, 'MMM', locale ? { locale } : {}).replace('.', ''),
    day: String(day),
  };
}

export function todayMMDD(): string {
  return format(new Date(), 'MM-dd');
}

export function liturgicalColorClass(color: string | undefined): string {
  const map: Record<string, string> = {
    white:  'text-stone-500',
    red:    'text-red-600',
    green:  'text-green-700',
    purple: 'text-purple-700',
    rose:   'text-pink-500',
    black:  'text-gray-800',
  };
  return map[color?.toLowerCase() ?? ''] ?? 'text-muted-foreground';
}

export function liturgicalColorDotClass(color: string | undefined): string {
  const map: Record<string, string> = {
    white:  'bg-stone-300',
    red:    'bg-red-500',
    green:  'bg-green-600',
    purple: 'bg-purple-700',
    rose:   'bg-pink-400',
    black:  'bg-gray-900',
  };
  return map[color?.toLowerCase() ?? ''] ?? 'bg-muted-foreground';
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const NO_RANK_PRIORITY: Record<string, number> = {
  'Solemnity': 1,
  'Feast': 2,
  'Memorial': 3,
  'Optional Memorial': 4,
  'Feria': 5,
};

const VO_RANK_PRIORITY: Record<string, number> = {
  'Duplex I Classis': 1,
  'Duplex II Classis': 2,
  'Duplex Majus': 3,
  'Duplex': 4,
  'Semiduplex': 5,
  'Simplex': 6,
  'Feria': 7,
};

export function rankPriority(rank: string | undefined, rite: 'NO' | 'VO'): number {
  if (!rank) return 99;
  const map = rite === 'VO' ? VO_RANK_PRIORITY : NO_RANK_PRIORITY;
  return map[rank] ?? 50;
}

export function daysUntilFeast(feastMMDD: string | undefined | null): number {
  if (!feastMMDD) return 999;
  const [mm, dd] = feastMMDD.split('-').map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const feast = new Date(today.getFullYear(), mm - 1, dd);
  feast.setHours(0, 0, 0, 0);
  if (feast < today) feast.setFullYear(today.getFullYear() + 1);
  return Math.round((feast.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function icsEscape(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

// Builds an RFC 5545 .ics file for a saint's feast day, anchored on its next
// upcoming occurrence. Fixed-date saints (id like 's-0601') recur yearly via
// RRULE; movable feasts (id ends in a year, e.g. 's-easter-2026') don't,
// since their MM-DD shifts with Easter each year and only this year's date
// is known to be correct.
export function buildFeastICS(
  saint: { id: string; name: string; feast_date: string },
  description: string
): string {
  const [mm, dd] = saint.feast_date.split('-').map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const feast = new Date(today.getFullYear(), mm - 1, dd);
  feast.setHours(0, 0, 0, 0);
  if (feast < today) feast.setFullYear(today.getFullYear() + 1);

  const dtStart = `${feast.getFullYear()}${pad2(feast.getMonth() + 1)}${pad2(feast.getDate())}`;
  const end = new Date(feast);
  end.setDate(end.getDate() + 1);
  const dtEnd = `${end.getFullYear()}${pad2(end.getMonth() + 1)}${pad2(end.getDate())}`;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  // Fixed-date ids are exactly 's-MMDD' or 's-MMDD-vo'. Movable ids carry an
  // alphabetic feast name before the year (e.g. 's-easter-2026'), which also
  // ends in 4 digits — so a naive /-\d{4}$/ check can't tell them apart.
  const isFixedDate = /^s-\d{4}(-vo)?$/.test(saint.id);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fiat Lux - Quote the Saints//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${saint.id}@fiatlux.app`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    ...(isFixedDate ? ['RRULE:FREQ=YEARLY'] : []),
    `SUMMARY:${icsEscape(saint.name)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}
