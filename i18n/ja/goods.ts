import type { Goods } from "../goods";

export const GOODS: Goods[] = [
  {
    id: "goods01",
    src: "/images/store/shirts.png",
    name: "Tシャツ",
    price: 3000,
    description: "今回のリブランディングを大胆にあしらったプリント。和をイメージした墨色Tシャツに白いプリントで、普段でも着用しやすい！　厚手の生地を選定。洗濯にも強く、安心して着ることができます！",
    specs: {
      color: "スミ",
      material: "綿100%",
      size: "S / M / L / XL",
    },
  },
  {
    id: "goods02",
    src: "/images/store/hoodie.png",
    name: "パーカー",
    price: 6000,
    description: "Vue Fes Japan ロゴを配したオリジナルパーカーです。程よい厚みのプルオーバータイプで、前面にポケットがついています。",
    specs: {
      color: "ブラック",
      size: "S / M / L / XL",
    },
  },
  {
    id: "goods03",
    src: "/images/store/sticker.png",
    name: "ステッカー",
    price: 300,
    description: "Vue Fes Japan のロゴを縦や横など様々な展開にしました。素材はツヤ感のある素材を使用しています。",
    specs: {
      material: "片面PP貼（ツヤあり加工）",
      size: "210mm×148mm",
    },
  },
  {
    id: "goods04",
    src: "/images/store/postcard.png",
    name: "ポストカード",
    price: 300,
    description: "4 種類のカラー展開をポストカードにしました。4 枚 1 セットで販売します。縦と横の 2 パターンの違いを楽しめます。",
    specs: {
      material: "マットコート紙",
      size: "W100×H148mm",
    },
  },
  {
    id: "goods05",
    src: "/images/store/keychain.png",
    name: "アクリルキーホルダー（各種）",
    price: 500,
    description: "イベントロゴのアクリルキーホルダーを 4 種ご用意しました。それぞれ異なるカラーパターンで、コレクション性も抜群！\u000A※セットではなく単品での販売になります。",
    specs: {
      material: "アクリル",
      size: "W50×H30mm",
    },
  },
  {
    id: "goods06",
    src: "/images/store/band.png",
    name: "ラバーバンド",
    price: 400,
    description: "いつものコーデにイベント感をプラスできるラバーバンドです。少し太めで細見えします。\u000A※マーブル模様は個体差があります。",
    specs: {
      color: "マーブル",
      material: "シリコン",
      size: "W25×T2×C202mm",
    },
  },
  {
    id: "goods07",
    src: "/images/store/towel.png",
    name: "タオルハンカチ",
    price: 800,
    description: "4 色のロゴをパターン柄にしたミニサイズのタオルハンカチです。素材は吸収性の良い綿素材を使用しています。",
    specs: {
      material: "綿100%",
      size: "W250×H250mm",
    },
  },
  {
    id: "goods08",
    src: "/images/store/cushion.png",
    name: "Vue Fes Japanクッション",
    price: 3000,
    description: "Vue Fes Japan のロゴを配置した、もちもち生地のビッグクッションです。\u000A※画像はイメージです",
    specs: {
      size: "W300×H300mm",
    },
  },
];
