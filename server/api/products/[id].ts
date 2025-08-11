import type { Product } from "../../types/Product";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;
  return await $fetch<Product>(`https://fakestoreapi.com/products/${id}`);
});
