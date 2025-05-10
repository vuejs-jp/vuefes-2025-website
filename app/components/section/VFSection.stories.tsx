import type { Meta, StoryFn } from "@storybook/vue3";
import VFSection from "./VFSection.vue";

export default {
  title: "Components/VFSection",
  component: VFSection,
  argTypes: {
    title: {
      control: { type: "text" },
      defaultValue: "セクションタイトル",
    },
    heading: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      defaultValue: 2,
    },
    id: {
      control: { type: "text" },
    },
    coverImage: {
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof VFSection>;

export const Default: StoryFn = args => ({
  components: { VFSection },
  setup: () => ({
    args: {
      ...args,
      title: "セクションタイトル",
    },
  }),
  template: `
    <div style="max-width: 1000px; margin: 0 auto;">
      <VFSection v-bind="args">
        <p>セクションの内容がここに表示されます。このコンポーネントはメッセージエリア、スポンサー募集エリア、コンタクトエリアなどの共通デザインを提供します。</p>
        <p style="margin-top: 1rem;">複数の段落を含めることもできます。このエリアは自由にスロットコンテンツとして使用できます。</p>
      </VFSection>
    </div>
  `,
});

export const WithCoverImage: StoryFn = args => ({
  components: { VFSection },
  setup: () => ({
    args: {
      ...args,
      title: "カバー画像付きセクション",
      coverImage: {
        src: "/images/top/cover/message-pc.png",
        alt: "Vue Fes Japan 2025 メッセージ",
      },
    },
  }),
  template: `
    <div style="max-width: 1000px; margin: 0 auto;">
      <VFSection v-bind="args">
        <p>カバー画像付きのセクションです。画像はセクションの上部に表示されます。</p>
        <p style="margin-top: 1rem;">実際の使用例として、メッセージセクションやスポンサー募集セクションなどがあります。</p>
      </VFSection>
    </div>
  `,
});

export const CustomHeadingLevel: StoryFn = args => ({
  components: { VFSection },
  setup: () => ({
    args: {
      ...args,
      title: "見出しレベルカスタマイズ",
      heading: 3,
    },
  }),
  template: `
    <div style="max-width: 1000px; margin: 0 auto;">
      <VFSection v-bind="args">
        <p>見出しレベルをカスタマイズしたセクションです。このサンプルでは H3 を使用しています。</p>
      </VFSection>
    </div>
  `,
});

export const WithId: StoryFn = args => ({
  components: { VFSection },
  setup: () => ({
    args: {
      ...args,
      title: "ID付きセクション",
      id: "custom-section-id",
    },
  }),
  template: `
    <div style="max-width: 1000px; margin: 0 auto;">
      <VFSection v-bind="args">
        <p>ID付きのセクションです。このセクションの見出しには id="custom-section-id" が設定されています。</p>
        <p style="margin-top: 1rem;">アンカーリンクに使用したり、CSSでスタイリングする際に便利です。</p>
      </VFSection>
    </div>
  `,
});
