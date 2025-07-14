import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import TanstackProvider from "@/providers/TanstackProvider";

export const metadata: Metadata = {
  title: "이때어때",
  description: "이때어때",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}  w-full`}>
        <div className="max-w-screen-lg mx-auto">
          <TanstackProvider>{children}</TanstackProvider>
        </div>
      </body>
    </html>
  );
}
