import products from "../data/products";

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id);
  const prod = products.find((p) => p.id === id);

  if (!prod) {
    throw createError({
      statusCode: 404,
      statusMessage: "Prodotto non trovato",
    });
  }

  return prod;
});
