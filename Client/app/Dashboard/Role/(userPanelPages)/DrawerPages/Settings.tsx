import { useModal } from "@/Components/context/ModalContext/ModalContext";
import { UserType } from "./page/type";
import { useState } from "react";
import { useAlert } from "@/Components/elements/Alert/AlertContext";
import UpdateUsername from "./settingPages/updateUsername";
import DarkModeToggle from "@/Components/elements/DarkModeToggle";
import { LightIcon } from "@/Icons/LightIcon";
import Blackline from "@/Components/elements/blackline";
import Clock from "@/Components/elements/Clock";

export default function Settings({ user }: { user: UserType }) {
  const { showAlert } = useAlert();

  return (
    <div className="p-5 w-full h-[100%] select-none">
        <h1
            className="text-5xl text-neutral-950 dark:text-neutral-50"
            style={{ fontFamily: "scriptMtbold" }}
        >
            Settings
        </h1>
        <div
            className="w-full h-[85%] overflow-y-scroll flex flex-col py-5 px-3"
            style={{ fontFamily: "vazir" }}
        >
            <Blackline/>

            <div className="h-auto relative">
                <p className="text-neutral-800 dark:text-neutral-200 pt-3 pl-3 text-xl font-bold flex">
                    <span className="pt-[3px] px-2 text-3xl text-yellow-400" ><LightIcon/></span>
                    <span className="pt-[7px]">Dark mode</span>
                </p>
                <span className="absolute right-5 top-3 ">
                    <DarkModeToggle />
                </span>
            </div>
            <Blackline/>

            <div className="">
                <UpdateUsername user={user} />
            </div>
            <Blackline size={3}/>
            <div className="h-auto relative">
 
            </div>

        </div>

    </div>
  );
}
