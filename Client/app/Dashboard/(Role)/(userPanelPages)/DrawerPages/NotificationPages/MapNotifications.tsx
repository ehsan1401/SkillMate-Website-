'use client';
import { useEffect, useState } from "react"
import useSWR from "swr";
import { API } from "@/utils/Api";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { fetcher } from "@/utils/fetcher";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, Button } from "antd";
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
import { AcceptSyncUserToAnother } from "./action";
import { ActionButtons, GetNotifications, GetNotificationsFormat, NotificationData, NotificationFilter } from "./type";
const EmptyFolder = dynamic(() => import("@/Icons/Vector/EmptyFolder"), {
  loading: () => <BouncedDots/>,
});

export default function MapNotifications({ filter }:{ filter : NotificationFilter }){
    const [Loading , setLoading] = useState<boolean>(false)
    const [notifFilter , setNotifFilter] = useState<GetNotifications>('All')
    const {user} = useUser() 
    const {NumbersNotificationsMutate } = useCheapData() 
    const {showAlert} = useAlert()


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

    const {data : GetNotification , isLoading : NotificationsLoading , mutate} = useSWR<GetNotificationsFormat>(API.Notifications.GetFilteredNotifications(user!.id ,  notifFilter) , fetcher)
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

    const handleDeleteNotification = async (NotifId : number)=>{
        setLoading(true)
        const Result = await fetch(API.Notifications.DeleteNotification(NotifId) , {
            method : "DELETE",
            cache : "no-store",
        })
        const data = await Result.json(); 
        if(Result.status === 200) {
            showAlert(data.message, "success");
            mutate()
        }
        setLoading(false)
    }
    return(
        <>
            {
                NotificationsLoading || Loading ?
                    null
                :
                (
                    Notifications!.length > 0 ? 
                        <ul className="flex flex-col gap-2 py-5">
                            {Notifications?.map((Notif:NotificationData)=>{
                                return(
                                    <div key={Notif.notif_id}>
                                        <li
                                            className={`border-[3px] border-solid border-neutral-600 p-3 rounded-lg lg:flex hidden  items-center gap-3 ${Notif.is_seen ? `dark:bg-neutral-700`: `${Notif.type === "Super" ? `bg-red-100 dark:bg-rose-950  hover:bg-red-200 dark:hover:bg-rose-900` : `bg-blue-100 dark:bg-neutral-800  hover:bg-blue-200 dark:hover:bg-neutral-700`} hover:cursor-pointer`}`} 
                                            onClick={() => {
                                                if (!Notif.is_seen) handleSeenClick(Notif.notif_id);
                                            }}

                                        >
                                            <Link href={``} className="hover:scale-105 transition-all duration-200">
                                                <Avatar src={imageUrl(Notif.profileImageUrl)} shape="square" size={64} className="shadow-md hidden md:inline-block" />
                                            </Link>
                                            <p className="md:w-8/12 md:px-4 px-2 h-12 md:pt-6 pt-3 md:text-base text-sm text-neutral-800 dark:text-neutral-200">{Notif.message}</p>
                                            {Notif.actions.actionName && DecideOnAction(Notif.actions , Notif.actions.payload.ConnectionID , Notif.notif_id )}
                                            <div className="tools md:w-4/12 h-12 flex justify-end items-center gap-5 md:pr-5">
                                                <span className="md:text-sm text-xs flex md:flex-row flex-col gap-1 text-neutral-800 dark:text-neutral-200">
                                                    <ClockOutline className="text-lg"/>
                                                    {dayjs(Notif.create_at).fromNow()}
                                                </span>
                                                <span className="text-sm hidden md:inline-block">
                                                    {
                                                        Notif.is_seen ?
                                                        <HugeiconsTickDouble className="text-2xl text-lime-600"/>
                                                        :
                                                        (
                                                            Notif.type === "System" ? 
                                                            <SkillmateIcon className="text-2xl text-blue-500 dark:text-neutral-200"/>
                                                            :
                                                            (
                                                                Notif.type === "Super" ?
                                                                <Importatnt className="text-2xl text-red-500 dark:text-red-200"/>
                                                                    :
                                                                <AlertRounded className="text-2xl text-yellow-500 dark:text-yellow-700 "/> 

                                                            )   
                                                        )
                                                    }
                                                </span>
                                                {
                                                    Notif.is_seen && 
                                                    <button 
                                                        className="text-2xl text-neutral-800 dark:text-neutral-200 hover:text-red-500 dark:hover:text-red-500 hover:scale-125 transition-all duration-200 p-3 cursor-pointer"
                                                        onClick={()=>{handleDeleteNotification(Notif.notif_id)}}
                                                    >
                                                        <TrashBin/>
                                                    </button>
                                                }
                                            </div>
                                        </li>
                                        <div className="lg:hidden">
                                            {ResponsiveNotification(Notif , handleSeenClick , handleDeleteNotification )}
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    :

                    <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
                        <div className="opacity-50 hidden lg:inline-block">
                            <EmptyFolder width={200}/>
                        </div>
                        <div className="opacity-50 lg:hidden pt-10">
                            <EmptyFolder width={100}/>
                        </div>
                        <p className="font-vazir lg:text-xl text-sm text-neutral-800 dark:text-neutral-200">There is no Notifications!</p>
                    </div>
                )
            }
        </>
    )
}


export function ResponsiveNotification(Notif : NotificationData , handleSeenClick : (Notif : number)=>void , handleDeleteNotification : (Notif : number)=>void){
    return(<>
        <li 
        key={Notif.notif_id}
        className={`border-[3px] border-solid border-neutral-600 p-3 rounded-lg flex items-center gap-3 ${Notif.is_seen ? `dark:bg-neutral-700`: `${Notif.type === "Super" ? `bg-red-100 dark:bg-rose-950  hover:bg-red-200 dark:hover:bg-rose-900` : `bg-blue-100 dark:bg-neutral-800  hover:bg-blue-200 dark:hover:bg-neutral-700`} hover:cursor-pointer`}`} 
        onClick={()=>{
            if(!Notif.is_seen){
                handleSeenClick(Notif.notif_id)
            }
        }}
        >
        <span
            className={`border-[3px] border-solid border-neutral-600 p-3 rounded-lg lg:flex hidden items-center gap-3 ${Notif.is_seen ? `dark:bg-neutral-700`: `${Notif.type === "Super" ? `bg-red-100 dark:bg-rose-950  hover:bg-red-200 dark:hover:bg-rose-900` : `bg-blue-100 dark:bg-neutral-800  hover:bg-blue-200 dark:hover:bg-neutral-700`} hover:cursor-pointer`}`} 
            onClick={()=>{
                if(!Notif.is_seen){
                    handleSeenClick(Notif.notif_id)
                }
            }}
        ></span>
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
        <span>
        {
            Notif.is_seen && 
            <button 
                className="text-2xl text-neutral-800 dark:text-neutral-200 hover:text-red-500 dark:hover:text-red-500  hover:scale-125 transition-all duration-200 p-3 cursor-pointer"
                onClick={()=>{handleDeleteNotification(Notif.notif_id)}}
            >
                <TrashBin/>
            </button>
        }
        </span>
        </li>
    </>)
}

export function DecideOnAction (action : ActionButtons , ConnectionID? : number , NotifID? : number){
    const {showAlert} = useAlert()

    const HandleAcceptSync = async ()=>{
        if(ConnectionID && NotifID){
            const Result = await AcceptSyncUserToAnother(ConnectionID , NotifID)
            if(Result.status === 200){
                showAlert("Sync Request Accepted!", "success")
            }
        }else{
            showAlert("Cant Accept this Sync!", "Error")
        }
    }
    if(action.type === "sync" && action.actionName === "accept" ) {
        return (
            <div className="w-36 h-full">
                <Button type="default" onClick={HandleAcceptSync} className="font-vazir pt-1">
                    Accept
                </Button>
            </div>
        )
    }
    return null
}
