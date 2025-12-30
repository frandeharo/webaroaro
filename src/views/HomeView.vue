<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  AiPhone01Icon,
  AiNetworkIcon,
  Settings01Icon,
  AiCloud01Icon,
  Rocket01Icon,
  Target02Icon,
  Layers01Icon,
  Analytics01Icon,
  Link03Icon,
  ArrowRight01Icon,
  ChartHistogramIcon,
  Globe02Icon,
  UserStar01Icon,
} from 'hugeicons-vue'
import ContactSection from '@/components/ContactSection.vue'

const { t } = useI18n()

// Scroll to contact section
const scrollToContact = (event: Event) => {
  event.preventDefault()
  const contactSection = document.getElementById('contacto')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const transformationFeatures = computed(() => {
  const { tm } = useI18n()
  return {
    digital: tm('transformation.digital.features') as string[],
    coaching: tm('transformation.coaching.features') as string[],
  }
})

const primaryServices = computed(() => {
  const { tm } = useI18n()
  const servicesData = tm('services') as any

  return [
    {
      iconComponent: AiPhone01Icon,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      longDescription: t('services.mobile.longDescription'),
      features: servicesData.mobile.features,
      stats: t('services.mobile.stats'),
      gradient: 'from-blue-500 to-cyan-500',
      expertLevel: 95,
    },
    {
      iconComponent: Settings01Icon,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
      longDescription: t('services.automation.longDescription'),
      features: servicesData.automation.features,
      stats: t('services.automation.stats'),
      gradient: 'from-purple-500 to-pink-500',
      expertLevel: 98,
    },
  ]
})

const secondaryServices = computed(() => {
  const { tm } = useI18n()
  const servicesData = tm('services') as any

  return [
    {
      iconComponent: AiNetworkIcon,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      features: servicesData.ai.features,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      iconComponent: AiCloud01Icon,
      title: t('services.backend.title'),
      description: t('services.backend.description'),
      features: servicesData.backend.features,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      iconComponent: Analytics01Icon,
      title: t('services.analytics.title'),
      description: t('services.analytics.description'),
      features: servicesData.analytics.features,
      gradient: 'from-indigo-500 to-purple-500',
    },
  ]
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 200 } }"
          class="hero-badge"
        >
          <span class="badge-dot"></span>
          {{ t('hero.badge') }}
        </div>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 400 } }"
          class="hero-title"
        >
          {{ t('hero.title') }}
          <span class="gradient-text">{{ t('hero.titleGradient') }}</span>
          {{ t('hero.titleEnd') }}
        </h1>

        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 600 } }"
          class="hero-description"
        >
          {{ t('hero.description') }}
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 800 } }"
          class="hero-cta"
        >
          <a
            href="#contacto"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95 }"
            class="cta-primary"
            @click="scrollToContact"
          >
            {{ t('hero.ctaPrimary') }}
            <span class="cta-arrow">→</span>
          </a>
          <RouterLink
            to="/proyectos"
            v-motion
            :hover="{ scale: 1.05, transition: { duration: 200 } }"
            :tap="{ scale: 0.95 }"
            class="cta-secondary"
          >
            {{ t('hero.ctaSecondary') }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="section-header">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="section-title"
        >
          {{ t('services.title') }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
          class="section-subtitle"
        >
          {{ t('services.subtitle') }}
        </p>
      </div>

      <!-- Grid de servicios con HugeIcons -->
      <!-- Servicios Principales -->
      <div class="primary-services-grid">
        <div
          v-for="(service, index) in primaryServices"
          :key="service.title"
          v-motion
          :initial="{ opacity: 0, y: 50, scale: 0.9 }"
          :visible="{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 600, delay: index * 150 },
          }"
          :hover="{ y: -10, transition: { duration: 300 } }"
          class="primary-service-card"
        >
          <div class="primary-card-header">
            <div class="service-icon-wrapper-large" :class="service.gradient">
              <component :is="service.iconComponent" class="service-icon-large" />
            </div>
            <div class="primary-card-content">
              <h3 class="primary-card-title">{{ service.title }}</h3>
              <p class="primary-card-description">
                {{ service.longDescription }}
              </p>
            </div>
          </div>

          <div class="expert-level-section">
            <div class="expert-level-header">
              <span class="expert-level-label">Nivel de Experiencia</span>
              <span class="expert-level-value">{{ t('services.expertBadge') }}</span>
            </div>
            <div class="progress-bar-container">
              <div
                class="progress-bar-fill"
                :class="service.gradient"
                :style="{ width: service.expertLevel + '%' }"
              ></div>
            </div>
          </div>

          <!-- <ul class="features-grid">
            <li v-for="feature in service.features" :key="feature" class="feature-item">
              <span class="feature-check-icon">✓</span>
              {{ feature }}
            </li>
          </ul> -->
        </div>
      </div>

      <!-- Servicios Secundarios -->
      <div class="secondary-services-grid">
        <div
          v-for="(service, index) in secondaryServices"
          :key="service.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{
            opacity: 1,
            y: 0,
            transition: { duration: 500, delay: index * 100 },
          }"
          :hover="{ y: -8, scale: 1.02, transition: { duration: 200 } }"
          class="secondary-service-card"
        >
          <div class="service-icon-wrapper-small" :class="service.gradient">
            <component :is="service.iconComponent" class="service-icon-small" />
          </div>
          <h4 class="secondary-card-title">{{ service.title }}</h4>
          <p class="secondary-card-description">{{ service.description }}</p>
          <ul class="secondary-features-list">
            <li v-for="feature in service.features" :key="feature" class="secondary-feature-item">
              <ArrowRight01Icon class="feature-icon-chevron" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission">
      <div class="mission-content">
        <div
          v-motion
          :initial="{ opacity: 0, y: -50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
          class="mission-icon-wrapper"
        >
          <Rocket01Icon class="mission-icon" />
        </div>

        <h2
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
          class="mission-title"
        >
          {{ t('mission.title') }}
          <span class="gradient-text">{{ t('mission.titleGradient') }}</span>
        </h2>

        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
          class="mission-description"
        >
          {{ t('mission.description') }}
        </p>

        <div class="mission-values">
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
            :hover="{ y: -8 }"
            class="mission-value"
          >
            <div class="value-icon-wrapper">
              <Target02Icon class="value-icon" />
            </div>
            <div class="value-text">
              <h4>{{ t('mission.values.innovation.title') }}</h4>
              <p>{{ t('mission.values.innovation.description') }}</p>
            </div>
          </div>
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 800 } }"
            :hover="{ y: -8 }"
            class="mission-value"
          >
            <div class="value-icon-wrapper">
              <Layers01Icon class="value-icon" />
            </div>
            <div class="value-text">
              <h4>{{ t('mission.values.quality.title') }}</h4>
              <p>{{ t('mission.values.quality.description') }}</p>
            </div>
          </div>
        </div>

        <RouterLink :to="{ path: $route.path, hash: '#contacto' }" v-slot="{ navigate }" custom>
          <button
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1000 } }"
            :hover="{ scale: 1.05 }"
            :tap="{ scale: 0.95 }"
            @click="navigate"
            class="mission-cta-button"
          >
            <span>{{ t('mission.cta') }}</span>
            <ArrowRight01Icon class="button-icon" />
          </button>
        </RouterLink>
      </div>
    </section>

    <!-- Transformación Empresarial Section -->
    <section class="transformation">
      <div class="transformation-container">
        <div class="transformation-header">
          <h2
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
            class="transformation-title"
          >
            {{ t('transformation.title') }}
            <span class="gradient-text">{{ t('transformation.titleGradient') }}</span>
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
            class="transformation-description"
          >
            {{ t('transformation.description') }}
          </p>
        </div>

        <div class="transformation-grid">
          <!-- Transformación Digital Card -->
          <div
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 400 } }"
            :hover="{ y: -8 }"
            class="transformation-card digital-card"
          >
            <div class="card-icon-wrapper">
              <Rocket01Icon class="card-icon" />
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ t('transformation.digital.title') }}</h3>
              <p class="card-description">{{ t('transformation.digital.description') }}</p>
              <ul class="card-features">
                <li
                  v-for="(feature, index) in transformationFeatures.digital"
                  :key="index"
                  class="card-feature-item"
                >
                  <ArrowRight01Icon class="feature-icon-chevron" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Collaboration Badge -->
          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :visible="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 600 } }"
            class="collaboration-badge"
          >
            <div class="badge-line"></div>
            <div class="badge-content">
              <Link03Icon class="badge-icon" />
              <span class="badge-text">{{ t('transformation.collaboration') }}</span>
            </div>
            <div class="badge-line"></div>
          </div>

          <!-- Coaching Card -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 400 } }"
            :hover="{ y: -8 }"
            class="transformation-card coaching-card"
          >
            <div class="card-icon-wrapper">
              <UserStar01Icon class="card-icon" />
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ t('transformation.coaching.title') }}</h3>
              <i18n-t keypath="transformation.coaching.description" tag="p" class="card-description">
                <template #link>
                  <a href="https://quickingles.com" target="_blank" rel="noopener">{{
                    t('transformation.coaching.linkText')
                  }}</a>
                </template>
              </i18n-t>
              <ul class="card-features">
                <li
                  v-for="(feature, index) in transformationFeatures.coaching"
                  :key="index"
                  class="card-feature-item"
                >
                  <ArrowRight01Icon class="feature-icon-chevron" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Visual Metrics -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 800 } }"
          class="transformation-metrics"
        >
          <div v-motion :hover="{ scale: 1.05 }" class="metric-card">
            <ChartHistogramIcon class="metric-icon" />
            <div class="metric-text">{{ t('transformation.metrics.growth') }}</div>
          </div>
          <div v-motion :hover="{ scale: 1.05 }" class="metric-card">
            <Globe02Icon class="metric-icon" />
            <div class="metric-text">{{ t('transformation.metrics.global') }}</div>
          </div>
          <div v-motion :hover="{ scale: 1.05 }" class="metric-card">
            <Target02Icon class="metric-icon" />
            <div class="metric-text">{{ t('transformation.metrics.impact') }}</div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="transformation-cta-wrapper">
          <RouterLink :to="{ path: $route.path, hash: '#contacto' }" v-slot="{ navigate }" custom>
            <button
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1000 } }"
              :hover="{ scale: 1.05 }"
              :tap="{ scale: 0.95 }"
              @click="navigate"
              class="transformation-cta-button"
            >
              <span>{{ t('transformation.cta') }}</span>
              <ArrowRight01Icon class="button-icon" />
            </button>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 900px;
  z-index: 2;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(213, 214, 215, 0.15);
  border-radius: 30px;
  font-size: 0.85rem;
  color: rgba(213, 214, 215, 0.9);
  margin-bottom: 2rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #00dc82;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.hero-title {
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: rgb(213, 214, 215);
}

