"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

useEffect(() => {
  if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
    setDark(true);
  } else {
    document.documentElement.classList.remove("dark");
    setDark(false);
  }
}, []);


  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleDark}
      className="relative flex items-center w-14 h-8 rounded-full transition-colors duration-500 bg-gray-300 dark:bg-gray-700"
    >
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-500 ${dark ? "translate-x-6 rotate-180" : "translate-x-0"}`}
      >
        {dark ? (
          <Moon className="w-4 h-4 text-gray-700 m-1" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-400 m-1" />
        )}
      </span>
    </button>
  );
}
