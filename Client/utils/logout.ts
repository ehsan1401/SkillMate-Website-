'use client';

import { API } from "./Api";
import { theRoutes } from "./theRoutes";


export async function logout() {

  
  const response = await fetch(API.auth.logout, {
    method: 'POST',
    credentials: 'include',
  });
  console.log(response.status)
  if(response.ok){
    window.location.reload()
    window.location.href = theRoutes.auth.Login
  }
}
