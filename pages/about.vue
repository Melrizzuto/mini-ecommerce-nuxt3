<template>
  <div class="about-page">
    <h1 class="fade-up">Actually, it’s just me!</h1>
    <p class="intro fade-up" style="animation-delay: 0.1s">
      Hi there! 👋 I’m <strong>Mel Rizzuto</strong>, the mind and heart behind
      this little e-commerce project.
    </p>
    <p class="fade-up" style="animation-delay: 0.2s">
      I’m passionate about technology, design, and user experience, and I’m
      building this project as a playground to keep learning and improving every
      single day 🚀.
    </p>
    <p class="fade-up" style="animation-delay: 0.3s">
      Every line of code is written with care, every detail crafted with a
      genuine love for everything digital 💻✨.
    </p>
  </div>
</template>

<style scoped>
/* ===== Animazione fade-up ===== */
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

.fade-up {
  animation: fadeUp 0.6s ease-out forwards;
}

/* Stile base pagina */
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 6rem 1rem;
  text-align: center;
}

.about-page h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about-page p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>
