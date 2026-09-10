import { defineCollection, z } from "astro:content";

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),
    // Card overlay: rendered as an HTML layer over `image` (or over the brand
    // gradient when there is no image), so the wording stays editable here
    // rather than being baked into the picture.
    overlay: z
      .object({
        kicker: z.string().optional(),
        heading: z.string().optional(),
        subheading: z.string().optional(),
        logo: z.boolean().default(true),
      })
      .optional(),
    // Attribution for `image`, shown on the card and on the entry page.
    // Required by the CC BY licences the sweet photographs are used under.
    credit: z.string().optional(),
    creditUrl: z.string().optional(),
  }),
});

export default news;
