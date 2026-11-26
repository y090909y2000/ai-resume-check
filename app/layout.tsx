import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 標題用的中文襯線字體；中文字型很大，不預先載入
const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  weight: ["700", "900"],
  preload: false,
});

export const metadata: Metadata = {
  title: "AI 履歷健檢",
  description:
    "上傳履歷 PDF、選擇職缺類型，AI 引用你的原句，指出問題並給出改法。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
        <footer className="mt-auto border-t border-line px-5 py-8 text-center text-xs leading-6 text-muted">
          AI 履歷健檢 · 建議由 AI 產生，送出履歷前請自行確認內容。
        </footer>
      </body>
    </html>
  );
}
