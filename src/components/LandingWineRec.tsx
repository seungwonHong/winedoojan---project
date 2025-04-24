"use client";
import React from "react";
import { motion } from "framer-motion";
import { WineRecommended } from "@/services/getWineRecommended";
import WineCardSmall from "./common/WineCardSmall";
import { div } from "framer-motion/client";

interface Props {
  winesRecommended: WineRecommended["wines"];
}

const LandingWineRec = ({ winesRecommended }: Props) => {
  console.log("추천 와인 리스트:", winesRecommended);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="flex lg:flex-row md:flex-row flex-col lg:w-[640px] lg:h-[320px] lg:mt-[160px] md:w-[640px] md:h-[320px] md:mt-[120px] w-[343px] h-[424px] mt-[100px] rounded-2xl bg-[#EBEEF4]"
    >
      <div className="flex flex-col lg:ml-[32px] lg:mt-[56px] lg:mr-[80px] mt-[24px] ml-[24px]">
        <span className="text-[22px] font-bold text-[#2D3034]">
          매달 새롭게 만나는
        </span>
        <span className="text-[22px] font-bold text-[#2D3034]">
          와인 추천 콘텐츠
        </span>
        <span className="text-[12px] font-normal text-[#9FACBD]">
          매달 다양한 인기 와인을 만나보세요.
        </span>
      </div>

      <div className="relative flex flex-col overflow-hidden lg:overflow-visible md:overflow-visible self-end rounded-tl-[16px] rounded-bl-[16px] lg:rounded-bl-none md:rounded-bl-none lg:w-[356px] lg:h-[277px] md:w-[356px] md:h-[277px] w-[290px] h-[241px] mt-[60px] lg:pl-[20px] lg:pb-[56px] lg:pt-[20px] md:pl-[20px] md:pt-[20px] md:ml-auto pl-[20px] pt-[20px] bg-[#F2F4F8]">
        <span className="lg:text-[18px] md:text-[18px] text-[16px] text-[#50545B] font-bold mb-[20px]">
          이번 달 추천 와인
        </span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute flex flex-row lg:bottom-[30px] md:bottom-[80px] bottom-[20px]"
        >
          {winesRecommended?.map((wine) => (
            <div className="mr-[10px]" key={wine.id}>
              <WineCardSmall wine={wine} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingWineRec;
