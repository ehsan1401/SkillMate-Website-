'use client';
import AccessDenied from "@/Components/AceessDenied";
import { useEffect, useState } from "react";
import { Button } from "antd";
import AdminPanel from "./(Role)/AdminPanel";
import UserPanel from "./(Role)/userPanel";
import ProUserPanel from "./(Role)/ProUserPanel";
import { useUser } from "@/Components/context/UserContext/UserContext";



export default function Dashboard() {
  const { user } = useUser();
  const [errorFetch, setErrorFetch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    if (error) setErrorFetch(error);
  }, [error]);

  if (user === null) {
    return <AccessDenied type="Unauthorized" ButtonHref="/Login" Button={<Button variant="solid" color="volcano">Login Page</Button>}/>;
  }

  return (
    <>
      {user ? (
        <>
          {
            user?.type === "ADMIN" ? <AdminPanel/> : user?.type === "PRO" ? <ProUserPanel/>: <UserPanel userData={user}/>
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
