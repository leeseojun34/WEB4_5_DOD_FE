import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이떄어때",
  description: "이떄어때",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
