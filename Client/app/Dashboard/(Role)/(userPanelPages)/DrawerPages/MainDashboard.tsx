import ProtectedDataButton from "@/app/Route/page";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { theRoutes } from "@/utils/theRoutes";
import { Button } from "antd";

export default function MainDashboard(){

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
            <div className="w-full lg:h-[86%] h-[80%] mt-8 lg:mt-0 flex">
                <div className=" w-4/5 h-full"></div>
                <aside className="w-1/5 h-full text-center py-3">
                    <a href={theRoutes.Dashboard.favorite}>
                        <button className="flex-col justify-center items-center px-5 py-3 w-auto rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 transition-all duration-300">
                            <IonHeartCircleOutline className="text-5xl text-neutral-700 w-[60px]"/>
                            <h6 className="" style={{fontFamily:'TwCenMt'}}>Favorite</h6>
                        </button>
                    </a>
                </aside>
            </div>
        </div>
    )
}