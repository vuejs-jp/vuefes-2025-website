import type { Meta, StoryFn } from "@storybook/vue3";
import VFSpCta from "./VFSpCta.vue";

export default {
  title: "Preview/VFSpCta",
  component: VFSpCta,
  argTypes: {
    openerText: {
      control: { type: "text" },
      defaultValue: "CFP",
    },
  },
} satisfies Meta<typeof VFSpCta>;

export const Default: StoryFn<{
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
          <p><a href="#" target="_self">応募はこちら</a></p>
        </div>
      </VFSpCta>
    </div>
  ),
});
