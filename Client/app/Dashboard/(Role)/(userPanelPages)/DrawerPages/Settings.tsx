import { UserType } from "./MyProfilePages/type";
import UpdateUsername from "./settingPages/updateUsername";
import DarkModeToggle from "@/Components/elements/Toggles/DarkModeToggle";
import { LightIcon } from "@/Icons/LightIcon";
import Blackline from "@/Components/elements/blackline";

export default function Settings({ user }: { user: UserType }) {

  return (
    <div className="lg:p-5 p-0 w-full h-[100%] select-none">
        <h1
            className="text-5xl text-neutral-950 dark:text-neutral-50 p-5 lg:p-0"
            style={{ fontFamily: "scriptMtbold" }}
        >
            Settings
        </h1>
        <div
            className="w-full h-[85%] overflow-y-scroll flex flex-col py-5 lg:px-3 px-0"
            style={{ fontFamily: "vazir" }}
        >
            <div className="h-auto relative">
                <p className="text-neutral-800 dark:text-neutral-200 pt-3 pl-3 lg:text-xl text-sm font-bold flex">
                    <span className="pt-[3px] px-2 text-3xl text-yellow-400" ><LightIcon/></span>
                    <span className="pt-[7px]">Dark mode</span>
                </p>
                <span className="absolute right-5 top-3 lg:scale-100 scale-75 ">
                    <DarkModeToggle />
                </span>
            </div>
            <Blackline size={1}/>

            <div className="">
                <UpdateUsername user={user} />
            </div>
            <Blackline size={1}/>
            <div className="h-auto relative">
 
            </div>

        </div>

    </div>
  );
}
