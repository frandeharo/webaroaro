<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import aroaroLogo from '@/assets/aroaro_logo.webp'

const isScrolled = ref(false)
const route = useRoute()
const { t, locale } = useI18n()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

const scrollToContact = (event: Event) => {
  event.preventDefault()

  const contactSection = document.getElementById('contacto')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    v-motion
    :initial="{ y: -100, opacity: 0 }"
    :enter="{ y: 0, opacity: 1, transition: { duration: 1000, ease: 'easeOut' } }"
    class="navbar"
  >
    <div class="dynamic-island" :class="{ expanded: isScrolled }">
      <div class="island-content">
        <RouterLink
          to="/"
          v-motion
          :hover="{ scale: 1.05, transition: { duration: 200 } }"
          :tap="{ scale: 0.95 }"
          class="logo"
        >
          <img :src="aroaroLogo" alt="Aro Aro Studio" class="logo-image" />
        </RouterLink>

        <div class="nav-links">
          <RouterLink
            to="/"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95 }"
            class="nav-link"
            :class="{ active: route.path === '/' }"
          >
            {{ t('nav.home') }}
          </RouterLink>
          <RouterLink
            to="/proyectos"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95 }"
            class="nav-link"
            :class="{ active: route.path === '/proyectos' }"
          >
            {{ t('nav.projects') }}
          </RouterLink>
          <a
            href="#contacto"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95 }"
            class="nav-link"
            @click.prevent="scrollToContact"
          >
            {{ t('nav.contact') }}
          </a>

          <button
            @click="toggleLanguage"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95 }"
            class="language-toggle"
            :title="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'"
          >
            {{ locale === 'es' ? '🇬🇧' : '🇪🇸' }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 1.5rem;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  pointer-events: none;
}

.dynamic-island {
  background: rgba(7, 10, 14, 0.35);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border-radius: 50px;
  border: 1px solid rgba(213, 214, 215, 0.18);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
  padding: 0.75rem 1.5rem;
  will-change: transform, border-radius, padding;
  position: relative;
  overflow: hidden;
}

.dynamic-island::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(213, 214, 215, 0.08) 0%,
    rgba(17, 48, 81, 0.05) 50%,
    rgba(213, 214, 215, 0.08) 100%
  );
  border-radius: 50px;
  opacity: 0.6;
  pointer-events: none;
}

.dynamic-island.expanded {
  border-radius: 40px;
  background: rgba(7, 10, 14, 0.35);
  padding: 0.9rem 2rem;
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.18),
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.12);
}

.dynamic-island.expanded::before {
  border-radius: 40px;
}

.island-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  will-change: transform;
}

.logo-image {
  height: 40px;
  width: auto;
  filter: drop-shadow(0 2px 8px rgba(14, 165, 233, 0.3));
  transition: all 0.3s ease;
}

.logo:hover .logo-image {
  filter: drop-shadow(0 4px 12px rgba(14, 165, 233, 0.5)) brightness(1.1);
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-link {
  color: rgba(213, 214, 215, 0.85);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link:hover {
  color: rgb(213, 214, 215);
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.nav-link.active {
  color: rgb(213, 214, 215);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  font-weight: 600;
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    inset 0 -1px 1px rgba(0, 0, 0, 0.05);
}


.language-toggle {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(213, 214, 215, 0.2);
  border-radius: 30px;
  padding: 0.6rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
}

.language-toggle:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(213, 214, 215, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Responsive */
@media (max-width: 968px) {
  .navbar {
    top: 1rem;
    padding: 0 1rem;
  }

  .dynamic-island {
    padding: 0.6rem 1.2rem;
  }

  .island-content {
    gap: 2rem;
  }

  .logo-image {
    height: 35px;
  }

  .nav-links {
    gap: 0.3rem;
  }

  .nav-link {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    top: 1rem;
  }

  .dynamic-island {
    padding: 0.7rem 1.2rem;
  }

  .island-content {
    gap: 1.5rem;
  }

  .nav-links {
    display: none;
  }

  .logo-image {
    height: 32px;
  }
}

/* Animación de entrada suave */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-2px);
  }
}

.dynamic-island:hover {
  animation: float 3s ease-in-out infinite;
}
</style>
