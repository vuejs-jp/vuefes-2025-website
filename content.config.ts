import path from "node:path";
import { defineCollection, defineContentConfig } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    i18n: defineCollection({
      type: "page",
      source: {
        cwd: path.resolve("i18n"),
        include: "**/*.md",
      },
    }),
  },
});
