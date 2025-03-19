import type { MessageSchema } from "../message-schema";

export default {
  nuxtSiteConfig: {
    name: "Vue Fes Japan 2025",
    description: "description [japanese]",
  },
  mainVisual: {
    imageAlt:
      "Vue Fes Japan 2025のメインビジュアル。VueをイメージしたVのシルエットと、日本の日の丸をイメージした丸のシルエットが横に並んでいる。色はVue.jsのロゴに使われている2色の色から作られた深い抹茶のような色で、丸のシルエットには日本の伝統をイメージし、金色の墨流し模様が描かれている。",
    webglAlt: "TODO",
  },
  logo: {
    alt: "Vue Fes Japan 2025 ロゴ。VueをイメージしたVのシルエットと、日本の日の丸をイメージした丸のシルエットが横に並んでいる。色はVue.jsのロゴに使われている2色の色から作られた深い抹茶のような色。",
  },
  message: "メッセージ",
  messageCoverImageAlt:
    "Vue Fes Japan 2025。VueをイメージしたVのシルエットと、日本の日の丸をイメージした丸のシルエットが横に並んでいる。色はVue.jsのロゴに使われている2色の色から作られた深い抹茶のような色。ロゴの右には同じ抹茶色でVue Fes Japan 2025と描かれている。",
  sponsorWanted: "スポンサー募集",
  sponsorWantedCoverImageAlt: "Sponsor Wantedのカバー画像",
  sponsorApplyButton: "スポンサー応募はこちら",
  snsIntroduction: "最新情報は公式SNSをご覧ください",
  snsIconImageAlt: {
    x: "X(旧Twitter)アイコン",
    youtube: "YouTubeアイコン",
    github: "GitHubアイコン",
    note: "noteアイコン",
  },
  privacyPolicy: "プライバシーポリシー",
  coc: "行動規範",
  transactions: "特定商取引法に基づく表示",
} satisfies MessageSchema;
