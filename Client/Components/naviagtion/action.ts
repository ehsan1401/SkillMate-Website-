'use server'

export async function GetUserInfoNavigationBar(url: string, token: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.log(Error , `${res.statusText}`)
  }

  return res.json();
}