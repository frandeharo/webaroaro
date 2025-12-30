<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="legal-page">
    <div class="legal-container">
      <h1 class="legal-title">{{ t('footer.cookiesPolicy.title') }}</h1>

      <div class="legal-content">
        <section class="legal-section">
          <h2>{{ t('footer.cookiesPolicy.section1Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.cookiesPolicy.section1Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.cookiesPolicy.section2Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.cookiesPolicy.section2Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.cookiesPolicy.section3Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.cookiesPolicy.section3Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.cookiesPolicy.section4Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.cookiesPolicy.section4Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.cookiesPolicy.section5Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.cookiesPolicy.section5Content') }}</p>

          <div class="browser-list">
            <div class="browser-item">
              <span class="browser-name">{{ t('footer.cookiesPolicy.browserChrome') }}</span>
              <span class="browser-path">{{ t('footer.cookiesPolicy.browserChromeDesc') }}</span>
            </div>
            <div class="browser-item">
              <span class="browser-name">{{ t('footer.cookiesPolicy.browserFirefox') }}</span>
              <span class="browser-path">{{ t('footer.cookiesPolicy.browserFirefoxDesc') }}</span>
            </div>
            <div class="browser-item">
              <span class="browser-name">{{ t('footer.cookiesPolicy.browserEdge') }}</span>
              <span class="browser-path">{{ t('footer.cookiesPolicy.browserEdgeDesc') }}</span>
            </div>
            <div class="browser-item">
              <span class="browser-name">{{ t('footer.cookiesPolicy.browserSafariMac') }}</span>
              <span class="browser-path">{{ t('footer.cookiesPolicy.browserSafariMacDesc') }}</span>
            </div>
            <div class="browser-item">
              <span class="browser-name">{{ t('footer.cookiesPolicy.browserSafariIOS') }}</span>
              <span class="browser-path">{{ t('footer.cookiesPolicy.browserSafariIOSDesc') }}</span>
            </div>
            <div class="browser-item">
              <span class="browser-name">{{ t('footer.cookiesPolicy.browserOpera') }}</span>
              <span class="browser-path">{{ t('footer.cookiesPolicy.browserOperaDesc') }}</span>
            </div>
          </div>

          <p class="section-note">{{ t('footer.cookiesPolicy.section5Note') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.cookiesPolicy.section6Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.cookiesPolicy.section6Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.cookiesPolicy.section7Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.cookiesPolicy.section7Content') }}</p>
          <a href="mailto:hola@aroarostudio.com" class="contact-email">{{ t('footer.cookiesPolicy.contactEmail') }}</a>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
}

.legal-container {
  max-width: 800px;
  margin: 0 auto;
}

.legal-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: rgb(213, 214, 215);
  margin-bottom: 2rem;
}

.legal-content {
  color: rgba(213, 214, 215, 0.8);
  line-height: 1.8;
  font-size: 1rem;
}

.legal-section {
  margin-bottom: 2.5rem;
}

.legal-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(213, 214, 215);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(213, 214, 215, 0.1);
}

.legal-section p {
  color: rgba(213, 214, 215, 0.75);
}

.whitespace-pre-line {
  white-space: pre-line;
}

.browser-list {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.browser-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(213, 214, 215, 0.08);
}

.browser-item:last-child {
  border-bottom: none;
}

.browser-name {
  font-weight: 600;
  color: rgb(213, 214, 215);
  margin-bottom: 0.25rem;
}

.browser-path {
  color: rgba(213, 214, 215, 0.6);
  font-size: 0.9rem;
}

.section-note {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(14, 165, 233, 0.05);
  border-left: 3px solid rgba(14, 165, 233, 0.5);
  border-radius: 0 8px 8px 0;
  font-size: 0.95rem;
}

.contact-email {
  display: inline-block;
  margin-top: 1rem;
  color: rgb(14, 165, 233);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-email:hover {
  color: rgb(34, 211, 238);
}

@media (max-width: 768px) {
  .legal-page {
    padding: 6rem 1.5rem 3rem;
  }
}
</style>
