import { defineCollection, z } from "astro:content";

const team = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    team: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        image: z.string(),
      })
    ),
  }),
});

export const collections = {
  team,
};
