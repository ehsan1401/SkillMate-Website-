import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "This is Login page"
};

export default function LoginLayout({
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
