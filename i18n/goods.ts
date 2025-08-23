export interface Goods {
  id: string;
  src: string;
  name: string;
  price: number;
  description: string;
  specs: {
    color?: string;
    material?: string;
    size?: string;
  };
}
