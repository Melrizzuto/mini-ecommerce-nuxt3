<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get: () => colorMode.preference === "dark",
  set: (v: boolean) => (colorMode.preference = v ? "dark" : "light"),
});
</script>

<template>
  <label class="switch" role="switch" :aria-checked="isDark">
    <input type="checkbox" v-model="isDark" aria-label="Toggle color theme" />
    <span class="track">
      <!-- icone SVG -->
      <span class="icon sun" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
          <g
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          >
            <path
              d="M12 2v2M12 20v2M2 12h2M20 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4L6 18M18 6l1.4-1.4"
            />
          </g>
        </svg>
      </span>
      <span class="icon moon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path
            d="M21 12.8A8.5 8.5 0 1 1 11.2 3.2a7.3 7.3 0 1 0 9.8 9.6Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span class="knob"></span>
    </span>
  </label>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
}
.switch input {
  position: absolute;
  opacity: 0;
  inset: 0;
  cursor: pointer;
}

/* colori agganciati al tema */
.track {
  --w: 58px;
  --h: 30px;
  --bg: var(--surface); /* base della pill */
  --bd: var(--border);
  --fg: var(--text); /* colore icone inattive */
  --fg-active: var(--text); /* colore icone attive */
  --accent: var(--btn-bd, #111); /* barra attiva */
  position: relative;
  width: var(--w);
  height: var(--h);
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--bd);
  transition: background-color 0.25s, border-color 0.25s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

/* knob */
.knob {
  position: absolute;
  top: 50%;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--bd);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  transform: translate(0, -50%);
  transition: transform 0.25s ease, background-color 0.25s, border-color 0.25s,
    box-shadow 0.25s;
}

/* icone */
.icon {
  width: 16px;
  height: 16px;
  color: var(--fg);
  display: grid;
  place-items: center;
  transition: color 0.25s, opacity 0.25s, transform 0.25s;
}
.sun {
  opacity: 1;
  transform: translateX(0);
}
.moon {
  opacity: 0.55;
  transform: translateX(6px);
}

/* stato CHECKED = dark */
input:checked + .track {
  background: color-mix(in oklab, var(--accent) 12%, var(--surface));
  border-color: color-mix(in oklab, var(--accent) 35%, var(--bd));
}
input:checked + .track .knob {
  transform: translate(28px, -50%);
  background: color-mix(in oklab, var(--accent) 8%, var(--bg));
  border-color: color-mix(in oklab, var(--accent) 25%, var(--bd));
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}
input:checked + .track .sun {
  opacity: 0.5;
  transform: translateX(-6px) scale(0.95);
}
input:checked + .track .moon {
  opacity: 1;
  transform: translateX(0) scale(1.05);
  color: var(--fg-active);
}

/* focus accessibile */
input:focus-visible + .track {
  outline: 3px solid color-mix(in oklab, var(--accent) 25%, transparent);
  outline-offset: 2px;
  transition: outline-color 0.2s;
}

/* riduci animazioni */
@media (prefers-reduced-motion: reduce) {
  .track,
  .knob,
  .icon {
    transition: none;
  }
}
</style>
