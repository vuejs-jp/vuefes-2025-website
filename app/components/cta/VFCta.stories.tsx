import type { Meta, StoryFn } from "@storybook/vue3";
import VFCta from "./VFCta.vue";

export default {
  title: "Components/VFCta",
  component: VFCta,
  argTypes: {
    actionButton: {
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof VFCta>;

const Template: StoryFn<{
  actionButton?: {
    label: string;
    link: string;
    external?: true;
  };
}> = args => ({
  name: "VFCta",
  setup: () => () => (
    <VFCta
      {...args}
    >
      <div>
        <h2>プロポーザル募集</h2>
        <p><img src="/images/cta/cfp.svg" alt="" /></p>
        <p>Vue Fes Japan では、セッション・ライトニングトークへの登壇者を広く募集しています。締め切りは 6 月 29 日（日）23:59 まで！</p>
      </div>
    </VFCta>
  ),
});

export const Default = Template.bind({});

export const WithActionButton = Template.bind({});
WithActionButton.args = {
  actionButton: {
    label: "応募はこちら",
    link: "https://vuefes.jp/cfp",
    external: true,
  },
};
