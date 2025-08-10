import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This is test"
};

export default function RouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        {children}
      </div>
  );
}
