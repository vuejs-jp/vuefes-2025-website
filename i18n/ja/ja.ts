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
  contactForm: {
    title: "お問合せ",
    description:
      "Vue Fes Japan にご興味をいただき、ありがとうございます。Vue Fes Japan へのご質問およびお問い合わせは、以下のフォームよりお願いいたします。通常、担当者より 3 営業日以内にご返信いたします。3 営業日以内に返信がない場合、お手数ですが再度お問い合わせください。",
    formFields: {
      name: { label: "お名前", placeholder: "入力例：山田太郎" },
      email: {
        label: "メールアドレス",
        placeholder: "入力例：hello{'@'}vuefes.jp",
      },
      content: { label: "お問合せ内容", placeholder: "入力例：お問い合わせ" },
      submit: { label: "送信する" },
    },
  },
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
  backTop: "トップに戻る",

  validation: {
    required: "{target}の入力は必須です。",
    email: "メールアドレスが正しい形式ではありません。",
  },
} satisfies MessageSchema;
