
import { JSX, useState } from "react";
import UploadAvatar from "../page/UploadAvatar";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { MdiGithub } from "@/Icons/socials/GitHub";
import { Button, Tag, Tooltip } from "antd";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import { ErrorIcon } from "@/Icons/ErrorIcon";
import Link from "next/link";
import { useUser } from "@/Components/context/UserContext/UserContext";
import { UserIcon } from "lucide-react";
import { SocialItem } from "./MyProfilePages/pages/type";
import { EditeIcon } from "@/Icons/EditeIcon";
import dynamic from "next/dynamic";
import SkillmateLogoLoadingNonFullScreen from "@/Components/Loadings/SkillmateLogoLoadingNonFullScreen";

const UserProfile = dynamic(()=>import('./MyProfilePages/UserProfile') , {
    loading : ()=> <SkillmateLogoLoadingNonFullScreen />
})
export default function MyProfile(){
    const {user , userInfo} = useUser();

    const [showModal , setShowModal] = useState<boolean>(false)
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
    return(
        <>
            {showModal && <UserProfile showModal={showModal} setShowModal={setShowModal} />  }
            <section className="lg:p-5 p-0 w-full lg:h-full h-[200%] select-none relative lg:overflow-y-scroll">
                <h1 className="text-5xl text-neutral-950 dark:text-neutral-50 lg:sticky top-4 p-5 lg:p-0 font-scriptMtbold"> 
                    My Profile
                </h1>
                <div className="w-full h-[100%] relative -top-5 lg:-top-10 px-3 lg:px-16 pt-14 pb-8 text-center ">
                    <div className="flex w-full left-0 flex-col items-center gap-2 absolute top-3 lg:top-0">
                        <UploadAvatar 
                            size={130} 
                            avatarUrl={user?.profileImageUrl ? `http://localhost:4000${user.profileImageUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`} 
                            border={`border-2 border-solid border-black rounded-full`}
                        />
                    </div>
                    <div className="absolute p-5 gap-2 flex flex-col text-xl text-neutral-800 dark:text-neutral-100">
                        {
                            userInfo?.social?.map((item : SocialItem)  => {
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

                    <Tooltip title={`View profile`} placement="left">
                    <Link href={`/peoples/${user?.userName}`} className=" absolute lg:right-24 right-10 top-28 text-2xl text-neutral-800 dark:text-neutral-100 transition-all duration-200 hover:scale-125">
                        <UserIcon/>
                    </Link>
                    </Tooltip>
                    
                    <Tooltip title={`Update profile`} placement="left">
                        <button onClick={()=>setShowModal(true)} className=" absolute lg:right-24 right-10 top-[75px] text-2xl text-neutral-800 dark:text-neutral-100 transition-all duration-200 hover:scale-125">
                            <EditeIcon />
                        </button>
                    </Tooltip>

                    <div className="w-full h-auto bg-neutral-300 dark:bg-neutral-800 rounded-2xl px-5 lg:pt-8 lg:pb-10 pt-24 pb-4 flex flex-col justify-center items-center">

                        <div className="flex flex-col justify-center items-center w-full h-[50%] lg:pt-16">
                            <h1 className="text-4xl text-neutral-800 dark:text-neutral-100 font-bold font-vazir">{user?.userName}</h1>
                            <span className="text-neutral-500 dark:text-neutral-200 -mt-5 text-sm">{user?.email}</span>
                            { userInfo && userInfo.phone ? <span className="py-1 text-neutral-500 dark:text-neutral-200">+{userInfo?.phone}</span> : <span className="py-1 text-red-800 dark:text-red-300 text-xs flex gap-1"><ErrorIcon className="mt-[2px]"/>Mobile phone number not entered.</span>}
                        </div>
                        {
                            userInfo &&
                            <div className="w-full h-[50%] py-5 lg:py-0 px-5">
                                <p className="text-neutral-800 dark:text-neutral-100 text-sm py-4">
                                    {userInfo.bio && userInfo.bio !== ''  ? 
                                        <span>{userInfo?.bio}</span>
                                    :
                                        <span className="text-xs text-red-800 dark:text-red-300 ">
                                            This user hasn&apos;t written anything about themselves yet, <br /> but they surely have an interesting story 😉
                                        </span>    
                                    }
                                </p>
                                <span className="text-neutral-800 dark:text-neutral-100">My skills are </span>
                                {
                                    userInfo.skills && userInfo.skills.length !== 0 ? 
                                        <div className=" flex flex-wrap justify-center items-center">
                                            {userInfo?.skills?.map((item : string)=>{
                                                index = index +1 
                                                return(
                                                    <span key={index} className="py-3">
                                                        <Tag color={tagLabel[Math.floor(Math.random() * tagLabel.length)]}>{item}</Tag>
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    :
                                        <div className=" py-2 flex flex-wrap justify-center items-center text-xs text-red-800 dark:text-red-300">
                                            I don&apos;t have any skills right now.
                                        </div>
                                }
                                <div> 
                                    <p className="text-neutral-800 dark:text-neutral-100 my-3">My developing Skills are </p>
                                    {
                                        userInfo.learning_skills && userInfo.learning_skills.length !== 0 ? 
                                            <div className=" flex flex-wrap justify-center items-center">

                                                {userInfo.learning_skills.map((item : string)=>{
                                                    index = index +1 
                                                    return(
                                                        <span key={index} className="">
                                                            <Tag color={tagLabel[Math.floor(Math.random() * tagLabel.length)]}>{item}</Tag>
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        :
                                            <div className=" flex flex-wrap justify-center items-center text-xs text-red-800 dark:text-red-300">
                                                I don&apos;t plan on learning anything new right now.
                                            </div>
                                    }
                                </div>
                            </div>  
                        }
                        {
                            !userInfo &&
                            <div className="p-4">
                                <Button type="primary" onClick={()=>{setShowModal(true)}} className="font-vazir pt-1">
                                    Create Your Profile
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
