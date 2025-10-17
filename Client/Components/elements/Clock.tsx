"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      let h = d.getHours();
      const m = ("0" + d.getMinutes()).slice(-2);
      const s = ("0" + d.getSeconds()).slice(-2);

      setAmPm(h >= 12 ? "PM" : "AM");
      h = h % 12 || 12;
      const hourStr = ("0" + h).slice(-2);

      setTime(`${hourStr}${showColon ? ":" : " "}${m}:${s}`);
      setShowColon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex scale-150 justify-center items-center h-screen bg-white dark:bg-black transition-colors duration-500 select-none">
      <div className="relative px-6 py-3 rounded-xl text-4xl font-mono shadow-lg border
                      text-gray-900 dark:text-cyan-300
                      border-gray-300 dark:border-cyan-500
                      bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800
                      backdrop-blur-md
                      animate-pulse hover:scale-105 transition-transform duration-300 ease-in-out
                      before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent
                      before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-blue-500
                      before:blur-sm before:opacity-30 before:animate-gradient-x">
        <span className="drop-shadow-md">{time}</span>
        <span className="ml-2 text-base font-bold animate-flicker">{amPm}</span>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
          background-size: 200% 200%;
        }

        .animate-flicker {
          animation: flicker 1s infinite;
        }
      `}</style>
    </div>
  );
}
