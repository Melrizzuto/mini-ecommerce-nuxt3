<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";

const cart = useCartStore();
const router = useRouter();

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

const goToCheckout = () => {
  router.push("/checkout");
};
</script>

<template>
  <section class="cart">
    <h1>Cart ({{ cart.count }} items)</h1>

    <div v-if="!cart.items.length" class="empty">Your cart is empty.</div>

    <div v-else class="list">
      <article v-for="it in cart.items" :key="it.product.id" class="row">
        <NuxtImg
          class="thumb"
          :src="it.product.image"
          :alt="it.product.title"
          width="120"
          height="120"
          loading="lazy"
          format="webp"
          placeholder="blur"
        />

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

            <button class="btn remove" @click="cart.remove(it.product.id)">
              Remove
            </button>
          </div>
        </div>
      </article>

      <div class="total">
        <div class="sum">
          Total: <strong>{{ formatPrice(cart.total) }}</strong>
        </div>
        <div class="actions">
          <button class="btn clear" @click="cart.clear()">Clear cart</button>
          <button class="btn checkout" @click="goToCheckout">Checkout</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

.empty {
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  text-align: center;
  box-shadow: var(--shadow-soft);
}

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
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
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
  background: var(--primary);
  color: #fff;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.qty button:hover {
  background: var(--primary-hover);
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

/* ===== Buttons ===== */
.btn {
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn.remove {
  background: var(--btn-bg);
}
.btn.remove:hover {
  background: #ff4d4d;
}

.btn.clear {
  background: var(--bg);
  color: var(--text);
}
.btn.clear:hover {
  background: var(--btn-fg-hover);
  border: var(--btn-bg-hover);
  color: var(--bg);
}

.btn.checkout {
  background: var(--btn-bd);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
}
.btn.checkout:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
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
  box-shadow: var(--shadow-soft);
}

.actions {
  display: flex;
  gap: 0.5rem;
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
