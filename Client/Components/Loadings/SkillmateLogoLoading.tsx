import React from "react";

type Props = {
  size?: number;
  lineWidth?: number;
  lineColor?: string;
  logoSrc?: string;
};

export default function SkillmateLogoLoading({
  lineWidth = 6,
  lineColor = "#2F8FEA",
  logoSrc = "/Images/TitleLessLogo.png",
}: Props) {
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
          src={logoSrc}
          alt="logo"
          draggable={false}
          className="object-contain"
          style={{
            width: "200px",
            height: "200px",
            display: "block",
          }}
        />
      </div>

      {/* نوار لودینگ ساده */}
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
