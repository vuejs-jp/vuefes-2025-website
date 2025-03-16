import type { Meta, StoryFn } from "@storybook/vue3";
import Heading from "./Heading.vue";

export default {
  title: "Components/Heading",
  component: Heading,
  argTypes: {},
} satisfies Meta<typeof Heading>;

export const Default: StoryFn = () => ({
  name: "Heading",
  setup: () => () => <Heading>メッセージ</Heading>,
});
