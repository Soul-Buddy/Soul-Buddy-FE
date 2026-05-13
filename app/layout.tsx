import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google"; // 폰트 최적화 적용
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // 폰트 로딩 최적화(필요한 문자만 로드)

// 브라우저 상단 바 컬러 및 스케일 제어
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Zero One Counsel",
    template: "%s | Zero One Counsel",
  },
  description: "당신만의 AI 소울메이트 Zero One Counsel",
  manifest: "/manifest.json",
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
    // inter.variable : CSS 변수 주입, suppressHydrationWarning : 서버가 만든 html이 다를 때 발생하는 경고 무시
    <html lang="ko" className={`${inter.variable} h-full`} suppressHydrationWarning>
      {/* antialiased : 텍스트를 부드럽게 보여주는 클래스 */}
      <body className="bg-neutral-300 flex justify-center min-h-screen font-sans antialiased">
        {/* PC에서 폰 화면처럼 보이도록 최대 너비 고정 */}
        <div className="relative w-full max-w-[430px] min-h-screen bg-[var(--color-bg)] shadow-2xl overflow-x-hidden flex flex-col">
          <Providers>
            <main className="grow">{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
