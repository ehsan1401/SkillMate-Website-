import { useUser } from "@/Components/context/UserContext/UserContext";
import { CreateNewFolder } from "@/Icons/CreateNewFolder";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { SearchRounded } from "@/Icons/SearchRounded";
import { theRoutes } from "@/utils/theRoutes";
import { Badge, Tooltip } from "antd";
import Link from "next/link";
import { ReactNode } from "react";
import MainDashboardChart from "./MainDashboardChart";
import { SymbolsAdd } from "@/Icons/SymbolsAdd";
import { useChangePanelItem } from "@/Components/context/PanelItem/PanelItemsProvider";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { TeamIcon } from "@/Icons/TeamIcon";
import { GraphNewBroken } from "@/Icons/GraphNewBroken";
import { ConnectionPoint } from "@/Icons/ConnectionPoint";
import { ForwardMessage } from "@/Icons/ForwardMessage";
import UserNotFound from "@/Icons/Vector/UserNotFound";
import EmptyFolder from "@/Icons/Vector/EmptyFolder";
import { FileCopy } from "@/Icons/FileCopy";


type horizentalBoxItem = {name : string , route : string , Icon? : ReactNode , animateClasses? : string , count? : number , fn? : ()=>void }

export default function CreatorPanel(){    

    const { userInfo } = useUser();       
    const {TogglePanelItem} = useChangePanelItem();
    

    const horizentalBoxItems : horizentalBoxItem[]  = [
        {
            name : 'Favorite' ,
            route : theRoutes.Dashboard.favorite,
            Icon : <IonHeartCircleOutline className="text-4xl"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : userInfo?.favorite.People.length
        },
        {
            name : 'Notifications' ,
            route : '#',
            Icon : <MaterialSymbolsNotificationsOutline className="text-4xl"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : 0,
            fn : ()=>{TogglePanelItem('item3')}
        },
        {
            name : 'Profile Analyse' ,
            route : '#',
            Icon : <GraphNewBroken className="text-4xl"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : 0
        },
        {
            name : 'Connections' ,
            route : '#',
            Icon : <ConnectionPoint className="text-4xl"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : 0
        },
        {
            name : 'Invitations' ,
            route : '#',
            Icon : <ForwardMessage className="text-4xl"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : 0
        }
    ]
    
    const TopChartBoxesItems : horizentalBoxItem[]  = [
        {
            name : 'Collaborators' ,
            route : '#',
            Icon : <SearchRounded className="text-neutral-700 dark:text-neutral-100 text-2xl"/> ,
            count : 0
        },
        {   
            name : 'New Team' ,
            route : '#',
            Icon : <TeamIcon className="md:text-2xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[40px]"/> ,
            count : 0
        },
        {
            name : 'All Projects' ,
            route : theRoutes.Dashboard.favorite,
            Icon : <FileCopy className="md:text-2xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[40px]"/> ,
            count : 0
        }
    ]
    
    return(
        <div className="w-full lg:h-[86%] h-[80%] flex md:flex-col flex-row-reverse py-5 lg:py-0 ">
            <div className="h-[85%] w-full flex lg:flex-row flex-col-reverse lg:p-[13px] -mb-5">
                <div className="lg:w-4/5 w-full h-full flex lg:flex-row flex-col">
                    <section className="hidden lg:inline-block lg:w-2/6 ">{MyTeamSection()}</section>
                    <div className="lg:w-4/6 w-full h-full flex lg:flex-col flex-row">
                    <section className="hidden lg:inline-block w-full lg:h-1/5 ">{ThreeNavigationButton(TopChartBoxesItems)}</section>
                       

                        <div className="w-full lg:h-[83%] lg:px-2 py-1 lg:-my-[10px] ">
                            <div className="w-full h-full rounded-md border-[3px] border-solid border-neutral-600 dark:border-neutral-100">
                                <div className="w-full h-full opacity-55 flex flex-col justify-center items-center">
                                     {/* <MainDashboardChart/> */}
                                    <span className="lg:hidden inline-block py-2"><EmptyFolder width={90} height={80} /></span>
                                    <span className="hidden lg:inline-block"><EmptyFolder width={130} height={120} /></span>

                                    <p className="opacity-100 lg:py-4 lg:text-base text-xs">There is still no Project.</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            <div className="lg:w-1/5 w-full h-full flex flex-col items-center">
                <Badge count={0} color="magenta" className="w-full">
                    <a href={`#`} className="w-full">
                        <button className="w-full flex justify-center items-center md:px-3 md:py-1 px-1 py-2 rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 dark:border-neutral-100 transition-all duration-300 gap-1">
                            <CreateNewFolder className="md:text-2xl text-3xl text-neutral-700 dark:text-neutral-100"/>
                            <h6 className="text-neutral-700 dark:text-neutral-100 xl:text-lg mt-2" style={{fontFamily:'TwCenMt'}}>New Project</h6>
                        </button>
                    </a>
                </Badge>
                <div className="w-full h-full py-1">
                    <div className="w-full h-full border-[3px] border-solid border-neutral-600  dark:border-neutral-100 rounded-md py-2">
                        <h3 style={{fontFamily:'TwCenMt'}} className="text-xl text-center text-neutral-700 dark:text-neutral-100">Last Projects</h3>

                            <div className="w-full h-[80%] opacity-55 flex flex-col justify-center items-center">
                                <EmptyFolder width={90} height={90} />
                                <p className="opacity-100 py-4 text-sm">There is still no Project.</p>
                            </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <section className="lg:hidden w-full ">{MyTeamSection()}</section>
                    <section className="lg:hidden w-full lg:h-1/5 pt-1">{ThreeNavigationButton(TopChartBoxesItems)}</section>
                </div>

            </div>

            </div>
            <div className="md:w-full w-[20%] md:h-[20%] h-[81vh] lg:p-3 md:px-0 px-2 md:pt-7 lg:pt-3">
                <aside className="w-full h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-xl flex md:flex-row flex-col items-center justify-center gap-5 lg::px-10 ">
                    {horizentalBoxItems.map((item)=>{
                        return(
                        <Tooltip title={item.name} key={item.name}>
                            <Badge count={item.count ? item.count : 0} color="blue" key={item.name}>
                                <Link href={item.route} onClick={item.fn} className={`px-3 text-neutral-600 dark:text-neutral-100 flex justify-center items-center py-2 ${item.animateClasses}`}>
                                    {item.Icon}
                                </Link>
                            </Badge>
                        </Tooltip>
                        )
                    })}
                </aside>
            </div>
        </div>
    )
}



