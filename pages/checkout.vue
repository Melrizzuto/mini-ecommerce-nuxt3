<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
const cart = useCartStore();

const form = reactive({
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  coupon: cart.coupon?.code ?? "",
});

const applying = ref(false);
const applyMsg = ref<string | null>(null);
const placing = ref(false);
const orderPlaced = ref(false);

const format = (n: number) => `${n.toFixed(2)} €`;

async function applyCoupon() {
  if (!cart.items.length) {
    applyMsg.value = "Your cart is empty.";
    return;
  }
  applying.value = true;
  await new Promise((r) => setTimeout(r, 350)); // finto delay
  const res = cart.applyCoupon(form.coupon);
  applyMsg.value = res.ok
    ? `Coupon applied: -${res.percent}%`
    : "Invalid coupon";
  applying.value = false;
}

async function placeOrder() {
  if (!cart.items.length) return;
  placing.value = true;
  // finto "pagamento"
  await new Promise((r) => setTimeout(r, 700));
  orderPlaced.value = true;
  cart.clear();
}
</script>

<template>
  <section class="checkout">
    <h1>Checkout</h1>

    <div v-if="!cart.items.length && !orderPlaced" class="empty">
      Your cart is empty.
      <NuxtLink to="/products" class="link">Continue shopping →</NuxtLink>
    </div>

    <div v-else class="grid">
      <!-- Left: form -->
      <div class="card">
        <h2>Shipping details</h2>
        <form class="form" @submit.prevent="placeOrder">
          <label>
            Full name
            <input v-model="form.name" required />
          </label>
          <label>
            Email
            <input v-model="form.email" type="email" required />
          </label>
          <label>
            Address
            <input v-model="form.address" required />
          </label>
          <div class="row2">
            <label>
              City
              <input v-model="form.city" required />
            </label>
            <label>
              ZIP
              <input v-model="form.zip" required />
            </label>
          </div>

          <label class="coupon">
            Promo code
            <div class="coupon-row">
              <input
                v-model="form.coupon"
                placeholder="e.g. NEWYOU20"
                :disabled="!!cart.coupon"
              />
              <button
                class="btn"
                type="button"
                @click="cart.coupon ? cart.removeCoupon() : applyCoupon()"
                :disabled="applying"
              >
                {{ cart.coupon ? "Remove" : "Apply" }}
              </button>
            </div>
            <p v-if="applyMsg" class="hint">{{ applyMsg }}</p>
          </label>

          <button
            class="btn primary"
            type="submit"
            :disabled="placing || !cart.items.length"
          >
            {{ placing ? "Placing order…" : "Place order" }}
          </button>
        </form>

        <p v-if="orderPlaced" class="success">
          🎉 Order placed! (fake) — thanks!
        </p>
      </div>

      <!-- Right: summary -->
      <aside class="card summary">
        <h2>Order summary</h2>

        <ul class="lines">
          <li v-for="it in cart.items" :key="it.product.id">
            <img :src="it.product.image" :alt="it.product.title" />
            <div class="meta">
              <strong class="title">{{ it.product.title }}</strong>
              <small>Qty {{ it.qty }}</small>
            </div>
            <span class="price">
              {{ format(it.product.price * it.qty) }}
            </span>
          </li>
        </ul>

        <div class="totals">
          <div class="row">
            <span>Subtotal</span>
            <span>{{ format(cart.subtotal) }}</span>
          </div>
          <div class="row" v-if="cart.coupon">
            <span>Discount ({{ cart.coupon.percent }}%)</span>
            <span>-{{ format(cart.discountAmount) }}</span>
          </div>
          <div class="row total">
            <span>Total</span>
            <span>{{ format(cart.total) }}</span>
          </div>
        </div>

        <NuxtLink to="/cart" class="link">← Back to cart</NuxtLink>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.checkout {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
}
h1 {
  margin: 0 0 1rem;
}
.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr 420px;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--card-bg, var(--bg));
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 10px 30px color-mix(in oklab, var(--text) 6%, transparent);
}
.form {
  display: grid;
  gap: 0.8rem;
}
label {
  display: grid;
  gap: 0.35rem;
  font-weight: 600;
}
input {
  border: 1px solid var(--border);
  background: var(--surface, #fff);
  color: var(--text);
  border-radius: 10px;
  padding: 0.65rem 0.75rem;
}
.row2 {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: 1fr 160px;
}
@media (max-width: 560px) {
  .row2 {
    grid-template-columns: 1fr;
  }
}

.coupon-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
}
.hint {
  margin: 0.25rem 0 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.btn {
  border: 1px solid var(--btn-bd, #111);
  background: var(--btn-bg, #111);
  color: var(--btn-fg, #fff);
  padding: 0.65rem 1rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}
.btn.primary {
  width: 100%;
  margin-top: 0.4rem;
}
.btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.summary h2 {
  margin-top: 0;
}
.lines {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: grid;
  gap: 0.75rem;
}
.lines li {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 0.6rem;
  align-items: center;
}
.lines img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border: 1px solid var(--border);
  border-radius: 8px;
}
.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.price {
  font-weight: 700;
}

.totals {
  display: grid;
  gap: 0.4rem;
  margin: 0.25rem 0 1rem;
}
.row {
  display: flex;
  justify-content: space-between;
}
.total {
  font-size: 1.1rem;
  font-weight: 800;
}

.link {
  text-decoration: none;
  color: var(--text);
}
.link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.empty {
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 2rem;
}
.success {
  margin-top: 0.75rem;
  font-weight: 700;
}
</style>