.gradient-text {
  background: linear-gradient(135deg, rgb(213, 214, 215) 0%, rgb(17, 48, 81) 50%, #0054dc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 8s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-description {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: rgba(213, 214, 215, 0.7);
  line-height: 1.7;
  margin-bottom: 3rem;
  font-weight: 300;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.cta-primary,
.cta-secondary {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  will-change: transform;
}

.cta-primary {
  background: linear-gradient(135deg, rgb(249, 115, 22) 0%, rgb(239, 68, 68) 100%);
  color: rgb(255, 255, 255);
  border: none;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
}

.cta-primary:hover {
  box-shadow: 0 15px 40px rgba(239, 68, 68, 0.5);
  transform: translateY(-3px);
}

.cta-arrow {
  transition: transform 0.3s ease;
}

.cta-primary:hover .cta-arrow {
  transform: translateX(5px);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: rgb(213, 214, 215);
  border: 1px solid rgba(213, 214, 215, 0.2);
  backdrop-filter: blur(10px);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(213, 214, 215, 0.4);
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.metric-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.metric-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(213, 214, 215, 0.2);
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(213, 214, 215);
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.9rem;
  color: rgba(213, 214, 215, 0.6);
  font-weight: 400;
}

/* Services Section */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: rgb(213, 214, 215);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(213, 214, 215, 0.6);
  font-weight: 300;
}

/* Services Section */
.services {
  padding: 6rem 0;
  max-width: 1400px;
  margin: 0 auto;
}

/* Primary Services Grid */
.primary-services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Primary Service Cards */
.primary-service-card {
  background: linear-gradient(135deg, rgba(17, 48, 81, 0.4) 0%, rgba(17, 48, 81, 0.2) 100%);
  border: 1px solid rgba(213, 214, 215, 0.15);
  border-radius: 28px;
  padding: 3rem;
  backdrop-filter: blur(30px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  will-change: transform;
  position: relative;
  overflow: hidden;
}

.primary-service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(109, 40, 217, 0.08) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 28px;
}

.primary-service-card:hover::before {
  opacity: 1;
}

.primary-service-card:hover {
  border-color: rgba(213, 214, 215, 0.3);
  box-shadow: 0 25px 70px rgba(17, 48, 81, 0.6);
  transform: translateY(-5px);
}

.primary-card-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.primary-card-content {
  flex: 1;
}

.primary-card-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: rgb(226, 232, 240);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.primary-card-description {
  color: rgba(203, 213, 225, 0.8);
  font-size: 1.125rem;
  line-height: 1.7;
  margin: 0;
}

/* Expert Level Section */
.expert-level-section {
  margin-top: 1.5rem;
}

.expert-level-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.expert-level-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(203, 213, 225);
}

