// ! api/ に移行するかも

import type { Speaker } from "../speaker";

const evan = {
  id: "yyx990803",
  name: "Evan You",
  title: "Vue.js、Vite クリエーター",
  talkSchedule: "10:10 - 10:50",
  talkTrack: "hacomono" as const,
  avatarUrl: "/images/avatars/evan-you.png",
  attendedIndex: 1,
  color: "default" as const,
  socialUrls: {
    github: "https://github.com/yyx990803",
    x: "https://x.com/youyuxi",
    bluesky: "https://bsky.app/profile/evanyou.me",
  },
};

export const SESSION_SPEAKERS: Speaker[] = [
  evan,
  {
    id: "danielroe",
    name: "Daniel Roe",
    title: "Nuxt コアチームリード",
    talkSchedule: "12:50 - 13:20",
    talkTrack: "hacomono",
    avatarUrl: "/images/avatars/daniel-roe.png",
    attendedIndex: 4,
    color: "purple",
    talkTitle: import.meta.vfFeatures.guestDetailsDaniel ? "フレームワークを超えて：次の10年のウェブを築く" : "TBD",
    talkOverview: import.meta.vfFeatures.guestDetailsDaniel
      ? `フロントエンドのツール群は驚くほどのスピードで進化していますが、優れたウェブアプリケーションの基盤は驚くほど変わらずに存在しています。

本講演では、Daniel がフレームワークの移行からホスティング環境の変化に至るまで、技術の移り変わりを乗り越えて発展し続けるプロジェクトの設計方法を探ります。
Nuxt コアチームを率いる経験や、世界中の開発者コミュニティとの協働から得た知見をもとに、Daniel はパターン、落とし穴、そしてソフトウェアを「強靭で適応力があり、そして楽しく開発できるもの」にするための実践的な戦略を共有します。`
      : undefined,
    socialUrls: {
      github: "https://github.com/danielroe",
      bluesky: "https://bsky.app/profile/danielroe.dev",
    },
  },
  {
    id: "johnsoncodehk",
    name: "Johnson Chu",
    title: "Vue.js コアチームメンバー、Volar.js 作者",
    talkSchedule: "13:35 - 14:05",
    talkTrack: "hacomono",
    avatarUrl: "/images/avatars/johnson-chu.png",
    attendedIndex: 5,
    color: "orange",
    // TODO:
    talkTitle: import.meta.vfFeatures.guestDetailsJohnson ? "TBD" : "TBD",
    talkOverview: import.meta.vfFeatures.guestDetailsJohnson ? undefined : undefined,
    socialUrls: {
      github: "https://github.com/johnsoncodehk",
      x: "https://x.com/johnsoncodehk",
    },
  },
  {
    id: "akryum",
    name: "Guillaume Chau",
    title: "Directus Web アーキテクト",
    talkSchedule: "14:20 - 14:50",
    talkTrack: "hacomono",
    avatarUrl: "/images/avatars/guillaume-chau.png",
    attendedIndex: 6,
    color: "navy",
    talkTitle: import.meta.vfFeatures.guestDetailsAkryum ? "rstoreとローカルファーストなストア構築の課題" : "TBD",
    talkOverview: import.meta.vfFeatures.guestDetailsAkryum
      ? `私たちは rstore とは何か、そして柔軟な状態管理ソリューションとしてどのように機能するのかを探っていきます。

次のような興味深い問いに答えていきましょう。
・「ローカルファースト」とはどういう意味なのか？
・rstore は Pinia とどう違うのか？
・どのようにして多様なユースケースをサポートできる拡張性を実現したのか？
・「データフェデレーション」とは何か？
・オフライン同期エンジンはどのように作るのか？`
      : undefined,
    socialUrls: {
      github: "https://github.com/Akryum",
      x: "https://x.com/Akryum",
      bluesky: "https://bsky.app/profile/guillaume.akryum.dev",
    },
  },
  {
    id: "baku89",
    name: "橋本 麦",
    title: "映像作家",
    talkSchedule: "15:05 - 15:35",
    talkTrack: "hacomono",
    avatarUrl: "/images/avatars/baku-hashimoto.png",
    attendedIndex: 7,
    color: "default",
    talkTitle: import.meta.vfFeatures.guestDetailsBaku ? "Vue.jsでつくる実験映像" : "TBD",
    talkOverview: import.meta.vfFeatures.guestDetailsBaku ? "映像作家として、Vue.jsを使って自作のモーショングラフィックス制作ツールやUIライブラリを開発しながら、コマ撮りやミュージック・ビデオづくりを行ってきました。本セッションでは、非エンジニア視点でのVueの活用法、創作フローにおけるGUI開発の役割、そして表現とツール開発が交差する実践例を紹介します。" : undefined,
    socialUrls: {
      github: "https://github.com/baku89",
      x: "https://x.com/_baku89",
    },
  },
  {
    id: "hi-ogawa",
    name: "小川 浩志",
    affiliation: "VoidZero Inc.",
    title: "Vitest、Vite コアチームメンバー",
    talkSchedule: "13:35 - 14:05",
    talkTrack: "mates",
    avatarUrl: "/images/avatars/hi-ogawa.png",
    attendedIndex: 8,
    color: "purple",
    talkTitle: import.meta.vfFeatures.guestDetailsOgawa ? "Inside Vitest: テストフレームワークアーキテクチャの詳細解説" : "TBD",
    talkOverview: import.meta.vfFeatures.guestDetailsOgawa
      ? `このトークでは、Vitestのアーキテクチャ的な独自性について探求します。Viteの幅広いフレームワークエコシステムとプラグイン機能の活用方法、Node.js、ブラウザ、エッジ環境でテストを実行可能にするランタイム非依存アーキテクチャ、そしてモッキング、カバレッジ、テストの並列実行システムなどのコア機能の実装について解説します。
内部構造を理解することで、ソフトウェア開発ワークフローを改善するためのテストの書き方やとパフォーマンス最適化を学ぶことができます。`
      : undefined,
    socialUrls: {
      github: "https://github.com/hi-ogawa",
      bluesky: "https://bsky.app/profile/hiogawa.bsky.social",
      x: "https://twitter.com/hiroshi_18181",
    },
  },
  {
    id: "leaysgur",
    name: "杉浦 有右嗣",
    affiliation: "VoidZero Inc.",
    title: "Oxc コアチームメンバー",
    talkSchedule: "12:50 - 13:20",
    talkTrack: "mates",
    avatarUrl: "/images/avatars/yuji-sugiura.png",
    attendedIndex: 9,
    color: "orange",
    talkTitle: import.meta.vfFeatures.guestDetailsLeaysgur ? "OXCというOSSへの貢献と、その振り返り" : "TBD",
    talkOverview: import.meta.vfFeatures.guestDetailsLeaysgur
      ? `OXCは、Rust製のJavaScript関連ツール群を扱うOSSです。
そのOXCに貢献するようになって、1年半以上が経っていました。
これまで、どういった想いでOSS活動を続けてきたか、またそれはどういう内容だったのかを一挙に振り返ります。`
      : undefined,
    socialUrls: {
      github: "https://github.com/leaysgur",
      x: "https://x.com/leaysgur",
    },
  },
  {
    id: "yamanoku",
    name: "やまのく",
    title: "会社員",
    talkSchedule: "12:50 - 13:20",
    talkTrack: "feature",
    avatarUrl: "/images/avatars/yamanoku.png",
    color: "default",
    talkTitle: "生成AI時代のWebアプリケーションアクセシビリティ改善",
    talkOverview: "本セッションでは、Webアプリケーションのアクセシビリティを改善していくために2025年10月時点での生成AI技術を活用したVue.js / Nuxtによる開発だけに限らない汎用的な改善手法についてを紹介します。\nこのセッションを聴いて明日から使える具体的なツール選定の勘所と思考のフレームワークと具体的なアクションプランを提示します。\n誰もが使えるプロダクトを届けるため、すべての開発者へ新たな武器となる活用を一緒に探求していきます。",
    socialUrls: {
      github: "https://github.com/yamanoku",
      x: "https://x.com/yamanoku",
      bluesky: "https://bsky.app/profile/yamanoku.net",
    },
  },
  {
    id: "neginasu",
    name: "ねぎなす",
    affiliation: "株式会社デザインワン・ジャパン",
    title: "フロントエンドエンジニア",
    talkSchedule: "13:35 - 14:05",
    talkTrack: "feature",
    avatarUrl: "/images/avatars/neginasu.png",
    color: "purple",
    talkTitle: "Vueのバリデーション、結局どれを選べばいい？\n― 自作バリデーションの限界と、脱却までの道のり ―",
    talkOverview: "Vue 3をベースにした弊社プロダクトでは、長年にわたり自作のバリデーションロジックを使い続けてきました。しかしその運用は次第に限界を迎えつつありました。\nドキュメント不足、仕様のばらつき、複雑な独自仕様による学習コストの高さ──これらの課題が積み重なり、保守性は年々低下。技術的負債として無視できないものになっていました。\n\n本セッションでは、こうした背景をふまえ、Vueの主要なバリデーションライブラリ（Vuelidate、vee-validate、Zodなど）をどう比較・検討し、最終的にどのような観点で選定・導入を決断したのか、そのプロセスを詳しくご紹介します。\nまた、単にライブラリを選ぶだけでなく、\n\n・ライブラリ導入で得られた実際のメリット（公式ドキュメントの充実、習得のしやすさ、メンテナンス性の向上）\n・レガシーな自作バリデーションから移行する際に直面したリアルな課題\n・部分的な共存戦略や段階的な移行手法\n\nなど、「理想と現実のギャップをどう埋めたか」にもフォーカスします。\n対象は、\n\n・既存の自作バリデーションに限界を感じている方\n・Vue 3環境でのバリデーションライブラリ導入を検討している開発チーム\n\nプロダクトの技術的負債に立ち向かい、より健全な開発体験を目指すためのヒントを得られることを目的としています。\n",
    socialUrls: {
      github: "https://github.com/neginasu",
      x: "https://x.com/neginasu_grid",
      bluesky: "https://bsky.app/profile/neginasu-grid.bsky.social",
    },
  },
  {
    id: "toddeTV",
    name: "Thorsten Seyschab",
    affiliation: "自営業",
    title: "コンピューターサイエンティスト、ウェブエンジニア",
    talkSchedule: "14:20 - 14:50",
    talkTrack: "mates",
    avatarUrl: "/images/avatars/todde-tv.jpg",
    color: "orange",
    talkTitle: "Vue で 3D を楽しむ",
    talkOverview: "VueJSを使ってウェブショップにインタラクティブな3D体験をもたらしたり、ミニゲームを作成したりする方法について考えたことはありませんか？没入感のあるウェブベースアプリケーションを作成するために、VueJSとWebGLを組み合わせた汎用性を発見しましょう。このトークでは、WebGL Render APIの技術的な深さと、その強力なラッパーライブラリであるThreeJSとTresJSを紹介し、ブラウザで第三次元を解き放つ方法を実演します。\nウェブベースの3D開発に興味を持つ初心者と愛好者を対象としたこのトークでは、これらの技術の課題、制限、そして可能性を案内します。ミニゲームのコンセプトへの先行的な覗き見を含む、実世界のプロジェクトから得られた洞察を獲得できます。eコマースからゲーミングまで、様々なアプリケーションにこれらのツールを統合する方法についての包括的な理解を持って帰ることができます。",
    socialUrls: {
      github: "https://github.com/toddeTV",
      x: "https://x.com/toddeTV",
      bluesky: "https://bsky.app/profile/todde.tv",
    },
  },
  {
    id: "naitokosuke",
    name: "ナイトウコウスケ",
    affiliation: "株式会社メイツ",
    title: "フロントエンドエンジニア",
    talkSchedule: "14:20 - 14:50",
    talkTrack: "feature",
    avatarUrl: "/images/avatars/naitokosuke.png",
    color: "navy",
    talkTitle: "最高の DX -\nNuxt Typed Router と Pinia Colada で実現する次世代 Vue/Nuxt 開発",
    talkOverview: `「ルート名の typo でまたエラー」
「データフェッチングの状態管理で毎回同じボイラープレート」
「TypeScript 使ってるのにルーティングは文字列頼み」

Vue/Nuxt 開発でのこんな日常的なストレスを解決したくありませんか？

本セッションでは、Nuxt Typed Router と Pinia Colada を使った実践的な DX 改善手法をお伝えします。
ファイルベースルーティングによる自動型生成で、ルート名・パラメータの補完が効くようになり、宣言的なデータフェッチングでローディング・エラー状態の管理から解放されます。

型情報が豊富で宣言的なコードは、開発者だけでなく AI にとっても理想的な環境を提供します。
「面倒な作業」から「本質的な開発」へとシフトし、AI 時代の開発スタイルに最適化された環境構築の具体的な方法を、実際のコード例と導入時の注意点も含めて詳しくご紹介します。`,
    socialUrls: {
      github: "https://github.com/naitokosuke",
      x: "https://x.com/@naitokosuke",
      bluesky: "https://bsky.app/profile/n-aito.bsky.social",
    },
  },
  {
    id: "vados-cosmonic",
    name: "Victor",
    affiliation: "Cosmonic",
    title: "バックエンドエンジニア",
    talkSchedule: "15:05 - 15:35",
    talkTrack: "mates",
    avatarUrl: "/images/avatars/vados-cosmonic.png",
    color: "purple",
    talkTitle: "New Vue：サーバーサイドで動く WebAssembly/WASI プラットフォーム",
    talkOverview: "もはや昔ながらの emscriptenではありません。WebAssembly のサーバーサイドの時代が到来しました。WebAssembly System Interface（WASI）と WebAssembly Components によって実現されるこの新時代において、Vue アプリがどのようにこのプラットフォームに適合するのかをご紹介します。\nこのトークでは、サーバーサイド WebAssembly とは何か、それを使う利点は何か、Vue + Vite が、ほとんど手間をかけることなく、この新しいプラットフォームへのアクセスを実現する方法をご紹介します。",
    socialUrls: {
      github: "https://github.com/vados-cosmonic",
      x: "https://x.com/vadosware",
    },
  },
  {
    id: "hiranuma",
    name: "平沼 真吾",
    affiliation: "株式会社GENEROSITY",
    title: "CTO",
    talkSchedule: "15:05 - 15:35",
    talkTrack: "feature",
    avatarUrl: "/images/avatars/hiranuma.jpg",
    color: "default",
    talkTitle: "Vue 3.6時代のリアクティビティ最前線 〜Vapor/alien-signalsの実践とパフォーマンス最適化〜",
    talkOverview: "Alien Signalsとは\nVue 3.6で導入された新しいリアクティビティシステム「Alien Signals」により、状態変更の処理効率が大幅に向上。メモリ使用量はVue 3.5比で14%削減され、計算プロパティや副作用の最適化も実現。これにより、大規模なSPAでもパフォーマンス低下を感じにくくなります。\n\nVapor Modeの革新\nVapor ModeはVirtual DOMのオーバーヘッドを排除し、コンポーネントから直接DOMを生成。APIの変更なしで導入でき、100,000コンポーネントを100msでマウント可能という圧倒的なパフォーマンスを実現しています。\n\n実践Tips\n既存プロジェクトでの移行手順、リアクティビティの落とし穴、Vapor Mode適用時のベストプラクティス、SolidJSなど他フレームワークとの比較も交えて解説します。",
    socialUrls: {
      github: "https://github.com/hiranuma",
      x: "https://x.com/waka_405",
      bluesky: "https://bsky.app/profile/waka405.bsky.social",
    },
  },
  {
    id: "wattanx",
    name: "wattanx",
    affiliation: "STORES 株式会社",
    title: "デザインエンジニア / nuxt ecosystem team",
    avatarUrl: "/images/avatars/wattanx.png",
    color: "purple",
    talkTitle: "Demystifying Nuxt Test Utils",
    talkOverview: `Nuxt アプリケーションを Vitest と @vue/test-utils だけでテストしようとすると、プラグインや ミドルウェア、さらにはサーバーサイドレンダリングまで本番と同じ条件を再現するのは容易ではありません。

こうした課題を解決してくれるのが @nuxt/test-utils です。本セッションでは 実際の現場で役立つ Tips や具体的な使い方だけでなく、テスト環境上で Nuxt がどのように動作するのか、その仕組みを解説します。

このセッションを通じて、より多くの開発者が “明日から現場で使える知識” と “仕組みへの理解” の両方を持ち帰り、効率的に Nuxt アプリケーションをテストできるようになることを目指します。`,
    talkSchedule: "15:45 - 16:15",
    talkTrack: "mates",
    socialUrls: {
      github: "https://github.com/wattanx",
      x: "https://x.com/pontaxx",
      bluesky: "https://bsky.app/profile/@wattanx.dev",
    },
  },
  {
    id: "sayn0",
    name: "sayn0",
    affiliation: "エン株式会社",
    title: "フロントエンドエンジニア",
    talkSchedule: "15:50 - 16:20",
    talkTrack: "feature",
    avatarUrl: "/images/avatars/sayn0.jpg",
    color: "orange",
    talkTitle: "AI駆動で進める依存ライブラリ更新 ─ Vue プロジェクトの品質向上と開発スピード改善の実践録",
    talkOverview: "依存ライブラリの更新は「地味だけれど怖い」作業です。しかし AI の急速な進化によって、そのアップデート体験は確実に変わり始めています。\n本セッションでは、Cursor や Claude Code などの AI ツールを活用し、実サービスの Vue コードベースを AI 駆動でアップグレードした事例を取り上げます。具体的には次のポイントを掘り下げます。\n・影響調査からコード変換、テスト自動生成までを半自動化\n・AI を QA プロセスに組み込み、仕様書とテストケースをリアルタイムで照合\n・プロジェクトバッファ／制約スラックを簡易可視化し、潜在リスクを先読み\n・ビルド時間、バンドルサイズ、循環的複雑度など、複数指標で体感できる改善を確認\n・AI の提案をログとして蓄積し、レビューと再学習へつなげる継続改善サイクル\nAI を導入して何が楽になり、どの壁にぶつかったのか――数値化しにくい「肌感覚」も交えて率直に共有します。",
    socialUrls: {
      x: "https://x.com/sayn0de",
    },
  },
  {
    id: "yuichkun",
    name: "Yuichi Yogo",
    affiliation: "Escentier",
    title: "音楽家、エンジニア",
    talkSchedule: "16:35 - 17:05",
    talkTrack: "feature",
    avatarUrl: "/images/avatars/yuichkun.jpg",
    color: "navy",
    talkTitle: "オーディオアプリケーションをWebでつくる",
    talkOverview: `概要:
ウェブアプリはもはや無音ではありません。
Web Audio API、WebAssembly、そしてGPUアクセラレーションの進化により、ブラウザ上のオーディオはネイティブ環境に匹敵するレベルに到達しています。本セッションでは、Vue（および、より広いフロントエンド）開発者に向けて、パフォーマンスやユーザー体験を損なうことなくリアルタイムのオーディオ処理をアプリに統合するための、実践的で本番運用に耐える戦略を解説します。

主なポイント:
- Web Audio API & AudioWorklet – ブラウザで自在なDSP(音声信号処理)を実現するための基盤
- RNBO → WebAssembly – Cycling '74のRNBOでオーディオモジュールを素早くプロトタイプし、WebAssemblyを通じてウェブにデプロイする
- JUCE – オーディオデベロッパーコミュニティで広く使われているフレームワークとしてのJUCEをざっくり概説
- GPU-Accelerated Audio – DSPをGPUにオフロードして大規模並列性を活用する新たなパターンを探る
- ブラウザの制約 – 現状の各種ブラウザのオーディオ周りの制約と、ワークアラウンドを紹介

対象者:
Vue.jsをビジュアルの枠を超えて、没入型の音響体験へと拡張したいフロントエンドエンジニア、クリエイティブコーダー、オーディオデベロッパー。

前提知識:
JavaScript/TypeScriptとVue.jsの基本的な知識。
DSP(音声信号処理)の予備知識は不要です。`,
    socialUrls: {
      github: "https://github.com/yuichkun",
      x: "https://x.com/yogo_escentier",
    },
  },
  {
    id: "antfu",
    name: "Anthony Fu",
    affiliation: "NuxtLabs",
    title: "デザインエンジニア",
    talkSchedule: "17:25 - 17:50",
    talkTrack: "feature",
    avatarUrl: "/images/avatars/antfu.png",
    color: "navy",
    talkTitle: "Introducing Vite DevTools",
    talkOverview: "新しい Vite DevTools の紹介と、その開発の背景、実際の画面を少しお見せしながら、今後のビジョンについてご説明します。Rolldown や Vite の活用がどのように変わっていくのかもご紹介します。",
    socialUrls: {
      github: "https://github.com/antfu",
      x: "https://x.com/antfu7",
      bluesky: "https://bsky.app/profile/antfu.me",
    },
  },
];

