
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { JSX, useEffect, useState } from "react";
import UploadAvatar from "../components/UploadAvatar";
import { SocialItem, UserInfo, UserType } from "./page/type";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { MdiGithub } from "@/Icons/socials/GitHub";
import { Tag, Tooltip } from "antd";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import UpdateInfoButton from "./page/UpdateInfoButton";
import CreateInfoButton from "./page/CreateInfoButton";
import { API } from "@/utils/Api";
import useSWR from "swr";
import { GetUserInfo } from "./page/clientAction";
import { div } from "framer-motion/client";

export default function MyProfile({userInfo}:{userInfo : UserType}){
    const { showAlert } = useAlert();
    //   const [data, setData] = useState<any>(null)
    //   const [error, setError] = useState<string | null>(null)

    const SocialIcons: Record<string, JSX.Element> = {
        LinkedIn: <Linkedin />,
        GitHub: <MdiGithub />,
        Telegram : <TelegramCircle/>,
        Instagram : <BiInstagram/> ,
        Facebook : <FacebookTag/>
    };

    let index = 1 ;
    const tagLabel = [
        "magenta", "red", "volcano", "orange", "gold","lime", "green","cyan", "blue", "geekblue", "purple"
    ];

    const {data : items , error , mutate} = useSWR(API.user.getUserInfo(userInfo.id) , GetUserInfo);
    console.log(items?.data)

    const UserInformation = items?.data ;

    if(error){
        return(
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-3xl text-red-500">
                    There is some Error to get Data!
                </p>
            </div>
        )
    }

    return(
        <section className="p-5 w-full lg:h-full h-[200%] select-none relative lg:overflow-y-scroll">
            <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 lg:sticky top-4" style={{fontFamily:"scriptMtbold"}}> 
                My Profile
            </h1>
            <div className="w-full h-[100%] relative -top-5 lg:-top-10 px-3 lg:px-16 pt-14 pb-8 text-center ">
                <div className="flex w-full left-0 flex-col items-center gap-2 absolute top-3 lg:top-0">
                    <UploadAvatar 
                        size={130} 
                        avatarUrl={userInfo.profileImageUrl ? `http://localhost:4000${userInfo.profileImageUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`} 
                        border={`border-2 border-solid border-black rounded-full`}
                    />
                </div>
                <div className="absolute p-5 gap-2 flex flex-col text-xl text-neutral-800 dark:text-neutral-100">
                    {
                        UserInformation?.social.map((item : SocialItem)  => {
                            const Icon = SocialIcons[item.name] || null;
                            return (
                                <Tooltip title={item.url} placement="right" key={item.name}>
                                    <a 
                                        key={item.url} 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:scale-125 transition-all duration-200"
                                    >
                                    {Icon}
                                    </a>
                                </Tooltip>
                            );
                        })
                    }
                </div>
                {
                    UserInformation &&
                    <UpdateInfoButton user={userInfo} userInfo={UserInformation ? UserInformation : null} onUpdated={() => mutate()}/>
                }
                <div className="w-full h-auto bg-neutral-300 dark:bg-neutral-800 rounded-2xl px-5 lg:pt-8 lg:pb-10 pt-24 pb-4 flex flex-col justify-center items-center">

                    <div className="flex flex-col justify-center items-center w-full h-[50%] lg:pt-16">
                        <h1 className="text-4xl text-neutral-800 dark:text-neutral-100 font-bold " style={{fontFamily:"vazir"}}>{userInfo?.userName}</h1>
                        <span className="text-neutral-500 dark:text-neutral-200 -mt-5 text-sm">{userInfo?.email}</span>
                        {UserInformation && <span className="py-1 text-neutral-500 dark:text-neutral-200">+{UserInformation?.phone}</span>}
                    </div>
                    {
                        UserInformation &&
                        <div className="w-full h-[50%] py-5 lg:py-0 px-5">
                            <p className="text-neutral-800 dark:text-neutral-100 text-sm py-4">
                                <span>{UserInformation?.bio}</span>
                            </p>
                            <span className="text-neutral-800 dark:text-neutral-100">My skills are </span>
                            <div className=" flex flex-wrap justify-center items-center">
                                {UserInformation?.skills.map((item : string)=>{
                                    index = index +1 
                                    return(
                                        <span key={index} className="py-3">
                                            <Tag color={tagLabel[Math.floor(Math.random() * tagLabel.length)]}>{item}</Tag>
                                        </span>
                                    )
                                })}
                            </div>
                            <div> 
                                <p className="text-neutral-800 dark:text-neutral-100 my-3">My developing Skills are </p>
                                <div className=" flex flex-wrap justify-center items-center">

                                    {UserInformation?.learning_skills.map((item : string)=>{
                                        index = index +1 
                                        return(
                                            <span key={index} className="">
                                                <Tag color={tagLabel[Math.floor(Math.random() * tagLabel.length)]}>{item}</Tag>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>  
                    }
                    {
                        (!UserInformation && !error) && 
                        <div className="p-5">
                            <CreateInfoButton user={userInfo} userInfo={UserInformation ? UserInformation : null} onUpdated={() => mutate()}/>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
