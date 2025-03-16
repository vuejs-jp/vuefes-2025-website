import type { Meta, StoryFn } from "@storybook/vue3";
import Button from "./Button.vue";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    outlined: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "boolean" },
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

const Template: StoryFn<{
  type: "button" | "submit" | "reset";
  outlined: boolean;
  icon: boolean;
}> = (args) => ({
  name: "Button",
  setup: () => () => (
    <Button {...args} onClick={() => console.log("clicked")}>
      ラベル
    </Button>
  ),
});

export const Default = Template.bind({});

export const Outlined = Template.bind({});
Outlined.args = { outlined: true };

export const Icon: StoryFn<{ icon: boolean }> = (args = { icon: true }) => ({
  name: "Button",
  setup: () => () => (
    <Button {...args} onClick={() => console.log("clicked")}>
      <span class="icon">🚀</span>
    </Button>
  ),
});
