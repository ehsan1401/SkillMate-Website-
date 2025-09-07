'use client';
import useSWR from "swr";
import { GetUserInfoDashboard } from "../page/action";
import { useEffect, useState } from "react";
import { LogoutIcon } from "@/Icons/LogoutIcon";
import { logout } from "@/utils/logout";
import { MaterialSymbolsAccountBoxOutline } from "@/Icons/profileIcon";
import { SiProjectsLine } from "@/Icons/ProjectsIcon";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { MaterialSymbolsSettingsAccountBoxRounded } from "@/Icons/SettingIcon";
import MyProfile from "../DrawerPages/MyProfile";
import Projects from "../DrawerPages/Projects";
import Notifications from "../DrawerPages/Notifications";
import Settings from "../DrawerPages/Settings";
import MainDashboard from "../DrawerPages/MainDashboard";
import { MaterialSymbolsDashboardOutline } from "@/Icons/DashboardIcon";
import UploadAvatar from "./components/UploadAvatar";

export default function UserPanel(){
    const [token, setToken] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false); 
    const [itemSelected , setItemSelected] = useState<string>('item0')         


    useEffect(() => {
        setToken(sessionStorage.getItem('Token'));
        setMounted(true);
    }, []);

    const {data , error} = useSWR(    
        token ? ["http://localhost:4000/users/protected", token] : null, 
        ([url, t]) => GetUserInfoDashboard(url, t) 
    )
    console.log(data?.profileImageUrl)

    const NavigationItems = [
    { id: "item0", label: "Dashboard", icon: <MaterialSymbolsDashboardOutline /> , Component : <MainDashboard/> },
    { id: "item1", label: "My Profile", icon: <MaterialSymbolsAccountBoxOutline /> , Component : <MyProfile/> },
    { id: "item2", label: "Projects", icon: <SiProjectsLine /> ,  Component : <Projects/>  },
    { id: "item3", label: "Notifications", icon: <MaterialSymbolsNotificationsOutline /> ,  Component : <Notifications/>  },
    { id: "item4", label: "Settings", icon: <MaterialSymbolsSettingsAccountBoxRounded /> , Component : <Settings/>  },
    ];
    const handleSelect = (e : string)=>{
        setItemSelected(e)
    }

    return(
        <section className="w-full h-[91.2vh] bg-neutral-500 px-3 py-3">
            <div className="w-full h-full bg-neutral-200 rounded-4xl overflow-hidden relative">
                <div className="absolute w-1/5 h-full p-5">
                    <aside className="bg-neutral-100 w-full h-full rounded-4xl flex flex-col items-center py-5">
                        <div className="w-full text-center h-1/4">
                            <UploadAvatar avatarUrl={data?.profileImageUrl ? `http://localhost:4000${data.profileImageUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`} />

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
                        <ul className="flex flex-col gap-7 w-full py-5 pt-14 items-start px-20 h-2/4">
                        {NavigationItems.map((item) => {
                            const isSelected = itemSelected === item.id;
                            return (
                            <li
                                key={item.id}
                                className={
                                isSelected
                                    ? "text-neutral-950"
                                    : "text-neutral-400 hover:text-neutral-950 transition-all duration-300"
                                }
                            >
                                <button
                                className="flex gap-2 cursor-pointer"
                                onClick={() => !isSelected && handleSelect(item.id)}
                                >
                                {item.icon}
                                {item.label}
                                </button>
                            </li>
                            );
                        })}
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
                <section className="w-4/5 h-full float-right pr-8 py-10">
                    {
                        NavigationItems.map((items)=>{
                            if(itemSelected === items.id ) 
                                return(
                                    <div key={items.id} className="w-full h-full bg-neutral-100 p-3 rounded-3xl">
                                        {
                                            items.Component
                                        }
                                    </div>
                                )
                        })
                    }
                </section>
                <div className="w-full h-1/6 bg-cover bg-top bg-no-repeat" style={{backgroundImage : `url('/images/HeaderDashboard.jpg')`}} ></div>
            </div>
        </section>
    )
}