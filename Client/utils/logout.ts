'use client';

import { API } from "./Api";


export async function logout() {

  
  const response = await fetch(API.auth.logout, {
    method: 'POST',
    credentials: 'include',
  });
  console.log(response.status)
  if(response.ok){
    window.location.reload()
    window.location.href = "/Login"
  }
}
