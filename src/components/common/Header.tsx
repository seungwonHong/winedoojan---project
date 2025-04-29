'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import images from '../../../public/images/images';
import { useAuthStore } from '@/store/authStore';

const Header = () => {
  const { user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
    }
    setIsLoading(false);
  }, [user]);

  const handleLogout = (): void => {
    logout();
  };

  return (
    <header className="flex flex-row justify-between items-center lg:mb-[80px] mb-[24px] lg:w-[1140px] lg:h-[70px] md:w-[704px] md:h-[70px] w-[343px] h-[50px] rounded-2xl bg-[#101318] lg:px-[60px] md:px-[60px] px-[20px] lg:py-[25px] md:py-[25px] py-[16px]">
      <Link href={'/'}>
        <Image
          className="lg:w-[156px] lg:h-[40px] md:w-[156px] md:h-[40px] w-[117px] h-[30px] cursor-pointer"
          alt="logo"
          src={images.logoWhite}
          width={702}
          height={180}
        />
      </Link>

      {isLoading ? (
        <div className="w-[40px] h-[40px] max-md:w-5 max-md:h-5 bg-gray-700 rounded-full animate-pulse" />
      ) : user ? (
        <div className="flex items-center">
          <Image
            className="max-md:w-6 max-md:h-6 cursor-pointer"
            src={user.image || images.defaultProfile}
            alt="user"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <div className="flex items-center">
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
      )}
    </header>
  );
};

export default Header;
