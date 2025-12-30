<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Linkedin01Icon, Mail01Icon, Location01Icon, FavouriteIcon } from 'hugeicons-vue'

// Import logos
import pythonLogo from '@/assets/logos/python.svg'
import jsLogo from '@/assets/logos/js.svg'
import dartLogo from '@/assets/logos/dart.svg'
import postgresqlLogo from '@/assets/logos/postgresql.png'
import gitLogo from '@/assets/logos/git.svg'
import n8nLogo from '@/assets/logos/n8n.svg'
import djangoLogo from '@/assets/logos/django.svg'
import nestjsLogo from '@/assets/logos/nestjs.svg'
import angularLogo from '@/assets/logos/angular.png'
import vueLogo from '@/assets/logos/vue.png'
import flutterLogo from '@/assets/logos/flutter.svg'
import langchainLogo from '@/assets/logos/langchain.webp'

const { t } = useI18n()

const currentYear = ref(new Date().getFullYear())

const techStack = [
  { name: 'Python', logo: pythonLogo },
  { name: 'JavaScript', logo: jsLogo },
  { name: 'Dart', logo: dartLogo },
  { name: 'PostgreSQL', logo: postgresqlLogo },
  { name: 'Git', logo: gitLogo },
  { name: 'N8N', logo: n8nLogo },
  { name: 'LangChain', logo: langchainLogo },
  { name: 'Django', logo: djangoLogo },
  { name: 'NestJS', logo: nestjsLogo },
  { name: 'Angular', logo: angularLogo },
  { name: 'Vue', logo: vueLogo },
  { name: 'Flutter', logo: flutterLogo },
]

const socialLinks = computed(() => [
  {
    name: t('footer.social.linkedin'),
    url: '#',
    icon: 'linkedin',
    component: Linkedin01Icon,
  },
  {
    name: t('footer.social.email'),
    url: 'mailto:hola@aroarostudio.com',
    icon: 'mail',
    component: Mail01Icon,
  },
])

const quickLinks = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.projects'), path: '/proyectos' },
  { name: t('nav.contact'), path: '/contacto' },
])
</script>

<template>
  <footer class="footer">
    <!-- Tech Stack -->
    <div class="tech-stack-section">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="tech-stack-container"
      >
        <h4 class="tech-stack-title">{{ t('tech.title') }}</h4>
        <div class="tech-stack-grid">
          <div
            v-for="(tech, index) in techStack"
            :key="tech.name"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :visible="{ opacity: 1, scale: 1, transition: { duration: 400, delay: index * 50 } }"
            :hover="{ scale: 1.15, y: -5, transition: { duration: 200 } }"
            class="tech-logo-wrapper"
            :title="tech.name"
          >
            <img :src="tech.logo" :alt="tech.name" class="tech-logo" />
          </div>
        </div>
      </div>
    </div>

    <div class="footer-content">
      <!-- Logo and Description -->
      <div class="footer-section">
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="footer-brand"
        >
          <h3 class="footer-logo">
            <span class="logo-text">{{ t('footer.brand.logo') }}</span>
            <span class="logo-studio">{{ t('footer.brand.logoStudio') }}</span>
          </h3>
          <p class="footer-description">
            {{ t('footer.brand.description') }}
          </p>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h4
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
          class="footer-title"
        >
          {{ t('footer.links.title') }}
        </h4>
        <ul class="footer-links">
          <li
            v-for="(link, index) in quickLinks"
            :key="link.name"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 + index * 50 } }"
          >
            <RouterLink
              :to="link.path"
              v-motion
              :hover="{ x: 5, transition: { duration: 200 } }"
              class="footer-link"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Social Links -->
      <div class="footer-section">
        <h4
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
          class="footer-title"
        >
          {{ t('footer.social.title') }}
        </h4>
        <div class="social-links">
          <a
            v-for="(social, index) in socialLinks"
            :key="social.name"
            :href="social.url"
            v-motion
            :initial="{ opacity: 0, scale: 0 }"
            :visible="{
              opacity: 1,
              scale: 1,
              transition: { duration: 600, delay: 200 + index * 100 },
            }"
            :hover="{ scale: 1.2, y: -5, transition: { duration: 200 } }"
            :tap="{ scale: 0.9 }"
            class="social-link"
            :title="social.name"
          >
            <component :is="social.component" class="social-icon" />
          </a>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="footer-section">
        <h4
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
          class="footer-title"
        >
          {{ t('footer.contactInfo.title') }}
        </h4>
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
          class="contact-info"
        >
          <p class="contact-item">
            <Mail01Icon class="contact-icon" />
            {{ t('footer.contactInfo.email') }}
          </p>
          <p class="contact-item">
            <Location01Icon class="contact-icon" />
            {{ t('footer.contactInfo.location') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 1000, delay: 400 } }"
        class="footer-bottom-content"
      >
        <p class="copyright">© {{ currentYear }} {{ t('footer.copyright') }}</p>
        <p class="made-with">
          {{ t('footer.madeWith') }} <FavouriteIcon class="heart" /> {{ t('footer.and') }}
          <span class="tech">Vue.js</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: rgba(17, 48, 81, 0.3);
  border-top: 1px solid rgba(213, 214, 215, 0.1);
  backdrop-filter: blur(20px);
  margin-top: 6rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

