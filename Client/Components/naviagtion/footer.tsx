import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import DarkModeToggle from "../elements/DarkModeToggle";

export default function Footer() {
    const FirstItems = ["About us" , "Home" , "Terms and Conditions" , "Privacy Policy"];
    const SecondItems = ["Jobs" , "Docs" , "Contact us" , "Crypto"];

  return (
    <footer className="w-full h-64 bg-gradient-to-tr from-neutral-50 to-neutral-400 dark:from-neutral-500 dark:to-neutral-900 flex">
        <div className="w-2/4 h-full flex justify-center flex-col py-10">
            <div className="px-10 flex h-1/2 items-center">
                <img src="/images/TitleLessLogo.png" alt="TitleLessLogo" className="w-20 h-20 dark:hidden" />
                <img src="/images/LightTitleLessLogo.png" alt="TitleLessLogo" className="w-20 h-20 dark:block hidden" />

                <h2 className="flex items-center h-full text-5xl pt-5 text-[#2b80da] dark:text-white" style={{fontFamily:"scriptMtbold"}}>
                    SkillMate
                </h2>
            </div>
            <div className="pb-5 pl-14 pr-5 dark:text-white" style={{fontFamily:"vazir"}}> 
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia velit provident porro earum iste rerum deserunt suscipit? 
            </div>
        </div>
        <div className="w-2/5 h-full flex text-xl">
            <div className="w-1/2 h-full py-10">
                <ul className="flex justify-center items-start flex-col gap-4 h-full" style={{fontFamily:"vazir"}}>
                    {
                        FirstItems.map((item)=>{
                            return(
                                <a href="" className="relative group" key={item}>
                                    <li className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 group-hover:after:w-full dark:text-white">
                                        {item}
                                    </li>
                                </a>
                            )
                        })
                    }
                    
                </ul>
            </div>
            <div className="w-3/6 h-full py-10 text-xl px-10">
                <ul className="flex justify-center items-start flex-col gap-4 h-full" style={{fontFamily:"vazir"}}>
                    {
                        SecondItems.map((item)=>{
                            return(
                                <a href="" className="relative group" key={item}>
                                    <li className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 group-hover:after:w-full dark:text-white">
                                        {item}
                                    </li>
                                </a>
                            )
                        })
                    }
                </ul>
            </div>


        </div>
        <div className="w-3/6 h-full flex flex-col ">
            <div className="w-full h-1/2 flex flex-col justify-center items-center gap-2 py-5">
                <h1 className="text-3xl font-bold dark:text-white" style={{fontFamily:"TwCenMt"}}>Tools</h1>
                <DarkModeToggle />
            </div>

            <div className="w-full h-1/2 flex flex-col justify-center items-center gap-2 py-10">
                <h1 className="text-3xl font-bold dark:text-white" style={{fontFamily:"TwCenMt"}}>Contact us!</h1>
                <ul className="flex gap-3 scale-150">
                    <a href="" className="hover:scale-125 transition-all duration-200 dark:text-white"><li><FacebookTag/></li></a>
                    <a href="" className="hover:scale-125 transition-all duration-200 dark:text-white"><li><TelegramCircle/></li></a>
                    <a href="" className="hover:scale-125 transition-all duration-200 dark:text-white"><li><Linkedin/></li></a>
                    <a href="" className="hover:scale-125 transition-all duration-200 dark:text-white"><li><BiInstagram/></li></a>
                </ul>
                <span className="text-center dark:text-white" style={{fontFamily:"Centaur"}}>&copy; 2025 Skillmate. All rights reserved.</span>
            </div>
        </div>
    </footer>
  );
}

