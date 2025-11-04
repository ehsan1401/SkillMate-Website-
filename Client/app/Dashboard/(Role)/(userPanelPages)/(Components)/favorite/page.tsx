'use client';
import { useUser } from "@/Components/context/UserContext/UserContext";
import { BackArrow } from "@/Icons/BackArrow";
import EmptyFavorite from "@/Icons/Vector/EmptyFavorite";
import { Tooltip } from "antd";
import { useState } from "react";
import FavoriteProjects from "./pages/FavoriteProjects";
import FavoritePeople from "./pages/FavoritePeople";



export default function Favorite(){
    const { user , userInfo } = useUser();
    const [showComp , setShowComp] = useState<string>("people")
    function RenderComponent() {
        switch(showComp){
            case "people":
                return <FavoritePeople listofid={userInfo!.favorite.People} user={user!}/>
                
            case "Projects" :
                return <FavoriteProjects/>
            default : 
                <>There is an Error!!!!</>        
        }
      }


    return(
        <section className="bg-neutral-500 dark:bg-neutral-700 w-full h-screen px-5 pt-14 flex justify-center items-center">
            <div className="bg-neutral-200 dark:bg-neutral-800 h-[93%] w-full rounded-2xl flex justify-center items-center">
                <section className="w-[100%] h-full p-5">
                    <div className="h-full w-full rounded-2xl border-2 border-solid border-neutral-500 flex flex-col overflow-hidden">
                    {
                        userInfo ? 
                        <>
                            <div className="w-full h-auto flex">
                                <div className="title h-full w-4/6 flex gap-5 px-6 py-[15px] text-neutral-800 dark:text-neutral-100" style={{fontFamily : "Gothic"}}>
                                    <button 
                                        onClick={()=>{window.history.back()}}
                                        className="hover:scale-110 transition-all duration-200"
                                    >
                                        <Tooltip title="Go back"> 
                                            <BackArrow className="text-2xl" />
                                        </Tooltip>
                                    </button>
                                    <h1 className="text-xl">
                                    {
                                        showComp === "people" ? `Favorite People` : showComp === "Projects" ? `Favorite Projects` : ''
                                    }
                                    </h1>
                                </div>
                                <div className="buttons h-full w-2/6 flex justify-center items-centers gap-5 p-4">
                                    <button 
                                        className={`border-2 border-solid px-8 text-neutral-800 dark:text-neutral-200 ${showComp === "people" ? `border-neutral-950 dark:border-pink-400 dark:bg-pink-400`:`border-neutral-400`} `}
                                        onClick={()=>{setShowComp("people")}}
                                    >People</button>
                                    <button 
                                        className={`border-2 border-solid px-8 text-neutral-800 dark:text-neutral-200 ${showComp === "Projects" ? `border-neutral-950 dark:border-pink-400 dark:bg-pink-400`:`border-neutral-400`} `} 
                                        onClick={()=>{setShowComp("Projects")}}

                                    >Projects</button>

                                </div>
                            </div>
                            <div className="w-full h-full p-5">
                                <div className="w-full h-[88%] overflow-y-scroll">
                                    {
                                        RenderComponent()
                                    }
                                    
                                </div>
                            </div>
                        </>
                        :
                        <div className=" w-full h-full flex justify-center items-center relative">
                            <button 
                                onClick={()=>{window.history.back()}}
                                className="hover:scale-110 transition-all duration-200 absolute left-7 top-5"
                            >
                                <Tooltip title="Go back"> 
                                    <BackArrow className="text-2xl" />
                                </Tooltip>
                            </button>
                            <div className=" w-[230px] h-[250px]">
                                <EmptyFavorite/>
                                <p className="text-center text-lg text-neutral-400" style={{fontFamily: "vazir"}}>No favorites yet!</p>
                                
                            </div>
                        </div>
                    }
                    </div>
                </section>
            </div>
        </section>
    )
}
