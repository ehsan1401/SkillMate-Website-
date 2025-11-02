

import { Metadata } from "next";
import DashboardClientLayout from "./layout.client";

export const metadata: Metadata = {
  title: "SkillMate - Dashboard"
};

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
