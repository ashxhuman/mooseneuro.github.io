import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const workshops = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/workshops" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    image: z.string(),
    pubDate: z.date(),
  }),
});

export default workshops;
