import { defineStore } from "pinia";
import type { Product } from "@/server/types/Product";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as { product: Product; qty: number }[],
  }),
  getters: {
    // Numero totale di articoli
    count: (state) => state.items.reduce((acc, item) => acc + item.qty, 0),

    // Prezzo totale
    total: (state) =>
      state.items.reduce((acc, item) => acc + item.product.price * item.qty, 0),
  },
  actions: {
    add(product: Product, qty = 1) {
      const existing = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existing) {
        existing.qty += qty;
      } else {
        this.items.push({ product, qty });
      }
    },
    setQty(productId: number, qty: number) {
      const item = this.items.find((it) => it.product.id === productId);
      if (item) {
        item.qty = qty;
      }
    },
    remove(productId: number) {
      this.items = this.items.filter((item) => item.product.id !== productId);
    },
    clear() {
      this.items = [];
    },
  },
});
