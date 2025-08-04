// ! api/ に移行するかも

import type { Speaker } from "../speaker";

const evan = {
  name: "Evan You",
  title: "Vue.js、Vite クリエーター",

  avatarUrl: "/images/avatars/evan-you.png",
  attendedIndex: 1,
  socialUrls: {
    github: "https://github.com/yyx990803",
    x: "https://x.com/youyuxi",
    bluesky: "https://bsky.app/profile/evanyou.me",
  },
};

export const SESSION_SPEAKERS: Speaker[] = [
  evan,
  {
    name: "Daniel Roe",
    title: "Nuxt コアチームリード",
    avatarUrl: "/images/avatars/daniel-roe.png",
    attendedIndex: 4,
    socialUrls: {
      github: "https://github.com/danielroe",
      bluesky: "https://bsky.app/profile/danielroe.dev",
    },
  },
  {
    name: "Johnson Chu",
    title: "Vue.js コアチームメンバー、Volar.js 作者",
    avatarUrl: "/images/avatars/johnson-chu.png",
    attendedIndex: 5,
    socialUrls: {
      github: "https://github.com/johnsoncodehk",
      x: "https://x.com/johnsoncodehk",
    },
  },
  {
    name: "Guillaume Chau",
    title: "Directus Web アーキテクト",
    avatarUrl: "/images/avatars/guillaume-chau.png",
    attendedIndex: 6,
    socialUrls: {
      github: "https://github.com/Akryum",
      x: "https://x.com/Akryum",
      bluesky: "https://bsky.app/profile/guillaume.akryum.dev",
    },
  },
  {
    name: "橋本 麦",
    title: "映像作家",
    avatarUrl: "/images/avatars/baku-hashimoto.png",
    attendedIndex: 7,
    socialUrls: {
      github: "https://github.com/baku89",
      x: "https://x.com/_baku89",
    },
  },
  {
    name: "小川 浩志",
    affiliation: "VoidZero Inc.",
    title: "Vitest、Vite コアチームメンバー",
    avatarUrl: "/images/avatars/hi-ogawa.png",
    attendedIndex: 8,
    socialUrls: {
      github: "https://github.com/hi-ogawa",
      bluesky: "https://bsky.app/profile/hiogawa.bsky.social",
      x: "https://twitter.com/hiroshi_18181",
    },
  },
  {
    name: "杉浦 有右嗣",
    affiliation: "ピクセルグリッド",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/yuji-sugiura.png",
    attendedIndex: 9,
    socialUrls: {
      github: "https://github.com/leaysgur",
      x: "https://x.com/leaysgur",
    },
  },
  {
    name: "Anthony Fu",
    affiliation: "NuxtLabs",
    title: "デザインエンジニア",
    avatarUrl: "/images/avatars/antfu.png",
    talkOverview: "新しい Vite DevTools の紹介と、その開発の背景、実際の画面を少しお見せしながら、今後のビジョンについてご説明します。Rolldown や Vite の活用がどのように変わっていくのかもご紹介します。",
    socialUrls: {
      github: "https://github.com/antfu",
      x: "https://x.com/antfu7",
      bluesky: "https://bsky.app/profile/antfu.me",
    },
  },
  {
    name: "やまのく",
    title: "会社員",
    avatarUrl: "/images/avatars/yamanoku.png",
    talkOverview: "本セッションでは、Webアプリケーションのアクセシビリティを改善していくために2025年10月時点での生成AI技術を活用したVue.js / Nuxtによる開発だけに限らない汎用的な改善手法についてを紹介します。このセッションを聴いて明日から使える具体的なツール選定の勘所と思考のフレームワークと具体的なアクションプランを提示します。誰もが使えるプロダクトを届けるため、すべての開発者へ新たな武器となる活用を一緒に探求していきます。",
    socialUrls: {
      github: "https://github.com/yamanoku",
      x: "https://x.com/yamanoku",
      bluesky: "https://bsky.app/profile/yamanoku.net",
    },
  },
  {
    name: "ねぎなす",
    affiliation: "株式会社デザインワン・ジャパン",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/neginasu.png",
    talkOverview: "Vue 3をベースにした弊社プロダクトでは、長年にわたり自作のバリデーションロジックを使い続けてきました。しかしその運用は次第に限界を迎えつつありました。ドキュメント不足、仕様のばらつき、複雑な独自仕様による学習コストの高さ──これらの課題が積み重なり、保守性は年々低下。技術的負債として無視できないものになっていました。本セッションでは、こうした背景をふまえ、Vueの主要なバリデーションライブラリ（Vuelidate、vee-validate、Zodなど）をどう比較・検討し、最終的にどのような観点で選定・導入を決断したのか、そのプロセスを詳しくご紹介します。",
    socialUrls: {
      github: "https://github.com/neginasu",
      x: "https://x.com/neginasu_grid",
      bluesky: "https://bsky.app/profile/neginasu-grid.bsky.social",
    },
  },
  {
    name: "Thorsten Seyschab",
    affiliation: "自営業",
    title: "コンピューターサイエンティスト、ウェブエンジニア",
    avatarUrl: "/images/avatars/todde-tv.jpg",
    talkOverview: "VueJSを使ってウェブショップにインタラクティブな3D体験をもたらしたり、ミニゲームを作成したりする方法について考えたことはありませんか？没入感のあるウェブベースアプリケーションを作成するために、VueJSとWebGLを組み合わせた汎用性を発見しましょう。このトークでは、WebGL Render APIの技術的な深さと、その強力なラッパーライブラリであるThreeJSとTresJSを紹介し、ブラウザで第三次元を解き放つ方法を実演します。ウェブベースの3D開発に興味を持つ初心者と愛好者を対象としたこのトークでは、これらの技術の課題、制限、そして可能性を案内します。ミニゲームのコンセプトへの先行的な覗き見を含む、実世界のプロジェクトから得られた洞察を獲得できます。eコマースからゲーミングまで、様々なアプリケーションにこれらのツールを統合する方法についての包括的な理解を持って帰ることができます。",
    socialUrls: {
      github: "https://github.com/toddeTV",
      x: "https://x.com/toddeTV",
      bluesky: "https://bsky.app/profile/todde.tv",
    },
  },
  {
    name: "ナイトウコウスケ",
    affiliation: "株式会社メイツ",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/naitokosuke.png",
    talkOverview: "「ルート名の typo でまたエラー」「データフェッチングの状態管理で毎回同じボイラープレート」「TypeScript 使ってるのにルーティングは文字列頼み」Vue/Nuxt 開発でのこんな日常的なストレスを解決したくありませんか？本セッションでは、typed-router と Pinia Colada を使った実践的な DX 改善手法をお伝えします。ファイルベースルーティングによる自動型生成で、ルート名・パラメータの補完が効くようになり、宣言的なデータフェッチングでローディング・エラー状態の管理から解放されます。型情報が豊富で宣言的なコードは、開発者だけでなく AI にとっても理想的な環境を提供します。「面倒な作業」から「本質的な開発」へとシフトし、AI 時代の開発スタイルに最適化された環境構築の具体的な方法を、実際のコード例と導入時の注意点も含めて詳しくご紹介します。",
    socialUrls: {
      github: "https://github.com/naitokosuke",
      x: "https://x.com/@naitokosuke",
      bluesky: "https://bsky.app/profile/n-aito.bsky.social",
    },
  },
  {
    name: "平沼 真吾",
    affiliation: "株式会社GENEROSITY",
    title: "CTO",
    avatarUrl: "/images/avatars/hiranuma.jpg",
    talkOverview: "Alien SignalsとはVue 3.6で導入された新しいリアクティビティシステム「Alien Signals」により、状態変更の処理効率が大幅に向上。メモリ使用量はVue 3.5比で14%削減され、計算プロパティや副作用の最適化も実現。これにより、大規模なSPAでもパフォーマンス低下を感じにくくなります。Vapor ModeはVirtual DOMのオーバーヘッドを排除し、コンポーネントから直接DOMを生成。APIの変更なしで導入でき、100,000コンポーネントを100msでマウント可能という圧倒的なパフォーマンスを実現しています。既存プロジェクトでの移行手順、リアクティビティの落とし穴、Vapor Mode適用時のベストプラクティス、SolidJSなど他フレームワークとの比較も交えて解説します。",
    socialUrls: {
      github: "https://github.com/hiranuma",
      x: "https://x.com/waka_405",
      bluesky: "https://bsky.app/profile/waka405.bsky.social",
    },
  },
  {
    name: "Victor",
    affiliation: "Cosmonic",
    title: "バックエンドエンジニア",
    avatarUrl: "/images/avatars/vados-cosmonic.png",
    talkOverview: "もはや昔ながらの emscriptenではありません。WebAssembly のサーバーサイドの時代が到来しました。WebAssembly System Interface（WASI）と WebAssembly Components によって実現されるこの新時代において、Vue アプリがどのようにこのプラットフォームに適合するのかをご紹介します。このトークでは、サーバーサイド WebAssembly とは何か、それを使う利点は何か、Vue + Vite が、ほとんど手間をかけることなく、この新しいプラットフォームへのアクセスを実現する方法をご紹介します。",
    socialUrls: {
      github: "https://github.com/vados-cosmonic",
      x: "https://x.com/vadosware",
    },
  },
  {
    name: "sayn0",
    affiliation: "エン・ジャパン株式会社",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/sayn0.jpg",
    talkOverview: "依存ライブラリの更新は「地味だけれど怖い」作業です。しかし AI の急速な進化によって、そのアップデート体験は確実に変わり始めています。本セッションでは、Cursor や Claude Code などの AI ツールを活用し、実サービスの Vue コードベースを AI 駆動でアップグレードした事例を取り上げます。具体的には次のポイントを掘り下げます。・影響調査からコード変換、テスト自動生成までを半自動化・AI を QA プロセスに組み込み、仕様書とテストケースをリアルタイムで照合・プロジェクトバッファ／制約スラックを簡易可視化し、潜在リスクを先読み・ビルド時間、バンドルサイズ、循環的複雑度など、複数指標で体感できる改善を確認・AI の提案をログとして蓄積し、レビューと再学習へつなげる継続改善サイクル。AI を導入して何が楽になり、どの壁にぶつかったのか――数値化しにくい「肌感覚」も交えて率直に共有します。",
    socialUrls: {
      x: "https://x.com/sayn0de",
    },
  },
  {
    name: "Yuichi Yogo",
    affiliation: "Escentier",
    title: "ミュージシャン、エンジニア",
    avatarUrl: "/images/avatars/yuichkun.jpg",
    talkOverview: "Webアプリケーションは、もはや「無音」の存在ではありません。Web Audio API、WebAssembly、GPUアクセラレーションの進化により、ブラウザ上の音声処理は、ネイティブ環境にも匹敵するレベルへと到達しています。このセッションでは、Vue をはじめとするフロントエンド開発者に向けて、リアルタイム音声処理をアプリに統合するための、実践的で本番運用に対応した戦略を紹介します。パフォーマンスやユーザー体験を犠牲にすることなく、オーディオ処理の統合が可能になります。セッションで得られる主な知見：• Web Audio API & AudioWorklet：ブラウザ上での低遅延 DSP の基礎を構築• RNBO → WebAssembly：Cycling '74 の RNBO で制作したプロダクション対応のオーディオモジュールを WebAssembly 経由で Web にデプロイ• GPU アクセラレーテッド・オーディオ：DSP 処理を GPU にオフロードする新しい並列処理パターンを探求• ブラウザの制限：現時点での技術的制約と実用的な回避策の理解• デスクトップ × Web のハイブリッド開発：JUCE 8、WebView、Vue.js を組み合わせ、プラグインと Web UI の橋渡しを実現",
    socialUrls: {
      github: "https://github.com/yuichkun",
      x: "https://x.com/yogo_escentier",
    },
  },
];

