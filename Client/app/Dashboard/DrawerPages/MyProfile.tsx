import useSWR from "swr";
import { GetUserInfo } from "./page/action";
import { API } from "@/utils/Api";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { JSX, useEffect } from "react";
import UploadAvatar from "../Role/components/UploadAvatar";
import { SocialItem, UserInfo, UserType } from "./page/type";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { MdiGithub } from "@/Icons/socials/GitHub";
import { url } from "inspector";
import { Button, Tag, Tooltip } from "antd";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import { div, span } from "framer-motion/client";
import { EditeIcon } from "@/Icons/EditeIcon";
import { useModal } from "@/Components/context/ModalContext/ModalContext";
import UpdateInfoButton from "./page/UpdateInfoButton";

export default function MyProfile({Token , id , user}:{Token : string , id : number , user : UserType}){
    const { showAlert } = useAlert();

    const SocialIcons: Record<string, JSX.Element> = {
        LinkedIn: <Linkedin />,
        GitHub: <MdiGithub />,
        Telegram : <TelegramCircle/>,
        Instagram : <BiInstagram/> ,
        Facebook : <FacebookTag/>
    };
    var index = 1 ;
    const tagLabel = [
        "magenta", "red", "volcano", "orange", "gold","lime", "green","cyan", "blue", "geekblue", "purple"
    ] 
    const { data, error } = useSWR(
        Token ? `user-${id}` : null,
        () => GetUserInfo(Token, id)
    );
    useEffect(() => {
    if (data && error) {
        showAlert("Error in fetching User info!!!", "error");
    }
    }, [error]);
console.log(data)
    
    return(
        <section className="p-5 w-full lg:h-full h-[200%] select-none relative lg:overflow-y-scroll">
            <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 lg:sticky top-4" style={{fontFamily:"scriptMtbold"}}> 
                My Profile
            </h1>
            <div className="w-full h-[100%] relative -top-5 lg:-top-10 px-3 lg:px-16 pt-14 pb-8 text-center ">
                <div className="flex w-full left-0 flex-col items-center gap-2 absolute top-3 lg:top-0">
                    <UploadAvatar 
                        size={130} 
                        avatarUrl={user.profileImageUrl ? `http://localhost:4000${user.profileImageUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`} 
                        border={`border-2 border-solid border-black rounded-full`}
                    />
                </div>
                <div className="absolute p-5 gap-2 flex flex-col text-xl text-neutral-800 dark:text-neutral-100">
                    {
                        data?.social.map((item : SocialItem)  => {
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
                    data &&
                    <UpdateInfoButton/>
                }
                <div className="w-full h-auto bg-neutral-300 dark:bg-neutral-800 rounded-2xl px-5 lg:pt-8 lg:pb-10 pt-24 pb-4 flex flex-col justify-center items-center">

                    <div className="flex flex-col justify-center items-center w-full h-[50%] lg:pt-16">
                        <h1 className="text-4xl text-neutral-800 dark:text-neutral-100 font-bold " style={{fontFamily:"vazir"}}>{user?.userName}</h1>
                        <span className="text-neutral-500 dark:text-neutral-200 -mt-5 text-sm">{user?.email}</span>
                        {data && <span className="py-1 text-neutral-500 dark:text-neutral-200">+{data?.phone}</span>}
                    </div>
                    {
                        data &&
                        <div className="w-full h-[50%] py-5 lg:py-0 px-5">
                            <p className="text-neutral-800 dark:text-neutral-100 text-sm py-4">
                                <span>{data?.bio}</span>
                            </p>
                            <span className="text-neutral-800 dark:text-neutral-100">My skills are </span>
                            <div className=" flex flex-wrap justify-center items-center">
                                {data?.skills.map((item : string)=>{
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

                                    {data?.learning_skills.map((item : string)=>{
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
                        !data && 
                        <div className="p-5">
                            <Button type="primary" variant="solid" color="lime">
                                Create your Profile
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
