'use client';
import { API } from "@/utils/Api"
import { fetcher } from "@/utils/fetcher"
import { useEffect, useState } from "react";
import useSWR from "swr"
import { GetFavoritePeople } from "./clientAction";
import { User } from "./type";
import LoadingSpinner from "@/Components/LoadingSpinner";
import { Avatar, Spin } from "antd";

export default function FavoritePeople({listofid} : {listofid : number[]}){
    const [data , setData] = useState<User[] | undefined>(undefined)
    const [loading , setLoading] = useState<boolean>(false)


    useEffect(()=>{
       const FetchPeople = async  () =>{
            setLoading(true)
            const response = await GetFavoritePeople(listofid , API.actions.FavoritePeople)
            setData(response);
            setLoading(false)
        }
        FetchPeople();
    },[listofid])

    return (
        <>
        {loading ?  
            <div className="w-full h-full flex justify-center items-center">
                <Spin size="large" />
            </div>
        :
            <div className="flex gap-5 justify-center flex-wrap">
                {
                    data?.map((person)=>{
                        return (
                            <div className="w-[40vh] h-[40vh] bg-red-500 rounded-xl p-5" key={person.email}>
                                {person.userName}
                            <Avatar
                                size={100}
                                src={person.profileImageUrl ? `${API.base.backend}${person.profileImageUrl}` : 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'}
                                className="cursor-pointer transition-all duration-300 bg-blue-500"
                            />
                            </div>
                        )
                    })
                }
            </div>
        }
        </>
    )
}