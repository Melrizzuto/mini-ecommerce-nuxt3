<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
const cart = useCartStore();

const formatPrice = (n: number) => `${n.toFixed(2)} €`;

const dec = (id: number) => {
  const it = cart.items.find((i) => i.product.id === id);
  if (!it) return;
  cart.setQty(id, Math.max(1, it.qty - 1));
};
const inc = (id: number) => {
  const it = cart.items.find((i) => i.product.id === id);
  if (!it) return;
  cart.setQty(id, it.qty + 1);
};
</script>

<template>
  <section class="cart">
    <h1>Cart ({{ cart.count }} items)</h1>

    <div v-if="!cart.items.length" class="empty">Your cart is empty.</div>

    <div v-else class="list">
      <article v-for="it in cart.items" :key="it.product.id" class="row">
        <img class="thumb" :src="it.product.image" :alt="it.product.title" />

        <div class="info">
          <h3 class="title">{{ it.product.title }}</h3>
          <div class="meta">
            <span v-if="it.product.category" class="chip">
              {{ it.product.category }}
            </span>
            <span v-if="it.product.rating?.rate" class="rating">
              ★ {{ it.product.rating.rate }} ({{ it.product.rating.count }})
            </span>
          </div>

          <p v-if="it.product.description" class="desc">
            {{ it.product.description }}
          </p>

          <div class="controls">
            <div class="qty">
              <button
                @click="dec(it.product.id)"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                :value="it.qty"
                @input="
                  cart.setQty(
                    it.product.id,
                    Math.max(
                      1,
                      Number(($event.target as HTMLInputElement).value)
                    )
                  )
                "
                aria-label="Quantity"
              />
              <button
                @click="inc(it.product.id)"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div class="prices">
              <span class="price">{{ formatPrice(it.product.price) }}</span>
              <span class="subtotal">
                Subtotal:
                <strong>{{ formatPrice(it.product.price * it.qty) }}</strong>
              </span>
            </div>

            <button class="remove" @click="cart.remove(it.product.id)">
              Remove
            </button>
          </div>
        </div>
      </article>

      <div class="total">
        <div class="sum">
          Total: <strong>{{ formatPrice(cart.total) }}</strong>
        </div>
        <button class="clear" @click="cart.clear()">Clear cart</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* keep your existing CSS as-is */
.cart {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.empty {
  padding: 2rem;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
}
.list {
  display: grid;
  gap: 1rem;
}
.row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 1rem;
  background: #fff;
}
.thumb {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
.info {
  display: grid;
  gap: 0.5rem;
}
.title {
  margin: 0;
}
.meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}
.chip {
  background: #f0f0f0;
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
}
.rating {
  color: #e09d00;
}
.desc {
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0.25rem 0 0.5rem;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}
.qty {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}
.qty button {
  border: 0;
  background: #f7f7f7;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}
.qty input {
  width: 60px;
  text-align: center;
  border: 0;
  padding: 0.35rem;
}
.prices {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.price {
  color: #444;
}
.subtotal {
  color: #111;
}
.remove {
  background: #fff;
  border: 1px solid #d33;
  color: #d33;
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  cursor: pointer;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fafafa;
}
.clear {
  background: #000;
  color: #fff;
  border: 1px solid #000;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  cursor: pointer;
}
@media (max-width: 700px) {
  .row {
    grid-template-columns: 80px 1fr;
  }
  .thumb {
    width: 80px;
    height: 80px;
  }
}
</style>
