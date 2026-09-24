/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TV Dance Center | Trung tâm Dạy Nhảy Tại Hải Phòng",
    template: "%s | TV Dance Center",
  },
  description: "Khám phá lớp học Street Dance, Hip-hop, K-pop, Latin và cộng đồng yêu nhảy tại TV Dance Center.",
  keywords: ["TV Dance Center", "lớp nhảy", "dance studio", "hip-hop", "K-pop", "Latin", "Hải Phòng", "dạy nhảy Hải Phòng"],
  openGraph: {
    title: "TV Dance Center | Trung tâm Dạy Nhảy Tại Hải Phòng",
    description: "Nơi nhịp điệu trở thành bản lĩnh. Khám phá lớp học và cộng đồng TV Dance Center.",
    type: "website",
    locale: "vi_VN",
    siteName: "TV Dance Center",
  },
  twitter: {
    card: "summary_large_image",
    title: "TV Dance Center | Trung tâm Dạy Nhảy Tại Hải Phòng",
    description: "Nơi nhịp điệu trở thành bản lĩnh.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
