'use client';
import React, { useEffect, useState } from "react";

type Props = {
  size?: number;
  lineWidth?: number;
  lineColor?: string;
  logoSrc?: string;
};

export default function SkillmateLogoLoading({
  lineWidth = 6,
  lineColor = "#2F8FEA",
}: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(media.matches);

      // برای اینکه اگر یوزر وسط کار تم رو تغییر داد آپدیت بشه
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      media.addEventListener("change", handler);

      return () => media.removeEventListener("change", handler);
    }
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center w-full h-screen bg-neutral-50 dark:bg-neutral-800 z-50">
      <div
        className="relative flex items-center justify-center"
        style={{
          borderRadius: 8,
          overflow: "visible",
        }}
      >
      <img
        src="/Images/DarkMainLogo.png"
        alt="logo"
        draggable={false}
        className="object-contain hidden dark:inline-block w-[200px] h-[200px]"
      />

      <img
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
  );
}
