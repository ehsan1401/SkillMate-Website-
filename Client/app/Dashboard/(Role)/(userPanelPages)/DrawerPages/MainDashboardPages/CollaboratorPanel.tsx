import { useChangePanelItem } from "@/Components/context/PanelItem/PanelItemsProvider";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { AlternateEmailRounded } from "@/Icons/AlternateEmailRounded";
import { ConnectionPoint } from "@/Icons/ConnectionPoint";
import { IonHeartCircleOutline } from "@/Icons/FavoriteCircle";
import { MaterialSymbolsNotificationsOutline } from "@/Icons/NotificationsIcon";
import { theRoutes } from "@/utils/theRoutes";
import { Avatar, Badge } from "antd";
import Link from "next/link";
import { lazy, ReactNode, Suspense } from "react";
import LoadingSpinner from "@/Components/Loadings/LoadingSpinner";
import EmptyFolder from "@/Icons/Vector/EmptyFolder";
import dynamic from "next/dynamic";
import { BouncedDots } from "@/Components/Loadings/BouncedDots";
import { SwiperSlide , Swiper } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

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

    const Suggestes : Suggeste[] = [
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
            name : "John Wick" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnOZY7Pr9nMm5Ev1ykgFkD6A1u6p7aiZfpuZ5dUU5j3bENgLbtqIjNAiY2JG9GiBWvVGY&usqp=CAU",
            name : "Billy Forger" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://media.licdn.com/dms/image/v2/D4E03AQEyMNcR8Zvk9g/profile-displayphoto-shrink_400_400/B4EZQckdREHgAg-/0/1735646113112?e=2147483647&v=beta&t=_ATONMcbGg3Z0p_lZPAwNWCktLJ7j1CvBr5G2dakr6I",
            name : "Random Girl" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3ngiKS0US40aYzurZP62I20phqRbO3SEtxCvrVvfV6SzH37jWG_rvgZwJKJ10u3zi78&usqp=CAU",
            name : "Random Boy" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
            ]
        },
        {    
            profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3ngiKS0US40aYzurZP62I20phqRbO3SEtxCvrVvfV6SzH37jWG_rvgZwJKJ10u3zi78&usqp=CAU",
            name : "Random Boy" , 
            skills : [
                "NestJs" , "Front-end" , "TailwindCss" , "Ant Design"
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
        <div className="w-full lg:h-[86%] h-[80%] mt-8 lg:mt-0 flex md:flex-row flex-col-reverse">
            <div className=" md:w-3/5 w-full h-full -mr-[20px]">
                <div className=" w-full h-3/5 pt-10 pb-8 flex gap-2 ">
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
                <div className="w-full h-2/5 border-[3px] border-solid border-neutral-600 dark:border-neutral-100 rounded-md -mt-4 px-3 py-2">
                <div className=" w-full relative">
                    <h2 className="text-neutral-800 dark:text-neutral-100 font-vazir text-lg">Let&apos;s Sync!</h2>
                    <button className="absolute w-auto h-full right-1 top-0 text-sm px-2 font-Lalezar flex flex-col hover:underline">
                        All Suggestions
                    </button>
                </div>
                <div className="w-full h-[75%] bg-red-800 p-3">
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    spaceBetween={5}
                    slidesPerView={4}
                    navigation
                    direction="horizontal"

                >
                    {Suggestes.map((person: Suggeste) => {
                        return(
                            <SwiperSlide key={person.name}>
                                <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                {/* <img
                                    src={person.profileURL}
                                    alt={person.name}
                                    className="w-20 h-20 rounded-full object-cover mb-2"
                                /> */}
                                <Avatar
                                    size={40}
                                    src={person.profileURL}
                                    className="z-10 mx-[0px] border-2 border-solid border-neutral-600 shadow-md"
                                />
                                <span className="font-semibold text-sm">{person.name}</span>
                                <div className="flex flex-wrap justify-center gap-1 mt-1">
                                    {person.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                    ))}
                                </div>
                                </div>
                            </SwiperSlide>
                        )
                    } )}
                </Swiper>
                </div>


                </div>
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