/* Brand Section */
.footer-brand {
  max-width: 350px;
}

.footer-logo {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(213, 214, 215);
}

.logo-studio {
  font-size: 1.2rem;
  font-weight: 300;
  color: rgba(213, 214, 215, 0.8);
}

.footer-description {
  color: rgba(213, 214, 215, 0.6);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Links Section */
.footer-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(213, 214, 215);
  margin-bottom: 1.5rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: rgba(213, 214, 215, 0.7);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-block;
  will-change: transform;
}

.footer-link:hover {
  color: rgb(213, 214, 215);
}

/* Social Links */
.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(213, 214, 215, 0.15);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  will-change: transform;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(213, 214, 215, 0.3);
  box-shadow: 0 8px 20px rgba(17, 48, 81, 0.3);
}

.social-icon {
  width: 24px;
  height: 24px;
  color: rgb(213, 214, 215);
  transition: color 0.3s ease;
}

.social-link:hover .social-icon {
  color: rgb(34, 211, 238);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(213, 214, 215, 0.7);
  font-size: 0.95rem;
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: rgb(34, 211, 238);
  flex-shrink: 0;
}

/* Tech Stack Section */
.tech-stack-section {
  border-top: 1px solid rgba(213, 214, 215, 0.1);
  padding: 2rem 2rem;
}

.tech-stack-container {
  max-width: 1400px;
  margin: 0 auto;
}

.tech-stack-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(213, 214, 215);
  text-align: center;
  margin-bottom: 2rem;
}

.tech-stack-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.tech-logo-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 12px;
  padding: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  will-change: transform;
}

.tech-logo-wrapper:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(213, 214, 215, 0.3);
  box-shadow: 0 8px 20px rgba(17, 48, 81, 0.4);
}

.tech-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0.9);
  transition: filter 0.3s ease;
}

.tech-logo-wrapper:hover .tech-logo {
  filter: brightness(1.1);
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(213, 214, 215, 0.1);
  padding: 2rem;
}

.footer-bottom-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright,
.made-with {
  color: rgba(213, 214, 215, 0.5);
  font-size: 0.9rem;
}

.heart {
  width: 18px;
  height: 18px;
  color: #ff6b6b;
  display: inline-block;
  vertical-align: middle;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.tech {
  color: #42b883;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    padding: 3rem 1.5rem 1.5rem;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .tech-stack-section {
    padding: 2rem 1.5rem;
  }

  .tech-stack-grid {
    gap: 1.5rem;
  }

  .tech-logo-wrapper {
    width: 50px;
    height: 50px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .footer-brand {
    max-width: 100%;
  }
}
</style>