.expert-level-value {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.progress-bar-container {
  position: relative;
  height: 0.75rem;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  height: 100%;
  border-radius: 9999px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-bar-fill.from-blue-500 {
  background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%);
}

.progress-bar-fill.from-purple-500 {
  background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-top: 1.5rem;
  list-style: none;
  padding: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(203, 213, 225);
  font-size: 0.875rem;
}

.feature-check-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
  color: #22d3ee;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* Stats Section */
.stats-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(71, 85, 105, 0.5);
}

.stats-content {
  text-align: center;
}

.stats-label {
  font-size: 0.875rem;
  color: rgba(203, 213, 225, 0.7);
}

.stats-value {
  margin-left: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #22d3ee;
}

/* Secondary Services Grid */
.secondary-services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Secondary Service Cards */
.secondary-service-card {
  background: linear-gradient(135deg, rgba(17, 48, 81, 0.25) 0%, rgba(17, 48, 81, 0.12) 100%);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  will-change: transform;
  position: relative;
  overflow: hidden;
}

.secondary-service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(109, 40, 217, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 24px;
}

.secondary-service-card:hover::before {
  opacity: 1;
}

.secondary-service-card:hover {
  border-color: rgba(213, 214, 215, 0.25);
  box-shadow: 0 15px 40px rgba(17, 48, 81, 0.5);
}

