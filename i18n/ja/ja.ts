import type { MessageSchema } from "../message-schema";

export default {
  nuxtSiteConfig: {
    name: "Vue Fes Japan 2025",
    description:
      "2025年10月25日（土）に開催される日本最大級の Vue.jsカンファレンスです。国内外の著名スピーカーによるセッションの他、LT、ハンズオン、グッズ販売などのイベントも企画しています。ぜひ一緒にVue.jsを楽しみ、盛り上げていきましょう！",
  },
  mainVisual: {
    imageAlt:
      "Vue Fes Japan 2025のメインビジュアル。VueをイメージしたVのシルエットと、日の丸をイメージした丸のシルエットが横に並んでいる。色は深い抹茶のような色をしており、丸のシルエットには金色の墨流し模様が描かれている。",
    webglAlt:
      "Vue Fes Japan 2025のメインビジュアルアニメーション。VueをイメージしたVのシルエットと、日本の日の丸をイメージした丸のシルエットが横に並んでおり、丸のシルエットには金色の墨流し模様が描かれている。墨が流れるアニメーションとともに一定時間で色が変化している。",
  },
  logo: {
    alt: "Vue Fes Japan 2025 ロゴ。VueをイメージしたVのシルエットと、日本の日の丸をイメージした丸のシルエットが横に並んでいる。色はVue.jsのロゴに使われている2色の色から作られた深い抹茶のような色。",
  },
  animation: {
    play: "アニメーションを再生",
    pause: "アニメーションを停止",
  },
  message: "メッセージ",
  messageCoverImageAlt:
    "Vue Fes Japan 2025。VueをイメージしたVのシルエットと、日本の日の丸をイメージした丸のシルエットが横に並んでいる。色はVue.jsのロゴに使われている2色の色から作られた深い抹茶のような色。ロゴの右には同じ抹茶色でVue Fes Japan 2025と描かれている。",
  sponsorWanted: "スポンサー募集",
  sponsorWantedCoverImageAlt: "Sponsor Wantedのカバー画像",
  sponsorApplyButton: "スポンサー応募はこちら",
  contactForm: {
    title: "お問い合わせ",
    description:
      "Vue Fes Japan にご興味をいただき、ありがとうございます。Vue Fes Japan へのご質問およびお問い合わせは、以下のフォームよりお願いいたします。通常、担当者より 3 営業日以内にご返信いたします。3 営業日以内に返信がない場合、お手数ですが再度お問い合わせください。",
    formFields: {
      name: { label: "お名前", placeholder: "入力例：山田太郎" },
      email: {
        label: "メールアドレス",
        placeholder: "入力例：hello{'@'}vuefes.jp",
      },
      content: {
        label: "お問い合わせ内容",
        placeholder: "入力例：お問い合わせ",
      },
      submit: { label: "送信する" },
    },
    successMessage: "送信しました",
    errorMessage: "送信に失敗しました。もう一度お試しください。",
  },
  snsIntroduction: "最新情報は公式SNSをご覧ください",
  snsIconImageAlt: {
    x: "X(旧Twitter)アイコン",
    bluesky: "Blueskyアイコン",
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
