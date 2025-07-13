import { LocalJsonPath } from "./constants.ts";
import { readJsonFile, writeJsonFile } from "./json_utils.ts";
import { logger } from "./logger.ts";
import { AllMediaSchema, RefinedAllMediaJson } from "./schema.ts";

logger.info(
  `Reading ${LocalJsonPath.RawAllMedia}...`,
);
const rawAllMedia = await readJsonFile(LocalJsonPath.RawAllMedia);

const allMedia = AllMediaSchema.parse(rawAllMedia);

const json: RefinedAllMediaJson = {
  allMedia: allMedia.contents,
  metadata: {
    updatedAt: allMedia.updatedAt,
  },
};

await writeJsonFile<RefinedAllMediaJson>(LocalJsonPath.RefinedAllMedia, json);

logger.info(
  `Refined ${allMedia.contents.length} out of ${allMedia.totalCount} to ${LocalJsonPath.RefinedAllMedia}`,
);
