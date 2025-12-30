<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'
import { useContactForm } from '@/composables/useContactForm'

const { t, locale } = useI18n()
const { submitContact, isPending, isSuccess, isError, reset } = useContactForm()

// Zod validation schema
const contactSchema = z.object({
  fullName: z.string().min(3, locale.value === 'es' ? 'El nombre debe tener al menos 3 caracteres' : 'Name must be at least 3 characters'),
  email: z.string().email({ message: locale.value === 'es' ? 'Email inválido' : 'Invalid email' }),
  projectType: z.string().min(1, locale.value === 'es' ? 'Selecciona un tipo de proyecto' : 'Select a project type'),
  description: z.string().min(20, locale.value === 'es' ? 'La descripción debe tener al menos 20 caracteres' : 'Description must be at least 20 characters'),
})

// Form state
const formData = ref({
  fullName: '',
  email: '',
  projectType: '',
  description: '',
})

const errors = ref<Record<string, string>>({})

const validateForm = () => {
  try {
    contactSchema.parse(formData.value)
    errors.value = {}
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = {}
      error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors.value[issue.path[0] as string] = issue.message
        }
      })
    }
    return false
  }
}

const clearError = (field: string) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const resetForm = () => {
  formData.value = {
    fullName: '',
    email: '',
    projectType: '',
    description: '',
  }
}

const submitForm = () => {
  if (!validateForm()) {
    return
  }

  submitContact(formData.value, {
    onSuccess: () => {
      setTimeout(() => {
        resetForm()
        reset()
      }, 4000)
    },
    onError: (error) => {
      console.error('Error submitting form:', error)
      setTimeout(() => {
        reset()
      }, 4000)
    },
  })
}
</script>

<template>
  <section id="contacto" class="contact">
    <div class="contact-container">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="contact-header"
      >
        <h2 class="contact-title">{{ t('contact.title') }}</h2>
        <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>
      </div>

      <form
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        class="contact-form"
        @submit.prevent="submitForm"
      >
        <div class="form-grid">
          <!-- Full Name -->
          <div class="form-group" :class="{ 'has-error': errors.fullName }">
            <div class="input-wrapper">
              <input
                id="fullName"
                v-model="formData.fullName"
                type="text"
                :placeholder="t('contact.form.fullNamePlaceholder')"
                class="form-input"
                @input="clearError('fullName')"
              />
              <label for="fullName" class="floating-label">{{
                t('contact.form.fullName')
              }}</label>
            </div>
            <transition name="error-fade">
              <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
            </transition>
          </div>

          <!-- Email -->
          <div class="form-group" :class="{ 'has-error': errors.email }">
            <div class="input-wrapper">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                :placeholder="t('contact.form.emailPlaceholder')"
                class="form-input"
                @input="clearError('email')"
              />
              <label for="email" class="floating-label">{{ t('contact.form.email') }}</label>
            </div>
            <transition name="error-fade">
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </transition>
          </div>

          <!-- Project Type -->
          <div class="form-group form-group-full" :class="{ 'has-error': errors.projectType }">
            <div class="input-wrapper">
              <select
                id="projectType"
                v-model="formData.projectType"
                class="form-select"
                @change="clearError('projectType')"
              >
                <option value="" disabled>{{ t('contact.form.projectTypePlaceholder') }}</option>
                <option value="automation">{{ t('contact.form.projectTypes.automation') }}</option>
                <option value="transformation">
                  {{ t('contact.form.projectTypes.transformation') }}
                </option>
                <option value="api">{{ t('contact.form.projectTypes.api') }}</option>
                <option value="app">{{ t('contact.form.projectTypes.app') }}</option>
                <option value="integration">
                  {{ t('contact.form.projectTypes.integration') }}
                </option>
                <option value="consulting">{{ t('contact.form.projectTypes.consulting') }}</option>
                <option value="other">{{ t('contact.form.projectTypes.other') }}</option>
              </select>
              <label for="projectType" class="floating-label">{{
                t('contact.form.projectType')
              }}</label>
            </div>
            <transition name="error-fade">
              <span v-if="errors.projectType" class="error-message">{{
                errors.projectType
              }}</span>
            </transition>
          </div>

          <!-- Description -->
          <div class="form-group form-group-full" :class="{ 'has-error': errors.description }">
            <div class="input-wrapper">
              <textarea
                id="description"
                v-model="formData.description"
                :placeholder="t('contact.form.descriptionPlaceholder')"
                class="form-textarea"
                rows="5"
                @input="clearError('description')"
              ></textarea>
              <label for="description" class="floating-label">{{
                t('contact.form.description')
              }}</label>
            </div>
            <transition name="error-fade">
              <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
            </transition>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="form-footer">
          <button
            type="submit"
            class="submit-button"
            :class="{
              'submit-button--submitting': isPending,
              'submit-button--success': isSuccess,
              'submit-button--error': isError,
            }"
            :disabled="isPending"
          >
            <span class="button-content">
              <span v-if="!isPending && !isSuccess && !isError" class="submit-text">
                {{ t('contact.form.submit') }}
                <span class="submit-icon">→</span>
              </span>
              <span v-if="isPending" class="submit-loading">
                <span class="loading-spinner"></span>
                {{ t('contact.form.sending') }}
              </span>
              <span v-if="isSuccess" class="submit-success">
                <span class="success-icon">✓</span>
                {{ t('contact.form.success') }}
              </span>
              <span v-if="isError" class="submit-error">
                <span class="error-icon">✕</span>
                {{ t('contact.form.error') }}
              </span>
            </span>
          </button>

          <div class="guarantee">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="guarantee-icon">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
              <polyline
                points="12 6 12 12 16 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              ></polyline>
            </svg>
            <span>{{ t('contact.guarantee') }}</span>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
