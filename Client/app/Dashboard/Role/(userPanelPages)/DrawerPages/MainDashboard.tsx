import ProtectedDataButton from "@/app/Route/page";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";

export default function MainDashboard(){

    return(
        <div className="p-5 w-full h-full select-none">
            <div className="w-full flex flex-col lg:flex-row gap-0 h-16">
                <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 lg:w-1/3 w-full h-full" style={{fontFamily:"scriptMtbold"}}> 
                    Dashboard
                </h1>
                <span className="lg:w-2/3 w-full lg:h-16 p-3 -mt-5 lg:mt-0 flex justify-center items-center gap-1 text-neutral-800 dark:text-neutral-100">
                        <MaterialSymbolsNotificationsOutline className="scale-125"/>
                        this is some notifications goes here
                </span>
            </div>
            <div className="w-full lg:h-[90%] h-[80%] mt-8 lg:mt-0">
                <ProtectedDataButton/>
            </div>
        </div>
    )
}