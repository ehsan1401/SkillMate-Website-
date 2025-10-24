'use client';
import AccessDenied from "@/Components/AceessDenied";
import { GetUserInfoDashboard } from "./Role/(userPanelPages)/page/action";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Button } from "antd";
import AdminPanel from "./Role/AdminPanel";
import UserPanel from "./Role/userPanel";
import ProUserPanel from "./Role/ProUserPanel";
import { API } from "@/utils/Api";



export default function Dashboard() {
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);


  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const res = await fetch(API.user.info, {
          method: 'GET',
          credentials: 'include',
        })

        if (!res.ok) {
          throw new Error('Unauthorized or request failed')
        }

        const result = await res.json()
        setData(result)
        setToken("isLogin")
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
            data?.type === "ADMIN" ? <AdminPanel/> : data?.type === "PRO" ? <ProUserPanel/>: <UserPanel userData={data}/>
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
