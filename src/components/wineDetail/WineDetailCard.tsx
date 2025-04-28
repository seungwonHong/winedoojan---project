"use client";

import Image from "next/image";

import { Wine } from "@/types/wineDetailTypes";

const WineDetailCard = ({ wine }: { wine: Wine }) => {
  return (
    <div className="flex w-[343px] h-[190px] rounded-[12px] mt-[29px] border border-[#CFDBEA] relative md:w-[704px] md:h-[260px] md:mt-[62px] lg:w-[1140px]">
      <div className="object-cover w-[58px] h-[209px] relative bottom-[19px] ml-[20px] z-1 md:w-[84px] md:h-[302px] md:bottom-[42px] md:ml-[60px] lg:w-[58px] lg:h-[209px] lg:top-[50px]">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          sizes="(min-width: 1024px) 58px, (min-width: 768px) 84px, 58px"
          priority
          className="object-cover"
        />
      </div>

      <div className="w-[200px] flex flex-col justify-center gap-[15px] ml-[20px] md:ml-[60px] md:gap-[20px] md:w-[300px] lg:w-[400px]">
        <div className="font-[600] text-[20px] text-[#2D3034] md:text-[30px] break-keep ">
          {wine.name}
        </div>
        <div className="flex flex-col gap-[4.5px] md:gap-[13px]">
          <div className="font-[400] text-[14px] text-[#9FACBD] md:text-[16px]">
            {wine.region}
          </div>
          <div className="w-[86px] h-[36px] flex justify-center items-center rounded-[10px] font-[700] text-[14px] text-[#830E00] bg-[#ffe9e6] md:text-[18px] md:w-[114px] md:h-[37px]">
            ₩ {wine.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDetailCard;
