import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "diablo.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "diablo-s3.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
