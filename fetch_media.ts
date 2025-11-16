import {
  HOUSOUBU_RADIO_TAG_ID,
  LocalJsonPath,
  MEDIA_API_URL,
  MICROCMS_API_KEY,
} from "./constants.ts";
import { writeJsonFile } from "./json_utils.ts";
import { logger } from "./logger.ts";

/**
 * This is the original params used in asobichannel page for housoubu radio.
 * But eps 36 doesn't have the tag for some reason.
 * https://asobichannel.asobistore.jp/tag/56eawbbs5
 */
export const originalParams = new URLSearchParams({
  filters: `(tag[contains]${HOUSOUBU_RADIO_TAG_ID})`,
  // Descending order by publishedAt, latest first
  orders: "-publishedAt",
  offset: "0",
  limit: String(52),
});

/**
 * Because eps 36 doesn't have the tag,
 * here we're searching by radio title directly.
 */
const HOUSOUBU_TITLE_PREFIX = "初星学園放送部 #";
export const customParams = new URLSearchParams({
  // https://document.microcms.io/content-api/get-list-contents#ha8abec0b2f
  filters: `title[contains]${HOUSOUBU_TITLE_PREFIX}`,
  // Descending order by publishedAt, latest first
  orders: "-publishedAt",
  offset: "0",
  limit: String(100),
  // Uses `fields` to avoid fetching unused fields.
  // https://document.microcms.io/content-api/get-list-contents#h7462d83de4
  fields:
    "id,createdAt,updatedAt,publishedAt,revisedAt,title,tag,body,contents,comment,period",
});

async function fetchMedia() {
  const params = customParams.toString();
  const url = `${MEDIA_API_URL}?${params}`;
  logger.info(`Fetching media from ${url}...`);
  const res = await fetch(`${MEDIA_API_URL}?${params}`, {
    headers: {
      "x-microcms-api-key": MICROCMS_API_KEY,
    },
  });
  logger.info(`Got response with status ${res.status}`);
  return (await res.json());
}

const json = await fetchMedia();

await writeJsonFile(
  LocalJsonPath.RawAllMedia,
  {
    ...json,
    // This shouldn't be here.
    // Maybe collapse the parse and the fetch so we don't need this
    updatedAt: new Date().toISOString(),
  },
);

logger.info(`Saved all media to ${LocalJsonPath.RawAllMedia}`);
