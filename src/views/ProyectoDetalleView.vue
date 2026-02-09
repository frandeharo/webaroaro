<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ZapIcon } from 'hugeicons-vue'
import ContactSection from '@/components/ContactSection.vue'
import projectsData from '@/assets/data/projects.json'

interface ProjectBase {
  id: string
  slug: string
  status: string
  featured?: boolean
  cover: {
    src: string
  }
  technologies: string[]
}

interface ProjectContentBase {
  status: string
  cover: {
    src: string
  }
  techStack: Record<string, any>
}

const route = useRoute()
const { t, tm } = useI18n()

// Obtener el proyecto base del JSON
const projectBase = computed<ProjectBase | null>(() => {
  const slug = route.params.slug as string
  const projectsList = projectsData.projectsList as ProjectBase[]
  return projectsList.find((p) => p.slug === slug) || null
})

// Obtener el contenido técnico del JSON
const projectContent = computed<ProjectContentBase | null>(() => {
  if (!projectBase.value) return null
  const content = (projectsData.projectsContent as Record<string, ProjectContentBase>)[
    projectBase.value.id
  ]
  return content || null
})

// Datos traducidos del proyecto
const projectTranslations = computed(() => {
  if (!projectBase.value) return null
  const id = projectBase.value.id
  const statusKey = projectBase.value.status === 'production' ? 'production' : 'testing'

  return {
    title: t(`projectsData.${id}.title`),
    subtitle: t(`projectsData.${id}.subtitle`),
    shortDescription: t(`projectsData.${id}.shortDescription`),
    coverAlt: t(`projectsData.${id}.coverAlt`),
    headline: t(`projectsData.${id}.headline`),
    context: t(`projectsData.${id}.context`),
    solution: t(`projectsData.${id}.solution`),
    features: tm(`projectsData.${id}.features`) as string[],
    automation: tm(`projectsData.${id}.automation`) as string[],
    impact: tm(`projectsData.${id}.impact`) as string[],
    role: t(`projectsData.${id}.role`),
    statusLabel: t(`projectsPage.status.${statusKey}`),
    seo: {
      metaTitle: t(`projectsData.${id}.seo.metaTitle`),
      metaDescription: t(`projectsData.${id}.seo.metaDescription`),
      keywords: tm(`projectsData.${id}.seo.keywords`) as string[],
    },
  }
})

const currentProjectIndex = computed(() => {
  const slug = route.params.slug as string
  const projectsList = projectsData.projectsList as ProjectBase[]
  return projectsList.findIndex((p) => p.slug === slug)
})

const previousProject = computed(() => {
  const projectsList = projectsData.projectsList as ProjectBase[]
  if (currentProjectIndex.value <= 0) return null
  const prev = projectsList[currentProjectIndex.value - 1]
  if (!prev) return null
  return {
    ...prev,
    title: t(`projectsData.${prev.id}.title`),
  }
})

const nextProject = computed(() => {
  const projectsList = projectsData.projectsList as ProjectBase[]
  if (currentProjectIndex.value === -1 || currentProjectIndex.value >= projectsList.length - 1)
    return null
  const next = projectsList[currentProjectIndex.value + 1]
  if (!next) return null
  return {
    ...next,
    title: t(`projectsData.${next.id}.title`),
  }
})

const techLogos: Record<string, string> = {
  Django: new URL('@/assets/logos/django.svg', import.meta.url).href,
  Angular: new URL('@/assets/logos/angular.png', import.meta.url).href,
  Vue: new URL('@/assets/logos/vue.png', import.meta.url).href,
  'Vue.js': new URL('@/assets/logos/vue.png', import.meta.url).href,
  Flutter: new URL('@/assets/logos/flutter.svg', import.meta.url).href,
  n8n: new URL('@/assets/logos/n8n.svg', import.meta.url).href,
  PostgreSQL: new URL('@/assets/logos/postgresql.png', import.meta.url).href,
  'Django REST Framework': new URL('@/assets/logos/django.svg', import.meta.url).href,
}

const getTechLogo = (tech: string): string | null => {
  return techLogos[tech] || null
}

