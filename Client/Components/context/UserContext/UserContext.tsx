'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { API } from "@/utils/Api";
import { UserType, UserContextType, UserInfo } from "./types";
import { RefreshUser } from "@/app/Dashboard/pages/clientAction";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  const refreshUser = async (): Promise<void> => {
    try {
      const res = await fetch(API.user.info, { method: "GET", credentials: "include" });

      if (res.status === 401 || res.status === 403) {
        const refreshRes = await RefreshUser();
        if (!refreshRes || refreshRes.status === 401 || refreshRes.status === 403) {
          logout();
          return;
        }
        const retryRes = await fetch(API.user.info, { method: "GET", credentials: "include" });
        if (!retryRes.ok) {
          logout();
          return;
        }
        const data = await retryRes.json();
        setUser(data);
        return;
      }

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setUser(data);

    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const refreshUserInfo = async (): Promise<void> => {
    if (!user?.id) return;

    try {
      const res = await fetch(API.user.getUserInfo(user.id), { method: "GET", credentials: "include" });
      if (!res.ok) {
        if (res.status === 401) logout();
        return;
      }
      const data = await res.json();
      setUserInfo(data);
    } catch {
      setUserInfo(undefined);
    }
  };

  const logout = () => {
    setUser(null);
    setUserInfo(undefined);
    fetch(API.auth.logout, { method: "POST", credentials: "include" })
      .catch(err => console.error("Logout failed:", err));
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    refreshUserInfo();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, userInfo, refreshUser, refreshUserInfo, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser باید داخل <UserProvider> استفاده شود!");
  return context;
}
