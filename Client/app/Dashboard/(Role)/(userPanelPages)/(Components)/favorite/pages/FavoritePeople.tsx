'use client';
import { API } from "@/utils/Api"
import { useEffect, useState } from "react";
import { GetFavoritePeople } from "./action/clientAction";
import { User, UserInfo } from "./action/type";
import { Avatar, Spin, Tooltip } from "antd";
import { IcRoundVerified } from "@/Icons/verified";
import { IcBaselineAdminPanelSettings } from "@/Icons/AdminIcon";
import Link from "next/link";
import { StreamlineDelete1Solid } from "@/Icons/RemoveIcon";
import RemoveFavoritePeopleButton from "./Components/RemoveFavoritePeopleButton";
import { UserType } from "@/Components/context/UserContext/types";
import useSWR, { mutate as globalMutate } from 'swr';

const fetcher = async (listofid: number[]) => {
  if (!listofid || listofid.length === 0) return [];
  return await GetFavoritePeople(listofid, API.actions.FavoritePeople);
};

export default function FavoritePeople(
    {listofid , user , userInfo} : {listofid : number[] , user: UserType , userInfo: UserInfo }
 ){


    const { data, error, isLoading , mutate } = useSWR(
        listofid?.length ? [`favoritePeople-${listofid.join(',')}`, listofid] : null,
        () => fetcher(listofid)
    );

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
            <div className="flex gap-5 justify-center flex-wrap ">
                {
                    data?.map((person : User)=>{
                        return (
                            <div className="relative" key={person.email}>
                                <Link href={`/People/${person.id}`} className="w-[40vh] h-[40vh] bg-gradient-to-b from-purple-300 via-purple-100 to-neutral-50 rounded-2xl p-5 flex flex-col items-center relative overflow-hidden shadow-lg">
                                <Avatar
                                    size={100}
                                    src={person.profileImageUrl ? `${API.base.backend}${person.profileImageUrl}` : 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'}
                                    className="transition-all duration-300 bg-[#cd2c58]"
                                    draggable={false}
                                />
                                <div className="py-4 flex flex-col items-center">
                                    <div className="flex gap-1">
                                        {person.type === "PRO" ? <IcRoundVerified className="text-blue-500 text-xl mt-[5px] hover:scale-110 transition-all duration-200"/> : <></>}
                                        {person.type === "ADMIN" ? <IcBaselineAdminPanelSettings className="text-yellow-500 text-xl mt-[5px] hover:scale-110 transition-all duration-200"/> : <></>}
                                        <h2 className="text-xl" style={{fontFamily:"Franklin"}}>{person.userName.length > 15 ? person.userName.slice(0, 15) + "..." : person.userName}</h2>
                                    </div>
                                    <p className="text-xs text-center text-neutral-600 py-2" style={{fontFamily:"Vazir"}}>
                                        {
                                            person.bio ? 
                                                (person.bio.length > 85 ? person.bio.slice(0, 85) + "..." : person.bio)
                                            :
                                                <span className="text-red-800">{RandomBio[Math.floor(Math.random() * RandomBio.length)]}</span>
                                        }
                                    </p>
                                    <div className="w-full h-[20%] relative z-50">
                                        {person.skills && person.skills.length > 0 ? 
                                            <div className="flex gap-2 justify-center text-sm">
                                                <span className="border-2 border-solid border-neutral-500 px-2">{person.skills[0]}</span>
                                                <span className="border-2 border-solid border-neutral-500 px-2">{person.skills[1]}</span>
                                                <span className="border-2 border-solid border-neutral-500 px-2">{person.skills[2]}</span>
                                            </div>
                                        : 
                                            <div className="flex gap-2 text-sm justify-center">
                                                <span className="border-2 border-solid border-neutral-500 px-5 text-center">{RandomSkills[Math.floor(Math.random() * RandomSkills.length)]}</span>
                                            </div>
                                        }
                                    </div>

                                    <div className="bg-[#e06b80] w-24 h-24 rounded-full absolute -bottom-12 -right-16"></div>
                                    <div className="bg-[#ffc69d] w-24 h-24 rounded-full absolute -bottom-[70px] -right-2"></div>
                                    <div className="bg-[#e06b80] w-24 h-24 rounded-full absolute -top-8 -left-14"></div>

                                </div>
                                </Link>
                                <RemoveFavoritePeopleButton User={user} DeleteUserID={person.id} listofid={listofid}/>
                            </div>
                        )
                    })
                }
            </div>
        }
        </>
    )
}