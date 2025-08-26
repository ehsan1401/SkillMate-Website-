'use client';
import { UserOutlined } from "@/Icons/UserOutlined";
import { Avatar } from "antd";
import useSWR from "swr";
import { GetUserInfoDashboard } from "../page/action";
import { useEffect, useState } from "react";

export default function UserPanel(){
    const [token, setToken] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);          


    useEffect(() => {
        setToken(localStorage.getItem('Token'));
        setMounted(true);
    }, []);

    const {data , error} = useSWR(    
        token ? ["http://localhost:4000/users/protected", token] : null, 
        ([url, t]) => GetUserInfoDashboard(url, t) 
    )

    return(
        <section className="w-full h-[91.2vh] bg-neutral-500 px-3 py-3">
            <div className="w-full h-full bg-neutral-200 rounded-4xl overflow-hidden relative">
                <div className="absolute w-1/5 h-full p-5">
                    <aside className="bg-neutral-100 w-full h-full rounded-4xl flex flex-col items-center py-10">
                        <Avatar
                            size={90} 
                            style={{ backgroundColor: '#87d068' }}
                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                        />
                        <div className="w-full py-10 text-center">
                            <h1 className="text-2xl" style={{ fontFamily: "Franklin" }}>
                            {data?.userName?.length > 15 
                                ? data.userName.slice(0, 15) + "..." 
                                : data?.userName}
                            </h1>
                            <h6 className="text-sm">{data?.email}</h6>
                        </div>
                    </aside>
                </div>
                <div className="w-full h-1/6 bg-cover bg-top bg-no-repeat" style={{backgroundImage : `url('/images/HeaderDashboard.jpg')`}} ></div>
            </div>
        </section>
    )
}