import { createRequire } from "module";

const require = createRequire(import.meta.url);
export default require("@storybook-vue/nuxt/dist/preset.cjs");
