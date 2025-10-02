'use server';

import { API } from "@/utils/Api";
import { promises } from "dns";
import { UpdateUserState } from "./type";

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



export async function updateUser(
  prevState: any,
  formData: FormData
): Promise<UpdateUserState> {
  const phone = formData.get("phone");
  const dateOfBirth = formData.get("dateofbirth");

  // Get socials as JSON and parse it
  const socialsJson = formData.get("social") as string | null;
  const social = socialsJson ? JSON.parse(socialsJson) : [];
  const id = formData.get("id");

  if (!id) {
    return { ok: false, status: 400, message: "Missing user id" };
  }

  try {
    const res = await fetch(API.user.UpdateUserInfo(Number(id)), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, dateOfBirth, social }),
      cache: "no-store",
    });

    if (!res.ok) {
      let errorMessage = "Unknown error";
      const errorStatus = res.status;

      try {
        const errorData = await res.json();
        errorMessage =
          errorData.message || errorData.error || JSON.stringify(errorData);
      } catch {
        errorMessage = await res.text();
      }

      return { ok: false, status: errorStatus, message: errorMessage };
    }

    const data = await res.json();
    return { ok: true, status: res.status, message: "Updated successfully", data };
  } catch (err: unknown) {
    let message = "Something went wrong";
    if (err instanceof Error) message = err.message;
    else if (typeof err === "string") message = err;

    return { ok: false, status: 500, message };
  }
}



