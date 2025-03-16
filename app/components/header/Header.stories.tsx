import type { Meta, StoryFn } from "@storybook/vue3";
import Header from "./Header.vue";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {},
} satisfies Meta<typeof Header>;

export const Default: StoryFn = () => ({
  name: "Header",
  setup: () => () => <Header />,
});
