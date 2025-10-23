
'use server';

import { API } from "@/utils/Api";

export async function uploadAvatar(file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(API.user.Upload_avatar, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
  return response.json();
}
