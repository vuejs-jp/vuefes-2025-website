import type { StoryFn } from "@storybook/vue3";
import VFScrollAttention from "./VFScrollAttention.vue";

export default {
  title: "Components/VFScrollAttention",
  component: VFScrollAttention,
} as const;

export const Default: StoryFn = () => ({
  name: "VFScrollAttention",
  setup: () => () => <VFScrollAttention />,
});
