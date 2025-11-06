import { useUser } from "@/Components/context/UserContext/UserContext";
import { CreateNewFolder } from "@/Icons/CreateNewFolder";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { SearchRounded } from "@/Icons/SearchRounded";
import { theRoutes } from "@/utils/theRoutes";
import { Badge, Tooltip } from "antd";
import Link from "next/link";
import { ReactNode } from "react";
import MainDashboardChart from "./MainDashboardChart";
import { SymbolsAdd } from "@/Icons/sda";

type horizentalBoxItem = {name : string | ReactNode , route : string , Icon? : ReactNode , animateClasses? : string , count? : number}
export default function CreatorPanel(){
    const { userInfo } = useUser();       
    const horizentalBoxItems : horizentalBoxItem[]  = [
        {
            name : 'Favorite' ,
            route : theRoutes.Dashboard.favorite,
            Icon : <IonHeartCircleOutline className="text-4xl"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`
        }
    ]
    const TopChartBoxesItems : horizentalBoxItem[]  = [
        {
            name : 'Collaborators' ,
            route : '#',
            Icon : <SearchRounded className="text-neutral-700 dark:text-neutral-100 text-2xl"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : 0
        },
        {   
            name : 'Favorite' ,
            route : theRoutes.Dashboard.favorite,
            Icon : <CreateNewFolder className="md:text-2xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[40px]"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : 0
        },
        {
            name : 'Favorite' ,
            route : theRoutes.Dashboard.favorite,
            Icon : <CreateNewFolder className="md:text-2xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[40px]"/> ,
            animateClasses : `hover:scale-125 transition-all duration-200`,
            count : 0
        }
    ]
    
    return(
        <div className="w-full lg:h-[86%] h-[80%]">
            <div className="h-[80%] w-full flex p-4">
                <div className="w-4/5 h-full flex">
                    <div className="w-2/6 h-full relative">
                        <Tooltip title={`Add member`}><button className="absolute top-[5px] right-5 scale-110 hover:rotate-90 transition-all duration-300 p-3 text-neutral-600 dark:text-neutral-100"> <SymbolsAdd /> </button></Tooltip>
                        <div className="w-full h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md py-2">
                            <h3 style={{fontFamily:'TwCenMt'}} className="text-xl text-center text-neutral-700 dark:text-neutral-100">My team</h3>
                        </div>

                    </div>
                    <div className="w-4/6 h-full">
                        <div className="w-full h-1/5 flex justify-center items-center gap-1">
                            {
                            TopChartBoxesItems.map((item)=>{
                            return(
                            <Badge count={item.count} color="magenta">
                                <a href={item.route} className="">
                                    <button className="flex justify-center items-center md:px-3 md:py-1 px-1 py-2 rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 dark:border-neutral-100 transition-all duration-300 w-40 gap-2">
                                        <span>
                                            {item.Icon}
                                        </span>
                                        <h6 className="text-neutral-700 dark:text-neutral-100 md:text-lg mt-[7px]" style={{fontFamily:'TwCenMt'}}>{item.name}</h6>
                                    </button>
                                </a>
                            </Badge>
                            )
                            })
                            }
                        </div>
                        <div className="w-full h-4/5 px-3 py-1">
                            <div className="w-full h-full rounded-md border-[3px] border-solid border-neutral-600 dark:border-neutral-100">
                                <MainDashboardChart/>
                            </div>

                        </div>

                    </div>

                </div>
            <div className="w-1/5 h-full flex flex-col items-center">
                <Badge count={0} color="magenta">
                    <a href={`#`} className="">
                        <button className="flex justify-center items-center md:px-3 md:py-1 px-1 py-2 rounded-md hover:rounded-3xl border-[3px] border-solid border-neutral-600 dark:border-neutral-100 transition-all duration-300 w-48">
                            <CreateNewFolder className="md:text-2xl text-3xl text-neutral-700 dark:text-neutral-100 md:w-[40px]"/>
                            <h6 className="text-neutral-700 dark:text-neutral-100 md:text-lg mt-2" style={{fontFamily:'TwCenMt'}}>New Project</h6>
                        </button>
                    </a>
                </Badge>
                <div className="w-full h-full py-1">
                    <div className="w-full h-full border-[3px] border-solid border-neutral-600  dark:border-neutral-100 rounded-md">
                        <h3 style={{fontFamily:'TwCenMt'}} className="text-xl text-center text-neutral-700 dark:text-neutral-100">Last Projects</h3>
                    </div>
                </div>

            </div>

            </div>
            <div className="w-full h-[20%] p-3">
                <aside className="w-full h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-xl flex ">
                    {horizentalBoxItems.map((item)=>{
                        return(
                        <Tooltip title={item.name}>
                            <Link href={item.route} className={`px-3 text-neutral-600 dark:text-neutral-100 flex justify-center items-center ${item.animateClasses}`}>
                                {item.Icon}
                            </Link>
                        </Tooltip>
                        )
                    })}
                </aside>
            </div>
        </div>
    )
}



