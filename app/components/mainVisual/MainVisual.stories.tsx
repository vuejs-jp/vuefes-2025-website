import type { Meta, StoryFn } from "@storybook/vue3";
import MainVisual from "./MainVisual.vue";

export default {
  title: "Preview/MainVisual",
  component: MainVisual,
  argTypes: {
    animation: {
      control: { type: "boolean" },
      showScrollAttention: { type: "boolean" },
    },
  },
} satisfies Meta<typeof MainVisual>;

const Template: StoryFn<{
  animation: boolean;
  showScrollAttention: boolean;
}> = args => ({
  name: "MainVisual",
  setup: () => () => <MainVisual {...args} />,
});

export const Animation = Template.bind({});

export const NoAnimation = Template.bind({});
NoAnimation.args = { animation: false };

export const ScrollAttention = Template.bind({});
ScrollAttention.args = { showScrollAttention: true };
