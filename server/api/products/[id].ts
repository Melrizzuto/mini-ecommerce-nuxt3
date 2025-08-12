import { z } from "zod";
import type { Product } from "../../types/Product";

const ParamsSchema = z.object({ id: z.string().regex(/^\d+$/, "Invalid id").transform((v) => Number(v)) });

export default defineEventHandler(async (event) => {
  try {
    const rawId = getRouterParam(event, "id");
    const parse = ParamsSchema.safeParse({ id: rawId });
    if (!parse.success) {
      throw createError({ statusCode: 400, statusMessage: "Invalid product id" });
    }

    const id = parse.data.id;
    const product = await $fetch<Product>(`https://fakestoreapi.com/products/${id}`);
    if (!product) {
      throw createError({ statusCode: 404, statusMessage: "Product not found" });
    }
    return product;
  } catch (err: any) {
    if (err?.statusCode) throw err;
    throw createError({ statusCode: 502, statusMessage: "Upstream fetch failed" });
  }
});
