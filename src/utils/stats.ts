/**
 * Business stats shown on the About page (and in its meta description).
 * They grow by themselves on every 1 January, so nobody has to edit the site
 * each year: value = base value + yearly increment × years since BASE_YEAR.
 * To correct a number, update its base value (and BASE_YEAR if the base is
 * for a different year).
 */
const BASE_YEAR = 2026;

const BASE = {
  years: 6,
  hours: 10_160,
  iceCubes: 3_000,
  cocktails: 9_000,
};

const PER_YEAR = {
  years: 1,
  hours: 160,
  iceCubes: 1_000,
  cocktails: 4_000,
};

type Stats = typeof BASE;

export function getStats(now: Date = new Date()): Stats {
  const elapsed = Math.max(0, now.getFullYear() - BASE_YEAR);
  return {
    years: BASE.years + PER_YEAR.years * elapsed,
    hours: BASE.hours + PER_YEAR.hours * elapsed,
    iceCubes: BASE.iceCubes + PER_YEAR.iceCubes * elapsed,
    cocktails: BASE.cocktails + PER_YEAR.cocktails * elapsed,
  };
}

/** 10_160 → "10k". Rounds down, so with a ">" or "+" it never overstates. */
export function formatThousands(value: number): string {
  return `${Math.floor(value / 1000)}k`;
}
