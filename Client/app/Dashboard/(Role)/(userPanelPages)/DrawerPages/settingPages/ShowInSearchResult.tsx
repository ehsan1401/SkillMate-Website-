import { useModal } from "@/Components/context/ModalContext/ModalContext";
import { SearchRounded } from "@/Icons/SearchRounded";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { UserSearchVisibility } from "./action";
import { IcOutlineErrorOutline } from "@/Icons/ErrorIcon";

export default function ShowInSearchResult({ShowInSearch , userId}:{ShowInSearch : boolean , userId : number}){
    const [userShow , setUserShow] = useState<boolean>(ShowInSearch)
    const { showModal } = useModal();
    const handleSubmits = ()=> true ;
    return(
    <div className="h-auto relative">
        <p className="text-neutral-800 dark:text-neutral-200 pt-3 pl-3 lg:text-xl text-sm font-bold flex">
            <span className="pt-[3px] px-2 text-3xl text-neutral-700 dark:text-neutral-200" ><SearchRounded/></span>
            <span className="pt-[7px]">Allow others to find me</span>
        </p>
        <span className="absolute md:right-3 right-0 top-3 lg:scale-100 scale-75 ">
        <Button
            onClick={(e) =>{
                e.preventDefault();
                e.stopPropagation();
                showModal(
                    <div className="flex items-center gap-2 py-8 px-5">
                        <IcOutlineErrorOutline className="text-lg text-yellow-400 -mt-[25px]"/>
                        <h5 className="flex flex-col gap-2">{userShow ?  
                            `Others won't be able to find you if you hide your profile!`
                        :
                            `Let others find and connect with you.`
                        } 
                          <br />    <>refresh needed to apply your setting !</>
                        </h5>
                    </div>,
                    userShow ? "Hide from search?" : "Make profile visible?",
                    handleSubmits,
                    "❌ Error!",
                    500,
                    150,
                    ({ hideModal }) => [
                    <Button key="cancel" onClick={hideModal} type="default" style={{fontFamily:'vazir' , paddingTop : "3px"}}>
                        Cancel
                    </Button>,
                    <Button key="ok" 
                    onClick={()=>{
                        hideModal();
                        UserSearchVisibility(userId, userShow, setUserShow)
                    }}
                    variant="solid" color={userShow ? 'danger' : 'blue'}
                    style={{fontFamily:'vazir' , paddingTop : "3px"}}
                    >
                        {userShow ? `Hide` : `visible`}
                    </Button>,
                    ]
                )
                }
            }
            variant="solid"
            color={userShow ? 'blue' : 'danger'}
            style={{fontFamily : "vazir"}}
        >
            {userShow ? "Hide from search results?" : "Appear in search results?"}
        </Button>
        </span>
    </div>
    )
}