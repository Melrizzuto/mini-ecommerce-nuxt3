// server/api/products.ts
export default defineEventHandler(() => {
  return [
    {
      id: 1,
      name: "T-shirt nera",
      price: 19.99,
      description: "T-shirt 100% cotone, taglio unisex",
      image: "/images/tshirt-nera.jpg",
    },
    {
      id: 2,
      name: "Felpa oversize",
      price: 39.99,
      description: "Felpa con cappuccio, disponibile in varie taglie",
      image: "/images/felpa.jpg",
    },
    {
      id: 3,
      name: "Cappellino beige",
      price: 14.99,
      description: "Cappellino regolabile con visiera curva",
      image: "/images/cappellino.jpg",
    },
  ];
});
