<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import aroaroLogo from '@/assets/aroaro_logo.webp'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()
const { t, locale } = useI18n()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const scrollToContact = (event: Event) => {
  event.preventDefault()
  closeMobileMenu()

  const contactSection = document.getElementById('contacto')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Cerrar menú cuando cambia la ruta
watch(
  () => route.path,
  () => {
    closeMobileMenu()
  },
)

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

        <!-- Desktop nav links -->
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

        <!-- Mobile menu button -->
        <button
          class="mobile-menu-btn"
          @click="toggleMobileMenu"
          :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        >
          <span class="hamburger" :class="{ open: isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
    </Transition>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <RouterLink
          to="/"
          class="mobile-link"
          :class="{ active: route.path === '/' }"
          @click="closeMobileMenu"
        >
          {{ t('nav.home') }}
        </RouterLink>
        <RouterLink
          to="/proyectos"
          class="mobile-link"
          :class="{ active: route.path === '/proyectos' }"
          @click="closeMobileMenu"
        >
          {{ t('nav.projects') }}
        </RouterLink>
        <a href="#contacto" class="mobile-link" @click="scrollToContact">
          {{ t('nav.contact') }}
        </a>
        <button
          @click="toggleLanguage"
          class="mobile-language-toggle"
          :title="locale === 'es' ? 'Switch to English' : 'Cambiar a Español'"
        >
          {{ locale === 'es' ? '🇬🇧 English' : '🇪🇸 Español' }}
        </button>
      </div>
    </Transition>
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
  z-index: 1001;
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

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background: rgb(213, 214, 215);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  pointer-events: auto;
}

/* Mobile menu */
.mobile-menu {
  position: fixed;
  top: 5rem;
  left: 1rem;
  right: 1rem;
  background: rgba(7, 10, 14, 0.95);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(213, 214, 215, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
  pointer-events: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.mobile-link {
  color: rgba(213, 214, 215, 0.85);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.mobile-link:hover,
.mobile-link.active {
  color: rgb(213, 214, 215);
  background: rgba(255, 255, 255, 0.1);
}

.mobile-language-toggle {
  color: rgba(213, 214, 215, 0.85);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(213, 214, 215, 0.2);
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.mobile-language-toggle:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(213, 214, 215, 0.4);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
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

  .mobile-menu-btn {
    display: flex;
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
