"use client";

import Image from "next/image";

import WineDetailReviewHeader from "./WineDetailReviewHeader";
import WineTasteSlider from "./WineTasteSlider";
import ic_top from "../../../public/icons/ic_top.png";
import ic_bottom from "../../../public/icons/ic_bottom.png";

import { Review } from "@/types/wineDetailTypes";
import { Wine } from "@/types/wineDetailTypes";

import { useState } from "react";

const WineDetailReviewCard = ({
  item,
  wine,
  refetch,
}: {
  item: Review;
  wine: Wine;
  refetch: () => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div>
      <div
        key={item.id}
        className="border border-[#CFDBEA] mt-[20px] rounded-[12px] md:rounded-[16px] py-[16px] px-[20px] md:py-[32px] md:px-[40px] lg:py-[16px] "
      >
        <WineDetailReviewHeader
          key={item.id}
          item={item}
          wine={wine}
          refetch={refetch}
        />
        {isOpen ? (
          <div className="relative bottom-[40px]">
            <div className="mt-[16px]">{item.content}</div>
            <WineTasteSlider
              value={item.lightBold}
              flavorKeyword="바디감"
              minLabel="가벼워요"
              maxLabel="진해요"
            />
            <WineTasteSlider
              value={item.smoothTannic}
              flavorKeyword="타닌"
              minLabel="부드러워요"
              maxLabel="떫어요"
            />
            <WineTasteSlider
              value={item.drySweet}
              flavorKeyword="당도"
              minLabel="드라이해요"
              maxLabel="달아요"
            />
            <WineTasteSlider
              value={item.softAcidic}
              flavorKeyword="산미"
              minLabel="안셔요"
              maxLabel="많이셔요"
            />
          </div>
        ) : null}

        <div className="flex justify-center">
          <button className="relative w-[30px] h-[30px]" onClick={handleIsOpen}>
            {isOpen ? (
              <Image src={ic_top} alt="ic_top" fill sizes="30px" />
            ) : (
              <Image src={ic_bottom} alt="ic_bottom" fill sizes="30px" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineDetailReviewCard;
