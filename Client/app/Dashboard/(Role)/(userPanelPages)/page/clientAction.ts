
'use client';

import { API } from "@/utils/Api";

export async function uploadAvatar(file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(API.user.Upload_avatar, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
  return response.json();
}
