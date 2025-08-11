import { defineStore } from "pinia";
import type { Product } from "@/server/types/Product";

type CartItem = { product: Product; qty: number };
type Coupon = { code: string; percent: number } | null;

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
    coupon: null as Coupon,
  }),

  getters: {
    count(state) {
      return state.items.reduce((acc, it) => acc + it.qty, 0);
    },
    subtotal(state) {
      return state.items.reduce(
        (acc, it) => acc + it.product.price * it.qty,
        0
      );
    },
    discountAmount(): number {
      return this.coupon ? (this.subtotal * this.coupon.percent) / 100 : 0;
    },
    total(): number {
      return Math.max(0, this.subtotal - this.discountAmount);
    },
  },

  actions: {
    add(product: Product, qty = 1) {
      const existing = this.items.find((i) => i.product.id === product.id);
      if (existing) existing.qty += qty;
      else this.items.push({ product, qty });
    },
    setQty(productId: number, qty: number) {
      const it = this.items.find((i) => i.product.id === productId);
      if (it) it.qty = Math.max(1, qty);
    },
    remove(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId);
    },
    clear() {
      this.items = [];
      this.coupon = null;
    },

    applyCoupon(raw: string) {
      const code = (raw || "").trim().toUpperCase();
      if (code === "NEWYOU20") {
        this.coupon = { code, percent: 20 };
        return { ok: true, percent: 20 };
      }
      this.coupon = null;
      return { ok: false, message: "Codice sconto non valido" };
    },

    removeCoupon() {
      this.coupon = null;
    },
  },
});
