'use server'

export async function fetchUserStatus() {
  try {
    const res = await fetch('http://localhost:4000/auth/status', {
      method: 'GET',
      credentials: 'include', // ارسال کوکی
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error fetching status:', errorText);
      return { loggedIn: false };
    }

    const data = await res.json();
    return data; // { loggedIn: true, payload: {...} }
  } catch (err) {
    console.error('Error fetching status:', err);
    return { loggedIn: false };
  }
}
