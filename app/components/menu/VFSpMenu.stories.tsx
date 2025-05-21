import type { Meta, StoryFn } from "@storybook/vue3";
import VFSpMenu from "./VFSpMenu.vue";

export default {
  title: "Preview/VFSpMenu",
  component: VFSpMenu,
} satisfies Meta<typeof VFSpMenu>;

const Template: StoryFn<{
  animation: boolean;
}> = args => ({
  name: "VFSpMenu",
  setup: () => () => (
    <div style="width: 100svw; height: 100vh; position: relative;">
      <h2 style="position:absolute;bottom:18%;left:20svw">これはテストの文言です。メニューと被った際のぼかし具合を確認します。</h2>
      <VFSpMenu
        {...args}
        style="position:absolute; bottom:2%; left: 20svw"
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
    </div>
  ),
});

export const Default = Template.bind({});
