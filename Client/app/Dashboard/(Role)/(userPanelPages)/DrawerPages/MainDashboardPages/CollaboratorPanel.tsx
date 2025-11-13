import { useChangePanelItem } from "@/Components/context/PanelItem/PanelItemsProvider";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { AlternateEmailRounded } from "@/Icons/AlternateEmailRounded";
import { ConnectionPoint } from "@/Icons/ConnectionPoint";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { theRoutes } from "@/utils/theRoutes";
import { Avatar, Badge, Button } from "antd";
import Link from "next/link";
import { lazy, ReactNode, Suspense } from "react";
import LoadingSpinner from "@/Components/Loadings/LoadingSpinner";
import EmptyFolder from "@/Icons/Vector/EmptyFolder";
import dynamic from "next/dynamic";
import { BouncedDots } from "@/Components/Loadings/BouncedDots";
import { SwiperSlide , Swiper, useSwiper } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { RightSideArrow } from "@/Icons/RightSideArrow";
import { StreamlineDelete1Solid } from "@/Icons/RemoveIcon";
import { TrashBin } from "@/Icons/TrashBin";

const ProfileCompletion = dynamic(()=>import('./pages/ProfileCompletion') , {
    loading : ()=> <div className="w-full h-full bg-gray-300 animate-pulse flex justify-center items-center"><BouncedDots/></div>
})

type boxItem = {
    name : string , 
    route : string , 
    Icon? : ReactNode , 
    animateClasses? : string , 
    count? : number , 
    fn? : ()=>void 
}
type Suggeste = {
    profileURL: string,
    name : string , 
    skills : string[],
}

export default function CollaboratorPanel(){
    const { userInfo } = useUser();      
    const {TogglePanelItem} = useChangePanelItem();
    const swiper = useSwiper();

    const Suggestes : Suggeste[] = [
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
            name : "John Wick" , 
            skills : [
                "NestJs" , "Front-end" 
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnOZY7Pr9nMm5Ev1ykgFkD6A1u6p7aiZfpuZ5dUU5j3bENgLbtqIjNAiY2JG9GiBWvVGY&usqp=CAU",
            name : "Billy Forger" , 
            skills : [
                "NestJs" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://media.licdn.com/dms/image/v2/D4E03AQEyMNcR8Zvk9g/profile-displayphoto-shrink_400_400/B4EZQckdREHgAg-/0/1735646113112?e=2147483647&v=beta&t=_ATONMcbGg3Z0p_lZPAwNWCktLJ7j1CvBr5G2dakr6I",
            name : "Random Girl" , 
            skills : [
                "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3ngiKS0US40aYzurZP62I20phqRbO3SEtxCvrVvfV6SzH37jWG_rvgZwJKJ10u3zi78&usqp=CAU",
            name : "Random Boy" , 
            skills : [
                "Front-end" , "TailwindCss"
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3ngiKS0US40aYzurZP62I20phqRbO3SEtxCvrVvfV6SzH37jWG_rvgZwJKJ10u3zi78&usqp=CAU",
            name : "Random Boy" , 
            skills : [
                "TailwindCss" , "Ant Design"
            ]
        },

    ]
    
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
        <div className="w-full lg:h-[87%] h-[80%] mt-8 lg:mt-0 flex md:flex-row flex-col-reverse">
            <div className=" md:w-3/5 w-full h-[102%] -mr-[20px]">
                <div className=" w-full h-3/5 pt-5 pb-12 flex gap-2 ">
                    <div className="w-1/2 h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md overflow-hidden">
                        <ProfileCompletion/>
                    </div>
                    <div className="w-1/2 h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md py-3 text-center">
                        <h2 className="text-neutral-800 dark:text-neutral-100 font-vazir">My Latest Collaborations</h2>
                        <div className="w-full h-[90%] flex flex-col justify-center items-center opacity-60 gap-2">
                            <EmptyFolder width={90} height={90} />
                            <p className="text-neutral-800 dark:text-neutral-100 font-vazir text-sm">You haven&apos;t collaborated recently.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[43%] border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md -mt-8 px-3 py-2">
                <div className=" w-full relative">
                    <h2 className="text-neutral-800 dark:text-neutral-100 font-vazir text-lg pl-2 ">Let&apos;s Sync!</h2>
                    <button className="absolute w-auto h-full right-1 top-1 text-sm px-2 font-Lalezar flex flex-col hover:underline">
                        All Suggestions
                    </button>
                </div>
                <div className="w-full h-[75%] px-3 flex items-center justify-center relative">
                    <Swiper
                        navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
                        modules={[FreeMode , Navigation]}
                        spaceBetween={8}
                        slidesPerView={3}
                        direction="horizontal"
                        loop={true}
                        pagination={{
                        clickable: true,
                        }}
                        
                        className="[&_.swiper-button-next]:!w-6 [&_.swiper-button-next]:!h-6 [&_.swiper-button-next:after]:!text-[16px] [&_.swiper-button-prev]:!w-6 [&_.swiper-button-prev]:!h-6 [&_.swiper-button-prev:after]:!text-[16px]"

                    >
                        {Suggestes.map((person: Suggeste) => {
                            return(
                                <SwiperSlide key={person.name}>
                                    <div className="flex flex-col items-center justify-center p-3 bg-neutral-300 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full relative">
                                        <Avatar
                                            size={40}
                                            src={person.profileURL}
                                            className="z-10 mx-[0px] border-2 border-solid border-neutral-600 shadow-md"
                                        />
                                        <span className="font-vazir font-bold text-base pt-1">{person.name}</span>
                                        <div className="flex flex-wrap justify-center gap-1 py-1">
                                            {person.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs rounded-full px-[2px]"
                                            >
                                                {skill}
                                            </span>
                                            ))}
                                        </div>
                                        <Button type="primary" size="small" className="px-14 font-Homa">Sync</Button>
                                    </div>
                                    <button className="absolute top-3 right-4 group w-6 h-6">
                                        <StreamlineDelete1Solid
                                            className="text-xs absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 ml-[5px] mt-[4px]"
                                        />
                                        <TrashBin
                                            className="text-xl absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-red-600"
                                        />
                                    </button>


                                </SwiperSlide>
                            )
                        } )}
                    </Swiper>
                    <button 
                        className=" next-btn absolute right-2 top-12 z-10 text-black text-2xl hover:text-blue-500 hover:scale-110 transition-all duration-300" 
                    >
                        <RightSideArrow />
                    </button>
                </div>


                </div>
            </div>
            <aside className="md:w-2/5 w-full px-5 h-[102%] text-center py-[5px] flex md:flex-col flex-row md:items-center justify-center md:gap-2 gap-0 pt-[17px]">
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
                <div className=" w-full h-[50%] px-[15px] pt-1 pb-4">
                    <div className="border-[3px] border-solid border-neutral-600 dark:border-neutral-200 h-full rounded-md">

                    </div>
                </div>

            </aside>
        </div>
    )
}
