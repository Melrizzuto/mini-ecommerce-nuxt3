import { z } from "zod";
import type { Product } from "@/server/types/Product";

const QuerySchema = z.object({
  cat: z
    .string()
    .trim()
    .toLowerCase()
    .optional()
    .refine((v) => (v ? /^[a-z0-9\-\s]+$/.test(v) : true), {
      message: "Invalid category",
    }),
});

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const parse = QuerySchema.safeParse(query);
    if (!parse.success) {
      throw createError({ statusCode: 400, statusMessage: "Invalid query" });
    }
    const cat = parse.data.cat;

    let products: Product[] = await $fetch<Product[]>(
      "https://fakestoreapi.com/products"
    );

    if (cat) {
      products = products.filter(
        (p: Product) => p.category.toLowerCase() === cat
      );
    }

    return products;
  } catch (err: any) {
    if (err?.statusCode) throw err;
    throw createError({ statusCode: 502, statusMessage: "Upstream fetch failed" });
  }
});
