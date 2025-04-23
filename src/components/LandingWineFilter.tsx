"use client";
import React from "react";
import { motion } from "framer-motion";

const LandingWineFilter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="flex bg-[#EBEEF4] overflow-hidden rounded-2xl lg:flex-row md:flex-row flex-col lg:mt-[96px] md:mt-[96px] mt-[48px] lg:w-[640px] lg:h-[320px] md:w-[640px] md:h-[320px] w-[343px] h-[424px]"
    >
      <div className="flex flex-col lg:mt-[50px] lg:ml-[24px] md:mt-[50px] md:ml-[24px] mt-[24px] ml-[24px]">
        <span className="text-[22px] text-[#2D3034] font-bold">
          다양한 필터로 찾는
        </span>
        <span className="text-[22px] text-[#2D3034] font-bold">
          내 맞춤 와인
        </span>
        <span className="text-[12px] font-normal text-[#9FACBD]">
          와인 타입, 가격, 평점으로
        </span>
        <span className="text-[12px] font-normal text-[#9FACBD]">
          나에게 맞는 와인을 쉽게 검색하세요.
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 0.5 }}
        className="lg:ml-auto md:ml-auto lg:mt-[15px] md:mt-auto ml-auto"
      >
        <img src="/images/wineFilter.png" alt="wineFilter" />
      </motion.div>
    </motion.div>
  );
};

export default LandingWineFilter;
