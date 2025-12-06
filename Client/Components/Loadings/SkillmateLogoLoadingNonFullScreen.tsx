'use client'

import Image from "next/image";

type Props = {
  size?: number;
  lineWidth?: number;
  lineColor?: string;
  logoSrc?: string;
};
export default function SkillmateLogoLoadingNonFullScreen({
  lineWidth = 6,
  lineColor = "#2F8FEA",
}: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col rounded-xl bg-neutral-200 dark:bg-neutral-800">
        <div
            className="relative flex items-center justify-center"
            style={{
            borderRadius: 8,
            overflow: "visible",
            }}
        >
        <Image
          src="/Images/DarkMainLogo.png"
          alt="logo"
          draggable={false}
          className="object-contain hidden dark:inline-block w-[200px] h-[200px]"
        />
        <Image
            src="/Images/MainLogo.png"
            alt="logo"
            draggable={false}
            className="object-contain dark:hidden w-[200px] h-[200px]"
        />
        </div>
        <div
            style={{
            width: "20%",
            height: lineWidth,
            marginTop: 16,
            backgroundColor: "#e0e0e0",
            borderRadius: lineWidth / 2,
            overflow: "hidden",
            position: "relative",
            }}
        >
            <div
            style={{
                width: "30%",
                height: "100%",
                backgroundColor: lineColor,
                borderRadius: lineWidth / 2,
                position: "absolute",
                animation: "loaderMove 3s infinite",
            }}
            />
        </div>

        <style>{`
            @keyframes loaderMove {
            0% { left: -30%; }
            50% { left: 50%; }
            100% { left: 100%; }
            }
        `}</style>
    </div>
  )
}
