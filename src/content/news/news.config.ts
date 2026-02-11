import { defineCollection, z } from "astro:content";

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export default news;
