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

const groupedSlugFreq = {
  cast: castOrder.map((slug) => [slug, freqBySlug[slug] ?? 0]),
};

const firstRadio = series.find((r) => r.airedAt);
const totalEpisodesCount = series.length;
const totalGuestsCount = series.reduce((total, radio) => {
  return total + radio.guests.length;
}, 0);

logger.info(
  `Computed stats saved in ${LocalJsonPath.Stats}`,
);
await writeJsonFile(LocalJsonPath.Stats, {
  freqBySlug,
  groupedSlugFreq,
  firsRadioAiredAt: firstRadio?.airedAt,
  totalEpisodesCount,
  totalGuestsCount,
});
