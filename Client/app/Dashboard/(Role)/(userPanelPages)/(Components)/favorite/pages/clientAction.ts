'use client';
import { fetcher } from "@/utils/fetcher";
import { User } from "./type";




export async function GetFavoritePeople(listofid : number[] , url : string){

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UsersId : listofid}),
    credentials : 'include'
  });

  if (!res.ok) {
    throw new Error(`An error occurred: ${res.status}`);
  }
  
  return res.json();
} 