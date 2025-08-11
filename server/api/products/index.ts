import type { Product } from "@/server/types/Product";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const cat = (query.cat as string | undefined)?.toLowerCase();

  let products: Product[] = await $fetch<Product[]>(
    "https://fakestoreapi.com/products"
  );

  if (cat) {
    products = products.filter(
      (p: Product) => p.category.toLowerCase() === cat
    );
  }

  return products;
});
