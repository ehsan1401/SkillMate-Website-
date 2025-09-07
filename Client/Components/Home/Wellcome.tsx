'use client';

import { SkillmateIcon } from "@/Icons/SkillmateIcon";

export default function Wellcome() {
    return(
        <section className="">
            <div className="absolute w-full h-full flex justify-center items-center">
                <h1 
                    className=" text-blue-950 flex"
                    style={{ fontFamily: "scriptMtbold" }}
                >
                    <SkillmateIcon className="text-9xl"/>
                    <span className="text-8xl pt-2">skillmate</span>
                </h1>
            </div>
            <div 
                className="w-full h-screen bg-cover bg-center bg-fixed bg-no-repeat bg-neutral-950 bg-blend-hard-light opacity-55"
                style={{backgroundImage:"url('/Lake_wallpeaper.jpg')"}}
            ></div>
        </section>

    )
}
