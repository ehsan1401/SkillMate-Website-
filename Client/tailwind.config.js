/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
        gothic: ['Gothic', 'sans-serif'],
        vazir: ['Vazir', 'sans-serif'],
        Lalezar: ['Lalezar', 'sans-serif'],
        Parand: ['Parand', 'sans-serif'],
        Aban: ['Aban', 'sans-serif'],
        Homa: ['Homa', 'sans-serif'],
        Franklin: ['Franklin', 'sans-serif'],
        scriptMtbold: ['scriptMtbold', 'sans-serif'],
        Centaur: ['Centaur', 'sans-serif'],
        TwCenMt: ['TwCenMt', 'sans-serif'],
      },
            animation: {
        "spin-slow": "spin 2s linear infinite",
        "pulse-soft": "pulseSoft 1.8s ease-in-out infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%": { transform: "scale(1)", opacity: "0.75" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0.75" },
        },
      }
    },
  },
  plugins: [],
};
