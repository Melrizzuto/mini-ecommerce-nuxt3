import type { Product } from "@/server/types/Product";

export default defineEventHandler(async (event) => {
  const { cat } = getQuery(event) as { cat?: string };

  const base = "https://fakestoreapi.com/products";
  const url = cat ? `${base}/category/${encodeURIComponent(cat)}` : base;

  // proxy verso Fake Store API
  const products = await $fetch<Product[]>(url);
  return products;
});
