'use client';
import { useState, useEffect } from "react";
import Loading from "../Loading";
import { useUser } from "@/Components/context/UserContext/UserContext";
import AccessDenied from "@/Components/AceessDenied";
import { Button } from "antd";
import { theRoutes } from "@/utils/theRoutes";


export default function DashboardClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user } = useUser();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsReady(true), 0); 
      return () => clearTimeout(timer);
    }, []);

    if (!isReady) return <Loading />;

    return (
        <>
          {user ? 
              <section>
                  {children}
              </section>
          :
              <AccessDenied 
                type="Unauthorized" 
                ButtonHref={theRoutes.auth.Login} 
                Button={<Button variant="solid" color="volcano">Login Page</Button>}
              />
          }
        </>
    );
}
