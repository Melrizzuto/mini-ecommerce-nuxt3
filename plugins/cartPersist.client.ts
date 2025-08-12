import { useCartStore } from "@/stores/cart";

export default defineNuxtPlugin(() => {
  const cart = useCartStore();

  // carica al boot
  const raw = localStorage.getItem("cart:v1");
  if (raw) {
    try {
      cart.$patch(JSON.parse(raw));
    } catch {
      /* noop */
    }
  }

  // persist on every change
  watch(
    () => cart.$state,
    (s) => {
      localStorage.setItem("cart:v1", JSON.stringify(s));
    },
    { deep: true }
  );
});
