import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '와인두잔',
  description: '맛있는 와인은 두잔이지~',
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
