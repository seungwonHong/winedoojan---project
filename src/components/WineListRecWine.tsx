import React from "react";

interface Props {}

const WineListRecWine = (props: Props) => {
  return (
    <div className="flex flex-col lg:w-[1140px] lg:h-[300px] rounded-2xl bg-[#F2F4F8] lg:mt-[20px] md:mt-[20px] mt-[15px] lg:pt-[30px] lg:pl-[30px] md:pt-[30px] md:pl-[30px] pt-[20px] pl-[20px]">
      <span className="text-[#2D3034] text-[20px] font-bold lg:mb-[30px] md:mb-[30px] mb-[20px]">
        이번 달 추천 와인
      </span>
    </div>
  );
};

export default WineListRecWine;
