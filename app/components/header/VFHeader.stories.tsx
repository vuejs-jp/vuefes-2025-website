import type { Meta, StoryFn } from "@storybook/vue3";
import VFHeader from "./VFHeader.vue";

export default {
  title: "Components/VFHeader",
  component: VFHeader,
  argTypes: {},
} satisfies Meta<typeof VFHeader>;

export const Default: StoryFn = () => ({
  name: "VFHeader",
  setup: () => () => <VFHeader />,
});
