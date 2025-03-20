// TODO:

// import type { Meta, StoryFn } from "@storybook/vue3";
import type { StoryFn } from "@storybook/vue3";
// import VFForm from "./VFForm.vue";

export default {
  title: "Components/VFForm",
  // component: VFForm,
  argTypes: {},
};
// satisfies Meta<typeof VFForm>;

export const Default: StoryFn = () => ({
  name: "VFForm",
  setup: () => () => <div></div>,
});
