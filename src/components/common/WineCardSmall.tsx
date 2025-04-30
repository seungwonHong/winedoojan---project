import { FaStar } from "react-icons/fa";
import React from "react";

interface Props {
  wine: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    type: "RED" | "WHITE" | "SPARKLING";
    avgRating: number;
    reviewCount: number;
    recentReview: {
      user: {
        id: number;
        nickname: string;
        image: string;
      };
      updatedAt: string;
      createdAt: string;
      content: string;
      aroma: string[];
      rating: number;
      id: number;
    };
    userId: number;
  };
}

const WineCardSmall = ({ wine }: Props) => {
  return (
    <div className="flex flex-row shadow-lg overflow-hidden pb-0 mb-0 lg:w-[232px] lg:h-[185px] lg:px-[30px] lg:pt-[24px]  md:w-[140px] md:h-[111px] md:px-[18px] w-[208px] h-[166.5px] px-[27px] bg-[white] rounded-2xl">
      <img
        alt="wine"
        src={wine.image}
        className="mr-[28px] lg:w-[44px] lg:h-[161px] md:w-[26.5px] md:h-[97px] md:mt-[10px] w-[40px] h-[145px] mt-[12px]"
      />
      <div className="flex flex-col w-full">
        <span className="lg:text-[36px] md:text-[21.6px] md:mt-[10px] text-[32.4px] text-[#2D3034] font-extrabold">
          {wine.avgRating}
        </span>
        <div className="flex gap-[2px] lg:mt-[8px] md:mt-[3px] mt-[10px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className="lg:w-[15px] lg:h-[15px] md:w-[10px] md:h-[10px] w-[17px] h-[17px]"
              color={
                index < Math.floor(wine.avgRating) % 10 ? "#FFD700" : "#E0E0E0"
              }
            />
          ))}
        </div>
        <span className="lg:text-[12px] md:text-[12px] text-[10px] text-[#9FACBD] font-normal mt-[8px] overflow-hidden w-full block">
          {wine.name}
        </span>
      </div>
    </div>
  );
};

export default WineCardSmall;
