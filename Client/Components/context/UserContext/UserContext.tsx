'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { API } from "@/utils/Api";
import { UserType, UserContextType, UserInfo } from "./types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  const refreshUser = async () => {
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
    }
  };

  const refreshUserInfo = async () => {
    try {
      const res = await fetch(API.user.getUserInfo(user?.id), {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          setUserInfo(undefined);
          throw new Error("Unauthorized");
        }
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      setUserInfo(data);
    } catch (err: any) {
      setUserInfo(undefined);
    }
  };
  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      refreshUserInfo();
    }
  }, [user]);


  return (
    <UserContext.Provider value={{ user, userInfo , refreshUser , refreshUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser باید داخل <UserProvider> استفاده شود!");
  return context;
}
