<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  submitted.value = true

  // Resetear formulario después de 3 segundos
  setTimeout(() => {
    submitted.value = false
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  }, 3000)
}
</script>

<template>
  <div class="contacto">
    <div class="contact-header">
      <h1
        v-motion
        :initial="{ opacity: 0, y: -50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >
        {{ t('contact.title') }}
      </h1>
      <p
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 200, ease: 'easeOut' } }"
      >
        {{ t('contact.subtitle') }}
      </p>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 400, ease: 'easeOut' } }"
      class="contact-container"
    >
      <div class="contact-info">
        <div
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 600 } }"
          :hover="{ x: 10, scale: 1.02, transition: { duration: 300 } }"
          class="info-item"
        >
          <div class="info-icon">📧</div>
          <h3>{{ t('contact.info.email') }}</h3>
          <p>{{ t('footer.contactInfo.email') }}</p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 700 } }"
          :hover="{ x: 10, scale: 1.02, transition: { duration: 300 } }"
          class="info-item"
        >
          <div class="info-icon">📱</div>
          <h3>{{ t('contact.info.phone') }}</h3>
          <p>+34 123 456 789</p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 800 } }"
          :hover="{ x: 10, scale: 1.02, transition: { duration: 300 } }"
          class="info-item"
        >
          <div class="info-icon">📍</div>
          <h3>{{ t('contact.info.location') }}</h3>
          <p>{{ t('contact.info.locationValue') }}</p>
        </div>
      </div>

      <div class="contact-form-wrapper">
        <form v-if="!submitted" @submit.prevent="handleSubmit" class="contact-form">
          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 600 } }"
            class="form-group"
          >
            <label for="name">{{ t('contact.form.name') }}</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              required
              :placeholder="t('contact.form.namePlaceholder')"
            />
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 700 } }"
            class="form-group"
          >
            <label for="email">{{ t('contact.form.email') }}</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              required
              :placeholder="t('contact.form.emailPlaceholder')"
            />
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 800 } }"
            class="form-group"
          >
            <label for="subject">{{ t('contact.form.subject') }}</label>
            <input
              type="text"
              id="subject"
              v-model="formData.subject"
              required
              :placeholder="t('contact.form.subjectPlaceholder')"
            />
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: 30 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 900 } }"
            class="form-group"
          >
            <label for="message">{{ t('contact.form.message') }}</label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="5"
              :placeholder="t('contact.form.messagePlaceholder')"
            ></textarea>
          </div>

          <button
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 1000 } }"
            :hover="{ scale: 1.05, y: -3, transition: { duration: 200 } }"
            :tap="{ scale: 0.95 }"
            type="submit"
            class="submit-btn"
          >
            {{ t('contact.form.submit') }}
          </button>
        </form>

        <div
          v-else
          v-motion
          :initial="{ opacity: 0, scale: 0 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 600, type: 'spring', stiffness: 200 } }"
          class="success-message"
        >
          <div class="success-icon">✓</div>
          <h3>{{ t('contact.success.title') }}</h3>
          <p>{{ t('contact.success.message') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contacto {
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 5rem;
}

.contact-header h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: rgb(213, 214, 215);
  margin-bottom: 1rem;
}

.contact-header p {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(213, 214, 215, 0.7);
  font-weight: 300;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  padding: 2rem;
  background: rgba(17, 48, 81, 0.25);
  border-radius: 15px;
  border: 1px solid rgba(213, 214, 215, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
  will-change: transform;
}

.info-item:hover {
  border-color: rgba(213, 214, 215, 0.3);
  box-shadow: 0 10px 30px rgba(17, 48, 81, 0.3);
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.info-item:hover .info-icon {
  transform: scale(1.2) rotate(5deg);
}

.info-item h3 {
  font-size: 1.3rem;
  color: rgb(213, 214, 215);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.info-item p {
  color: rgba(213, 214, 215, 0.7);
  font-size: 1rem;
}

.contact-form-wrapper {
  background: rgba(17, 48, 81, 0.25);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(213, 214, 215, 0.1);
  backdrop-filter: blur(10px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: rgb(213, 214, 215);
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 1rem;
  background: rgba(17, 48, 81, 0.3);
  border: 1px solid rgba(213, 214, 215, 0.2);
  border-radius: 10px;
  color: rgb(213, 214, 215);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(213, 214, 215, 0.5);
  background: rgba(17, 48, 81, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(17, 48, 81, 0.3);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(213, 214, 215, 0.4);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, rgb(17, 48, 81) 0%, rgba(17, 48, 81, 0.8) 100%);
  color: rgb(213, 214, 215);
  border: 1px solid rgba(213, 214, 215, 0.3);
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  will-change: transform;
}

.submit-btn:hover {
  box-shadow: 0 10px 25px rgba(17, 48, 81, 0.5);
  border-color: rgba(213, 214, 215, 0.5);
}

.submit-btn:active {
  transform: scale(0.98);
}

.success-message {
  text-align: center;
  padding: 3rem;
}

.success-icon {
  font-size: 4rem;
  color: #4caf50;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.success-message h3 {
  font-size: 2rem;
  color: rgb(213, 214, 215);
  margin-bottom: 0.5rem;
}

.success-message p {
  color: rgba(213, 214, 215, 0.7);
  font-size: 1.1rem;
}

@media (max-width: 968px) {
  .contacto {
    padding: 6rem 1.5rem 3rem;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-form-wrapper {
    padding: 2rem;
  }
}
</style>
