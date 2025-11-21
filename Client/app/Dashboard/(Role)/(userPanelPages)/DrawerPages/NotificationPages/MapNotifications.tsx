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
import AOS from 'aos';
import { ClockOutline } from "@/Icons/ClockOutline";
import { AlertRounded } from "@/Icons/AlertRounded";
import { HugeiconsTickDouble } from "@/Icons/HugeiconsTickDouble";
import { StreamlineDelete1Solid } from "@/Icons/RemoveIcon";
import { TrashBin } from "@/Icons/TrashBin";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import dynamic from "next/dynamic";
import { BouncedDots } from "@/Components/Loadings/BouncedDots";
const EmptyFolder = dynamic(() => import("@/Icons/Vector/EmptyFolder"), {
  loading: () => <BouncedDots/>,
});


export default function MapNotifications({ filter }:{ filter : NotificationFilter }){
    const [Loading , setLoading] = useState<boolean>(false)
    const [notifFilter , setNotifFilter] = useState<GetNotifications>('All')
    const {user} = useUser() 
    const { showAlert } = useAlert();


    dayjs.extend(relativeTime);
    useEffect(()=>{
        switch(filter){
            case "System-Alerts":
                setNotifFilter('System');
                break;
            case "Important":
                setNotifFilter('Super');
                break;
            case "Unread-Only":
                setNotifFilter('Seen');
                break;
            default:
                setNotifFilter('All');
                break;
        }
    }, [filter])

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
        if(Result.status === 200) mutate()
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
                            {Notifications?.map((Notif)=>{
                                return(
                                    <li 
                                        key={Notif.notif_id}
                                        className={`border-[3px] border-solid border-neutral-600 p-3 rounded-lg flex items-center gap-3 ${Notif.is_seen ? ``: `bg-blue-100 hover:cursor-pointer hover:bg-blue-200`}`} 
                                        onClick={()=>{Notif.is_seen ? null : handleSeenClick(Notif.notif_id)}}
                                    >
                                        <Link href={``} className="hover:scale-105 transition-all duration-200"><Avatar src={imageUrl(Notif.profileImageUrl)} shape="square" size={64} className="shadow-md" /></Link>
                                        <p className="w-8/12 px-4 h-12 pt-6">{Notif.message}</p>
                                        <div className="tools w-4/12 h-12 flex justify-end items-center gap-5 pr-5">
                                            <span className="text-sm flex gap-1">
                                                <ClockOutline className="text-lg"/>
                                                {dayjs(Notif.create_at).fromNow()}
                                            </span>
                                            <span className="text-sm">
                                                {
                                                    Notif.is_seen ?
                                                    <HugeiconsTickDouble className="text-2xl text-lime-600"/>
                                                    :
                                                    <AlertRounded className="text-2xl text-yellow-500"/>
                                                }
                                            </span>
                                            {
                                                Notif.is_seen && 
                                                <button 
                                                    className="text-2xl text-neutral-800 hover:text-red-500 hover:scale-125 transition-all duration-200 p-3 cursor-pointer"
                                                    onClick={()=>{console.log("Remove :" , Notif.notif_id)}}
                                                >
                                                    <TrashBin/>
                                                </button>
                                            }
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    :

                    <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
                        <div className="opacity-50">
                            <EmptyFolder width={200}/>
                        </div>
                        <p className="font-vazir text-xl text-neutral-800">There is no Notifications!</p>
                    </div>
                )
            }
        </>
    )
}

function SkelletonNotification() {
  return (
    <div className="flex flex-col gap-4 pt-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full bg-gray-200 h-20 rounded-md py-3 px-5 animate-pulse flex gap-4 justify-center items-center"
        >
          <div className="bg-gray-100 w-14 h-14 rounded-md"></div>
          <div className="message bg-gray-300 w-[80%] h-6 rounded-lg"></div>
          <div className="w-[20%] h-10 flex px-5 gap-3">
            <span className="bg-gray-300 rounded-full w-10 h-10"></span>
            <span className="bg-gray-300 rounded-full w-10 h-10"></span>
            <span className="bg-gray-300 rounded-full w-10 h-10"></span>
          </div>
        </div>
      ))}
    </div>
  );
}
