import { LocalJsonPath } from "./constants.ts";
import { readJsonFile, writeJsonFile } from "./json_utils.ts";
import { logger } from "./logger.ts";
import { asKnownSlug, NormalisedGuest, Series, Slug } from "./normalised.ts";

const series = await readJsonFile<Series>(LocalJsonPath.Series);
const _guests = await readJsonFile<Array<NormalisedGuest>>(LocalJsonPath.Guest);

function freqByKey<T, Key = string>(
  array: Array<T>,
  getKey: (item: T) => Key,
): Map<Key, number> {
  const freqMap = new Map<Key, number>();

  for (const item of array) {
    const key = getKey(item);
    freqMap.set(key, (freqMap.get(key) ?? 0) + 1);
  }

  return freqMap;
}

const freqBySlug = Object.fromEntries(
  Array.from(
    freqByKey(series.flatMap((r) => r.guests), (slug) => slug).entries(),
  ).toSorted(([, aFreq], [, bFreq]) => aFreq - bFreq).reverse(),
);

const castOrder: Array<Slug> = [
  // This ordering matches the one in the game report card.
  // TODO: add yukka once tsubame is playable
  asKnownSlug("aochan"),
  asKnownSlug("bambi"),
  asKnownSlug("pikarun"),
  asKnownSlug("mugichan"),
  asKnownSlug("iwachan"),
  asKnownSlug("hamu"),
  asKnownSlug("myachan"),
  asKnownSlug("kawachimura"),
  asKnownSlug("mashipi"),
  asKnownSlug("nonsan"),
  asKnownSlug("aaya"),
  asKnownSlug("suuchan"),
];

const lastCastVisitBySlug = Object.fromEntries(
  castOrder.map((
    slug,
  ) => [
    slug,
    series.toReversed().find((radio) => radio.guests.includes(slug))?.airedAt,
  ]),
);

const [oSlug, oVisitAt] = Object.entries(lastCastVisitBySlug).toSorted(
  ([, aDate], [, bDate]) => {
    if (aDate && bDate) {
      return new Date(aDate).getTime() - new Date(bDate).getTime();
    }
    if (aDate) return -1;
    if (bDate) return 1;
    return 0;
  },
).find(Boolean) || [];
const castOldestVisit = oSlug && oVisitAt
  ? { slug: oSlug, visitedAt: oVisitAt }
  : null;

const groupedSlugFreq = {
  cast: castOrder.map((slug) => [slug, freqBySlug[slug] ?? 0]),
};

const firstRadio = series.find((r) => r.airedAt);
const totalEpisodesCount = series.length;
const totalGuestsCount = series.reduce((total, radio) => {
  return total + radio.guests.length;
}, 0);

const noGuestRadioCount = series.filter((r) => r.guests.length === 0).length;
const oneGuestRadioCount = series.filter((r) => r.guests.length === 1).length;
const twoGuestsRadioCount = series.filter((r) => r.guests.length === 2).length;
const moreThan2GuestsRadioCount =
  series.filter((r) => r.guests.length > 2).length;

const liveBroadcastRadioCount = series.filter((r) => r.isLive).length;

logger.info(
  `Computed stats saved in ${LocalJsonPath.Stats}`,
);
await writeJsonFile(LocalJsonPath.Stats, {
  freqBySlug,
  groupedSlugFreq,
  firsRadioAiredAt: firstRadio?.airedAt,
  lastCastVisitBySlug,
  castOldestVisit,
  totalEpisodesCount,
  totalGuestsCount,
  noGuestRadioCount,
  oneGuestRadioCount,
  twoGuestsRadioCount,
  moreThan2GuestsRadioCount,
  liveBroadcastRadioCount,
});
