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


export async function DeleteFavoritePeople(UserId : number , DeleteUserID : number , url : string){

  const res = await fetch(url, {
    method: "Delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UserId , DeleteUserID}),
    credentials : 'include'
  });

  if (!res.ok) {
    throw new Error(`An error occurred: ${res.status}`);
  }
  
  return res.json();
} 