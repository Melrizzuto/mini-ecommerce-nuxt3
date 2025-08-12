// server/api/products/index.ts
import { z } from "zod";
import type { Product } from "@/server/types/Product";

// normalizza in slug: "men's clothing" -> "mens-clothing"
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "") // rimuovi apostrofi
    .replace(/[^a-z0-9]+/g, "-") // tutto il resto -> "-"
    .replace(/^-+|-+$/g, ""); // trim "-"

const QuerySchema = z
  .object({
    cat: z.string().optional(),
  })
  .transform((q) => ({
    // decodifica URI e "+" -> spazio, poi trim e lowercase
    cat: q.cat
      ? decodeURIComponent(q.cat).replace(/\+/g, " ").trim().toLowerCase()
      : undefined,
  }));

export default defineEventHandler(async (event) => {
  try {
    const raw = getQuery(event);
    const parsed = QuerySchema.safeParse(raw);
    if (!parsed.success) {
      throw createError({ statusCode: 400, statusMessage: "Invalid query" });
    }

    const cat = parsed.data.cat;

    let products = await $fetch<Product[]>("https://fakestoreapi.com/products");

    if (cat) {
      const catSlug = slugify(cat);
      products = products.filter((p) => slugify(p.category) === catSlug);
    }

    return products;
  } catch (err: any) {
    if (err?.statusCode) throw err;
    throw createError({
      statusCode: 502,
      statusMessage: "Upstream fetch failed",
    });
  }
});
