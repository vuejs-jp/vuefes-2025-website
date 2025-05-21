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
  setup: () => () => (
    <VFMenu
      {...args}
      items={[
        {
          id: "1",
          label: "Home",
          route: {
            name: "home",
            hash: "",
          },
        },
        {
          id: "2",
          label: "About",
          route: {
            name: "about",
            hash: "",
          },
        },
        {
          id: "3",
          label: "Contact",
          route: {
            name: "contact",
            hash: "",
          },
        },
      ]}
    />
  ),
});

export const Default = Template.bind({});
