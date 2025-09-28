'use client';
import AccessDenied from "@/Components/AceessDenied";
import { GetUserInfoDashboard } from "./page/action";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Button } from "antd";
import AdminPanel from "./Role/AdminPanel";
import UserPanel from "./Role/userPanel";
import ProUserPanel from "./Role/ProUserPanel";

export default function Dashboard() {
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("Token");
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
          {
            data?.type === "ADMIN" ? <AdminPanel/> : data?.type === "PRO" ? <ProUserPanel/>: <UserPanel Token={token}/>
          }
          <div>

            {errorFetch && (
              <p className="px-5 py-3 bg-red-600 cursor-pointer">{errorFetch}</p>
            )}
          </div>
        </>
      ) : (
        <AccessDenied type="Unauthorized" ButtonHref="/Login" Button={<Button variant="solid" color="volcano">Login Page</Button>}/>
      )}
    </>
  );
}
