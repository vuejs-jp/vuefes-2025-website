import type { Goods } from "../goods";

export const GOODS: Goods[] = [
  {
    id: "goods01",
    src: "/images/store/shirts.png",
    name: "T-shirt",
    price: 3000,
    description: "A bold print featuring this rebranding design. A charcoal-colored T-shirt with white print inspired by Japanese aesthetics, perfect for everyday wear! Made with thick fabric that's durable and wash-resistant for worry-free wearing!",
    specs: {
      color: "Charcoal",
      material: "100% Cotton",
      size: "S / M / L / XL",
    },
  },
  {
    id: "goods02",
    src: "/images/store/hoodie.png",
    name: "Hoodie",
    price: 6000,
    description: "An original hoodie featuring the Vue Fes Japan logo. This pullover-type hoodie has moderate thickness and includes a front pocket.",
    specs: {
      color: "Black",
      size: "S / M / L / XL",
    },
  },
  {
    id: "goods03",
    src: "/images/store/sticker.png",
    name: "Sticker",
    price: 300,
    description: "Vue Fes Japan logo in various orientations including vertical and horizontal layouts. Made with glossy material for a premium finish.",
    specs: {
      material: "Single-sided PP laminated (Glossy finish)",
      size: "210mm×148mm",
    },
  },
  {
    id: "goods04",
    src: "/images/store/postcard.png",
    name: "Postcard",
    price: 300,
    description: "Postcards featuring 4 different color variations. Sold as a set of 4 cards. Enjoy the differences between vertical and horizontal patterns.",
    specs: {
      material: "Matte coated paper",
      size: "W100×H148mm",
    },
  },
  {
    id: "goods05",
    src: "/images/store/keychain.png",
    name: "Acrylic Keychain (Various types)",
    price: 500,
    description: "We have prepared 4 types of event logo acrylic keychains. Each features different color patterns, making them perfect for collecting!\u000A* Sold individually, not as a set.",
    specs: {
      material: "Acrylic",
      size: "W50×H30mm",
    },
  },
  {
    id: "goods06",
    src: "/images/store/band.png",
    name: "Rubber Band",
    price: 400,
    description: "A rubber band that adds an event feel to your everyday outfit. Slightly thick design for a slimming effect.\u000A* Marble patterns may vary between individual items.",
    specs: {
      color: "Marble",
      material: "Silicone",
      size: "W25×T2×C202mm",
    },
  },
  {
    id: "goods07",
    src: "/images/store/towel.png",
    name: "Hand Towel",
    price: 800,
    description: "A mini-sized hand towel featuring a pattern design with 4-color logos. Made with highly absorbent cotton material.",
    specs: {
      material: "100% Cotton",
      size: "W250×H250mm",
    },
  },
  {
    id: "goods08",
    src: "/images/store/cushion.png",
    name: "Vue Fes Japan Cushion",
    price: 3000,
    description: "A big cushion with soft fabric featuring the Vue Fes Japan logo.\u000A* Image is for reference only",
    specs: {
      size: "W300×H300mm",
    },
  },
];
