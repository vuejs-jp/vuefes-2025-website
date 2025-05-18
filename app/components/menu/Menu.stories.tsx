import type { Meta, StoryFn } from "@storybook/vue3";
import Menu from "./Menu.vue";

export default {
  title: "Preview/Menu",
  component: Menu,
} satisfies Meta<typeof Menu>;

const Template: StoryFn<{
  animation: boolean;
}> = args => ({
  name: "Menu",
  setup: () => () => <Menu {...args} />,
});

export const Default = Template.bind({});
