import type { Meta, StoryFn } from "@storybook/vue3";
import VFButton from "./VFButton.vue";

export default {
  title: "Components/VFButton",
  component: VFButton,
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
} satisfies Meta<typeof VFButton>;

const Template: StoryFn<{
  type: "button" | "submit" | "reset";
  outlined: boolean;
  icon: boolean;
}> = (args) => ({
  name: "VFButton",
  setup: () => () => (
    <VFButton {...args} onClick={() => console.log("clicked")}>
      ラベル
    </VFButton>
  ),
});

export const Default = Template.bind({});

export const Outlined = Template.bind({});
Outlined.args = { outlined: true };

export const Icon: StoryFn<{ icon: boolean }> = () => ({
  name: "VFButton",
  setup: () => () => (
    <VFButton
      icon
      onClick={() => console.log("clicked")}
      style={{ width: "70px", height: "70px" }}
    >
      <img
        src="/images/icons/ic_github.svg"
        alt="GitHub icon"
        width="48px"
        height="48px"
      />
    </VFButton>
  ),
});
