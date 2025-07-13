import { configure, getConsoleSink, getLogger } from "@logtape/logtape";

const MAIN_LOG_CATEGORY = "hsb";

await configure({
  sinks: {
    console: getConsoleSink(),
  },
  loggers: [
    { category: MAIN_LOG_CATEGORY, lowestLevel: "debug", sinks: ["console"] },
    {
      category: ["logtape", "meta"],
      sinks: [
        // Uncomment when debugging logtape itself
        // "console",
      ],
    },
  ],
});

export const logger = getLogger([MAIN_LOG_CATEGORY]);
