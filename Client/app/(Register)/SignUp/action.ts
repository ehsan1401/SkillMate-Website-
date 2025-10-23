import { API } from "@/utils/Api"

export async function SignUpUser(formData: FormData) {
  const email = formData.get('email')
  const userName = formData.get('userName')
  const passCode = formData.get('passCode')
  const RepassCode = formData.get('RepassCode')

  try {
    const res = await fetch(API.auth.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, passCode , userName , RepassCode}),
      cache: 'no-store',
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