'use client';
import { API } from "@/utils/Api";

export async function RefreshUser() {
  try {
    const res = await fetch(API.auth.Refresh, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      credentials: 'include',
    });

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return data;
    }

    return { status: res.status };
    
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
}

