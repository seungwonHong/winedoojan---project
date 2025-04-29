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
        "border border-[#cfdbea] rounded-[16px] w-[800px] flex px-[40px] shadow-sm",
        pt,
        mb,
        className
      )}
    >
      {children}
    </div>
  );
}
