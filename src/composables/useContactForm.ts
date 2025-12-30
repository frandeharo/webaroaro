import { useMutation } from '@tanstack/vue-query'
import { submitContactForm, type ContactFormInput } from '@/api/contact'

export function useContactForm() {
  const mutation = useMutation({
    mutationKey: ['contact-form', Date.now()],
    mutationFn: (data: ContactFormInput) => submitContactForm(data),
  })

  return {
    submitContact: mutation.mutate,
    submitContactAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}
