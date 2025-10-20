'use server'

export async function GetUserInfoDashboard(url: string, token: string) {
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


export async function TestFunction(pervState : unknown , formData : FormData){
  const name = formData.get('name') as string | null ;


  await new Promise(resolve =>{
    setTimeout(resolve , 2000)
  })
  if(name === "OK") return "Request is OK!"

  return "Request is NOT OK! 401" ; 
}