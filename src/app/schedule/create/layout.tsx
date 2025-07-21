import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 모임 생성",
  description: "이때어때 - 모임 생성",
};

import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full hidden md:block">
        <Header />
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-70px)] max-w-[740px] mx-auto">
        {children}
      </div>
    </>
  );
}