function MyTeamSection(){
    return(
        <div className="w-full h-full relative">
            <Tooltip title={`Add member`}><button className="absolute top-[5px] lg:right-5 right-2 scale-110 hover:rotate-90 transition-all duration-300 p-3 text-neutral-600 dark:text-neutral-100"> <SymbolsAdd /> </button></Tooltip>
            <div className="w-full h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md py-2">
                <h3 style={{fontFamily:'TwCenMt'}} className="text-xl text-center text-neutral-700 dark:text-neutral-100">My team</h3>
                <div className=" w-full h-[90%] opacity-60 flex flex-col justify-center items-center">

                    {/* this is test for now */}
                    <span className="hidden lg:inline-block"><UserNotFound width={130} height={120} /></span>
                    <span className="lg:hidden"><UserNotFound width={80} height={70} /></span>

                    <p className="opacity-100 lg:py-4 lg:*:text-base text-sm py-2">There is still no team.</p>

                </div>
            </div>

        </div>
    )
}



function ThreeNavigationButton(TopChartBoxesItems : horizentalBoxItem[]){
    return(
        <div className="w-full h-full flex flex-col lg:flex-row gap-2 pl-2 lg:px-2">
        {TopChartBoxesItems.map((item) => (
            <Badge
            count={item.count ? item.count : 0}
            color="magenta"
            key={item.name}
            className="lg:flex-1 w-full lg:w-auto"
            >
            <Link href={item.route} className="block w-full">
                <button className="flex justify-center items-center w-full xl:px-3 md:py-1 px-1 py-2 rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 dark:border-neutral-100 transition-all duration-300">
                <span className="mr-1 lg:w-8">{item.Icon}</span>
                <h6
                    className="text-neutral-700 dark:text-neutral-100 xl:text-lg mt-[7px]"
                    style={{ fontFamily: "TwCenMt" }}
                >
                    {item.name}
                </h6>
                </button>
            </Link>
            </Badge>
        ))}
        </div>
    )

}