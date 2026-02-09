<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
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

interface ProjectWithTranslations extends ProjectBase {
  title: string
  subtitle: string
  shortDescription: string
  coverAlt: string
  statusLabel: string
}

const { t } = useI18n()

// SEO Setup
onMounted(() => {
  document.title = t('projectsPage.seo.title')

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', t('projectsPage.seo.description'))
  }

  const metaKeywords = document.querySelector('meta[name="keywords"]')
  if (metaKeywords) {
    metaKeywords.setAttribute('content', t('projectsPage.seo.keywords'))
  }
})

// Combinar datos del JSON con traducciones
const getProjectWithTranslations = (project: ProjectBase): ProjectWithTranslations => {
  const statusKey = project.status === 'production' ? 'production' : 'testing'
  return {
    ...project,
    title: t(`projectsData.${project.id}.title`),
    subtitle: t(`projectsData.${project.id}.subtitle`),
    shortDescription: t(`projectsData.${project.id}.shortDescription`),
    coverAlt: t(`projectsData.${project.id}.coverAlt`),
    statusLabel: t(`projectsPage.status.${statusKey}`),
  }
}

const projects = computed<ProjectWithTranslations[]>(() =>
  (projectsData.projectsList as ProjectBase[]).map(getProjectWithTranslations),
)

// Separar proyectos destacados y regulares
const featuredProjects = computed<ProjectWithTranslations[]>(() =>
  projects.value.filter((p) => p.featured === true),
)

const regularProjects = computed<ProjectWithTranslations[]>(() =>
  projects.value.filter((p) => !p.featured),
)

// Tech stack logo mapping (rutas relativas desde src/assets)
const techLogos: Record<string, string> = {
  Django: new URL('@/assets/logos/django.svg', import.meta.url).href,
  Angular: new URL('@/assets/logos/angular.png', import.meta.url).href,
  Vue: new URL('@/assets/logos/vue.png', import.meta.url).href,
  Flutter: new URL('@/assets/logos/flutter.svg', import.meta.url).href,
  n8n: new URL('@/assets/logos/n8n.svg', import.meta.url).href,
  PostgreSQL: new URL('@/assets/logos/postgresql.png', import.meta.url).href,
}

const getTechLogo = (tech: string): string | null => {
  return techLogos[tech] || null
}

// Helper para resolver rutas de imágenes
// Las imágenes de proyectos están en public/assets/img/ y se sirven estáticamente
const getImageUrl = (path: string): string => {
  return path
}

// Función para obtener las clases de Tailwind según el estado del proyecto
const getStatusClasses = (status: string): string => {
  if (status === 'production') {
    return 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
  } else if (status === 'testing') {
    return 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30'
  }
  return 'bg-gray-500/15 text-gray-400 border border-gray-500/30'
}
</script>

