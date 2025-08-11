import type { Product } from "../../types/Product";

export default defineEventHandler(async () => {
  return await $fetch<Product[]>("https://fakestoreapi.com/products");
});
