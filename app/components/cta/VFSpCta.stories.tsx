import type { Meta, StoryFn } from "@storybook/vue3";
import VFSpCta from "./VFSpCta.vue";

export default {
  title: "Preview/VFSpCta",
  component: VFSpCta,
  argTypes: {
    actionButton: {
      control: { type: "object" },
    },
    openerText: {
      control: { type: "text" },
      defaultValue: "CFP",
    },
  },
} satisfies Meta<typeof VFSpCta>;

const Template: StoryFn<{
  actionButton?: {
    label: string;
    link: string;
    external?: true;
  };
  openerText: string;
}> = args => ({
  components: { VFSpCta },
  setup: () => () => (
    <div style="width: 100svw; height: 100vh; position: relative;">
      <VFSpCta {...args}>
        <div>
          <h2>プロポーザル募集</h2>
          <p><img src="/images/cta/cfp.svg" alt="" /></p>
          <p>Vue Fes Japan では、セッション・ライトニングトークへの登壇者を広く募集しています。締め切りは 6 月 29 日（日）23:59 まで！</p>
        </div>
      </VFSpCta>
    </div>
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
