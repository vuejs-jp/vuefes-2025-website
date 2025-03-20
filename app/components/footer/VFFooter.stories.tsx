import type { Meta, StoryFn } from "@storybook/vue3";
import VFFooter from "./VFFooter.vue";

export default {
  title: "Components/VFFooter",
  component: VFFooter,
  argTypes: {},
} satisfies Meta<typeof VFFooter>;

export const Default: StoryFn = () => ({
  name: "VFFooter",
  setup: () => () => <VFFooter />,
});
