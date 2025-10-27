"use client";

import { useState, useRef } from "react";
import Clock from "@/Components/elements/Clock";
import { LetsIconsExpandRightDouble } from "@/Icons/expandToRight";
import { LetsIconsExpandLeftDouble } from "@/Icons/expandToLeft";
import DarkModeToggle from "@/Components/elements/DarkModeToggle";
import { IcBaselineHome } from "@/Icons/HomeIcon";
import { Play, Pause, Maximize, Minimize } from "lucide-react";

export default function ClockFullScreen() {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSound, setSelectedSound] = useState("/music/rain1.mp3");
  const audioRef = useRef<HTMLAudioElement>(null);

  // 🎵 Toggle music play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  // 🎧 Change sound
  const handleSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSound = e.target.value;
    setSelectedSound(newSound);

    const audio = audioRef.current;
    if (audio) {
      audio.src = newSound;
      if (isPlaying) {
        // if already playing, auto play the new one
        audio.play();
      }
    }
  };

  // 🖥️ Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="z-[100] relative h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* 🕒 Clock Center */}
      <Clock />

      {/* 🔻 Bottom Control Bar */}
      <div
        className={`absolute bottom-0 bg-neutral-600 hover:opacity-100 opacity-25 h-12 z-[110] transition-all duration-300 ease-in-out ${
          expanded ? "lg:w-[30%] md:w-[50%] w-full rounded-2xl" : "w-12 rounded-full overflow-hidden"
        }`}
      >
        {/* 🎵 Music Play/Pause */}
        <div className="absolute left-[215px] top-[6px] text-neutral-100">
          <button
            onClick={togglePlay}
            className="text-4xl hover:scale-110 active:scale-95 transition-all duration-200"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? <Pause size={35} /> : <Play size={35} className="pl-1" />}
          </button>

          {/* Hidden Audio */}
          <audio ref={audioRef} src={selectedSound} preload="auto" />
        </div>

        {/* 🎧 Sound Selector */}
        <select
          value={selectedSound}
          onChange={handleSoundChange}
          className="absolute left-[270px] top-[12px] bg-neutral-700 text-white text-sm rounded-md px-2 py-1 outline-none cursor-pointer hover:bg-neutral-500 transition-all duration-200"
          title="Select Sound"
        >
          <option value="/music/rain1.mp3">Rain 1</option>
          <option value="/music/rain2.mp3">Rain 2</option>
          <option value="/music/rain3.mp3">Rain 3</option>
          <option value="/music/forest.mp3">Forest</option>
          <option value="/music/waves.mp3">Ocean Waves</option>
        </select>

        {/* 🏠 Home Button */}
        <button
          className="absolute left-32 top-[6px] text-neutral-100 hover:text-neutral-400 text-4xl"
          onClick={() => {
            window.location.href = "/";
          }}
          title="Go Home"
        >
          <IcBaselineHome />
        </button>

        {/* 🌙 Dark Mode */}
        <span className="absolute left-14 top-2">
          <DarkModeToggle />
        </span>

        {/* ⛶ Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="absolute left-44 top-[9px] text-neutral-100 hover:text-neutral-400 text-3xl active:scale-95"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize size={30} /> : <Maximize size={30} />}
        </button>

        {/* ⬅️➡️ Expand/Collapse */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="fixed bottom-0 left-0 text-white active:scale-95 transition-all duration-200 z-[200] p-4"
          title={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <LetsIconsExpandLeftDouble /> : <LetsIconsExpandRightDouble />}
        </button>
      </div>
    </div>
  );
}
