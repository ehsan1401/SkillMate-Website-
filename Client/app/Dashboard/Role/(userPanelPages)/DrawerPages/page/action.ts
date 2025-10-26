'use server';

import { API } from "@/utils/Api";
import { UpdateUserState } from "./type";
import { fetcher } from '@/utils/fetcher';



export async function GetUserInfo(token: string , id : number) {
  if (!id) {
    throw new Error("Missing user id");
  }
  const response = await fetch(API.user.getUserInfo(id), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Error in Getting User Info: ${response.statusText}`)

  };
  return response.json();
}




export async function updateUsername(email: string, newUsername: string) {
  try {
    const result = await fetcher(API.user.updateUsername(), {
      method: 'PATCH',
      body: { email, newUsername },
    });
  } catch (err) {
    console.error(err);
  }
}



export async function updateUser(
  prevState: unknown,
  formData: FormData
): Promise<UpdateUserState> {

  const phone = formData.get("phone");
  const bio = formData.get("bio");

  const dateOfBirth = formData.get("dateofbirth");

  const skillsRaw = formData.get("skills");
  let skills: string[] = [];
  if (skillsRaw) {
    try {
      skills = JSON.parse(skillsRaw as string);
      if (!Array.isArray(skills)) skills = [];
    } catch {
      skills = (skillsRaw as string).split(",").map(s => s.trim());
    }
  }


  const LearningSkillsRaw = formData.get("learning_skills");
  let learning_skills: string[] = [];
  if (LearningSkillsRaw) {
    try {
      learning_skills = JSON.parse(LearningSkillsRaw as string);
      if (!Array.isArray(learning_skills)) learning_skills = [];
    } catch {
      learning_skills = (LearningSkillsRaw as string).split(",").map(s => s.trim());
    }
  }

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
      body: JSON.stringify({ phone, dateOfBirth, social, skills , learning_skills , bio }),
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


export async function CreateUser(
  prevState: unknown,
  formData: FormData
): Promise<UpdateUserState> {

  const phone = formData.get("phone");
  const bio = formData.get("bio");

  const dateOfBirth = formData.get("dateofbirth");

  const skillsRaw = formData.get("skills");
  let skills: string[] = [];
  if (skillsRaw) {
    try {
      skills = JSON.parse(skillsRaw as string);
      if (!Array.isArray(skills)) skills = [];
    } catch {
      skills = (skillsRaw as string).split(",").map(s => s.trim());
    }
  }


  const LearningSkillsRaw = formData.get("learning_skills");
  let learning_skills: string[] = [];
  if (LearningSkillsRaw) {
    try {
      learning_skills = JSON.parse(LearningSkillsRaw as string);
      if (!Array.isArray(learning_skills)) learning_skills = [];
    } catch {
      learning_skills = (LearningSkillsRaw as string).split(",").map(s => s.trim());
    }
  }

  const socialsJson = formData.get("social") as string | null;
  const social = socialsJson ? JSON.parse(socialsJson) : [];
  const id = formData.get("id");

  if (!id) {
    return { ok: false, status: 400, message: "Missing user id" };
  }

  try {
    const res = await fetch(API.user.UpdateUserInfo(Number(id)), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, dateOfBirth, social, skills , learning_skills , bio }),
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

