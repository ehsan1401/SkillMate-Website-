'use client';

import { API } from "@/utils/Api"

export async function loginUser(formData: FormData) {
  const email = formData.get('email')
  const passCode = formData.get('passCode')

  try {
    const res = await fetch(API.auth.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, passCode }),
      cache: 'no-store',
      credentials: 'include',
    })

    if (!res.ok) {
      let errorMessage = 'Unknown error'
      const errorStatus = res.status

      try {
        const errorData = await res.json()
        errorMessage =
          errorData.message || errorData.error || JSON.stringify(errorData)
      } catch {
        errorMessage = await res.text()
      }

      return { ok: false, status: errorStatus, message: errorMessage }
    }

    const data = await res.json()

    return { ok: true, status: res.status, data }
  }catch (err: unknown) {
  let message = 'Something went wrong'

  if (err instanceof Error) {
    message = err.message
  } else if (typeof err === 'string') {
    message = err
  }

  return {
    ok: false,
    status: 500,
    message,
  }
}

  return { ok: false, status: 500, message: 'Unexpected error' }
}

