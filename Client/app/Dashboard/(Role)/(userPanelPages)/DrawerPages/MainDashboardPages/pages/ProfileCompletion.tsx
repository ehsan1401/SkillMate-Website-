'use client';
import { useUser } from "@/Components/context/UserContext/UserContext";
import { API } from "@/utils/Api";
import { Avatar, Progress, Tooltip } from "antd";
import { ProgressProps } from "antd/lib";
import UpdateInfoButton from "../../MyProfilePages/UpdateInfoButton";
import CreateInfoButton from "../../MyProfilePages/CreateInfoButton";
import { AddDiamond } from "@/Icons/AddDiamond";
import { Completed } from "@/Icons/Completed";
import { CrossCircle } from "@/Icons/CrossCircle";
import useSWR from "swr";
import { GetProfileCompletePercentage } from "./action";


export default function ProfileCompletion(){
    const { user , userInfo  } = useUser();    
    
    const {data : result , error , mutate} = useSWR(API.user.ProfilePercentage(user?.id!) , GetProfileCompletePercentage)
    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#896C6C',
        '100%': '#F7A5A5',
    };

    return(
        <div className=" w-full h-full flex flex-col p-2 py-3 relative">
            {
                userInfo ? 
                <UpdateInfoButton user={user!} userInfo={userInfo!} position={`absolute top-3 right-5`} onUpdated={mutate}/>
                    :
                <CreateInfoButton user={user!} userInfo={userInfo!} onUpdated={mutate} ChangeButton={<Tooltip placement="left" title="Create Your Profile"><AddDiamond className="absolute top-3 right-5 text-2xl text-neutral-600 hover:rotate-90 transition-all duration-200" /></Tooltip>}/>
                
            }
            <div className="w-full h-full flex flex-col justify-center items-center gap-2 ">
                <div className="w-[84px] lg:hover:w-48 hover:w-[84px] relative overflow-hidden transform transition-all duration-300 rounded-full lg:cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-500 text-neutral-800 dark:text-neutral-100">
                    
                    <Avatar
                        size={80}
                        src={user?.profileImageUrl ? `${API.base.backend}${user.profileImageUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                        className="z-10 mx-[0px] border-2 border-solid border-neutral-600 shadow-md"
                    />
                    <p className="text-lg flex justify-center items-center absolute top-0 left-[90px] z-0 h-full">{user?.userName}</p>
                </div>
                <span className="w-3/4 text-center">
                    <Progress type="line" percent={result?.Percentage || 0} strokeColor={twoColors} />
                </span>
            </div>
            <div className="w-full h-1/2 py-1">
            {
                result?.NotCompleted.length === 0 ?
                    <div className="flex justify-center items-center w-[80%] lg:h-full h-10 bg-lime-200 dark:bg-lime-900 m-auto rounded-xl text-neutral-800 dark:text-neutral-200 font-vazir">
                        Your profile is complete.
                    </div>
                : 
                <>
                    <div className="w-full h-1/2 flex justify-start items-center px-4 gap-2 text-sm">
                        {result?.Completed?.slice(0,2).map(item => (
                            <span className="flex gap-[2px] text-neutral-900 dark:text-neutral-200" key={item.key}>
                                <Completed className="text-lime-500 mt-[3px]"/>
                                {item.key}
                            </span>
                        ))}
                    </div>

                    <div className="w-full h-1/2 flex justify-start items-center px-4 gap-2 text-sm">
                        {result?.NotCompleted?.slice(0,2).map(item => (
                            <span className="flex gap-[2px] text-neutral-900 dark:text-neutral-200" key={item.key}>
                                <CrossCircle className="text-red-500 mt-[3px]"/>
                                {item.key}
                            </span>
                        ))}
                    </div>


                </>
            }


            </div>
        </div>
    )
}