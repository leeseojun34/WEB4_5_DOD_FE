import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이때어때 - 모임 생성",
  description: "이때어때 - 모임 생성",
};

// import Header from "@/components/ui/HeaderTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header fontColor="black"> </Header> */}
      <div className="flex flex-col justify-between h-screen">{children}</div>
    </>
  );
}
