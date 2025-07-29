import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import TanstackProvider from "@/providers/TanstackProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "이때어때",
  description: "이때어때",
  openGraph: {
    title: "이때어때",
    description: "이때어때",
    url: "https://www.ittaeok.com/",
    siteName: "이때어때",
    images: [
      {
        url: "https://www.ittaeok.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "미리보기 이미지 설명",
      },
    ],
    type: "website",
  },
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
        <Toaster />
      </body>
    </html>
  );
}
