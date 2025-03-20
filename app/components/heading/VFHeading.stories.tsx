import type { Meta, StoryFn } from "@storybook/vue3";
import VFHeading from "./VFHeading.vue";

export default {
  title: "Components/VFHeading",
  component: VFHeading,
  argTypes: {},
} satisfies Meta<typeof VFHeading>;

export const Default: StoryFn = () => ({
  name: "VFHeading",
  setup: () => () => <VFHeading>メッセージ</VFHeading>,
});
