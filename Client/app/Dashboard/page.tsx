'use client';
import AccessDenied from "@/Components/AceessDenied";
import { logout } from "@/utils/logout";
import { GetUserInfoDashboard } from "./page/action";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Button } from "antd";

export default function Dashboard() {
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // فقط بعد از mount شدن کلاینت توکن رو از localStorage بخون
  useEffect(() => {
    const savedToken = localStorage.getItem("Token");
    setToken(savedToken);
  }, []);

  const { data, error } = useSWR(
    token ? ["http://localhost:4000/users/protected", token] : null,
    ([url, token]) => GetUserInfoDashboard(url, token)
  );

  useEffect(() => {
    if (error) setErrorFetch(error);
  }, [error]);

  if (token === null) {
    return <AccessDenied type="Unauthorized" ButtonHref="/Login" Button={<Button variant="solid" color="volcano">Login Page</Button>}/>;
  }

  return (
    <>
      {token ? (
        <>
          <h1>User Dashboard</h1>
          <div>
            <p>{data?.userName}</p>
            <p>{data?.email}</p>
            <p>{data?.type}</p>
            {errorFetch && (
              <p className="px-5 py-3 bg-red-600 cursor-pointer">{errorFetch}</p>
            )}
          </div>
          <button
            className="px-5 py-3 bg-red-600 cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <AccessDenied type="Unauthorized" ButtonHref="/Login" Button={<Button variant="solid" color="volcano">Login Page</Button>}/>
      )}
    </>
  );
}
