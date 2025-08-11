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
/* ===== Animazione all'ingresso ===== */
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.cart {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Stato carrello vuoto */
.empty {
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  text-align: center;
  box-shadow: var(--shadow-soft);
}

/* Lista prodotti */
.list {
  display: grid;
  gap: 1rem;
}

.row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  background: var(--bg-card);
  color: var(--text);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: var(--shadow-soft);
  animation: fadeUp 0.4s ease forwards;
}

.row:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
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
  font-size: 1.1rem;
  font-weight: 600;
}

.meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.chip {
  background: var(--chip-bg);
  color: var(--chip-text);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
}

.rating {
  color: var(--rating);
}

.desc {
  color: var(--text-muted);
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
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.qty button {
  border: 0;
  background: var(--bg-secondary);
  color: var(--text);
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  transition: background 0.2s;
}

.qty button:hover {
  background: var(--bg-hover);
}

.qty input {
  width: 60px;
  text-align: center;
  border: 0;
  padding: 0.35rem;
  background: var(--bg-card);
  color: var(--text);
}

.prices {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.price {
  color: var(--text);
}

.subtotal {
  color: var(--text-strong);
  font-weight: 600;
}

.remove {
  background: var(--bg-card);
  border: 1px solid var(--danger);
  color: var(--danger);
  padding: 0.45rem 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.remove:hover {
  background: var(--danger);
  color: #fff;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-secondary);
  color: var(--text);
  box-shadow: var(--shadow-soft);
}

.clear {
  background: var(--primary);
  color: #fff;
  border: 1px solid var(--primary);
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.clear:hover {
  background: var(--primary-hover);
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
