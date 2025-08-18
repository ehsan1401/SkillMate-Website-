'use server'

export async function loginUser(formData: FormData) {
  const email = formData.get('email')
  const passCode = formData.get('passCode')

  try {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, passCode }),
      cache: 'no-store',
    })

    if (!res.ok) {
      let errorMessage = 'Unknown error'
      let errorStatus = res.status

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
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      message: err.message || 'Something went wrong',
    }
  }
  return { ok: false, status: 500, message: 'Unexpected error' }
}
