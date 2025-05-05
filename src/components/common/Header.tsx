'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import images from '../../../public/images/images';
import { useAuthStore } from '@/store/authStore';
import DropdownItems from './DropdownItems';
import { useRouter } from 'next/navigation';

const labels: string[] = ['마이페이지', '로그아웃'];

const Header = () => {
  const { user, logout, getMe, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      // 인증된 상태일 때만 사용자 정보 요청
      if (isAuthenticated) {
        try {
          await getMe();
        } catch (error) {
          console.error('사용자 정보 로딩 실패:', error);
        }
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, [getMe, isAuthenticated]); // isAuthenticated가 변경될 때마다 사용자 정보 갱신

  const handleDropdownOpen = () => {
    setIsOpen(!isOpen);
  };

  const actions = {
    마이페이지: () => {
      handleDropdownOpen();
      router.push('/myprofile');
    },

    로그아웃: () => {
      handleDropdownOpen();
      logout();
    },
  };

  return (
    <header className="flex flex-row justify-between items-center  lg:w-[1140px] lg:h-[70px] md:w-[704px] md:h-[70px] w-[343px] h-[50px] rounded-2xl bg-[#101318] lg:px-[60px] md:px-[60px] px-[20px] lg:py-[25px] md:py-[25px] py-[16px]">
      <Link href={'/wines'}>
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
        <div className="relative">
          <div className="rounded-full">
            <div className="relative flex items-center rounded-full w-[40px] h-[40px] max-md:w-6 max-md:h-6 cursor-pointer overflow-hidden">
              <Image
                className="w-auto h-auto"
                src={user.image || images.defaultProfile}
                alt="user"
                objectFit="cover"
                fill
                sizes="40"
                onClick={handleDropdownOpen}
              />
            </div>
          </div>
          <DropdownItems isOpen={isOpen} labels={labels} actions={actions} />
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
