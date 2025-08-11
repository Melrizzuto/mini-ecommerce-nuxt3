// server/types/Cart.ts
export type CartItem = { productId: number; quantity: number };
export type Cart = {
  id: number;
  userId: number;
  date?: string;
  products: CartItem[];
};
