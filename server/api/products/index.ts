import type { Product } from "@/types/Product";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const cat = (query.cat as string | undefined)?.toLowerCase();

  const config = useRuntimeConfig();
  const base = config.public.apiBase || "https://fakestoreapi.com";
  let products: Product[] = await $fetch<Product[]>(`${base}/products`);

  if (cat) {
    products = products.filter(
      (p: Product) => p.category.toLowerCase() === cat
    );
  }

  return products;
});
