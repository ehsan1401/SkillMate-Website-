
'use server';

export async function uploadAvatar(file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:4000/users/upload-avatar', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
  return response.json();
}
