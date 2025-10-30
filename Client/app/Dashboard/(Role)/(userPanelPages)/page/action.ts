'use server'

export async function GetUserInfoDashboard(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    console.log(Error , `${res.statusText}`)
  }

  return res.json();
}