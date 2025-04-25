import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center lg:w-[1140px] lg:h-[70px] md:w-[704px] md:h-[70px] w-[343px] h-[50px] rounded-2xl bg-[#101318] lg:px-[60px] md:px-[60px] px-[20px] lg:py-[25px] md:py-[25px] py-[16px]">
      <img
        className="lg:w-[120px] lg:h-[40px] md:w-[100px] md:h-[40px] w-[80px] h-[30px]"
        alt="logo"
        src="/images/logo.png"
      />

      <div>
        <Link
          href="/signin"
          className="text-[12px] lg:text-[16px] md:text-[14px] font-medium text-[#FFFFFF]"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="text-[12px] lg:text-[16px] md:text-[14px] font-medium text-[#FFFFFF] lg:ml-[40px] md:ml-[30px] ml-[10px]"
        >
          회원가입
        </Link>
      </div>
    </header>
  );
};

export default Header;