<template>
  <div class="proyectos">
    <!-- Header Section -->
    <div class="projects-header">
      <h1
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 100, ease: 'easeOut' } }"
        class="text-4xl! md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight"
      >
        {{ t('projectsPage.title') }}
      </h1>
    </div>

    <!-- Featured Projects (Full Width) -->
    <div v-if="featuredProjects.length > 0" class="featured-projects">
      <div
        v-for="(project, index) in featuredProjects"
        :key="`featured-${project.id}`"
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :enter="{
          opacity: 1,
          x: 0,
          transition: { duration: 1000, delay: 300, ease: 'easeOut' },
        }"
        class="featured-card"
      >
        <!-- Featured Project Image -->
        <div class="featured-image">
          <img :src="getImageUrl(project.cover.src)" :alt="project.coverAlt" />
          <div class="featured-overlay"></div>
        </div>

        <!-- Featured Project Content -->
        <div class="featured-content">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 800, delay: 500, ease: 'easeOut' },
            }"
          >
            <span class="featured-badge text-xs! font-bold uppercase tracking-wider">
              {{ t('projectsPage.featuredBadge') }}
            </span>

            <div class="featured-header">
              <h2 class="featured-title text-3xl! md:text-4xl font-extrabold">
                {{ project.title }}
              </h2>
              <span
                class="project-status text-xs font-semibold p-2! rounded-full uppercase tracking-wide"
                :class="getStatusClasses(project.status)"
              >
                {{ project.statusLabel }}
              </span>
            </div>

            <p class="featured-description text-sm md:text-base leading-relaxed">
              {{ project.shortDescription }}
            </p>

            <!-- Tech Stack -->
            <div class="featured-tech-stack">
              <div class="tech-stack-label text-xs font-semibold uppercase tracking-wider">
                {{ t('projectsPage.techStackLabel') }}
              </div>
              <div class="tech-logos">
                <div
                  v-for="(tech, techIndex) in project.technologies"
                  v-show="getTechLogo(tech)"
                  :key="tech"
                  v-motion
                  :initial="{ opacity: 0, scale: 0, rotate: -180 }"
                  :visible="{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { duration: 500, delay: 700 + techIndex * 80 },
                  }"
                  :hover="{ scale: 1.2, rotate: 5, y: -8, transition: { duration: 300 } }"
                  class="tech-logo-wrapper-featured"
                  :title="tech"
                >
                  <img :src="getTechLogo(tech)!" :alt="tech" class="tech-logo" />
                </div>
              </div>
            </div>

            <router-link
              :to="{ name: 'proyecto-detalle', params: { slug: project.slug } }"
              class="featured-cta text-base font-semibold"
            >
              {{ t('projectsPage.viewFullProject') }}
              <span class="arrow">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Projects Grid (3 columns) -->
    <div v-if="regularProjects.length > 0" class="projects-wrapper">
      <div class="projects-grid">
        <div
          v-for="(project, index) in regularProjects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 500 + index * 150, ease: 'easeOut' },
          }"
          class="project-card"
        >
          <!-- Project Cover -->
          <div class="project-cover">
            <img :src="getImageUrl(project.cover.src)" :alt="project.coverAlt" />
            <div class="cover-overlay">
              <router-link
                :to="{ name: 'proyecto-detalle', params: { slug: project.slug } }"
                v-motion
                :hover="{ scale: 1.1, transition: { duration: 200 } }"
                :tap="{ scale: 0.95 }"
                class="view-project text-base font-semibold"
              >
                {{ t('projectsPage.viewProject') }} →
              </router-link>
            </div>
          </div>

          <!-- Project Info -->
          <div class="project-info">
            <div class="project-header">
              <div class="project-title-wrapper">
                <h3 class="project-title text-xl! md:text-2xl font-bold">{{ project.title }}</h3>
                <span
                  class="project-status text-xs font-semibold px-2! py-1! rounded-full uppercase tracking-wide"
                  :class="getStatusClasses(project.status)"
                >
                  {{ project.statusLabel }}
                </span>
              </div>
              <p class="project-subtitle text-sm md:text-base font-normal leading-relaxed">
                {{ project.shortDescription }}
              </p>
            </div>

            <!-- Tech Stack -->
            <div class="tech-stack">
              <div class="tech-stack-label text-xs font-semibold uppercase tracking-wider">
                {{ t('projectsPage.stackLabel') }}
              </div>
              <div class="tech-logos">
                <div
                  v-for="(tech, techIndex) in project.technologies"
                  v-show="getTechLogo(tech)"
                  :key="tech"
                  v-motion
                  :initial="{ opacity: 0, scale: 0 }"
                  :visible="{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 400, delay: 700 + index * 150 + techIndex * 50 },
                  }"
                  :hover="{ scale: 1.15, y: -4, transition: { duration: 200 } }"
                  class="tech-logo-wrapper"
                  :title="tech"
                >
                  <img :src="getTechLogo(tech)!" :alt="tech" class="tech-logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<style scoped>
/* Main Container */
.proyectos {
  min-height: 100vh;
}

