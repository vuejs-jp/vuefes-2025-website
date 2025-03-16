import type { Meta, StoryFn } from "@storybook/vue3";
import MainVisual from "./MainVisual.vue";

export default {
  title: "Preview/MainVisual",
  argTypes: { tooltip: { control: false } },
} satisfies Meta;

export const Preview: StoryFn = () => ({
  setup() {
    return () => <MainVisual />;
  },
});
