import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "满仓宠物店",
  description: "苏州吴江万象汇 B101 宠物洗护、基础美容、皮毛护理预约到店。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
