'use client';
import { UserOutlined } from "@/Icons/UserOutlined";
import { Avatar } from "antd";
import useSWR from "swr";
import { GetUserInfoDashboard } from "../page/action";
import { useEffect, useState } from "react";
import { LogoutIcon } from "@/Icons/LogoutIcon";
import { logout } from "@/utils/logout";
import { MaterialSymbolsPerson } from "@/Icons/UserIcon";
import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";
import { AlternateEmailRounded } from "@/Icons/AlternateEmailRounded";
import { MaterialSymbolsLockOutline } from "@/Icons/PasswordIcon";

export default function UserPanel(){
    const [token, setToken] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false); 
    const [itemSelected , setItemSelected] = useState<string>('item1')         


    useEffect(() => {
        setToken(localStorage.getItem('Token'));
        setMounted(true);
    }, []);

    const {data , error} = useSWR(    
        token ? ["http://localhost:4000/users/protected", token] : null, 
        ([url, t]) => GetUserInfoDashboard(url, t) 
    )

    const NavigationItems = [
    { id: "item1", label: "Profile", icon: <MaterialSymbolsPerson /> },
    { id: "item2", label: "Error", icon: <IcOutlineErrorOutline /> },
    { id: "item3", label: "Email", icon: <AlternateEmailRounded /> },
    { id: "item4", label: "Password", icon: <MaterialSymbolsLockOutline /> },
    ];
    const handleSelect = (e : string)=>{
        setItemSelected(e)
    }
    console.log(itemSelected)


    return(
        <section className="w-full h-[91.2vh] bg-neutral-500 px-3 py-3">
            <div className="w-full h-full bg-neutral-200 rounded-4xl overflow-hidden relative">
                <div className="absolute w-1/5 h-full p-5">
                    <aside className="bg-neutral-100 w-full h-full rounded-4xl flex flex-col items-center py-5">
                        <div className="w-full text-center h-1/4">
                            <Avatar
                                size={90} 
                                style={{ backgroundColor: '#87d068' }}
                                src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                            />
                        </div>
                        <div className="w-full pt-10 text-center h-1/4">
                            <h1 className="text-2xl" style={{ fontFamily: "Franklin" }}>
                            {data?.userName?.length > 15 
                                ? data.userName.slice(0, 15) + "..." 
                                : data?.userName}
                            </h1>
                            <h6 className="text-sm">{data?.email}</h6>
                        </div>
                        <span className="w-[80%] bg-neutral-800 h-1"></span>
                        <ul className="flex flex-col gap-7 w-full py-5 pt-18 items-start px-20 h-2/4">
                            {
                                NavigationItems.map((item)=>{
                                    return(
                                    <>
                                        {
                                            itemSelected === `${item.id}` ? 
                                                <li className="text-neutral-950"><button className="flex gap-2 cursor-pointer">{item.icon}{item.label}</button></li>
                                            :                                         
                                                <li className="text-neutral-400 hover:text-neutral-950 transition-all duration-300"><button className="flex gap-2 cursor-pointer" onClick={()=>handleSelect(item.id)}>{item.icon}{item.label}</button></li>
                                        }
                                    </>
                                    )
                                })
                            }
                        </ul>
                        <div className="w-full h-1/4 flex justify-center items-end p-4 -ml-2">
                        <button
                            className="
                            flex items-center gap-2
                            text-neutral-500 font-medium
                            hover:text-red-500
                            relative group
                            transition-colors duration-300
                            cursor-pointer
                            "
                            onClick={logout}
                        >
                            <LogoutIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                            <span className="relative">
                            Logout
                            <span
                                className="
                                absolute -left-7 -bottom-1 w-0 h-0.5 bg-neutral-900
                                group-hover:w-[170%] transition-all duration-300
                                "
                            />
                            </span>
                        </button>
                        </div>

                    </aside>
                </div>
                <div className="w-full h-1/6 bg-cover bg-top bg-no-repeat" style={{backgroundImage : `url('/images/HeaderDashboard.jpg')`}} ></div>
            </div>
        </section>
    )
}