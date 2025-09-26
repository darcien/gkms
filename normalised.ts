import { NameWithRole, Radio } from "./radio.ts";

export type NormalisedGuest = NameWithRole & {
  /**
   * Unique human readable id.
   */
  slug: string;
};

const slugSymbol = Symbol("slug");
type RawKnownSlug =
  | "aochan"
  | "bambi"
  | "myachan"
  | "iwachan"
  | "suuchan"
  | "mugichan"
  | "pikarun"
  | "hamu"
  | "mashipi"
  | "kawachimura"
  | "nonsan"
  | "aaya"
  | "komino"
  | "yukka"
  | "yamamoto"
  | "daichi"
  | "osawa"
  | "takafumi";

export type KnownSlug = RawKnownSlug & { [slugSymbol]: true };
export type UnknownSlug = string & { [slugSymbol]: true };
export type Slug = KnownSlug | UnknownSlug;

export function asKnownSlug(slug: RawKnownSlug): KnownSlug {
  return slug as KnownSlug;
}

export type NormalisedRadio = Pick<Radio, "airedAt" | "mediaId"> & {
  guests: Array<Slug>;
  /**
   * Whether the radio is a live broadcast or recorded.
   */
  isLive: boolean;
};

export type Series = Array<NormalisedRadio>;
