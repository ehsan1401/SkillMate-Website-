import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../Loading";

export const metadata: Metadata = {
  title: "SkillMate - Dashboard"
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Suspense fallback={<Loading/>}>
        <section>
            {children}
        </section>
      </Suspense>
  );
}