// Las imágenes de proyectos están en public/assets/img/ y se sirven estáticamente
const getImageUrl = (path: string): string => {
  return path
}

onMounted(() => {
  if (projectTranslations.value) {
    document.title = projectTranslations.value.seo.metaTitle
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', projectTranslations.value.seo.metaDescription)
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', projectTranslations.value.seo.keywords.join(', '))
    }
  }
})

const getTechStackArray = (value: any): string[] => {
  if (Array.isArray(value)) return value as string[]
  if (typeof value === 'object') return Object.values(value).flat() as string[]
  return []
}

const formatCategoryName = (name: string): string => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

const getStatusClass = (status: string): string => {
  if (status === 'production') return 'status-production'
  if (status === 'testing') return 'status-testing'
  return 'status-default'
}
</script>

<template>
  <div v-if="projectBase && projectContent && projectTranslations" class="proyecto-detalle">
    <!-- Back Navigation -->
    <div class="back-nav">
      <router-link to="/proyectos" class="back-link">
        <span class="back-arrow">←</span>
        <span>{{ t('projectsPage.backToProjects') }}</span>
      </router-link>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-badges">
          <span class="badge status-badge" :class="getStatusClass(projectBase.status)">
            {{ projectTranslations.statusLabel }}
          </span>
        </div>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
          class="hero-title"
        >
          {{ projectTranslations.title }}
        </h1>

        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
          class="hero-headline"
        >
          {{ projectTranslations.headline }}
        </p>
      </div>
    </section>

    <!-- Project Image -->
    <section class="project-image-section">
      <div class="image-container">
        <img
          :src="getImageUrl(projectContent.cover.src)"
          :alt="projectTranslations.coverAlt"
          class="project-image"
        />
        <div class="image-overlay"></div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-grid">
        <!-- Left Column - Main Info -->
        <div class="main-column">
          <!-- Context -->
          <article
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="content-card"
          >
            <h2 class="card-title">{{ t('projectsPage.sections.challenge') }}</h2>
            <p class="card-text">{{ projectTranslations.context }}</p>
          </article>

          <!-- Solution -->
          <article
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
            class="content-card"
          >
            <h2 class="card-title">{{ t('projectsPage.sections.solution') }}</h2>
            <p class="card-text">{{ projectTranslations.solution }}</p>
          </article>

          <!-- Features -->
          <article
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            class="content-card"
          >
            <h2 class="card-title">{{ t('projectsPage.sections.features') }}</h2>
            <ul class="feature-list">
              <li v-for="(feature, idx) in projectTranslations.features" :key="idx" class="feature-item">
                <span class="feature-bullet"></span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </article>

          <!-- Automation -->
          <article
            v-if="projectTranslations.automation && projectTranslations.automation.length > 0"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
            class="content-card highlight-card"
          >
            <h2 class="card-title">
              <ZapIcon class="title-icon" />
              {{ t('projectsPage.sections.automation') }}
            </h2>
            <ul class="feature-list">
              <li
                v-for="(item, idx) in projectTranslations.automation"
                :key="idx"
                class="feature-item automation"
              >
                <span class="feature-bullet automation"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>

          <!-- Impact -->
          <article
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
            class="content-card"
          >
            <h2 class="card-title">{{ t('projectsPage.sections.impact') }}</h2>
            <ul class="feature-list impact-list">
              <li v-for="(impact, idx) in projectTranslations.impact" :key="idx" class="feature-item">
                <span class="feature-bullet success"></span>
                <span>{{ impact }}</span>
              </li>
            </ul>
          </article>
        </div>

        <!-- Right Column - Sidebar -->
        <aside class="sidebar">
          <!-- Tech Stack -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
            class="sidebar-card"
          >
            <h3 class="sidebar-title">{{ t('projectsPage.sections.techStack') }}</h3>
            <div class="tech-stack-grid">
              <div
                v-for="(techArray, category) in projectContent.techStack"
                :key="category"
                class="tech-category"
              >
                <span class="tech-category-label">{{ formatCategoryName(String(category)) }}</span>
                <div class="tech-items">
                  <div
                    v-for="tech in getTechStackArray(techArray)"
                    :key="tech"
                    class="tech-item"
                    :title="tech"
                  >
                    <img
                      v-if="getTechLogo(tech)"
                      :src="getTechLogo(tech)!"
                      :alt="tech"
                      class="tech-logo"
                    />
                    <span class="tech-name">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Role -->
          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 300 } }"
            class="sidebar-card role-card"
          >
            <h3 class="sidebar-title">{{ t('projectsPage.sections.role') }}</h3>
            <p class="role-text">{{ projectTranslations.role }}</p>
          </div>
        </aside>
      </div>
    </main>

    <!-- Project Navigation -->
    <nav class="project-nav">
      <div class="nav-container">
        <router-link
          v-if="previousProject"
          :to="`/proyectos/${previousProject.slug}`"
          class="nav-link nav-prev"
        >
          <div class="nav-content">
            <span class="nav-label">← {{ t('projectsPage.previousProject') }}</span>
            <span class="nav-title">{{ previousProject.title }}</span>
          </div>
        </router-link>
        <div v-else class="nav-spacer"></div>

        <router-link
          v-if="nextProject"
          :to="`/proyectos/${nextProject.slug}`"
          class="nav-link nav-next"
        >
          <div class="nav-content">
            <span class="nav-label">{{ t('projectsPage.nextProject') }} →</span>
            <span class="nav-title">{{ nextProject.title }}</span>
          </div>
        </router-link>
        <div v-else class="nav-spacer"></div>
      </div>
    </nav>

    <!-- Contact Section -->
    <ContactSection />
  </div>

  <!-- Error State -->
  <div v-else class="error-state">
    <div class="error-content">
      <h1 class="error-title">{{ t('projectsPage.notFound.title') }}</h1>
      <p class="error-text">{{ t('projectsPage.notFound.description') }}</p>
      <router-link to="/proyectos" class="error-cta">
        {{ t('projectsPage.notFound.cta') }}
        <span>→</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.proyecto-detalle {
  min-height: 100vh;
}

