

import { Metadata } from "next";
import DashboardClientLayout from "./layout.client";

export function generateMetadata(): Metadata {
  return {
    title:"Dashboard",
    description: "Browse People For Create Your own team!",
  };
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardClientLayout>
      {children}
    </DashboardClientLayout>
  );
}