.secondary-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(226, 232, 240);
  margin: 1rem 0 0.75rem 0;
}

.secondary-card-description {
  color: rgba(203, 213, 225, 0.7);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.secondary-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.secondary-feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgb(203, 213, 225);
  font-size: 0.8125rem;
  transition: all 0.2s ease;
  padding: 0.125rem 0;
}

.secondary-feature-item:hover {
  color: rgb(226, 232, 240);
  transform: translateX(4px);
}

/* Chevron Icon - usado en todas las listas */
.feature-icon-chevron {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  color: #22d3ee;
  transition: all 0.2s ease;
}

.secondary-feature-item:hover .feature-icon-chevron {
  color: #06b6d4;
  transform: translateX(2px);
}

.service-icon-wrapper-large {
  width: 96px;
  height: 96px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.primary-service-card:hover .service-icon-wrapper-large {
  transform: scale(1.1) rotate(-8deg);
}

.service-icon-large {
  width: 56px;
  height: 56px;
  color: white;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.service-icon-wrapper-small {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.secondary-service-card:hover .service-icon-wrapper-small {
  transform: scale(1.15) rotate(-5deg);
}

.service-icon-small {
  width: 40px;
  height: 40px;
  color: white;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

/* Gradient Classes */
.from-blue-500 {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

.from-purple-500 {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
  box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
}

.from-orange-500 {
  background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
}

.from-green-500 {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
}

.from-indigo-500 {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
}

/* Mission Section */
.mission {
  padding: 8rem 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.mission-content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.mission-icon-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(109, 40, 217, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 60px rgba(14, 165, 233, 0.3);
  animation: float-icon 3s ease-in-out infinite;
  transition: all 0.4s ease;
}

.mission-icon-wrapper:hover {
  transform: translateY(-10px) scale(1.1);
  box-shadow: 0 30px 80px rgba(14, 165, 233, 0.5);
}

.mission-icon {
  width: 60px;
  height: 60px;
  color: rgb(14, 165, 233);
}

.mission-title {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  color: rgb(213, 214, 215);
  line-height: 1.2;
}

.mission-description {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: rgba(213, 214, 215, 0.7);
  line-height: 1.8;
  max-width: 800px;
  font-weight: 300;
}

.mission-values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 900px;
}

.mission-value {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(17, 48, 81, 0.15) 0%, rgba(17, 48, 81, 0.05) 100%);
  border: 1px solid rgba(213, 214, 215, 0.08);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.mission-value:hover {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 20px 50px rgba(14, 165, 233, 0.15);
}

.value-icon-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(109, 40, 217, 0.15) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.mission-value:hover .value-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(109, 40, 217, 0.25) 100%);
}

.value-icon {
  width: 36px;
  height: 36px;
  color: rgb(14, 165, 233);
}

.value-text {
  text-align: center;
}

.value-text h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(213, 214, 215);
  margin-bottom: 0.75rem;
}

.value-text p {
  font-size: 1rem;
  color: rgba(213, 214, 215, 0.6);
  line-height: 1.6;
}

.mission-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 3rem;
  background: linear-gradient(135deg, rgb(249, 115, 22) 0%, rgb(239, 68, 68) 100%);
  border: none;
  border-radius: 50px;
  color: rgb(255, 255, 255);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
  margin-top: 2rem;
  letter-spacing: 0.3px;
}

.mission-cta-button:hover {
  box-shadow: 0 15px 40px rgba(239, 68, 68, 0.5);
}

.button-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.mission-cta-button:hover .button-icon {
  transform: translateX(4px);
}

/* Transformation Section */
.transformation {
  padding: 8rem 96px;
  margin-left: -96px;
  margin-right: -96px;
  background: linear-gradient(135deg, rgba(17, 48, 81, 0.4) 0%, rgba(17, 48, 81, 0.1) 100%);
  position: relative;
  overflow: hidden;
}

.transformation::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(213, 214, 215, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse-glow 8s ease-in-out infinite;
}

.transformation-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.transformation-header {
  text-align: center;
  margin-bottom: 4rem;
}

.transformation-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: rgb(213, 214, 215);
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.transformation-description {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: rgba(213, 214, 215, 0.7);
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto;
  font-weight: 300;
}

.transformation-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

.transformation-card {
  background: linear-gradient(135deg, rgba(17, 48, 81, 0.3) 0%, rgba(17, 48, 81, 0.15) 100%);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.transformation-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow: 0 20px 50px rgba(14, 165, 233, 0.15);
}

.card-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.digital-card .card-icon-wrapper {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(34, 211, 238, 0.15) 100%);
}

