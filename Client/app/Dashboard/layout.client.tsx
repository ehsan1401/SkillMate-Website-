'use client';
import { Suspense } from "react";
import Loading from "../Loading";
import { useUser } from "@/Components/context/UserContext/UserContext";
import AccessDenied from "@/Components/AceessDenied";
import { Button } from "antd";
import { Routes } from "@/utils/theRoutes";


export default function DashboardClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const { user } = useUser();
    return (
        <Suspense fallback={<Loading/>}>
            {user ? 
                <section>
                    {children}
                </section>
            :
                <AccessDenied type="Unauthorized" ButtonHref={Routes.auth.Login} Button={<Button variant="solid" color="volcano">Login Page</Button>}/>
            }
        </Suspense>
    );
}
