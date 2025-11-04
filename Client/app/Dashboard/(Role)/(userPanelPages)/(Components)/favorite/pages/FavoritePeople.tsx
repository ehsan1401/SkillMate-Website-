'use client';
import { API } from "@/utils/Api"
import { GetFavoritePeople } from "./action/clientAction";
import { User } from "./action/type";
import { Avatar, Spin, Tooltip } from "antd";
import { IcRoundVerified } from "@/Icons/verified";
import { IcBaselineAdminPanelSettings } from "@/Icons/AdminIcon";
import Link from "next/link";
import RemoveFavoritePeopleButton from "./Components/RemoveFavoritePeopleButton";
import { UserType } from "@/Components/context/UserContext/types";
import useSWR from 'swr';
import { BackArrow } from "@/Icons/BackArrow";
import EmptyFavorite from "@/Icons/Vector/EmptyFavorite";
import { useCheapData } from "@/Components/context/CheapData/CheapDataContext";
import { useEffect } from "react";

const fetcher = async (listofid: number[]) => {
  if (!listofid || listofid.length === 0) return [];
  return await GetFavoritePeople(listofid, API.actions.FavoritePeople);
};

export default function FavoritePeople(
    {listofid , user} : {listofid : number[] , user: UserType }
 ){

    const {setFavoritePeople} = useCheapData()
    const { data, error, isLoading } = useSWR(
        listofid?.length ? [`favoritePeople-${listofid.join(',')}`, listofid] : null,
        () => fetcher(listofid)
    );
    if(error) console.log(error)
        console.log("data: " , data?.length)
    useEffect(()=>{
        if(data) setFavoritePeople(data?.length)
    } , [data])


    const RandomBio : string[] = [
        'Too busy shipping features to write a bio' ,
        'No bio yet, just pure mystery🔥',
        'Loading bio... 99% done',
        'Bio not found — 404 error 🧠',
        'Building something awesome... and maybe a bio later',
        'Still compiling my bio... might take a while',
        'This space intentionally left blank'
    ]

    const RandomSkills : string[] = [
        'Coming soon 🚀',
        'In progress ⚙️',
        'Initializing...',
        'Not added yet',
        'On the way 🛠️',
        'Loading... ⏳',
        'Booting up 💻',
        'Pending',
        'undefiend',
        'None',
        'Pending',
    ]

    return (
        <>
        {isLoading ?  
            <div className="w-full h-full flex justify-center items-center">
                <Spin size="large" />
            </div>
        :
            (
                data ? 
                <div className="flex gap-5 justify-center flex-wrap ">
                    {
                        data?.map((person : User)=>{
                            return (
                                <div className="relative" key={person.email}>
                                    <Link href={`/People/${person.id}`} className="w-[40vh] h-[40vh] bg-gradient-to-b from-purple-300 via-purple-100 to-neutral-50 dark:via-[#424769] dark:from-[#2D3250] dark:to-[#7077A1]  rounded-2xl p-5 flex flex-col items-center relative overflow-hidden shadow-lg">
                                    <Avatar
                                        size={100}
                                        src={person.profileImageUrl ? `${API.base.backend}${person.profileImageUrl}` : 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'}
                                        className="transition-all duration-300 bg-[#cd2c58] dark:bg-[#0A2647]"
                                        draggable={false}
                                    />
                                    <div className="py-4 flex flex-col items-center">
                                        <div className="flex gap-1">
                                            {person.type === "PRO" ? <IcRoundVerified className="text-blue-500 text-xl mt-[5px] hover:scale-110 transition-all duration-200"/> : <></>}
                                            {person.type === "ADMIN" ? <IcBaselineAdminPanelSettings className="text-yellow-500 text-xl mt-[5px] hover:scale-110 transition-all duration-200"/> : <></>}
                                            <h2 className="text-xl text-neutral-800 dark:text-neutral-200" style={{fontFamily:"Franklin"}}>{person.userName.length > 15 ? person.userName.slice(0, 15) + "..." : person.userName}</h2>
                                        </div>
                                        <p className="text-xs text-center text-neutral-600 dark:text-neutral-300 py-2" style={{fontFamily:"Vazir"}}>
                                            {
                                                person.bio ? 
                                                    (person.bio.length > 85 ? person.bio.slice(0, 85) + "..." : person.bio)
                                                :
                                                    <span className="text-red-800 dark:text-red-400">{RandomBio[Math.floor(Math.random() * RandomBio.length)]}</span>
                                            }
                                        </p>
                                        <div className="w-full h-[20%] relative z-50">
                                            {person.skills && person.skills.length > 0 ? 
                                                <div className="flex gap-2 justify-center text-sm">
                                                    <span className="border-2 border-solid border-neutral-500 dark:border-neutral-100 px-2 text-neutral-800 dark:text-neutral-200">{person.skills[0]}</span>
                                                    <span className="border-2 border-solid border-neutral-500 dark:border-neutral-100 px-2 text-neutral-800 dark:text-neutral-200">{person.skills[1]}</span>
                                                    <span className="border-2 border-solid border-neutral-500 dark:border-neutral-100 px-2 text-neutral-800 dark:text-neutral-200">{person.skills[2]}</span>
                                                </div>
                                            : 
                                                <div className="flex gap-2 text-sm justify-center">
                                                    <span className="border-2 border-solid border-neutral-500 dark:border-neutral-100 px-5 text-center text-neutral-800 dark:text-neutral-200">{RandomSkills[Math.floor(Math.random() * RandomSkills.length)]}</span>
                                                </div>
                                            }
                                        </div>

                                        <div className="bg-[#e06b80] dark:bg-[#144272] w-24 h-24 rounded-full absolute -bottom-12 -right-16"></div>
                                        <div className="bg-[#ffc69d] dark:bg-[#2C74B3] w-24 h-24 rounded-full absolute -bottom-[70px] -right-2"></div>
                                        <div className="bg-[#e06b80] dark:bg-[#144272] w-24 h-24 rounded-full absolute -top-8 -left-14"></div>

                                    </div>
                                    </Link>
                                    <RemoveFavoritePeopleButton user={user} DeleteUserID={person.id} listofid={listofid}/>
                                </div>
                            )
                        })
                    }
                </div>
                : 
                <div className=" w-full h-full flex justify-center items-center relative">
                    <div className=" w-[230px] h-[250px]">
                        <EmptyFavorite/>
                        <p className="text-center text-lg text-neutral-400" style={{fontFamily: "vazir"}}>No favorites yet!</p>
                        
                    </div>
                </div>
            )
        }
        </>
    )
}