export const LT_SPEAKERS: Speaker[] = [
  {
    id: "ssssota",
    name: "ssssota",
    affiliation: "株式会社ZOZO",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/ssssota.png",
    color: "default",
    talkTitle: "なんでRustの環境構築してないのにRust製のツールが動くの？",
    talkOverview: "最近はRust製のツールが幅を利かせています。RolldownやBiomeなんかは最近よく聞きます。\nVoidZeroという会社は「次世代のJavaScriptツールチェーンを作る」と言いながらRustのプロジェクトが半数を占めているという噂も。\n\nJavaScript/TypeScript系エンジニアである我々は気付かないうちにRust製のソフトウェアを使っているようです。\nRustの開発・実行環境なんて用意した記憶がないのに...。\n\n改めてRust製のツールが（JavaScriptと協調しながら）動く仕組みをおさらいしましょう。",
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {
      github: "https://github.com/ssssota",
      x: "https://x.com/ssssotaro",
      bluesky: "https://bsky.app/profile/ssssota.bsky.social",
    },
  },
  {
    id: "NaokiHaba",
    name: "Naoki Haba",
    affiliation: "株式会社 コドモン",
    title: "ソフトウェアエンジニア",
    avatarUrl: "/images/avatars/naokihaba.png",
    color: "purple",
    talkTitle: "Nuxt4のSingleton Data Fetching Layerで何が変わるのか",
    talkOverview: "Nuxt4で導入されるSingleton Data Fetching Layerは、従来のuseFetch/useAsyncDataの問題点を根本的に解決する新しいアーキテクチャです。本LTでは、メモリ使用量の削減、リアクティブキーのサポート、自動的なデータクリーンアップなど、パフォーマンスと開発体験を劇的に改善する新機能を5分間で解説します。",
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {
      github: "https://github.com/NaokiHaba",
      x: "https://x.com/naokihaba",
      bluesky: "https://bsky.app/profile/naokihaba.bsky.social",
    },
  },
  {
    id: "2nofa11",
    name: "ツノ",
    affiliation: "弁護士ドットコム株式会社",
    title: "フロントエンジニア",
    avatarUrl: "/images/avatars/tsuno.jpeg",
    color: "orange",
    talkTitle: "アウトプットから始めるOSSコントリビューション\n〜eslint-plugin-vueの場合〜",
    talkOverview: "開発者の中には、「OSSに貢献したいけど難しそう」と感じている方が多いと思います（私もそうです）。\n\nTSKaigi 2025 にて、Anthony Fu 氏が登壇し、eslint-typegen というライブラリを紹介していました。\neslint-typegen に興味を持ち、学習した内容を社外に向けて登壇という形でアウトプットしました。\nこの経験がきっかけとなり、eslint-plugin-vue に eslint-typegen を追加する機会をいただきました。\n\n本LTでは上記を振り返りながら、「OSSの世界は意外と身近である」ことを伝えます。\n具体的には下記の内容を想定しています。\n\n1. 小さな発表やアウトプットが、OSS貢献のきっかけとなったプロセスについて\n2. OSSへの貢献を通じて、技術的に成長できたこと\n3. Vueエコシステムのコミュニティに、OSS参加を歓迎する文化があること",
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {
      github: "https://github.com/2nofa11",
      x: "https://x.com/2nofa11",
    },
  },
  {
    id: "rinchoku",
    name: "Rinchoku",
    title: "エンジニア",
    avatarUrl: "/images/avatars/rinchoku.jpg",
    color: "navy",
    talkTitle: "知覚とデザイン short version",
    talkOverview: "現在では「UI/UX」はありきたりの言葉になりました。\nユーザーストーリーを考慮した導線設計、デザインスタイルガイドを作成することでユーザーに見せるデザインの統一性・アクションをわかりやすくしています。\n\n人間が目から取得した情報を脳がどのように処理するかを理解することで、普段のデザインの見方に対して新しい所見を与えられればと思います。",
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {
      github: "https://github.com/rinchoku",
      x: "https://x.com/stupid_owl",
    },
  },
  {
    id: "noriyuki-shimizu",
    name: "shiminori",
    affiliation: "フリーランス",
    title: "フロントエンジニア",
    avatarUrl: "/images/avatars/shiminori.jpg",
    color: "default",
    talkTitle: "Nuxt 認証基盤作成における Cookie 状態管理のポイント",
    talkOverview: "Nuxt において独自の認証基盤を構築する際の、Cookie を用いた状態管理のポイントについて共有させていただきます。\n\n現時点では、Nuxt におけるメールアドレスおよびパスワードによる認証に関して、安定して利用できるサードパーティ製のソリューションが存在しません。\n\nそのため、独自に認証機構を実装した際の工夫点や注意点についてお伝えいたします。  \n特に、`useCookie` コンポーザブルを使用するだけでは期待通りに動作しなかった背景についても説明できればと考えております。\n",
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {
      github: "https://github.com/noriyuki-shimizu",
      x: "https://x.com/@smnr14785228",
    },
  },
  {
    id: "Crayfisher-zari",
    name: "にしはら",
    affiliation: "株式会社ICS",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/crayfisher_zari.jpg",
    color: "purple",
    talkTitle: "個人でデジタル庁のデザインシステムをVue.jsで作っている話",
    talkOverview: "デジタル庁が公開しているデザインシステムをVue.jsで実装した話について発表します。デザインシステムを作っていく中で感じた強力なv-modelやcomputedの魅力などをお伝えします。",
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {
      github: "https://github.com/Crayfisher-zari",
      x: "https://x.com/@crayfisher_zari",
      bluesky: "https://bsky.app/profile/crayfisher-zari.bsky.social",
    },
  },
  {
    id: "yut0naga1",
    name: "永井優斗",
    affiliation: "フューチャーアーキテクト株式会社",
    title: "シニアコンサルタント",
    avatarUrl: "/images/avatars/yut0naga1.jpg",
    color: "orange",
    talkTitle: "React Nativeならぬ\"Vue Native\"が実現するかも？\n新世代マルチプラットフォーム開発フレームワークのLynxとLynxのVue.js対応を追ってみよう",
    talkOverview: "2025年3月、TikTokやCapCutなどを運営していることで有名なByteDance社が、新世代のモバイル向けマルチプラットフォーム開発フレームワークであるLynxを公開、OSSとして発表しました。\nこのLynx、Vue.jsに対応しようとしているそうです。ReactユーザーにとってのReact Nativeのように、Vue.jsのユーザーがキャッチアップ工数少なくモバイルネイティブアプリ開発ができるようになるかもしれません。\n\n実際、LynxのVue.jsの対応（以下Vue+Lynxと表現します）に向けてはVueクリエイターのEvan You氏がLynxのVue+Lynxを支援することをXで表明したり、VueコミュニティのRahul Vashishtha氏がVue+LynxのプロトタイプをGithub上で公開したりといった動きがあります。\n\nまだLynx自体公開されてから期間も短いこともあり、Vue+Lynxとなるとなかなか情報が少ないですし、日本語文献はもっと少ない（といいますかCfP書いてる時点で日本語での情報を少なくとも私は見つけられていない…）こともあり、なかなかこの話題が盛り上がっていないどころかほとんど見聞きしません。\n\nVashishtha氏のプロトタイプなどにも触れながら、Vue+LynxについてVueFes参加者のみなさんとワクワクを共有できたら幸いです。\n",
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {
      x: "https://x.com/yut0naga1",
    },
  },
  {
    id: "kaede-kato",
    name: "Kaede Kato",
    affiliation: "RIZAPテクノロジーズ株式会社",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/kaede-kato.png",
    color: "navy",
    talkTitle: "chocoZAPサービス予約システムをNuxtで内製化した話",
    talkOverview: `chocoZAPではこれまでセルフエステやセルフ脱毛などのサービス予約に外部サービスを利用していましたが、
この度サービス予約システムをNuxtで内製化しました。

これにより開発チームが主体的にシステムを設計・改善できるようになり、
API通信や認証も含めて自社で柔軟に改善できる体制を整えました。

本LTでは、その技術構成と工夫したポイントをご紹介します。`,
    talkSchedule: "16:25 - 17:25",
    talkTrack: "mates",
    socialUrls: {},
  },
];