/* Contact Section */
.contact {
  padding: 8rem 0;
  position: relative;
}

.contact-container {
  max-width: 900px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: rgb(213, 214, 215);
  margin-bottom: 1rem;
}

.contact-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(213, 214, 215, 0.7);
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
}

/* Formulario con diseño innovador */
.contact-form {
  position: relative;
  background: rgba(5, 10, 18, 0.4);
  border: 1px solid rgba(14, 165, 233, 0.2);
  border-radius: 32px;
  padding: 3.5rem;
  backdrop-filter: blur(40px);
}

.contact-form::before {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(
    135deg,
    rgba(14, 165, 233, 0.4),
    rgba(109, 40, 217, 0.2),
    rgba(79, 70, 229, 0.4)
  );
  border-radius: 32px;
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0.6;
  pointer-events: none;
  z-index: -1;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.form-group {
  position: relative;
}

.form-group-full {
  grid-column: 1 / -1;
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Floating labels */
.floating-label {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(213, 214, 215, 0.5);
  font-size: 1rem;
  font-weight: 400;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  padding: 0 0.25rem;
  z-index: 1;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 1.25rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(213, 214, 215, 0.15);
  border-radius: 16px;
  color: rgb(213, 214, 215);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.form-input::placeholder,
.form-select::placeholder,
.form-textarea::placeholder {
  color: transparent;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(14, 165, 233, 0.6);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

/* Floating label activated */
.form-input:focus ~ .floating-label,
.form-input:not(:placeholder-shown) ~ .floating-label,
.form-select:focus ~ .floating-label,
.form-select:not([value='']) ~ .floating-label,
.form-textarea:focus ~ .floating-label,
.form-textarea:not(:placeholder-shown) ~ .floating-label {
  top: 0.75rem;
  font-size: 0.75rem;
  color: rgba(14, 165, 233, 0.9);
  background: rgba(5, 10, 18, 0.95);
}

.form-select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23d5d6d7' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
}

.form-select option {
  background: rgb(5, 10, 18);
  color: rgb(213, 214, 215);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  line-height: 1.6;
}

/* Error states */
.has-error .form-input,
.has-error .form-select,
.has-error .form-textarea {
  border-color: rgba(239, 68, 68, 0.6);
}

.has-error .form-input:focus,
.has-error .form-select:focus,
.has-error .form-textarea:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: rgb(239, 68, 68);
  font-weight: 500;
}

.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease;
}

.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Form Footer */
.form-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.submit-button {
  width: 100%;
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, rgb(249, 115, 22) 0%, rgb(239, 68, 68) 100%);
  border: none;
  border-radius: 999px;
  color: rgb(255, 255, 255);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
  position: relative;
  overflow: hidden;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-text,
.submit-loading,
.submit-success,
.submit-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-icon {
  transition: transform 0.3s ease;
}

.submit-button:hover .submit-icon {
  transform: translateX(5px);
}

/* Loading spinner */
.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Button states */
.submit-button--submitting {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.8) 0%, rgba(239, 68, 68, 0.6) 100%);
}

.submit-button--success {
  background: linear-gradient(135deg, rgba(34, 197, 94, 1) 0%, rgba(34, 197, 94, 0.8) 100%);
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
}

.submit-button--error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(239, 68, 68, 0.8) 100%);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

/* Guarantee badge */
.guarantee {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(213, 214, 215, 0.1);
  border-radius: 999px;
  font-size: 0.9rem;
  color: rgba(213, 214, 215, 0.8);
  backdrop-filter: blur(10px);
}

.guarantee-icon {
  color: rgb(213, 214, 215);
  animation: tick-rotate 3s ease-in-out infinite;
}

@keyframes tick-rotate {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .contact {
    padding: 4rem 0;
  }

  .contact-form {
    padding: 2rem 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .submit-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  .guarantee {
    font-size: 0.85rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>
