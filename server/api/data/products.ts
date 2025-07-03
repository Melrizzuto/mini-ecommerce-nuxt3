import type { Product } from "../../types/Product";
// server/data/products.ts
export const products: Product[] = [
  {
    id: 1,
    name: "T-shirt nera",
    price: 19.99,
    description: "T-shirt 100% cotone, taglio unisex",
    image: "/images/t-shirt.png",
  },
  {
    id: 2,
    name: "Felpa oversize",
    price: 39.99,
    description: "Felpa con cappuccio, disponibile in varie taglie",
    image: "/images/felpa.png",
  },
  {
    id: 3,
    name: "Cappellino beige",
    price: 14.99,
    description: "Cappellino regolabile con visiera curva",
    image: "/images/cappellino.png",
  },
];
