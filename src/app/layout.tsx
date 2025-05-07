import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "와인두잔",
  description:
    "전세계의 다양한 와인들을 다양한 사람들과 공유하고 리뷰할 수 있는 최고의 플랫폼 - 와인두잔",
  keywords: [
    "와인",
    "와인 추천",
    "와인 리뷰",
    "레드 와인",
    "화이트 와인",
    "스파클링 와인",
    "와인 정보",
    "와인 커뮤니티",
    "와인 플랫폼",
    "와인두잔",
    "와인 두잔",
    "winedoojan",
    "와인 두잔 커뮤니티",
    "와인두잔 커뮤니티",
  ],
  openGraph: {
    title: "와인두잔",
    description: "맛있는 와인은 두잔이지~",
    url: "https://winedoojan.vercel.app",
    siteName: "와인두잔",
    images: [
      {
        url: "/images/noSearchResult.jpeg",
        width: 1200,
        height: 630,
        alt: "와인두잔 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  metadataBase: new URL("https://winedoojan-project.vercel.app/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
        <meta name="author" content="winedoojan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.svg" />
      </head>
      <body className="antialiased">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
