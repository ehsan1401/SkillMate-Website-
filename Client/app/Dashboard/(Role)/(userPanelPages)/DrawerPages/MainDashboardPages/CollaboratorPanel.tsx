import { useChangePanelItem } from "@/Components/context/PanelItem/PanelItemsProvider";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { ConnectionPoint } from "@/Icons/ConnectionPoint";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { theRoutes } from "@/utils/theRoutes";
import { Avatar, Badge, Button } from "antd";
import Link from "next/link";
import { ReactNode } from "react";
import EmptyFolder from "@/Icons/Vector/EmptyFolder";
import dynamic from "next/dynamic";
import { BouncedDots } from "@/Components/Loadings/BouncedDots";
import { SwiperSlide , Swiper, useSwiper } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { RightSideArrow } from "@/Icons/RightSideArrow";
import { StreamlineDelete1Solid } from "@/Icons/RemoveIcon";
import { TrashBin } from "@/Icons/TrashBin";
import { GraphNewBroken } from "@/Icons/GraphNewBroken";
import { RequestIcon } from "@/Icons/RequestIcon";
import { MdiChat } from "@/Icons/ChatIcon";
import { FileCopy } from "@/Icons/FileCopy";
import { TeamIcon } from "@/Icons/TeamIcon";
import Image from "next/image";

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
            name : 'Messages',
            route : '#',
            Icon : <MdiChat className="xl:text-3xl md:text-2xl text-lg mb-1"/>,
            count : 0
        },
        {
            name : 'Notifications' ,
            route : '#',
            Icon : <MaterialSymbolsNotificationsOutline className="xl:text-3xl md:text-2xl text-lg"/> ,
            count : 0,
            fn : ()=>{TogglePanelItem('item3')}
        },
        {
            name : 'Connections' ,
            route : '#',
            Icon : <ConnectionPoint className="xl:text-3xl md:text-2xl text-lg mb-1"/> ,
            count : 0
        },
        {
            name : 'Profile Analyse',
            route : '#',
            Icon : <GraphNewBroken className="xl:text-3xl md:text-2xl text-lg mb-1"/>,
            count : 0
        },
        {
            name : 'Favorite' ,
            route : theRoutes.Dashboard.favorite,
            Icon : <IonHeartCircleOutline className="xl:text-3xl md:text-2xl text-lg"/> ,
            count : userInfo?.favorite.People.length
        },
        
        {
            name : 'Requests',
            route : '#',
            Icon : <RequestIcon  className="xl:text-3xl md:text-2xl text-lg"/>,
            count : 0
        },
        {
            name : 'Projects',
            route : '#',
            Icon : <FileCopy className="xl:text-3xl md:text-2xl text-lg mb-1"/>
        },
        {
            name : 'Create Team',
            route : '#',
            Icon : <TeamIcon className="xl:text-3xl md:text-2xl text-lg mb-1"/>
        }
    ]
    
    return(
        <div className="w-full lg:h-[87%] h-[80%] mt-8 lg:mt-0 flex lg:flex-row flex-col justify-center items-center ">
            <div className=" md:w-3/5 w-full h-[102%] lg:-mr-[20px]">
                <div className=" w-full h-3/5 pt-5 pb-12 flex lg:flex-row flex-col-reverse  gap-2 ">
                    <div className="lg:w-1/2 w-full  h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md overflow-hidden">
                        <ProfileCompletion/>
                    </div>
                    <div className="lg:w-1/2 w-full h-full border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md py-3 text-center">
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
                    <button className="absolute w-auto h-full right-1 top-1 text-sm px-2 font-Lalezar flex flex-col hover:underline text-neutral-800 dark:text-neutral-100">
                        All Suggestions
                    </button>
                </div>
                <div className="w-full h-[75%] px-3 flex items-center justify-center relative">
                    <Swiper
                        navigation={{ nextEl: '.next-btn', prevEl: '.prev-btn' }}
                        modules={[FreeMode , Navigation]}
                        spaceBetween={8}
                        breakpoints={{
                            0: {              
                                slidesPerView: 2,
                            },

                            1280: {          
                                slidesPerView: 3,
                            }
                        }}

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
                                    <div className="flex flex-col items-center justify-center p-3 bg-neutral-200 dark:bg-neutral-700 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full relative">
                                        <Avatar
                                            size={40}
                                            src={person.profileURL}
                                            className="z-10 mx-[0px] border-2 border-solid border-neutral-600 shadow-md"
                                        />
                                        <span className="font-vazir text-lg pt-2 text-neutral-800 dark:text-neutral-100">{person.name}</span>
                                        <div className="flex flex-wrap justify-center gap-1 pb-1">
                                            {person.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs rounded-full px-[2px] text-neutral-800 dark:text-neutral-100 font-gothic"
                                            >
                                                {skill}
                                            </span>
                                            ))}
                                        </div>
                                        <Button type="primary" size="small" className="px-14 font-Homa">Sync</Button>
                                    </div>
                                    <button className="absolute top-3 right-4 group w-6 h-6">
                                        <StreamlineDelete1Solid
                                            className="text-xs absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 ml-[5px] mt-[4px] text-neutral-800 dark:text-neutral-100"
                                        />
                                        <TrashBin
                                            className="text-xl absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-red-600 dark:text-red-400"
                                        />
                                    </button>
                                </SwiperSlide>
                            )
                        } )}
                    </Swiper>
                    <button 
                        className=" next-btn absolute right-2 top-12 z-10 text-neutral-800 dark:text-neutral-100 text-2xl hover:text-blue-500 hover:dark:text-cyan-700 hover:scale-110 transition-all duration-300" 
                    >
                        <RightSideArrow />
                    </button>
                </div>


                </div>
            </div>
            <aside className="md:w-2/5 w-full lg:pl-10 h-[102%] text-center py-[5px] flex flex-col md:items-center justify-center md:gap-2 pt-[17px]">
                <div className="w-full xl:h-3/6 grid md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-3 justify-center grid-cols-8  xl:gap-2 gap-1 pt-3 pb-5">
                {
                    boxItems.map((item : boxItem)=>{
                        return(
                            <Link  key={item.name} href={item.route} onClick={item.fn} className={`md:px-3 px-5 flex justify-center items-center py-2${item.animateClasses}`}>
                                <BadgeProvider item={item}>
                                    <div className="border-[3px] border-solid border-neutral-600 dark:border-neutral-300 md:w-[90px] w-[50px] md:h-[90px] h-[50px] justify-center items-center rounded-md hover:rounded-2xl transition-all duration-300 text-neutral-600 dark:text-neutral-100 flex flex-col gap-1 font-vazir">
                                        <span className="text-2xl flex justify-center items-center">{item.Icon}</span>
                                        <span className="text-xs font-vazir hidden md:inline">{item.name}</span>
                                    </div>
                                </BadgeProvider>
                            </Link>
                        )
                    })
                }

                </div>
                <div className=" w-full h-[50%] px-[0px] pt-1 pb-4">
                    <div className="border-[3px] border-solid border-neutral-600 dark:border-neutral-200 h-full rounded-md  bg-gradient-to-br from-yellow-200 to-yellow-600 flex p-5">

                        <div className="w-2/3 h-full flex justify-center items-center -ml-10 -mt-2">
                            <Image src="/Images/Become_sponsor.png" alt="Become_sponsor" width={200} height={200} />
                        </div>
                        <div>
                            <p className="text-3xl text-left mt-4 mr-6 font-Franklin font-bold text-[#930223] ">
                                BECOME <br /> SPONSOR
                            </p>
                            <Button variant="solid" color="magenta" className=" mr-7 -mt-9 font-vazir">Search For Projects</Button>
                        </div>


                    </div>
                </div>

            </aside>
        </div>
    )
}

export function BadgeProvider ({children , item}: {children : ReactNode , item : boxItem}){
    return(
        <>
            <Badge count={0} color="orange" className="md:hidden">
                {children}
            </Badge>
            <Badge count={item.count ? item.count : 0} color="orange" className="hidden md:inline-block">
                {children}
            </Badge>
        </>
    )
}

