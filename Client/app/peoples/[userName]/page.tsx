'use client';
import { API } from "@/utils/Api";
import { imageUrl } from "@/utils/imageUrl";
import Image from "next/image";
import useSWR from "swr";
import { GetPeopleInformation } from "./pages/action";
import { use, useEffect } from "react";
import Aos from "aos";
import { Linkedin } from "@/Icons/socials/Linkedin";
import { MdiGithub } from "@/Icons/socials/GitHub";
import { TelegramCircle } from "@/Icons/socials/TelegramCircle";
import { BiInstagram } from "@/Icons/socials/BiInstagram";
import { FacebookTag } from "@/Icons/socials/FacebookTag";
import { GetPeopleInfoType, SocialsItem } from "./pages/types";
import { MdiChat } from "@/Icons/ChatIcon";
import { MessageIcon } from "@/Icons/MessageIcon";

export default function People({params}: {params : Promise<{ userName: string }>}) {
  const resolvedParams = use(params);
  const { data: userInformationProfile, error, isLoading } = useSWR(
    resolvedParams.userName ? `user-${resolvedParams.userName}` : null,
    () => GetPeopleInformation(API.Peoples.GetPeopleInfo(resolvedParams.userName))
  );
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const SocialsLogo : SocialsItem[]= [
    { value: "LinkedIn", label: <span className="flex items-center gap-2"><Linkedin /> LinkedIn</span>, EmptyIcon :  <Linkedin />},
    { value: "GitHub", label: <span className="flex items-center gap-2"><MdiGithub /> GitHub</span>, EmptyIcon :  <MdiGithub />},
    { value: "Telegram", label: <span className="flex items-center gap-2"><TelegramCircle /> Telegram</span>, EmptyIcon :  <TelegramCircle />},
    { value: "Instagram", label: <span className="flex items-center gap-2"><BiInstagram /> Instagram</span>, EmptyIcon :  <BiInstagram />},
    { value: "Facebook", label: <span className="flex items-center gap-2"><FacebookTag /> Facebook</span>, EmptyIcon :  <FacebookTag />},
  ];
  if(!userInformationProfile) return <>
    <div className="w-full h-screen bg-red-300 flex justify-center items-center">
      <p>
        No user with this UserName
      </p>
    </div>
  </>
  return (
    <section className="w-full h-auto pt-14">
        <header className="relative w-full h-[350px] overflow-hidden">
        {userInformationProfile.has_userinfo ? Socialsmap(userInformationProfile , SocialsLogo) 
        :
          <span 
            key={'message'} 
            className="px-3 cursor-pointer hover:text-blue-300 text-white flex gap-3 absolute bottom-5 left-[420px] z-10"
          >
            <MessageIcon className="lg:text-lg text-2xl"/>
            <span className="hidden lg:inline-block">Send Message</span>
          </span>
        }
        <div
            className="absolute inset-0"
            style={{
            backgroundImage: `url(${imageUrl(userInformationProfile?.profileImageUrl)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.1)"
            }}
        ></div>
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </header>
        
        <div className="relative z-10 flex items-center justify-center h-full" data-aos="fade-left">
            <div className="w-96 h-0 absolute left-10 lg:-top-52 -top-[280px] bg-lime-500 rounded-full" >
                <Image alt={userInformationProfile.userName} src={imageUrl(userInformationProfile.profileImageUrl)}
                width={300} height={300} className="rounded-full shadow-inner hidden lg:inline-block border-2 border-solid border-neutral-500" />
                <Image alt={userInformationProfile.userName} src={imageUrl(userInformationProfile.profileImageUrl)}
                width={200} height={200} className="rounded-full shadow-inner lg:hidden border-2 border-solid border-neutral-800" />
            </div>
        </div>
        <div className="w-full h-[800px]">
        </div>


    </section>
  );
}



function Socialsmap(userInformationProfile: GetPeopleInfoType , SocialsLogo : SocialsItem[] ){
  return(
          <ul className="absolute bottom-0 left-0 z-10 flex w-full justify-center gap-3">
            {userInformationProfile.social.map((social) => {
              const found = SocialsLogo.find(s => s.value === social.name);
              return found ? 
              <a href={social.url}>
                <li 
                  key={social.name} 
                  className="flex px-3 cursor-pointer hover:text-blue-300 text-white lg:hidden text-2xl"
                >
                  {found.EmptyIcon}
                </li>
                <li 
                  key={social.name} 
                  className="px-3 cursor-pointer hover:text-blue-300 text-white hidden lg:flex"
                >
                  {found.label}
                </li>
              </a>
              : null;
            })}
              <li 
                key={'message'} 
                className="px-3 cursor-pointer hover:text-blue-300 text-white flex gap-3"
              >
                <MessageIcon className="lg:text-lg text-2xl"/>
                <span className="hidden lg:inline-block">Send Message</span>
              </li>
          </ul>
  )
}