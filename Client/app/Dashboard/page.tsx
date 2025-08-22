'use client';
import AccessDenied from "@/Components/AceessDenied";
import { logout } from "@/utils/logout";
import { GetUserInfoDashboard } from "./page/action";
import useSWR from "swr";
import { useState } from "react";


export default function Dashboard() {
    const [errorFetch , setErrorFetch] = useState<string | null>(null)
    const token = typeof window !== 'undefined' ? localStorage.getItem('Token') : null;

    const { data, error } = useSWR(
        token ? ['http://localhost:4000/users/protected', token] : null,
        ([url, token]) => GetUserInfoDashboard(url, token)
    );
    if(error){
        setErrorFetch(error);
    }
    console.log(data);

    return(
        <>
            {
                token ? <>
                    <p>
                        User Dash board
                        {/* <p>{data?.msg}</p> */}
                        {errorFetch && 
                            <p className="px-5 py-3 bg-red-600 cursor-pointer">
                                {errorFetch}
                            </p>
                        }
                    </p>
                    <button className="px-5 py-3 bg-red-600 cursor-pointer" onClick={logout}> Logout</button>
                </> : <AccessDenied/>
            }
        </>
    )
}