export const LT_SPEAKERS: Speaker[] = [
  {
    name: "ssssota",
    affiliation: "株式会社ZOZO",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/ssssota.png",
    talkOverview: "最近はRust製のツールが幅を利かせています。RolldownやBiomeなんかは最近よく聞きます。VoidZeroという会社は「次世代のJavaScriptツールチェーンを作る」と言いながらRustのプロジェクトが半数を占めているという噂も。JavaScript/TypeScript系エンジニアである我々は気付かないうちにRust製のソフトウェアを使っているようです。Rustの開発・実行環境なんて用意した記憶がないのに...。改めてRust製のツールが（JavaScriptと協調しながら）動く仕組みをおさらいしましょう。",
    socialUrls: {
      github: "https://github.com/ssssota",
      x: "https://x.com/ssssotaro",
      bluesky: "https://bsky.app/profile/ssssota.bsky.social",
    },
  },
  {
    name: "Naoki Haba",
    affiliation: "株式会社 コドモン",
    title: "ソフトウェアエンジニア",
    avatarUrl: "/images/avatars/naokihaba.png",
    talkOverview: "Nuxt4で導入されるSingleton Data Fetching Layerは、従来のuseFetch/useAsyncDataの問題点を根本的に解決する新しいアーキテクチャです。本LTでは、メモリ使用量の削減、リアクティブキーのサポート、自動的なデータクリーンアップなど、パフォーマンスと開発体験を劇的に改善する新機能を5分間で解説します。実際の移行例とパフォーマンス改善の実測データを交えながら、Nuxt4への移行準備に必要な知識をお伝えします。",
    socialUrls: {
      github: "https://github.com/NaokiHaba",
      x: "https://x.com/naokihaba",
      bluesky: "https://bsky.app/profile/naokihaba.bsky.social",
    },
  },
  {
    name: "ツノ",
    affiliation: "弁護士ドットコム株式会社",
    title: "フロントエンジニア",
    avatarUrl: "/images/avatars/tsuno.jpeg",
    talkOverview: "開発者の中には、「OSSに貢献したいけど難しそう」と感じている方が多いと思います（私もそうです）。TSKaigi 2025 にて、Anthony Fu 氏が登壇し、eslint-typegen というライブラリを紹介していました。eslint-typegen に興味を持ち、学習した内容を社外に向けて登壇という形でアウトプットしました。この経験がきっかけとなり、eslint-plugin-vue に eslint-typegen を追加する機会をいただきました。本LTでは上記を振り返りながら、「OSSの世界は意外と身近である」ことを伝えます。",
    socialUrls: {
      github: "https://github.com/2nofa11",
      x: "https://x.com/2nofa11",
    },
  },
  {
    name: "Rinchoku",
    title: "エンジニア",
    avatarUrl: "/images/avatars/rinchoku.jpg",
    talkOverview: "現在では「UI/UX」はありきたりの言葉になりました。ユーザーストーリーを考慮した導線設計、デザインスタイルガイドを作成することでユーザーに見せるデザインの統一性・アクションをわかりやすくしています。人間が目から取得した情報を脳がどのように処理するかを理解することで、普段のデザインの見方に対して新しい所見を与えられればと思います。",
    socialUrls: {
      github: "https://github.com/rinchoku",
      x: "https://x.com/stupid_owl",
    },
  },
  {
    name: "shiminori",
    affiliation: "フリーランス",
    title: "フロントエンジニア",
    avatarUrl: "/images/avatars/shiminori.jpg",
    talkOverview: "Nuxt において独自の認証基盤を構築する際の、Cookie を用いた状態管理のポイントについて共有させていただきます。現時点では、Nuxt におけるメールアドレスおよびパスワードによる認証に関して、安定して利用できるサードパーティ製のソリューションが存在しません。そのため、独自に認証機構を実装した際の工夫点や注意点についてお伝えいたします。特に、`useCookie` コンポーザブルを使用するだけでは期待通りに動作しなかった背景についても説明できればと考えております。",
    socialUrls: {
      github: "https://github.com/noriyuki-shimizu",
      x: "https://x.com/@smnr14785228",
    },
  },
  {
    name: "にしはら",
    affiliation: "株式会社ICS",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/crayfisher_zari.jpg",
    talkOverview: "デジタル庁が公開しているデザインシステムをVue.jsで実装した話について発表します。デザインシステムを作っていく中で感じた強力なv-modelやcomputedの魅力などをお伝えします。",
    socialUrls: {
      github: "https://github.com/Crayfisher-zari",
      x: "https://x.com/@crayfisher_zari",
      bluesky: "https://bsky.app/profile/crayfisher-zari.bsky.social",
    },
  },
  {
    name: "永井優斗",
    affiliation: "フューチャー株式会社 HealthCare Innovation Group",
    title: "シニアコンサルタント",
    avatarUrl: "/images/avatars/yut0naga1.jpg",
    talkOverview: "2025年3月、TikTokやCapCutなどを運営していることで有名なByteDance社が、新世代のモバイル向けマルチプラットフォーム開発フレームワークであるLynxを公開、OSSとして発表しました。このLynx、Vue.jsに対応しようとしているそうです。ReactユーザーにとってのReact Nativeのように、Vue.jsのユーザーがキャッチアップ工数少なくモバイルネイティブアプリ開発ができるようになるかもしれません。実際、LynxのVue.jsの対応（以下Vue+Lynxと表現します）に向けてはVueクリエイターのEvan You氏がLynxのVue+Lynxを支援することをXで表明したり、VueコミュニティのRahul Vashishtha氏がVue+LynxのプロトタイプをGithub上で公開したりといった動きがあります。まだLynx自体公開されてから期間も短いこともあり、Vue+Lynxとなるとなかなか情報が少ないですし、日本語文献はもっと少ない（といいますかCfP書いてる時点で日本語での情報を少なくとも私は見つけられていない…）こともあり、なかなかこの話題が盛り上がっていないどころかほとんど見聞きしません。Vashishtha氏のプロトタイプなどにも触れながら、Vue+LynxについてVueFes参加者のみなさんとワクワクを共有できたら幸いです。",
    socialUrls: {
      x: "https://x.com/yut0naga1",
    },
  },
  {
    name: "Kaede Kato",
    affiliation: "RIZAPテクノロジーズ株式会社",
    title: "フロントエンドエンジニア",
    avatarUrl: "/images/avatars/kaede-kato.png",
    talkOverview: "chocoZAPでは、これまでセルフエステやセルフ脱毛の予約に外部サービスを利用していましたが、この度Nuxtで完全内製化しました。Webとアプリ（WebView）それぞれに最適化したUIを導入し、毎日利用するからこそ「直感的でスムーズに操作できる」ことを重視しています。本LTでは、プロジェクトで実際に取り組んだ内容と、そこで工夫したポイントをお話しします。",
    socialUrls: {},
  },
];

export const PANEL_DISCUSSION_SPEAKERS: Speaker[] = [
  evan,
  {
    name: "Dan Abramov",
    affiliation: "React、Bluesky（以前）",
    avatarUrl: "/images/avatars/dan_abramov.png",
    attendedIndex: 2,
    socialUrls: {
      github: "https://github.com/gaearon",
      bluesky: "https://bsky.app/profile/danabra.mov",
    },
  },
  {
    name: "dominikg",
    title: " Svelte、Vite コアチームメンバー",
    avatarUrl: "/images/avatars/dominikg.png",
    attendedIndex: 3,
    socialUrls: {
      github: "https://github.com/dominikg",
      bluesky: "https://bsky.app/profile/dominikg.dev",
      mastodon: "https://elk.zone/m.webtoo.ls/@dominikg",
    },
  },
  {
    name: "Kia King Ishii",
    affiliation: "Global Brain",
    title: "Vue.js コアチームメンバー",
    avatarUrl: "/images/avatars/kiaking.png",
    socialUrls: {
      github: "https://github.com/kiaking",
      x: "https://x.com/KiaKing85",
    },
  },
];
