import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata: Metadata = {
  title: "SkillMate | Peoples",
  description: "Browse People For Create Your own team!",
};

export default function PeoplesLayout({children}:{children : ReactNode}){
    return(
        {children}
    )
}