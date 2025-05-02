"use client";
import React from "react";
import { motion } from "framer-motion";
import { WineRecommended } from "@/services/getWineRecommended";
import WineCardSmall from "./common/WineCardSmall";
import WineCardSmallSkeleton from "./common/WineCardSmallSkeleton";

interface Props {
  wines: WineRecommended["wines"];
}

const WineListRecWine = ({ wines }: Props) => {
  return (
    <div className="flex flex-col lg:w-[1140px] lg:h-[320px] md:w-[704px] md:h-[299px] w-[343px] h-[260px] rounded-2xl bg-[#F2F4F8] lg:mt-[20px] md:mt-[20px] mt-[15px] lg:pt-[30px] lg:pl-[30px] md:pt-[30px] md:pl-[30px] pt-[20px] pl-[20px]">
      <span className="text-[#2D3034] text-[20px] font-bold lg:mb-[30px] md:mb-[30px] mb-[20px]">
        이번 달 추천 와인
      </span>

      <div className="flex flex-row gap-2 overflow-x-auto overflow-y-visible h-[220px]">
        {wines.length > 0
          ? wines.map((wine) => (
              <motion.div
                key={wine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-row items-center p-0 "
              >
                <div className="mr-[15px]">
                  <WineCardSmall wine={wine} />
                </div>
              </motion.div>
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <div className="flex flex-row items-center p-0" key={index}>
                <WineCardSmallSkeleton />
              </div>
            ))}
      </div>
    </div>
  );
};

export default WineListRecWine;
