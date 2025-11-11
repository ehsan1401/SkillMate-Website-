import { useUser } from "@/Components/context/UserContext/UserContext";
import { ProfileCompletePercentage } from "@/Components/tools/ProfileCompletePercentage";
import { API } from "@/utils/Api";
import { Avatar, Progress, Tooltip } from "antd";
import Image from "next/image";
import { userValue } from "./type";
import { ProgressProps } from "antd/lib";
import UpdateInfoButton from "../../MyProfilePages/UpdateInfoButton";
import CreateInfoButton from "../../MyProfilePages/CreateInfoButton";
import { useEffect } from "react";
import { AddDiamond } from "@/Icons/AddDiamond";


export default function ProfileCompletion(){
    const { user , userInfo  } = useUser();    
    console.log("userInfo" , userInfo)

    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#C6D870',
        '100%': '#FFE797',
    };
    const Value : userValue = {
        email : false, 
        profileImageUrl : true,
        ShowInSearch : true ,
        phone : true ,
        dateofbirth : false,
        bio : true ,
        social : true ,
        skills : true,
        learning_skills : false,
        resume : true

    }
    const result = ProfileCompletePercentage(Value)
    return(
        <div className=" w-full h-full flex flex-col p-2 py-3 relative">
            {
                userInfo ? 
                <UpdateInfoButton user={user!} userInfo={userInfo!} position={`absolute top-3 right-5`}/>
                    :
                <CreateInfoButton user={user!} userInfo={userInfo!} ChangeButton={<Tooltip placement="left" title="Create Your Profile"><AddDiamond className="absolute top-3 right-5 text-2xl text-neutral-600 hover:rotate-90 transition-all duration-200" /></Tooltip>}/>
                
            }
            <div className="w-full h-full flex flex-col justify-center items-center gap-2 ">
                <div className="w-[84px] hover:w-48 relative overflow-hidden transform transition-all duration-300 rounded-full cursor-pointer hover:bg-neutral-300">
                    
                    <Avatar
                        size={80}
                        src={user?.profileImageUrl ? `${API.base.backend}${user.profileImageUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                        className="z-10 mx-[0px] border-2 border-solid border-neutral-600 shadow-md"
                    />
                    <p className="text-lg flex justify-center items-center absolute top-0 left-[85px] z-0 h-full">{user?.userName}</p>
                </div>
                <span className="w-3/4 text-center">
                    <Progress type="line" percent={result.Percentage} strokeColor={twoColors} />
                </span>
            </div>
            <div className="w-full h-1/2">

            </div>
        </div>
    )
}