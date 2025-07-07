import type { Product } from "../../types/Product";
// server/data/products.ts
export const products: Product[] = [
  {
    id: 1,
    name: "Black T-shirt",
    price: 19.99,
    description: "100% cotton unisex T-shirt",
    image: "/images/t-shirt.png",
  },
  {
    id: 2,
    name: "Oversized Hoodie",
    price: 39.99,
    description: "Hooded sweatshirt available in multiple sizes",
    image: "/images/felpa.png",
  },
  {
    id: 3,
    name: "Beige Cap",
    price: 14.99,
    description: "Adjustable cap with curved visor",
    image: "/images/cappellino.png",
  },
];
