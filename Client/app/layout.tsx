import type { Metadata } from "next";
import "@ant-design/compatible";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'antd/dist/reset.css';
import { Suspense} from "react";
import Loading from "./Loading"
import NavigationBar from "@/Components/naviagtion/NavigationBar";
import AllProviders from "@/Components/provider/AllProviders";
import 'aos/dist/aos.css';
import NavigationProvider from "@/Components/naviagtion/NavigationProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "SkillMate.team",
      template: "SkillMate | %s"
    },
    description: "I'm testing my NextJs and NestJS skill in this project",
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500`}
      >
        <AllProviders>
          <main className="overflow-hidden">
            <Suspense fallback={<Loading/>}>
            <NavigationProvider>
              <NavigationBar />
            </NavigationProvider>
            
              {children}
            </Suspense>
          </main>
        </AllProviders>
      </body>
    </html>
  );
}
