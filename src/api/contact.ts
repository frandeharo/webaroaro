const NOCODB_API_URL = 'https://nocodb-production-72bf.up.railway.app'
const NOCODB_TABLE_ENDPOINT = '/api/v2/tables/mdwqcil2wjgh9x2/records'

export interface ContactFormData {
  Name: string
  Email: string
  Reason: string
  Message: string
}

export interface ContactFormInput {
  fullName: string
  email: string
  projectType: string
  description: string
}

export async function submitContactForm(data: ContactFormInput): Promise<void> {
  const payload: ContactFormData = {
    Name: data.fullName,
    Email: data.email,
    Reason: data.projectType,
    Message: data.description,
  }

  const response = await fetch(`${NOCODB_API_URL}${NOCODB_TABLE_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xc-token': import.meta.env.VITE_NOCODB_API_KEY,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}
