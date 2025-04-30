"use client";

import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className: string;
  pt?: string;
  mb?: string;
}

export function MyProfileCard({ children, className, pt, mb }: CardProps) {
  return (
    <div
      className={clsx(
        "w-full border border-[#cfdbea] rounded-[16px] lg:w-[800px] flex px-[20px] md:px-[40px] shadow-sm",
        pt,
        mb,
        className
      )}
    >
      {children}
    </div>
  );
}
