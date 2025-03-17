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

export const Icon: StoryFn<{ icon: boolean }> = () => ({
  name: "Button",
  setup: () => () => (
    <Button
      icon
      onClick={() => console.log("clicked")}
      style={{ width: "70px", height: "70px" }}
    >
      <img
        src="~/assets/icons/ic_github.svg"
        alt="GitHub icon"
        width="48px"
        height="48px"
      />
    </Button>
  ),
});
