import type { Product } from "@/types/Product";
import { z } from "zod";

const ParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export default defineEventHandler(async (event) => {
  try {
    const { id } = ParamsSchema.parse({ id: getRouterParam(event, "id") });

    const config = useRuntimeConfig();
    const base = config.public.apiBase || "https://fakestoreapi.com";

    const product = await $fetch<Product>(`${base}/products/${id}`);
    if (!product) {
      throw createError({ statusCode: 404, statusMessage: "Product not found" });
    }
    return product;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({ statusCode: 400, statusMessage: "Invalid product ID" });
    }
    throw error;
  }
});
