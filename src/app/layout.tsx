import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata: Metadata = {
  title: "와인두잔",
  description:
    "전세계의 다양한 와인들을 다양한 사람들과 공유하고 리뷰할 수 있는 최고의 플랫폼 - 와인두잔",
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
        <meta property="og:title" content="와인두잔" />
        <meta property="og:description" content="맛있는 와인은 두잔이지~" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://winedoojan.vercel.app" />
        <meta property="og:image" content="/images/noSearchResult.jpeg" />
        <meta property="og:locale" content="ko_KR" />
        <meta
          name="description"
          content="와인 추천, 리뷰까지 한 곳에 - 와인두잔"
        />
        <meta name="keywords" content="와인, 와인 추천, 와인 리뷰, 와인 정보" />
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
