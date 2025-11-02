'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { API } from "@/utils/Api";
import { UserType, UserContextType } from "./types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API.user.info, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          setUser(null);
          throw new Error("Unauthorized");
        }
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setUser(null);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, error, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser باید داخل <UserProvider> استفاده شود!");
  return context;
}
