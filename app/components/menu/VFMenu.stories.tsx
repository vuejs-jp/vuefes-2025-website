import type { Meta, StoryFn } from "@storybook/vue3";
import VFMenu from "./VFMenu.vue";

export default {
  title: "Preview/VFMenu",
  component: VFMenu,
} satisfies Meta<typeof VFMenu>;

const Template: StoryFn<{
  animation: boolean;
}> = args => ({
  name: "VFMenu",
  setup: () => () => <VFMenu {...args} />,
});

export const Default = Template.bind({});
