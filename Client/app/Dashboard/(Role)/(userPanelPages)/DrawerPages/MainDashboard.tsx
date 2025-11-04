'use client';
import { useUser } from "@/Components/context/UserContext/UserContext";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { MaterialSymbolsSettingsAccountBoxRounded } from "@/Icons/SettingIcon";
import { theRoutes } from "@/utils/theRoutes";
import { Badge } from "antd";

export default function MainDashboard(){
           const { userInfo } = useUser();       

    return(
        <div className="p-5 w-full h-full select-none overflow-y-scroll">
            <div className="w-full flex flex-col lg:flex-row gap-0 h-16">
                <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 lg:w-1/3 w-full h-full" style={{fontFamily:"scriptMtbold"}}> 
                    Dashboard
                </h1>
                <span className="lg:w-2/3 w-full lg:h-16 p-3 -mt-5 lg:mt-0 flex justify-center items-center gap-1 text-neutral-800 dark:text-neutral-100">
                        <MaterialSymbolsNotificationsOutline className="scale-125"/>
                        this is some notifications goes here
                </span>
            </div>
            <div className="w-full lg:h-[86%] h-[80%] mt-8 lg:mt-0 flex md:flex-row flex-col-reverse">
                <div className=" md:w-4/5 w-full h-full pt-10 pb-3 flex flex-col gap-2 ">
                    <div className="w-full h-1/4 border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-2xl"></div>
                    <div className="w-full h-3/4 border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-2xl"></div>
                </div>
                <aside className="md:w-auto w-full px-5 h-full text-center py-3 flex md:flex-col flex-row md:items-center justify-center md:gap-2 gap-5  pt-10">
                    <Badge count={userInfo?.favorite ? userInfo.favorite.People.length : 0} color="magenta">
                    <a href={theRoutes.Dashboard.favorite}>
                        <button className="flex-col justify-center items-center md:px-5 md:py-3 px-3 py-2 rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 dark:border-neutral-100 transition-all duration-300 w-28">
                            <IonHeartCircleOutline className="md:text-5xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[60px] m-auto"/>
                            <h6 className="text-neutral-700 dark:text-neutral-100 md:text-lg" style={{fontFamily:'TwCenMt'}}>Favorite</h6>
                        </button>
                    </a>
                    </Badge>
                    <Badge count={0} color="magenta">
                    <a href={`#`}>
                        <button className="flex-col justify-center items-center md:px-5 md:py-3 px-3 py-2 rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 dark:border-neutral-100 transition-all duration-300 w-28">
                            <MaterialSymbolsNotificationsOutline className="md:text-5xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[60px] m-auto"/>
                            <h6 className="text-neutral-700 dark:text-neutral-100 md:text-lg" style={{fontFamily:'TwCenMt'}}>Empty</h6>
                        </button>
                    </a>
                    </Badge>
                    <Badge count={0}  color="magenta">
                    <a href={`#`}>
                        <button className="flex-col justify-center items-center md:px-5 md:py-3 px-3 py-2 rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 dark:border-neutral-100 transition-all duration-300 w-28">
                            <MaterialSymbolsSettingsAccountBoxRounded className="md:text-5xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[60px] m-auto"/>
                            <h6 className="text-neutral-700 dark:text-neutral-100 md:text-lg" style={{fontFamily:'TwCenMt'}}>Empty</h6>
                        </button>
                    </a>
                    </Badge>
                </aside>
            </div>
        </div>
    )
}