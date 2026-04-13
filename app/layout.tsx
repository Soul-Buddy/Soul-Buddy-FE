import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 폰트 최적화 적용
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // 폰트 로딩 최적화(필요한 문자만 로드)

export const metadata: Metadata = {
  title: {
    default: "Zero One Counsel",
    template: "%s | Zero One Counsel",
  },
  description: "당신만의 AI 소울메이트 Zero One Counsel",
  manifest: "/manifest.jason",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ZeroOne",
  },
  icons: {
    apple: "/icons/icon-192x192.png", // iOS 홈 화면 아이콘 대응
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable}suppressHydrationWarning`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