/* Back Navigation */
.back-nav {
  padding: 2rem 2rem 0;
  max-width: 1400px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(213, 214, 215, 0.6);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(17, 48, 81, 0.3);
  border: 1px solid rgba(213, 214, 215, 0.1);
}

.back-link:hover {
  color: #1ed5a9;
  background: rgba(30, 213, 169, 0.1);
  border-color: rgba(30, 213, 169, 0.3);
  transform: translateX(-4px);
}

.back-arrow {
  transition: transform 0.3s ease;
}

.back-link:hover .back-arrow {
  transform: translateX(-3px);
}

/* Hero Section */
.hero {
  padding: 4rem 2rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-container {
  max-width: 900px;
}

.hero-badges {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-badge {
  background: rgba(30, 213, 169, 0.15);
  color: #1ed5a9;
  border: 1px solid rgba(30, 213, 169, 0.3);
}

.status-badge {
  border: 1px solid;
}

.status-production {
  background: rgba(30, 213, 169, 0.15);
  color: #1ed5a9;
  border-color: rgba(30, 213, 169, 0.3);
}

.status-testing {
  background: rgba(234, 179, 8, 0.15);
  color: #eab308;
  border-color: rgba(234, 179, 8, 0.3);
}

.status-default {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
  border-color: rgba(156, 163, 175, 0.3);
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, rgba(213, 214, 215, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-headline {
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  color: rgba(213, 214, 215, 0.7);
  line-height: 1.7;
  max-width: 800px;
}

/* Project Image */
.project-image-section {
  padding: 0 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.image-container {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(17, 48, 81, 0.4);
  border: 1px solid rgba(213, 214, 215, 0.1);
}

.project-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: fill;
  display: block;
  transition: transform 0.6s ease;
}

.image-container:hover .project-image {
  transform: scale(1.02);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(13, 30, 50, 0.4) 100%);
  pointer-events: none;
}

/* Main Content */
.main-content {
  padding: 0 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
  align-items: start;
}

/* Main Column */
.main-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-card {
  background: rgba(17, 48, 81, 0.4);
  border: 1px solid rgba(213, 214, 215, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
}

.content-card:hover {
  border-color: rgba(30, 213, 169, 0.2);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.highlight-card {
  background: linear-gradient(135deg, rgba(30, 213, 169, 0.08) 0%, rgba(17, 48, 81, 0.4) 100%);
  border-color: rgba(30, 213, 169, 0.2);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-icon {
  width: 1.4rem;
  height: 1.4rem;
  color: #1ed5a9;
}

.card-text {
  font-size: 1.1rem;
  color: rgba(213, 214, 215, 0.75);
  line-height: 1.8;
}

/* Feature List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.05rem;
  color: rgba(213, 214, 215, 0.8);
  line-height: 1.6;
}

.feature-bullet {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1ed5a9;
  margin-top: 0.5rem;
  box-shadow: 0 0 0 4px rgba(30, 213, 169, 0.15);
  transition: all 0.3s ease;
}

.feature-item:hover .feature-bullet {
  box-shadow: 0 0 0 6px rgba(30, 213, 169, 0.25);
  transform: scale(1.2);
}

.feature-bullet.automation {
  background: #10f896;
  box-shadow: 0 0 0 4px rgba(16, 248, 150, 0.15);
}

.feature-bullet.success {
  background: #1ed5a9;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 2rem;
}

.sidebar-card {
  background: rgba(17, 48, 81, 0.5);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Tech Stack */
.tech-stack-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tech-category {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tech-category-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(213, 214, 215, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(17, 48, 81, 0.6);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: default;
}

.tech-item:hover {
  background: rgba(30, 213, 169, 0.1);
  border-color: rgba(30, 213, 169, 0.3);
  transform: translateY(-2px);
}

.tech-logo {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.tech-name {
  font-size: 0.9rem;
  color: rgba(213, 214, 215, 0.9);
  font-weight: 500;
}

/* Role Card */
.role-card {
  background: linear-gradient(135deg, rgba(30, 213, 169, 0.1) 0%, rgba(17, 48, 81, 0.5) 100%);
  border-color: rgba(30, 213, 169, 0.2);
}

.role-text {
  font-size: 1rem;
  color: rgba(213, 214, 215, 0.85);
  line-height: 1.7;
}

/* Project Navigation */
.project-nav {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid rgba(213, 214, 215, 0.08);
}

.nav-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.nav-link {
  display: block;
  padding: 2rem;
  background: rgba(17, 48, 81, 0.4);
  border: 1px solid rgba(213, 214, 215, 0.08);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.nav-link:hover {
  background: rgba(30, 213, 169, 0.08);
  border-color: rgba(30, 213, 169, 0.3);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(213, 214, 215, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.nav-link:hover .nav-label {
  color: #1ed5a9;
}

.nav-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  transition: color 0.3s ease;
}

.nav-link:hover .nav-title {
  color: #1ed5a9;
}

.nav-next {
  text-align: right;
}

.nav-spacer {
  display: block;
}

/* Error State */
.error-state {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
}

.error-text {
  font-size: 1.1rem;
  color: rgba(213, 214, 215, 0.6);
  margin-bottom: 2.5rem;
}

.error-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, rgb(249, 115, 22) 0%, rgb(239, 68, 68) 100%);
  color: #ffffff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
}

.error-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(239, 68, 68, 0.5);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .back-nav,
  .hero,
  .project-image-section,
  .main-content,
  .project-nav {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .hero {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }

  .content-card {
    padding: 2rem;
  }

  .sidebar {
    grid-template-columns: 1fr;
  }

  .sidebar-card {
    padding: 1.5rem;
  }

  .nav-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .nav-next {
    text-align: left;
  }

  .project-image-section {
    padding-bottom: 3rem;
  }
}

@media (max-width: 480px) {
  .back-nav,
  .hero,
  .project-image-section,
  .main-content,
  .project-nav {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .content-card {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .card-text,
  .feature-item {
    font-size: 1rem;
  }

  .nav-link {
    padding: 1.5rem;
  }

  .nav-title {
    font-size: 1.1rem;
  }

  .image-container {
    border-radius: 16px;
  }
}
</style>
