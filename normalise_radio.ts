import { LocalJsonPath } from "./constants.ts";
import { readJsonFile, writeJsonFile } from "./json_utils.ts";
import { logger } from "./logger.ts";
import {
  asKnownSlug,
  NormalisedGuest,
  NormalisedRadio,
  Slug,
  UnknownSlug,
} from "./normalised.ts";
import { NameWithRole, Radio } from "./radio.ts";

const rAllRadio = await readJsonFile<Array<Radio>>(LocalJsonPath.AllRadio);

function removeSpaces(text: string): string {
  return text.replace(/\s+/g, "");
}

function removeSpacesFromNames(
  names: Array<NameWithRole>,
): Array<NameWithRole> {
  return names.map((n) => ({
    name: removeSpaces(n.name),
    role: removeSpaces(n.role),
  }));
}

const allRadio = rAllRadio.map((r) => ({
  ...r,
  guests: removeSpacesFromNames(r.guests),
  mc: removeSpacesFromNames(r.mc),
}));

const allGuestNames = Array.from(
  new Set<string>(
    allRadio.flatMap((r) => r.guests.map((g) => g.name)),
  ),
).toSorted();

const freqByName = new Map<string, number>(
  allGuestNames.map((
    gname,
  ) =>
    [
      gname,
      allRadio.filter((r) => r.guests.some((g) => g.name === gname)).length,
    ] as const
  ).toSorted(([, aFreq], [, bFreq]) => aFreq - bFreq).reverse(),
);

console.log({ freqByName });

function getSlugByName(name: string): Slug {
  switch (name) {
    case "長月あおい":
      return asKnownSlug("aochan");
    case "小鹿なお":
      return asKnownSlug("bambi");
    case "湊みや":
      return asKnownSlug("myachan");
    case "花岩香奈":
      return asKnownSlug("iwachan");
    case "薄井友里":
      return asKnownSlug("suuchan");
    case "七瀬つむぎ":
      return asKnownSlug("mugichan");
    case "飯田ヒカル":
      return asKnownSlug("pikarun");
    case "伊藤舞音":
      return asKnownSlug("hamu");
    case "陽高真白":
      return asKnownSlug("mashipi");
    case "川村玲奈":
      return asKnownSlug("kawachimura");
    case "春咲暖":
      return asKnownSlug("nonsan");
    case "松田彩音":
      return asKnownSlug("aaya");
    case "小美野日出文":
      return asKnownSlug("komino");
    case "天音ゆかり":
      return asKnownSlug("yukka");
    case "山本亮":
      return asKnownSlug("yamamoto");
    case "佐藤大地":
      return asKnownSlug("daichi");
    case "大澤めい":
      return asKnownSlug("osawa");
    case "佐藤貴文":
      return asKnownSlug("takafumi");
    default:
      return name
        .toLowerCase()
        .replace(/\s+/g, "-") as UnknownSlug;
  }
}

const guests: Array<NormalisedGuest> = [
  ...allRadio.flatMap((r) => r.guests).reduce(
    (acc, guest) => {
      const slug = getSlugByName(guest.name);
      const existing = acc.get(slug);
      if (existing == null) {
        acc.set(slug, {
          name: guest.name,
          role: guest.role,
        });
      } else {
        // Technically we would need to merge the roles or name here.
        // But for now we assume there's only 1 per guest.
        if (existing.role !== guest.role) {
          logger.warn(
            `Guest "${slug}" has multiple roles: "${existing.role}" and "${guest.role}". Using the first one.`,
          );
        }
        if (existing.name !== guest.name) {
          logger.warn(
            `Guest "${slug}" has multiple names: "${existing.name}" and "${guest.name}". Using the first one.`,
          );
        }
      }
      return acc;
    },
    new Map<Slug, NameWithRole>(),
  ).entries(),
].map(([slug, guest]) => ({ ...guest, slug }))
  .toSorted((guestA, guestB) => guestA.name.localeCompare(guestB.name));

logger.info(
  `Normalised ${guests.length} guests to ${LocalJsonPath.Guest}`,
);
await writeJsonFile(LocalJsonPath.Guest, guests);

const series = allRadio.map((r): NormalisedRadio => ({
  mediaId: r.mediaId,
  airedAt: r.airedAt,
  guests: r.guests.map((g) => getSlugByName(g.name)),
  isLive: r.title.includes("生配信"),
})).toSorted((a, b) =>
  new Date(a.airedAt).getTime() - new Date(b.airedAt).getTime()
);

logger.info(
  `Normalised ${series.length} radio to ${LocalJsonPath.Series}`,
);
await writeJsonFile(LocalJsonPath.Series, series);
