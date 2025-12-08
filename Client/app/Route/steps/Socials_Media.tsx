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
        <div className="w-full h-[450px]">
            <h1 className="font-vazir pl-4">Add your social media links. These will appear on your public profile.</h1>
            <div className="flex w-full h-full">
                <section className="w-1/2 h-full flex flex-col gap-0 pt-5">
                    {SocialItemsPreview.map((SocialItem) => (
                        <div className="flex gap-2 flex-col" key={SocialItem.name}>
                            <div className="flex gap-2 py-2">
                                <label htmlFor={SocialItem.name}>
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

                <section className="w-1/2 h-[80%] flex flex-wrap gap-2 px-10">
                    {formData.social.map((social: SocialItem) => (
                        <div key={social.name} className="w-52 bg-neutral-100 shadow-md rounded-lg h-32 flex flex-col justify-center items-center px-3 py-3 relative">
                            <button className="absolute w-3 h-3 right-4 top-4 hover:scale-125 transition-all duration-300 hover:text-red-500" onClick={()=>{handleRemoveSocial(social.name)}}>
                                <RemoveIcon className="text-[10px]" />
                            </button>
                            {
                                SocialItemsPreview.find(socialItem => socialItem.name === social.name)?.icon
                            }
                            <p className="flex flex-col">
                                <span className="font-vazir">{ExtractUserName(social.url, social).length > 20 ?`${ExtractUserName(social.url, social).slice(0 , 20)}...` : ExtractUserName(social.url, social) }</span>
                            </p>
                            <a href={social.url} className="hover:text-blue-500 text-center transition-all duration-200 -mt-4 text-[10px]">
                                {social.url.length > 50 ?`${social.url.slice(0 , 50)}...` : social.url }
                            </a>
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