.coaching-card .card-icon-wrapper {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(109, 40, 217, 0.15) 100%);
}

.transformation-card:hover .card-icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.digital-card:hover .card-icon-wrapper {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(34, 211, 238, 0.25) 100%);
}

.coaching-card:hover .card-icon-wrapper {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(109, 40, 217, 0.25) 100%);
}

.card-icon {
  width: 44px;
  height: 44px;
  color: rgb(34, 211, 238);
}

.coaching-card .card-icon {
  color: rgb(168, 85, 247);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(213, 214, 215);
  line-height: 1.3;
}

.card-description {
  font-size: 1rem;
  color: rgba(213, 214, 215, 0.7);
  line-height: 1.6;
}

.card-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
  list-style: none;
  padding: 0;
}

.card-feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: rgba(213, 214, 215, 0.8);
  transition: all 0.2s ease;
  cursor: pointer;
}

.card-feature-item:hover {
  color: rgb(213, 214, 215);
  transform: translateX(4px);
}

.collaboration-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
}

.badge-line {
  width: 2px;
  height: 40px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(14, 165, 233, 0.5) 50%,
    transparent 100%
  );
}

.badge-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  justify-content: center;
  backdrop-filter: blur(10px);
  animation: pulse-badge 3s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(14, 165, 233, 0);
  }
}

.badge-icon {
  width: 32px;
  height: 32px;
  color: rgb(34, 211, 238);
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(213, 214, 215);
  text-align: center;
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.transformation-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.metric-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(17, 48, 81, 0.2) 0%, rgba(17, 48, 81, 0.1) 100%);
  border: 1px solid rgba(213, 214, 215, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.metric-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  background: linear-gradient(135deg, rgba(17, 48, 81, 0.3) 0%, rgba(17, 48, 81, 0.15) 100%);
}

.metric-icon {
  width: 48px;
  height: 48px;
  color: rgb(14, 165, 233);
  transition: transform 0.3s ease;
}

.metric-card:hover .metric-icon {
  transform: scale(1.1) rotate(5deg);
}

.metric-text {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(213, 214, 215);
  text-align: center;
}

.transformation-cta-wrapper {
  display: flex;
  justify-content: center;
}

.transformation-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 3rem;
  background: linear-gradient(135deg, rgb(249, 115, 22) 0%, rgb(239, 68, 68) 100%);
  border: none;
  border-radius: 50px;
  color: rgb(255, 255, 255);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
  letter-spacing: 0.3px;
}

