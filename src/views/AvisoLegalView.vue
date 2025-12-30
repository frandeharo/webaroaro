<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="legal-page">
    <div class="legal-container">
      <h1 class="legal-title">{{ t('footer.legalNotice.title') }}</h1>
      <p class="legal-copyright">{{ t('footer.legalNotice.copyright') }}</p>

      <div class="legal-content">
        <p class="legal-intro">{{ t('footer.legalNotice.intro') }}</p>

        <div class="legal-info-card">
          <div class="info-row">
            <span class="info-label">{{ t('footer.legalNotice.holder') }}:</span>
            <span class="info-value">{{ t('footer.legalNotice.holderName') }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">{{ t('footer.legalNotice.tradeName') }}:</span>
            <span class="info-value">{{ t('footer.legalNotice.tradeNameValue') }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">{{ t('footer.legalNotice.nif') }}:</span>
            <span class="info-value">{{ t('footer.legalNotice.nifValue') }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">{{ t('footer.legalNotice.address') }}:</span>
            <span class="info-value">{{ t('footer.legalNotice.addressValue') }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">{{ t('footer.legalNotice.website') }}:</span>
            <a href="https://aroarostudio.com" class="info-link">{{ t('footer.legalNotice.websiteValue') }}</a>
          </div>
        </div>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section1Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section1Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section2Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section2Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section3Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section3Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section4Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section4Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section5Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section5Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section6Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section6Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section7Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section7Content') }}</p>
        </section>

        <section class="legal-section">
          <h2>{{ t('footer.legalNotice.section8Title') }}</h2>
          <p class="whitespace-pre-line">{{ t('footer.legalNotice.section8Content') }}</p>
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
  margin-bottom: 0.5rem;
}

.legal-copyright {
  color: rgba(14, 165, 233, 0.9);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.legal-content {
  color: rgba(213, 214, 215, 0.8);
  line-height: 1.8;
  font-size: 1rem;
}

.legal-intro {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(14, 165, 233, 0.05);
  border-left: 3px solid rgba(14, 165, 233, 0.5);
  border-radius: 0 8px 8px 0;
}

.legal-info-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 3rem;
}

.info-row {
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(213, 214, 215, 0.08);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: rgba(213, 214, 215, 0.6);
  min-width: 180px;
}

.info-value {
  color: rgb(213, 214, 215);
}

.info-link {
  color: rgb(14, 165, 233);
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-link:hover {
  color: rgb(34, 211, 238);
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

@media (max-width: 768px) {
  .legal-page {
    padding: 6rem 1.5rem 3rem;
  }

  .info-row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-label {
    min-width: auto;
    font-size: 0.9rem;
  }
}
</style>
