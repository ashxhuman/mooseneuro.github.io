import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogs = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blogs" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    authorimage: z.string().optional(),
    designation: z.string().optional(),
    affiliation: z.string().optional(),
    date: z.date(),
    image: z.string().optional(),
    socialLinks: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      bluesky: z.string().optional(),
    }).optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),
    // Card overlay: rendered as an HTML layer over `image` (or over the brand
    // gradient when there is no image) by NewsCardMedia, so the wording stays
    // editable here rather than being baked into the picture.
    overlay: z
      .object({
        kicker: z.string().optional(),
        heading: z.string().optional(),
        subheading: z.string().optional(),
        logo: z.boolean().default(true),
      })
      .optional(),
    // Attribution for `image`, shown on the card and on the entry page.
    // Required by the CC BY licences the sweet photographs are used under;
    // see public/assets/news/photos/CREDITS.md.
    credit: z.string().optional(),
    creditUrl: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/team" }),
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

const workshops = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/workshops" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    url: z.string(),
    image: z.string(),
    pubDate: z.date(),
    carouselheading: z.string(),
  }),
});

export const collections = { blogs, news, team, workshops };
