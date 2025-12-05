import { Input } from "antd";
import { SocialItem, UserInfo } from "../pages/type";
import { SkillIconsInstagram } from "@/Icons/socials/colorfull/SkillIconsInstagram";
import { ReactNode, useState } from "react";
import { MdiGithub } from "@/Icons/socials/GitHub";
import { DeviconLinkedin } from "@/Icons/socials/colorfull/DeviconLinkedin";
import { LogosFacebook } from "@/Icons/socials/colorfull/LogosFacebook";
import { LogosTelegram } from "@/Icons/socials/colorfull/LogosTelegram";
import { Importatnt } from "@/Icons/Importatnt";
import { LinkIcon } from "@/Icons/LinkIcon";
import { RemoveIcon } from "@/Icons/RemoveIcon";

type SocialItemsPreviewType = {
    name: "LinkedIn" | "GitHub" | "Telegram" | "Instagram" | "Facebook",
    icon: ReactNode,
    placeholder: string,
    prefix: string
}

export default function SocialsMedia(
    { formData, setFormData }:
    {
        formData: UserInfo,
        setFormData: React.Dispatch<React.SetStateAction<UserInfo>>
    }
) {
    const [inputs, setInputs] = useState<{ [key: string]: string }>({});

    const SocialItemsPreview: SocialItemsPreviewType[] = [
        { name: "GitHub", icon: <MdiGithub className="text-3xl" />, placeholder: "username", prefix: "https://github.com/" },
        { name: "LinkedIn", icon: <DeviconLinkedin className="text-3xl" />, placeholder: "username", prefix: "https://www.linkedin.com/in/" },
        { name: "Telegram", icon: <LogosTelegram className="text-3xl" />, placeholder: "username", prefix: "https://t.me/" },
        { name: "Facebook", icon: <LogosFacebook className="text-3xl" />, placeholder: "username", prefix: "https://facebook.com/" },
        { name: "Instagram", icon: <SkillIconsInstagram className="text-3xl" />, placeholder: "username", prefix: "https://www.instagram.com/" },
    ];

    const addSocialHandler = (e: React.ChangeEvent<HTMLInputElement>, SocialItem: SocialItemsPreviewType) => {
        const username = e.target.value;
        setInputs(prev => ({
            ...prev,
            [SocialItem.name]: username
        }));
        const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;

        if (!usernameRegex.test(username)) {
            return;
        }

        const fullUrl = SocialItem.prefix + username;

        setFormData(prev => {
            const exists = prev.social.some(s => s.name === SocialItem.name);

            return {
                ...prev,
                social: exists
                    ? prev.social.map(s =>
                        s.name === SocialItem.name
                            ? { ...s, url: fullUrl }
                            : s
                    )
                    : [
                        ...prev.social,
                        { name: SocialItem.name, url: fullUrl }
                    ]
            };
        });
    };

    const handleRemoveSocial = (name : string)=>{
        setFormData(prev => ({
            ...prev,
            social: prev.social.filter(s => s.name !== name)
        }))
        setInputs(prev => ({
            ...prev,
            [name]: ""
        }));
    }



    return (
        <div className="w-full lg:h-[450px] h-auto">
            <h1 className="font-vazir pl-4">Add your social media links. These will appear on your public profile.</h1>
            <div className="flex flex-col lg:flex-row w-full h-full">
                <section className="lg:w-1/2 w-full h-full flex flex-col gap-0 lg:pt-5">
                    {SocialItemsPreview.map((SocialItem) => (
                        <div className="flex gap-2 flex-col" key={SocialItem.name}>
                            <div className="flex gap-2 py-2">
                                <label htmlFor={SocialItem.name} className="mt-1 lg:mt-0">
                                    {SocialItem.icon}
                                </label>

                                <Input
                                    id={SocialItem.name}
                                    value={inputs[SocialItem.name] ?? ''}
                                    placeholder={SocialItem.placeholder}
                                    onChange={(e) => addSocialHandler(e, SocialItem)}
                                    className="font-vazir pt-1"
                                    addonBefore={SocialItem.prefix}
                                />
                            </div>
                        </div>
                    ))}
                </section>

                <section className="lg:w-1/2 w-full h-[80%] flex flex-wrap gap-2 px-10 pt-5 lg:py-0">
                    {formData.social.map((social: SocialItem) => (
                        <div key={social.name} className="lg:w-52 w-full bg-neutral-100 shadow-md rounded-lg lg:h-32 h-auto flex lg:flex-col flex-row  lg:justify-center justify-start items-center px-3 py-3 relative gap-4 lg:gap-0">
                            <button className="absolute w-3 h-3 right-4 top-4 hover:scale-125 transition-all duration-300 hover:text-red-500" onClick={()=>{handleRemoveSocial(social.name)}}>
                                <RemoveIcon className="text-[10px]" />
                            </button>
                            {
                                SocialItemsPreview.find(socialItem => socialItem.name === social.name)?.icon
                            }
                            <div className="flex flex-col justify-center lg:items-center">
                                <p className="flex flex-col">
                                    <span className="font-vazir">{ExtractUserName(social.url, social).length > 20 ?`${ExtractUserName(social.url, social).slice(0 , 20)}...` : ExtractUserName(social.url, social) }</span>
                                </p>
                                <a href={social.url} className="hover:text-blue-500 text-center transition-all duration-200 -mt-4 text-[10px]">
                                    {social.url.length > 50 ?`${social.url.slice(0 , 50)}...` : social.url }
                                </a>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

const ExtractUserName = (url: string, social: SocialItem) => {
    if (!url) return "";

    switch (social.name) {
        case "GitHub":
            return url.split("github.com/")[1]?.replace(/\/$/, "") || "";
        case "LinkedIn":
            return url.split("linkedin.com/in/")[1]?.replace(/\/$/, "") || "";
        case "Telegram":
            return url.split("t.me/")[1]?.replace(/\/$/, "") || "";
        case "Facebook":
            return url.split("facebook.com/")[1]?.replace(/\/$/, "") || "";
        case "Instagram":
            return url.split("instagram.com/")[1]?.replace(/\/$/, "") || "";
        default:
            return "";
    }
};