.transformation-cta-button:hover {
  box-shadow: 0 15px 40px rgba(239, 68, 68, 0.5);
}

.transformation-cta-button .button-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.transformation-cta-button:hover .button-icon {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem 0 3rem;
  }

  .hero-cta {
    flex-direction: column;
  }

  .cta-primary,
  .cta-secondary {
    width: 100%;
    justify-content: center;
  }

  .services {
    padding: 4rem 0;
  }

  .featured-services {
    grid-template-columns: 1fr;
  }

  .featured-card {
    padding: 2rem;
    align-items: center;
    text-align: center;
  }

  .featured-icon {
    width: 64px;
    height: 64px;
  }

  .featured-title {
    font-size: 1.6rem;
  }

  .featured-description {
    font-size: 1rem;
  }

  .featured-features {
    grid-template-columns: 1fr;
  }

  .other-services {
    flex-direction: column;
  }

  .simple-card {
    flex: 1 1 100%;
    min-width: unset;
  }

  .simple-icon {
    width: 48px;
    height: 48px;
  }

  .simple-title {
    font-size: 1.2rem;
  }

  .transformation {
    padding: 5rem 24px;
    margin-left: -24px;
    margin-right: -24px;
  }

  .transformation-visual {
    height: 350px;
  }

  .visual-card {
    width: 150px !important;
    height: 120px !important;
    padding: 1rem;
  }

  .card-icon {
    font-size: 2rem;
  }

  .card-text {
    font-size: 0.9rem;
  }

  .transformation-cta {
    width: 100%;
    justify-content: center;
  }
}
</style>

<style scoped>
/* Additional Responsive Styles */

/* Tablet */
@media (max-width: 1024px) {
  .primary-services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .secondary-services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 768px) {
  /* Services responsive */
  .primary-services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .primary-service-card {
    padding: 2rem;
  }

  .primary-card-header {
    flex-direction: column;
    gap: 1rem;
  }

  .primary-card-title {
    font-size: 1.5rem;
  }

  .primary-card-description {
    font-size: 1rem;
  }

  .service-icon-wrapper-large {
    width: 72px;
    height: 72px;
  }

  .service-icon-large {
    width: 44px;
    height: 44px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .secondary-services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .secondary-service-card {
    padding: 1.5rem;
  }

  /* Transformation responsive */
  .transformation {
    padding: 6rem 2rem;
    margin-left: 0;
    margin-right: 0;
  }

  .transformation-header {
    margin-bottom: 3rem;
  }

  .transformation-title {
    font-size: 2rem;
  }

  .transformation-description {
    font-size: 1rem;
  }

  .transformation-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .collaboration-badge {
    flex-direction: row;
    padding: 2rem 1rem;
  }

  .badge-line {
    width: auto;
    height: 2px;
    flex: 1;
    max-width: 80px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(14, 165, 233, 0.5) 50%,
      transparent 100%
    );
  }

  .badge-content {
    flex-direction: row;
    width: auto;
    height: auto;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
  }

  .badge-icon {
    width: 20px;
    height: 20px;
  }

  .badge-text {
    font-size: 0.8rem;
  }

  .transformation-card {
    padding: 2rem;
  }

  .card-icon-wrapper {
    width: 64px;
    height: 64px;
  }

  .card-icon {
    width: 36px;
    height: 36px;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-description {
    font-size: 0.95rem;
  }

  .card-features {
    gap: 0.5rem;
  }

  .card-feature-item {
    font-size: 0.85rem;
  }

  .transformation-metrics {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .metric-card {
    padding: 1.5rem;
  }

  .metric-icon {
    width: 40px;
    height: 40px;
  }

  .metric-text {
    font-size: 0.95rem;
  }

  .transformation-cta-button {
    width: 100%;
    justify-content: center;
  }

  .service-icon-wrapper-small {
    width: 56px;
    height: 56px;
  }

  .service-icon-small {
    width: 32px;
    height: 32px;
  }

  /* Mission responsive */
  .mission {
    padding: 4rem 0;
  }

  .mission-container {
    padding: 2.5rem 1.5rem;
  }

  .mission-icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .mission-icon {
    width: 44px;
    height: 44px;
  }

  .mission-values {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .mission-value {
    padding: 1.5rem;
  }

  .value-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
