'use server';

import { API } from "@/utils/Api";

export async function GetUserInfo(token: string , id : number) {
  const response = await fetch(API.user.getUserInfo(id), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) throw new Error(`Error in Getting User Info: ${response.statusText}`);
  return response.json();
}