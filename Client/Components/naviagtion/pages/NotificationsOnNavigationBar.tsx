'use client';
import { useEffect, useState } from "react"
import useSWR from "swr";
import { API } from "@/utils/Api";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { fetcher } from "@/utils/fetcher";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar } from "antd";
import { imageUrl } from "@/utils/imageUrl";
import Link from "next/link";
import { ClockOutline } from "@/Icons/ClockOutline";
import { AlertRounded } from "@/Icons/AlertRounded";
import { HugeiconsTickDouble } from "@/Icons/HugeiconsTickDouble";
import { TrashBin } from "@/Icons/TrashBin";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import dynamic from "next/dynamic";
import { BouncedDots } from "@/Components/Loadings/BouncedDots";
import { useCheapData } from "@/Components/context/CheapData/CheapDataContext";
import { SkillmateIcon } from "@/Icons/SkillmateIcon";
import { Importatnt } from "@/Icons/Importatnt";
const EmptyFolder = dynamic(() => import("@/Icons/Vector/EmptyFolder"), {
  loading: () => <BouncedDots/>,
});


export default function NotificationsOnNavigationBar(){
    const [Loading , setLoading] = useState<boolean>(false)
    const [notifFilter , setNotifFilter] = useState<GetNotifications>('Seen')
    const {user} = useUser() 
    const {NumbersNotificationsMutate } = useCheapData() 

    dayjs.extend(relativeTime);

    const {data : GetNotification , error : GetNotificationsError , isLoading : NotificationsLoading , mutate} = useSWR<GetNotificationsFormat>(API.Notifications.GetFilteredNotifications(user!.id ,  notifFilter) , fetcher)
    const Notifications: NotificationData[] | undefined = GetNotification?.data?.sort((a, b) =>
        dayjs(b.create_at).diff(dayjs(a.create_at))
    );

    const handleSeenClick= async (NotifId : number)=>{
        setLoading(true)
        const Result = await fetch(API.Notifications.SeenNotification(NotifId) , {
            method : "PATCH",
            cache : "no-store",
        })
        if(Result.status === 200) {
            NumbersNotificationsMutate()
            mutate()
        }
        setLoading(false)
    }
    return(        
    <>
            {
                NotificationsLoading || Loading ?
                    SkelletonNotification() 
                :
                (
                    Notifications!.length > 0 ? 
                        <ul className="flex flex-col gap-2 py-5">
                            {Notifications?.map((Notif:NotificationData)=>{
                                return(
                                    <div key={Notif.notif_id}>
                                        <li 
                                        key={Notif.notif_id}
                                        className={`border-[3px] border-solid border-neutral-600 p-3 rounded-lg flex items-center gap-3 ${Notif.is_seen ? `dark:bg-neutral-700`: `${Notif.type === "Super" ? `bg-red-100 dark:bg-rose-950  hover:bg-red-200 dark:hover:bg-rose-900` : `bg-blue-100 dark:bg-neutral-800  hover:bg-blue-200 dark:hover:bg-neutral-700`} hover:cursor-pointer`}`} 
                                        onClick={()=>{Notif.is_seen ? null : handleSeenClick(Notif.notif_id)}}
                                        >
                                        <li
                                            className={`border-[3px] border-solid border-neutral-600 p-3 rounded-lg lg:flex hidden items-center gap-3 ${Notif.is_seen ? `dark:bg-neutral-700`: `${Notif.type === "Super" ? `bg-red-100 dark:bg-rose-950  hover:bg-red-200 dark:hover:bg-rose-900` : `bg-blue-100 dark:bg-neutral-800  hover:bg-blue-200 dark:hover:bg-neutral-700`} hover:cursor-pointer`}`} 
                                            onClick={()=>{Notif.is_seen ? null : handleSeenClick(Notif.notif_id)}}
                                        ></li>
                                        <Link href={``} className="hover:scale-105 transition-all duration-200">
                                            <Avatar src={imageUrl(Notif.profileImageUrl)} shape="square" size={40} className="shadow-md" />
                                        </Link>
                                        <div className="flex flex-col w-full">
                                            <div className=" w-full h-1/3 text-xs py-1 flex gap-3">
                                                <span className="flex text-[10px] gap-[2px] text-neutral-800 dark:text-neutral-200">
                                                    <ClockOutline className="mt-[1.5px]"/>
                                                    {dayjs(Notif.create_at).fromNow()}
                                                </span>
                                                <span className="">
                                                    {
                                                        Notif.is_seen ?
                                                        <HugeiconsTickDouble className="text-base text-lime-600 "/>
                                                        :
                                                        (
                                                            Notif.type === "System" ? 
                                                            <SkillmateIcon className="text-base text-blue-500 dark:text-neutral-200"/>
                                                            :
                                                            (
                                                                Notif.type === "Super" ?
                                                                <Importatnt className="text-base text-red-500 dark:text-red-200"/>
                                                                    :
                                                                <AlertRounded className="text-base text-yellow-500 dark:text-yellow-700"/> 

                                                            )   
                                                        )
                                                    }
                                                </span>
                                            </div>
                                            <div className=" w-full h-2/3 text-xs">
                                                <p className="font-vazir text-neutral-800 dark:text-neutral-200">{Notif.message}</p>
                                            </div>
                                        </div>
                                        </li>
                                    </div>
                                )
                            })}
                        </ul>
                    :

                    <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
                        <div className="opacity-50 pt-10">
                            <EmptyFolder width={100}/>
                        </div>
                        <p className="font-vazir text-sm text-neutral-800 dark:text-neutral-200">There is no Notifications!</p>
                    </div>
                )
            }
        </>)
}

function SkelletonNotification() {
  return (
    <div className="flex flex-col gap-4 pt-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full bg-gray-200 h-20 rounded-md py-3 px-5 animate-pulse flex gap-4 justify-center items-center"
        >
          <div className="bg-gray-100 lg:w-14 lg:h-14 h-10 w-10 rounded-md"></div>
          <div className="message bg-gray-300 lg:w-[80%] w-[50%] lg:h-6 h-3 rounded-lg"></div>
          <div className="lg:w-[20%] w-[30%] h-10 flex lg:px-5 gap-3 justify-center items-center">
            <span className="bg-gray-300 rounded-full lg:w-10 lg:h-10 w-5 h-5"></span>
            <span className="bg-gray-300 rounded-full lg:w-10 lg:h-10 w-5 h-5"></span>
            <span className="bg-gray-300 rounded-full lg:w-10 lg:h-10 w-5 h-5"></span>
          </div>
        </div>
      ))}
    </div>
  );
}