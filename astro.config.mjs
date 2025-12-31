// @ts-check
import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import path from "path";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://mooseneuro.org",
  base: "/",
  integrations: [react(), sitemap()],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
