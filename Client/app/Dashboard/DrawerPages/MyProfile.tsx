import useSWR from "swr";
import { GetUserInfo } from "./page/action";
import { API } from "@/utils/Api";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import { useEffect } from "react";
import UploadAvatar from "../Role/components/UploadAvatar";
import { UserInfo } from "./page/type";

export default function MyProfile({Token , id , AvatarUrl}:{Token : string , id : number , AvatarUrl : string}){
    const { showAlert } = useAlert();


    const { data, error } = useSWR(
        Token ? `user-${id}` : null,
        () => GetUserInfo(Token, id)
    );
    useEffect(() => {
    if (error) {
        showAlert("Error in fetching User info!!!", "error");
    }
    }, [error]);
console.log(data)
    
    return(
        <section className="p-5 w-full h-full select-none">
            <h1 className="text-5xl text-neutral-950 dark:text-neutral-50" style={{fontFamily:"scriptMtbold"}}> 
                My Profile
            </h1>
            <div className="w-full h-[88%] bg-lime-500">
                <div className="w-full h-1/3 flex flex-col items-center gap-2">
                    <UploadAvatar size={130} avatarUrl={AvatarUrl ? `http://localhost:4000${AvatarUrl}` : `https://api.dicebear.com/7.x/miniavs/svg?seed=1`} />
                    <span className="w-[80%] bg-neutral-800 dark:bg-neutral-200 h-[2px]"></span>
                </div>
                <div className="w-full h-2/3 bg-blue-200 ">
                    <div>
                        <ul>
                            <li>{data?.phone}</li>
                            <li>{data?.age}</li>
                            <li>{data?.bio}</li>
                            <li>{data?.skills?.map((skill: string) => <span key={skill}>{skill} </span>)}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
