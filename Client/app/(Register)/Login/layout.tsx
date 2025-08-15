import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "SkillMate - Login"
};

export default async function LoginLayout({
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
