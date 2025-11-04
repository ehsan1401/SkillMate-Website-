async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const res = await fetch(url, { ...options, credentials: 'include' });

  if (res.status === 401) {
    const refreshRes = await fetch('/api/refresh', { method: 'POST', credentials: 'include' });
    
    if (!refreshRes.ok) {
      throw new Error('Session expired, please login again');
    }

    return await fetch(url, { ...options, credentials: 'include' });
  }

  return res;
}
