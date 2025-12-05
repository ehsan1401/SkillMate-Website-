import { Metadata } from "next";
import { ReactNode } from "react";

export function generateMetadata(): Metadata {
  return {
    title:"fucking User ",
    description: "Browse People For Create Your own team!",
  };
}


export default function UserLayout({ children } : { children : ReactNode }) {
  return <div>{children}</div>;
}

