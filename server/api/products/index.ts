import { products } from "@/server/api/data/products";

export default defineEventHandler(() => {
  return products;
});
