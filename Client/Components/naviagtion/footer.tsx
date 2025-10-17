import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import DarkModeToggle from "../elements/DarkModeToggle";
import Image from "next/image";

export default function Footer() {
    const FirstItems = ["About us" , "Home" , "Terms and Conditions"];
    const SecondItems = [ "Privacy Policy", "Contact us", "Database"];
    const ThirdItems = [{key : "Clock" , value : "/Tools/Clock"} , {key : "Jobs" , value : "#"} , {key : "Home" , value : "/"} ];


  return (
    <footer className="w-full lg:h-64 bg-gradient-to-tr from-neutral-50 to-neutral-400 dark:from-neutral-500 dark:to-neutral-900 flex flex-col-reverse lg:flex-row">
        <div className="lg:w-2/5 w-full h-full flex justify-center lg:items-start items-center flex-col lg:py-10">
            <div className="px-10 flex h-1/2 items-center">
                <Image src="/images/TitleLessLogo.png" alt="TitleLessLogo" className="dark:hidden" width={80} height={80} />
                <Image src="/images/LightTitleLessLogo.png" alt="TitleLessLogo" className="dark:block hidden" width={80} height={80} />

                <h2
                className="flex items-center h-full text-5xl pt-5 dark:bg-gradient-to-tr dark:from-neutral-100 dark:via-blue-300 dark:to-blue-500 bg-clip-text dark:text-transparent text-[#2b80da]"
                style={{ fontFamily: "scriptMtbold" }}
                >
                SkillMate
                </h2>

            </div>
            <div className="pb-5 lg:pl-14 lg:pr-5 px-5 text-center lg:text-left dark:text-white flex flex-col gap-2" style={{fontFamily:"vazir"}}> 
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia velit provident porro earum iste rerum deserunt suscipit? 
                <br /><span className="text-center dark:text-white lg:hidden " style={{fontFamily:"Centaur"}}>&copy; 2025 Skillmate. All rights reserved.</span>
            </div>
            
        </div>
        <div className="lg:w-2/5 w-full lg:h-full h-auto lg:flex-row flex flex-col text-xl lg:pb-5">


            <div className="lg:w-1/3 w-full h-full lg:py-12 py-1 text-xl px-1 flex flex-col justify-center items-center lg:block">
                <h1 className="lg:text-xl text-3xl font-bold dark:text-white">company</h1>
                <ul className="flex justify-center items-center lg:items-start flex-col gap-4 h-full" style={{fontFamily:"vazir"}}>
                    
                    {
                        FirstItems.map((item)=>{
                            return(
                                <a href="" className="relative group text-base" key={item}>
                                    <li className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 group-hover:after:w-full dark:text-white">
                                        {item}
                                    </li>
                                </a>
                            )
                        })
                    }
                    
                </ul>
            </div>
            <div className="lg:w-1/3 w-full h-full lg:py-12 py-1 text-xl px-1 flex flex-col justify-center items-center lg:block">
                <h1 className="lg:text-xl text-3xl font-bold dark:text-white">Resources</h1>
                <ul className="flex justify-center lg:items-start items-center flex-col gap-4 h-full" style={{fontFamily:"vazir"}}>
                    
                    {
                        SecondItems.map((item)=>{
                            return(
                                <a href="" className="relative group text-base" key={item}>
                                    <li className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 group-hover:after:w-full dark:text-white">
                                        {item}
                                    </li>
                                </a>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="lg:w-1/3 w-full h-full lg:py-12 py-1 text-xl px-1 flex flex-col justify-center items-center lg:block">
                <h1 className="lg:text-xl text-3xl font-bold dark:text-white">Services</h1>
                <ul className="flex justify-center lg:items-start items-center flex-col gap-4 h-full" style={{fontFamily:"vazir"}}>
                    
                    {
                        ThirdItems.map((item)=>{
                            return(
                                <a href={item.value} className="relative group text-base" key={item.key}>
                                    <li className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 group-hover:after:w-full dark:text-white">
                                        {item.key}
                                    </li>
                                </a>
                            )
                        })
                    }
                </ul>
            </div>
        </div>


        <div className="lg:w-2/6 w-full lg:h-full h-auto flex flex-col">
            <div className="w-full h-1/2 flex flex-col justify-center items-center gap-2 py-5">
                <h1 className="text-3xl font-bold dark:text-white" style={{fontFamily:"TwCenMt"}}>Tools</h1>
                <DarkModeToggle />
            </div>

            <div className="w-full h-1/2 flex flex-col justify-center items-center gap-2 lg:py-10 pb-3">
                <h1 className="text-3xl font-bold dark:text-white" style={{fontFamily:"TwCenMt"}}>Contact us!</h1>
                <ul className="flex gap-3 scale-150">
                    <li><a href="" className="hover:scale-125 transition-all duration-200 dark:text-pink-300 hover:dark:text-pink-700 text-blue-400 hover:text-blue-800"><FacebookTag/></a></li>
                    <li><a href="" className="hover:scale-125 transition-all duration-200 dark:text-pink-300 hover:dark:text-pink-700 text-blue-400 hover:text-blue-800"><TelegramCircle/></a></li>
                    <li><a href="" className="hover:scale-125 transition-all duration-200 dark:text-pink-300 hover:dark:text-pink-700 text-blue-400 hover:text-blue-800"><Linkedin/></a></li>
                    <li><a href="" className="hover:scale-125 transition-all duration-200 dark:text-pink-300 hover:dark:text-pink-700 text-blue-400 hover:text-blue-800"><BiInstagram/></a></li>
                </ul>
                <span className="text-center dark:text-white lg:block hidden" style={{fontFamily:"Centaur"}}>&copy; 2025 Skillmate. All rights reserved.</span>
            </div>
        </div>
    </footer>
  );
}