export const PANEL_DISCUSSION_SPEAKERS: Speaker[] = [
  evan,
  {
    id: "gaearon",
    name: "Dan Abramov",
    affiliation: "React、Bluesky（以前）",
    avatarUrl: "/images/avatars/dan_abramov.png",
    attendedIndex: 2,
    color: "purple",
    socialUrls: {
      github: "https://github.com/gaearon",
      bluesky: "https://bsky.app/profile/danabra.mov",
    },
  },
  {
    id: "dominikg",
    name: "dominikg",
    title: " Svelte、Vite コアチームメンバー",
    avatarUrl: "/images/avatars/dominikg.png",
    attendedIndex: 3,
    color: "orange",
    socialUrls: {
      github: "https://github.com/dominikg",
      bluesky: "https://bsky.app/profile/dominikg.dev",
      mastodon: "https://elk.zone/m.webtoo.ls/@dominikg",
    },
  },
  {
    id: "kiaking",
    name: "Kia King Ishii",
    affiliation: "Global Brain",
    title: "Vue.js コアチームメンバー",
    avatarUrl: "/images/avatars/kiaking.png",
    color: "navy",
    socialUrls: {
      github: "https://github.com/kiaking",
      x: "https://x.com/KiaKing85",
    },
  },
];

export const STUDENT_SUPPORT_SPEAKERS: Omit<Speaker, "id" | "color">[] = [
  {
    name: "kazupon",
    affiliation: "株式会社プレイド",
    title: "Vue.js コアチームメンバー",
    avatarUrl: "/images/avatars/kazupon.png",
  },
  {
    name: "ubugeeei",
    affiliation: "株式会社メイツ",
    title: "Vue.js メンバー",
    avatarUrl: "/images/avatars/ubugeeei.png",
  },
  {
    name: "Anthony Fu",
    affiliation: "NuxtLabs / Vercel",
    title: "Vue・Nuxt・Vite コアチーム",
    avatarUrl: "/images/avatars/antfu.png",
  },
  {
    name: "Naoki Haba",
    affiliation: "株式会社コドモン",
    title: "ソフトウェアエンジニア",
    avatarUrl: "/images/avatars/naokihaba.png",
  },
];
