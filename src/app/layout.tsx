import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이때어때",
  description: "이때어때",
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
