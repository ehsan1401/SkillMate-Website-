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
    // console.log('Payload from server:', data);
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