import { defineStore } from "pinia";
import type { Product } from "@/server/types/Product";

const STORAGE_KEY = "wishlist:v1";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    items: [] as Product[],
    ready: false as boolean, // utile se vuoi mostrare loading/empty correttamente
  }),

  getters: {
    count: (state) => state.items.length,
    isInWishlist: (state) => (id: number) =>
      state.items.some((item) => item.id === id),
  },

  actions: {
    hydrate() {
      if (!process.client) return;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          this.items = JSON.parse(raw) as Product[];
        } catch {
          // se corrotto, ignora
          this.items = [];
        }
      }
      this.ready = true;
    },

    save() {
      if (!process.client) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    },

    add(product: Product) {
      if (!this.isInWishlist(product.id)) {
        this.items.push(product);
        this.save();
      }
    },

    remove(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.save();
    },

    toggle(product: Product) {
      this.isInWishlist(product.id)
        ? this.remove(product.id)
        : this.add(product);
    },

    clear() {
      this.items = [];
      this.save();
    },
  },
});
