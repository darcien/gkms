import { HOUSOUBU_VOICE_DRAMA_TAG_ID, LocalJsonPath } from "./constants.ts";
import { readJsonFile, writeJsonFile } from "./json_utils.ts";
import { logger } from "./logger.ts";
import { NameWithRole, Radio } from "./radio.ts";
import { RefinedAllMediaJson } from "./schema.ts";

logger.info(
  `Reading ${LocalJsonPath.RefinedAllMedia}...`,
);
const { allMedia } = await readJsonFile<RefinedAllMediaJson>(
  LocalJsonPath.RefinedAllMedia,
);

const radioOnlyContents = allMedia.filter((m) =>
  !m.tag.some((t) => t.id === HOUSOUBU_VOICE_DRAMA_TAG_ID)
);

logger.debug(
  `Radio only contents: ${radioOnlyContents.length} out of ${allMedia.length}`,
);

// 長月あおい（花海咲季役）、飯田ヒカル（藤田ことね役）
// 「学園アイドルマスター」アシスタントプロデューサー 佐藤大地、山本亮
function extractNames(text: string): Array<NameWithRole> {
  const specialRoles = [
    "「学園アイドルマスター」プロデューサー",
    "「学園アイドルマスター」アシスタントプロデューサー",
    "「学園アイドルマスター」音楽プロデューサー",
  ];

  const specialRole = specialRoles.find((role) => text.includes(role));

  const rawNames = text.split("、").map((n) => n.trim());
  const namesWithRoles: Array<NameWithRole> = [];
  for (let i = 0; i < rawNames.length; i++) {
    const rawName = rawNames[i] || "";

    if (rawName.includes("役")) {
      const [name = "", role = ""] = rawName.split(/（|\(/).map((n) =>
        n.trim().replaceAll(/）|\)/g, "")
      );
      namesWithRoles.push({
        name,
        role,
      });
    } else if (specialRole) {
      const name = rawName.replace(specialRole, "").trim();
      namesWithRoles.push({
        name,
        role: specialRole,
      });
    } else {
      logger.warn(`Unknown name pattern: "${rawName}" from "${text}"`);
    }
  }

  return namesWithRoles;
}

// <br>MC: 村田綾香（真城 優役）<br>
const MC_REGEX = /MC:\s*([^<\r\n]+?)<br>/gi;
function extractMc(text: string): Array<NameWithRole> | undefined {
  const matched = [...text.matchAll(MC_REGEX)].find(Boolean) || [];
  const [_fullMatch, captured] = matched;

  return captured ? extractNames(captured) : undefined;
}

// <br>ゲスト: 松田彩音（花海佑芽役）、陽高真白（十王星南役）<br>
const GUEST_REGEX = /ゲスト:\s*([^<\r\n]+?)<br>/gi;
function extractGuests(text: string): Array<NameWithRole> | undefined {
  const matched = [...text.matchAll(GUEST_REGEX)].find(Boolean) || [];
  const [_fullMatch, captured] = matched;

  return captured ? extractNames(captured) : undefined;
}

logger.info("Extracting MC and guests from radio contents...");
const allRadio = radioOnlyContents.map((m): Radio => ({
  mediaId: m.id,
  title: m.title,
  mc: extractMc(m.body) || [],
  guests: extractGuests(m.body) || [],
  airedAt: m.period.start,
}));

await writeJsonFile(
  LocalJsonPath.AllRadio,
  allRadio,
);
logger.info(
  `Transformed ${allRadio.length} radio to ${LocalJsonPath.AllRadio}`,
);
