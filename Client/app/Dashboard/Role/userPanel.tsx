'use client';
import useSWR from "swr";
import { GetUserInfoDashboard } from "./(userPanelPages)/page/action";
import { useEffect, useState } from "react";
import { LogoutIcon } from "@/Icons/LogoutIcon";
import { logout } from "@/utils/logout";
import { MaterialSymbolsAccountBoxOutline } from "@/Icons/profileIcon";
import { SiProjectsLine } from "@/Icons/ProjectsIcon";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { MaterialSymbolsSettingsAccountBoxRounded } from "@/Icons/SettingIcon";
import MyProfile from "./(userPanelPages)/DrawerPages/MyProfile";
import Projects from "./(userPanelPages)/DrawerPages/Projects";
import Notifications from "./(userPanelPages)/DrawerPages/Notifications";
import Settings from "./(userPanelPages)/DrawerPages/Settings";
import MainDashboard from "./(userPanelPages)/DrawerPages/MainDashboard";
import { MaterialSymbolsDashboardOutline } from "@/Icons/DashboardIcon";
import UploadAvatar from "./(userPanelPages)/components/UploadAvatar";
import { API } from "@/utils/Api";
import { UserType } from "./(userPanelPages)/DrawerPages/page/type";

export default function UserPanel({userData}:{userData : UserType}){
    const [itemSelected , setItemSelected] = useState<string>('item0')         
    const [isDark , setIsDark] = useState<string | null>();
    

    useEffect(() => {
        setIsDark(localStorage.getItem('theme'));
    }, []);
    console.log(isDark)

    const NavigationItems = [
    { id: "item0", label: "Dashboard", icon: <MaterialSymbolsDashboardOutline /> , Component : <MainDashboard/> },
    { id: "item1", label: "My Profile", icon: <MaterialSymbolsAccountBoxOutline /> , Component : <MyProfile userInfo={userData}/> },
    { id: "item2", label: "Projects", icon: <SiProjectsLine /> ,  Component : <Projects/>  },
    { id: "item3", label: "Notifications", icon: <MaterialSymbolsNotificationsOutline /> ,  Component : <Notifications/>  },
    { id: "item4", label: "Settings", icon: <MaterialSymbolsSettingsAccountBoxRounded /> , Component : <Settings  user={userData} />  },
    ];
    const handleSelect = (e : string)=>{
        setItemSelected(e)
    }

    return(
        <section className="w-full h-screen bg-neutral-500 dark:bg-neutral-700 lg:pt-20 pt-16 lg:p-5">
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 lg:rounded-3xl lg:overflow-hidden relative overflow-y-scroll pb-5 lg:pb-0">
                <div className="lg:absolute lg:w-1/5 w-full h-52 lg:h-full p-5">
                    <aside className="bg-neutral-100 dark:bg-neutral-600 w-full h-full rounded-3xl flex flex-col items-center lg:py-5">
                        <div className="flex flex-row lg:flex-col items-end w-full h-48 lg:h-full py-3 lg:p-0 justify-center lg:justify-start">
                            <div className="text-center h-full lg:h-1/4 w-1/3 lg:w-full">
                                <UploadAvatar size={90} avatarUrl={userData?.profileImageUrl ? `${API.base.backend}${userData.profileImageUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`} />
                            </div>
                            <div className="w-1/2 h-full lg:w-full lg:pt-14 text-center lg:h-1/4 flex flex-col items-start lg:items-center pt-3">
                                <h1 className="text-2xl text-neutral-950 dark:text-neutral-100" style={{ fontFamily: "Franklin" }}>
                                {userData?.userName?.length > 15 
                                    ? userData.userName.slice(0, 15) + "..." 
                                    : userData?.userName}
                                </h1>
                                <h6 className="text-sm text-neutral-950 dark:text-neutral-100">{userData?.email}</h6>
                            </div>
                        </div>
                        <span className="w-[80%] bg-neutral-800 dark:bg-neutral-50 h-1 hidden lg:block"></span>
                        <div className=" py-5 lg:pt-10 h-2/4">
                            <ul className="flex lg:flex-col gap-7 w-fullitems-center justify-center scale-125 lg:scale-100">
                            {NavigationItems.map((item) => {
                                const isSelected = itemSelected === item.id;
                                return (
                                <li
                                    key={item.id}
                                    className={
                                    isSelected
                                        ? "text-neutral-950 dark:text-neutral-50"
                                        : "text-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-50 hover:text-neutral-950 transition-all duration-300"
                                    }
                                >
                                    <button
                                    className="flex gap-2 cursor-pointer lg:hidden"
                                    onClick={() => !isSelected && handleSelect(item.id)}
                                    >
                                        {item.icon}
                                    </button>

                                    <button
                                    className="gap-2 cursor-pointer hidden lg:flex"
                                    onClick={() => !isSelected && handleSelect(item.id)}
                                    >
                                    {item.icon}
                                    {item.label}
                                    </button>
                                </li>
                                );
                            })}
                            </ul>
                        </div>

                        <div className="w-full h-1/4 justify-center items-end p-4 -ml-2 hidden lg:flex">
                        <button
                            className="
                            flex items-center gap-2
                            text-neutral-500 font-medium
                            hover:text-neutral-950

                            dark:text-neutral-950
                            dark:hover:text-neutral-200
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
                                absolute -left-7 -bottom-1 w-0 h-0.5 bg-neutral-900 dark:bg-neutral-200
                                group-hover:w-[170%] transition-all duration-300
                                "
                            />
                            </span>
                        </button>
                        </div>

                    </aside>
                </div>
                <section className="lg:w-4/5 w-full lg:h-full h-auto lg:float-right lg:pr-8 lg:py-10 px-5">
                    {
                        NavigationItems.map((items)=>{
                            if(itemSelected === items.id ) 
                                return(
                                    <div key={items.id} className="w-full h-full bg-neutral-100 dark:bg-neutral-600 lg:p-3 py-3 px-0 rounded-3xl">
                                        {
                                            items.Component
                                        }
                                    </div>
                                )
                        })
                    }
                </section>

                <div 
                    className="w-full h-1/6 bg-cover bg-top bg-no-repeat hidden dark:hidden lg:block" 
                    style={{backgroundImage : `url('/images/HeaderDashboard.jpg')`}} 
                ></div>

                <div 
                    className="w-full h-1/6 bg-cover bg-top bg-no-repeat hidden dark:lg:block" 
                    style={{backgroundImage : `url('/images/DarkHeaderDashboard.jpg')`}} 
                ></div>


            </div>
        </section>
    )
}