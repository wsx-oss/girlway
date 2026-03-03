import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "💌 一封小小的邀请",
  description: "你有一封未读的邀请~",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
