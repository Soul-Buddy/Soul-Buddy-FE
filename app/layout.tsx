import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoulBuddy",
  description: "당신만의 AI 소울메이트 SoulBuddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
