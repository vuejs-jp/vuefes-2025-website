import type { Meta, StoryFn } from "@storybook/vue3";
import VFCta from "./VFCta.vue";

export default {
  title: "Components/VFCta",
  component: VFCta,
} satisfies Meta<typeof VFCta>;

export const Default: StoryFn = () => ({
  name: "VFCta",
  setup: () => () => (
    <VFCta>
      <div>
        <h2>プロポーザル募集</h2>
        <p><img src="/images/cta/cfp.svg" alt="" /></p>
        <p>Vue Fes Japan では、セッション・ライトニングトークへの登壇者を広く募集しています。締め切りは 6 月 29 日（日）23:59 まで！</p>
        <p><a href="#" target="_self">応募はこちら</a></p>
      </div>
    </VFCta>
  ),
});
