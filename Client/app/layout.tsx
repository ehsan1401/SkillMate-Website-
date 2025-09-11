import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'antd/dist/reset.css';
import { Suspense} from "react";
import Loading from "./Loading"
import NavigationBar from "@/Components/naviagtion/NavigationBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillMate.team",
  description: "I'm testing my NextJs and NestJS skill in this project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="overflow-hidden">
          <Suspense fallback={<Loading/>}>
            <NavigationBar />
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
