// server/types/Product.ts
export type Product = {
  id: number;
  title?: string;
  name?: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: { rate: number; count: number };
};
