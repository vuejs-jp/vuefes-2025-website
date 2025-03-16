import type { Meta, StoryFn } from "@storybook/vue3";
import Footer from "./Footer.vue";

export default {
  title: "Components/Footer",
  component: Footer,
  argTypes: {},
} satisfies Meta<typeof Footer>;

export const Default: StoryFn = () => ({
  name: "Footer",
  setup: () => () => <Footer />,
});
