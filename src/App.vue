<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div id="app">
    <!-- Fondo con textura y partículas abstractas -->
    <div class="background-container">
      <!-- Textura de ruido -->
      <div class="noise-texture"></div>

      <!-- Partículas abstractas minimalistas -->
      <div class="particles">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
        <div class="particle particle-6"></div>
        <div class="particle particle-7"></div>
        <div class="particle particle-8"></div>
      </div>

      <!-- Gradientes de fondo -->
      <div class="gradient-overlay"></div>
    </div>

    <NavBar />
    <main>
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

main {
  position: relative;
  z-index: 1;
  flex: 1;
}

/* Contenedor principal del fondo */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Textura de ruido */
.noise-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  mix-blend-mode: overlay;
}

/* Gradientes de fondo */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      ellipse 80% 50% at 50% -20%,
      rgba(14, 165, 233, 0.08),
      transparent 50%
    ),
    radial-gradient(ellipse 60% 50% at 0% 100%, rgba(109, 40, 217, 0.1), transparent 50%),
    radial-gradient(ellipse 60% 50% at 100% 100%, rgba(79, 70, 229, 0.08), transparent 50%);
  animation: gradient-shift 20s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Contenedor de partículas */
.particles {
  position: absolute;
  inset: 0;
}

/* Estilos base de partículas */
.particle {
  position: absolute;
  background: rgba(213, 214, 215, 0.06);
  border: 1px solid rgba(213, 214, 215, 0.08);
  backdrop-filter: blur(2px);
  will-change: transform, opacity;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Partícula 1 - Círculo pequeño */
.particle-1 {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  top: 15%;
  left: 10%;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(14, 165, 233, 0.1));
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.4);
  animation: float-1 25s infinite;
}

/* Partícula 2 - Línea vertical */
.particle-2 {
  width: 2px;
  height: 80px;
  top: 30%;
  right: 20%;
  background: linear-gradient(180deg, transparent, rgba(213, 214, 215, 0.15), transparent);
  animation: float-2 20s infinite;
}

/* Partícula 3 - Círculo mediano */
.particle-3 {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  bottom: 25%;
  left: 15%;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.3), rgba(109, 40, 217, 0.1));
  box-shadow: 0 0 25px rgba(109, 40, 217, 0.4);
  animation: float-3 30s infinite;
}

/* Partícula 4 - Cuadrado pequeño rotado */
.particle-4 {
  width: 10px;
  height: 10px;
  top: 60%;
  right: 15%;
  background: rgba(79, 70, 229, 0.2);
  border: 1px solid rgba(79, 70, 229, 0.3);
  transform: rotate(45deg);
  animation: float-4 22s infinite;
}

/* Partícula 5 - Línea horizontal */
.particle-5 {
  width: 100px;
  height: 1px;
  top: 45%;
  left: 5%;
  background: linear-gradient(90deg, transparent, rgba(213, 214, 215, 0.2), transparent);
  animation: float-5 28s infinite;
}

/* Partícula 6 - Círculo con anillo */
.particle-6 {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: 20%;
  right: 30%;
  background: transparent;
  border: 2px solid rgba(14, 165, 233, 0.25);
  box-shadow: 0 0 15px rgba(14, 165, 233, 0.3);
  animation: float-6 35s infinite;
}

/* Partícula 7 - Punto pequeño */
.particle-7 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  bottom: 40%;
  right: 25%;
  background: rgba(213, 214, 215, 0.3);
  box-shadow: 0 0 10px rgba(213, 214, 215, 0.5);
  animation: float-7 18s infinite;
}

/* Partícula 8 - Línea diagonal */
.particle-8 {
  width: 60px;
  height: 2px;
  bottom: 15%;
  left: 30%;
  background: linear-gradient(90deg, transparent, rgba(109, 40, 217, 0.2), transparent);
  transform: rotate(-30deg);
  animation: float-8 32s infinite;
}

/* Animaciones de partículas - Movimientos sutiles y abstractos */
@keyframes float-1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(50px, -80px) scale(1.3);
    opacity: 0.3;
  }
}

@keyframes float-2 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-100px) rotate(10deg);
    opacity: 0.2;
  }
}

@keyframes float-3 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.7;
  }
  33% {
    transform: translate(-60px, 40px) scale(0.8);
    opacity: 0.4;
  }
  66% {
    transform: translate(30px, -30px) scale(1.2);
    opacity: 0.5;
  }
}

@keyframes float-4 {
  0%,
  100% {
    transform: translate(0, 0) rotate(45deg);
    opacity: 0.6;
  }
  50% {
    transform: translate(-70px, 60px) rotate(225deg);
    opacity: 0.3;
  }
}

@keyframes float-5 {
  0%,
  100% {
    transform: translateX(0) scaleX(1);
    opacity: 0.4;
  }
  50% {
    transform: translateX(100px) scaleX(1.5);
    opacity: 0.2;
  }
}

@keyframes float-6 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(80px, 100px) scale(1.5);
    opacity: 0.2;
  }
}

@keyframes float-7 {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0.8;
  }
  50% {
    transform: translate(-40px, -90px);
    opacity: 0.3;
  }
}

@keyframes float-8 {
  0%,
  100% {
    transform: translate(0, 0) rotate(-30deg) scaleX(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(60px, -50px) rotate(-60deg) scaleX(1.3);
    opacity: 0.2;
  }
}

/* Responsive - Ajustar partículas en móvil */
@media (max-width: 768px) {
  .particle-2,
  .particle-5,
  .particle-8 {
    display: none;
  }

  .particle {
    opacity: 0.5;
  }

  .gradient-overlay {
    opacity: 0.7;
  }
}
</style>
