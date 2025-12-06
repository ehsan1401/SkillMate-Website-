import { Metadata } from "next";
import { ReactNode } from "react";

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: {
      default: "SkillMate | Peoples",
      template: "SkillMate | %s"
    },
    description: "Browse People For Create Your own team!",
  };
}

export default function PeoplesLayout({children}:{children : ReactNode}){
    return {children}
}