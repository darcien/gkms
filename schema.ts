import { z } from "zod";

const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const VideoThumbSchema = z.object({
  url: z.string().url(),
  height: z.number(),
  width: z.number(),
});

const ContentsSchema = z.object({
  video_id: z.string(),
  video_type: z.array(z.string()),
  video_thumb: VideoThumbSchema,
});

const PeriodSchema = z.object({
  start: z.string().datetime(),
});

const MediaSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime(),
  revisedAt: z.string().datetime(),
  title: z.string(),
  tag: z.array(TagSchema),
  body: z.string(),
  contents: ContentsSchema,
  period: PeriodSchema,
});

export const AllMediaSchema = z.object({
  contents: z.array(MediaSchema),
  totalCount: z.number().int(),
  offset: z.number().int(),
  limit: z.number().int(),

  // Custom fields added by fetch code
  updatedAt: z.string(),
});

export type AllMedia = z.infer<typeof AllMediaSchema>;
export type AllMediaContents = AllMedia["contents"];

export type RefinedAllMediaJson = {
  allMedia: AllMediaContents;
  metadata: {
    updatedAt: string;
  };
};

export type Media = z.infer<typeof MediaSchema>;
export type Tag = z.infer<typeof TagSchema>;
export type VideoThumb = z.infer<typeof VideoThumbSchema>;
export type Contents = z.infer<typeof ContentsSchema>;
export type Period = z.infer<typeof PeriodSchema>;
