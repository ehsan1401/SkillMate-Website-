import { useChangePanelItem } from "@/Components/context/PanelItem/PanelItemsProvider";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { AlternateEmailRounded } from "@/Icons/AlternateEmailRounded";
import { ConnectionPoint } from "@/Icons/ConnectionPoint";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { theRoutes } from "@/utils/theRoutes";
import { Badge } from "antd";
import Link from "next/link";
import { lazy, ReactNode, Suspense } from "react";
import LoadingSpinner from "@/Components/LoadingSpinner";
const ProfileCompletion = lazy(()=> import('./pages/ProfileCompletion'))

type boxItem = {
    name : string , 
    route : string , 
    Icon? : ReactNode , 
    animateClasses? : string , 
    count? : number , 
    fn? : ()=>void 
}

export default function CollaboratorPanel(){
    const { userInfo } = useUser();      
    const {TogglePanelItem} = useChangePanelItem();
    
    const boxItems : boxItem[] = [
        {
            name : 'Favorite' ,
            route : theRoutes.Dashboard.favorite,
            Icon : <IonHeartCircleOutline className="text-4xl"/> ,
            count : userInfo?.favorite.People.length
        },
        {
            name : 'Notifications' ,
            route : '#',
            Icon : <MaterialSymbolsNotificationsOutline className="text-4xl"/> ,
            count : 0,
            fn : ()=>{TogglePanelItem('item3')}
        },
        {
            name : 'Connections' ,
            route : '#',
            Icon : <ConnectionPoint className="text-4xl"/> ,
            count : 0
        },
        {
            name : 'something',
            route : '#',
            Icon : <AlternateEmailRounded/>
        },
        {
            name : 'asd',
            route : '#',
            Icon : <AlternateEmailRounded/>
        },
        {
            name : 'asdadadad',
            route : '#',
            Icon : <AlternateEmailRounded/>
        }
    ]
    
    return(
        <div className="w-full lg:h-[86%] h-[80%] mt-8 lg:mt-0 flex md:flex-row flex-col-reverse">
            <div className=" md:w-3/5 w-full h-full -mr-[20px]">
                <div className=" w-full h-3/5 pt-10 pb-8 flex gap-2 ">
                    <div className="w-1/2 h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md overflow-hidden">
                        <Suspense fallback={<LoadingSpinner Text="Loading..."/>}><ProfileCompletion/></Suspense>
                    </div>
                    <div className="w-1/2 h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md"></div>
                </div>
                <div className="w-full h-2/5 border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md -mt-4"></div>
            </div>
            <aside className="md:w-2/5 w-full px-5 h-full text-center py-3 flex md:flex-col flex-row md:items-center justify-center md:gap-3 gap-5  pt-8">
                <div className="w-full h-3/6 grid grid-cols-3">
                
                {
                    boxItems.map((item : boxItem)=>{
                        return(
                            <Link  key={item.name} href={item.route} onClick={item.fn} className={`px-3 flex justify-center items-center py-2 ${item.animateClasses}`}>
                                <Badge count={item.count ? item.count : 0} color="orange">
                                        <div className="border-[3px] border-solid border-neutral-600 dark:border-neutral-300 w-[90px] h-[90px] justify-center items-center rounded-md hover:rounded-2xl transition-all duration-300 text-neutral-600 dark:text-neutral-100 flex flex-col gap-1 font-vazir">
                                            <span className="text-2xl flex justify-center items-center">{item.Icon}</span>
                                            <span className="text-xs font-semibold">{item.name}</span>
                                        </div>
                                </Badge>
                            </Link>
                        )
                    })
                }

                </div>
                <div className=" w-full h-3/6 px-[15px] py-1">
                    <div className="border-[3px] border-solid border-neutral-600 dark:border-neutral-200 h-full rounded-md">

                    </div>
                </div>

            </aside>
        </div>
    )
}
