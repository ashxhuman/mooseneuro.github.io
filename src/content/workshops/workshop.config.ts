import { z, defineCollection } from "astro:content";

const workshop = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    image: z.string(),
    pubDate: z.date(),
    slug: z.string(),
  }),
});

export default workshop;
