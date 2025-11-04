export async function fetcher<T>(
  url: string,
  options?: {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
  }
): Promise<{ data: T; status: number }> {
  const { method = 'GET', body, headers = {}, credentials } = options || {};

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return { data, status: res.status };
}
