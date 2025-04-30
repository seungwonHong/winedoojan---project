'use client';

import { useState } from 'react';
import Image from 'next/image';

import { FaStar } from 'react-icons/fa';

import { getTimeAgo } from '@/utils/getTimeAgo';

import useFetchHeart from '@/hooks/winedetail/useFetchHeart';

import LeaveReviewModal from '../modals/ReviewModal';

import default_profile_img from '../../../public/images/default_profile_img.png';
import ic_hamburger from '../../../public/icons/ic_hamburger.png';
import ic_heart from '../../../public/icons/ic_heart.png';
import ic_garnet_heart from '../../../public/icons/ic_garnet_heart.png';

import { ReviewHeader } from '@/types/wineDetailTypes';

const WineDetailReviewHeader = ({ item }: ReviewHeader) => {
  const { isLike, handleClickLike } = useFetchHeart(item.id, item.isLiked);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickPatch = () => {
    return;
  };

  const handleClickDelete = () => {
    return;
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-[16px]">
          <div className="relative w-[42px] h-[42px]">
            <Image
              src={item.user.image || default_profile_img}
              alt="user-profile-image"
              fill
              sizes="42px"
              className="border border-[#CFDBEA] rounded-[100px]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="h-[26px]">{item.user.nickname}</div>
            <div className="h-[26px]">{getTimeAgo(item.createdAt)}</div>
          </div>
        </div>
        <div className="flex gap-[18px]">
          <div
            className="relative w-[30px] h-[30px] object-cover cursor-pointer"
            onClick={handleClickLike}
          >
            {isLike ? (
              <Image src={ic_garnet_heart} alt="ic_heart" fill sizes="30px" />
            ) : (
              <Image src={ic_heart} alt="ic_heart" fill sizes="30px" />
            )}
          </div>
          <div
            className="relative w-[30px] h-[30px] object-cover cursor-pointer"
            onClick={handleClickMenu}
          >
            <Image src={ic_hamburger} alt="ic_hamburger" fill sizes="30px" />
            {isMenuOpen && (
              <div className="z-20 absolute right-0 top-[35px] bg-white border border-gray-300 rounded-[16px] w-[126px] h-[104px] flex flex-col items-center justify-center">
                <div
                  className="w-[118px] px-[22px] py-[12px] text-center hover:rounded-[12px] hover:bg-palepink hover:text-garnet cursor-pointer"
                  onClick={handleClickPatch}
                >
                  수정하기
                </div>
                <div
                  className="w-[118px] px-[22px] py-[12px] text-center hover:rounded-[12px] hover:bg-palepink hover:text-garnet cursor-pointer"
                  onClick={handleClickDelete}
                >
                  삭제하기
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-[4px] w-[220px] z-10 mt-[20px] relative overflow-x-auto whitespace-nowrap scroll-smooth md:w-full">
        {item.aroma.map((item, index) => (
          <div
            key={index}
            className="rounded-[100px] border border-[#CFDBEA] py-[6px] px-[10px] inline-block"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex justify-end relative bottom-[38px] md:bottom-[42px]">
        <div className="flex justify-center items-center text-[18px] font-[700] text-[#830E00] bg-[#ffe9e6] w-[60px] h-[36px] rounded-[12px] md:w-[80px] md:h-[42px] ">
          <div className="flex justify-center items-center relative w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
            <FaStar className="text-[#830E00] w-[16px] h-[16px]" />
          </div>
          <div className="text-center relative top-[2px] left-[3px]">
            {item.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDetailReviewHeader;