/* Header Section */
.projects-header {
  text-align: center;
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.header-badge {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background: rgba(14, 165, 233, 0.1);
  color: #0ea5e9;
  border: 1px solid rgba(14, 165, 233, 0.3);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.projects-header h1 {
  background: linear-gradient(135deg, #ffffff 0%, rgba(213, 214, 215, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.projects-header p {
  color: rgba(213, 214, 215, 0.7);
}

/* Projects Grid Wrapper */
.projects-wrapper {
  padding: 2rem 2rem 4rem;
  max-width: 1600px;
  margin: 0 auto;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Featured Projects */
.featured-projects {
  padding: 0 2rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 0;
  background: rgba(17, 48, 81, 0.4);
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(213, 214, 215, 0.05);
  backdrop-filter: blur(20px);
  position: relative;
  min-height: 400px;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.featured-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
  z-index: 1;
}

.featured-card:hover {
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(14, 165, 233, 0.2);
  transform: translateY(-8px);
}

.featured-card:hover::before {
  opacity: 1;
}

.featured-image {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  background: rgba(17, 48, 81, 0.6);
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.featured-card:hover .featured-image img {
  transform: scale(1.1);
}

.featured-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(17, 48, 81, 0.3) 70%,
    rgba(17, 48, 81, 0.8) 100%
  );
}

.featured-content {
  padding: 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.featured-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(14, 165, 233, 0.15);
  color: #0ea5e9;
  border: 1px solid rgba(14, 165, 233, 0.4);
  border-radius: 30px;
  margin-bottom: 0.8rem;
  width: fit-content;
  transition: all 0.3s ease;
}

.featured-card:hover .featured-badge {
  background: rgba(14, 165, 233, 0.25);
  border-color: rgba(14, 165, 233, 0.6);
  transform: translateX(5px);
}

.featured-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.featured-title {
  color: #ffffff;
  margin: 0;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff 0%, rgba(213, 214, 215, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.4s ease;
}

.featured-card:hover .featured-title {
  background: linear-gradient(135deg, #0ea5e9 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.featured-description {
  color: rgba(213, 214, 215, 0.7);
  margin-bottom: 1.8rem;
  max-width: 95%;
  line-height: 1.6;
}

.featured-tech-stack {
  margin-bottom: 1.8rem;
}

.tech-logo-wrapper-featured {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 48, 81, 0.6);
  border: 1px solid rgba(213, 214, 215, 0.15);
  border-radius: 12px;
  padding: 0.55rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.tech-logo-wrapper-featured:hover {
  background: rgba(14, 165, 233, 0.15);
  border-color: rgba(14, 165, 233, 0.5);
  box-shadow: 0 10px 25px rgba(14, 165, 233, 0.25);
}

.featured-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.4rem;
  background: linear-gradient(135deg, rgb(249, 115, 22) 0%, rgb(239, 68, 68) 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
  text-decoration: none;
}

.featured-cta:hover {
  box-shadow: 0 15px 40px rgba(239, 68, 68, 0.5);
  background: linear-gradient(135deg, rgb(251, 146, 60) 0%, rgb(248, 113, 113) 100%);
}

.featured-cta .arrow {
  transition: transform 0.3s ease;
  font-size: 1.3em;
}

.featured-cta:hover .arrow {
  transform: translateX(5px);
}

/* Regular Project Cards */
.project-card {
  background: rgba(17, 48, 81, 0.4);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(213, 214, 215, 0.08);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backdrop-filter: blur(20px);
  position: relative;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.project-card:hover {
  transform: translateY(-12px);
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(14, 165, 233, 0.15);
}

.project-card:hover::before {
  opacity: 1;
}

/* Project Cover */
.project-cover {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: rgba(17, 48, 81, 0.6);
}

.project-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card:hover .project-cover img {
  transform: scale(1.08);
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(17, 48, 81, 0.4) 50%,
    rgba(17, 48, 81, 0.95) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .cover-overlay {
  opacity: 1;
}

.view-project {
  color: #0ea5e9;
  background: rgba(14, 165, 233, 0.15);
  border: 2px solid #0ea5e9;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  font-size: 0.95rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.view-project:hover {
  background: #0ea5e9;
  color: #0d1e32;
  transform: scale(1.05);
}

/* Project Info */
.project-info {
  padding: 1.5rem 1.8rem 2rem;
}

.project-header {
  margin-bottom: 2rem;
}

.project-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.project-title {
  color: #ffffff;
  margin: 0;
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  color: #0ea5e9;
}

.project-status {
  white-space: nowrap;
}

.project-subtitle {
  color: rgba(213, 214, 215, 0.7);
  margin: 0;
}

/* Tech Stack */
.tech-stack {
  border-top: 1px solid rgba(213, 214, 215, 0.08);
  padding-top: 1.5rem;
}

.tech-stack-label {
  color: rgba(213, 214, 215, 0.5);
  margin-bottom: 1rem;
}

.tech-logos {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.tech-logo-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 48, 81, 0.6);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 10px;
  padding: 0.45rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.tech-logo-wrapper:hover {
  background: rgba(14, 165, 233, 0.1);
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.2);
}

.tech-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0.9);
  transition: filter 0.3s ease;
}

.tech-logo-wrapper:hover .tech-logo {
  filter: brightness(1.2);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .featured-card {
    grid-template-columns: 1fr;
  }

  .featured-image {
    min-height: 400px;
  }

  .featured-content {
    padding: 3rem 2.5rem;
  }
}

@media (max-width: 768px) {
  .projects-header {
    padding: 6rem 1.5rem 3rem;
  }

  .featured-projects {
    padding: 0 1.5rem 2rem;
  }

  .featured-image {
    min-height: 300px;
  }

  .featured-content {
    padding: 2rem 1.8rem;
  }

  .projects-wrapper {
    padding: 1.5rem 1.5rem 3rem;
  }

  .project-cover {
    height: 200px;
  }

  .project-info {
    padding: 1.2rem 1.5rem 1.5rem;
  }

  .tech-logo-wrapper {
    width: 34px;
    height: 34px;
  }

  .tech-logo-wrapper-featured {
    width: 48px;
    height: 48px;
  }

  .view-project {
    padding: 0.6rem 1.4rem;
  }

  .featured-cta {
    padding: 0.9rem 2rem;
  }
}

@media (max-width: 480px) {
  .projects-header {
    padding: 5rem 1rem 2rem;
  }

  .featured-projects {
    padding: 0 1rem 1.5rem;
  }

  .featured-content {
    padding: 1.5rem 1.5rem;
  }

  .projects-wrapper {
    padding: 1rem 1rem 2rem;
  }

  .project-title-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .featured-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .tech-logos {
    gap: 0.6rem;
  }

  .tech-logo-wrapper {
    width: 32px;
    height: 32px;
  }

  .tech-logo-wrapper-featured {
    width: 44px;
    height: 44px;
  }
}
</style>
