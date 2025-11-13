import { SkillmateIcon } from "@/Icons/SkillmateIcon";
import Image from "next/image";


export default function Wellcome() {

    return(
        <section className="relative w-full h-screen">
        <Image
            src="/Lake_wallpeaper.jpg"
            alt="Lake Wallpaper"
            fill
            className="object-cover opacity-65 dark:opacity-100"
        />
        <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-blue-950 flex font-scriptMtbold lg:text-8xl text-6xl">
            <SkillmateIcon className="lg:text-8xl text-6xl"/>
            <span className="lg:pt-2 -pt-3">skillmate</span>
            </h1>
        </div>
        </section>


    )
}
