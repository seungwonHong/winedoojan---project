"use client";
import React from "react";
import { motion } from "framer-motion";

const LandingReviewSys = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="flex bg-[#EBEEF4] overflow-hidden rounded-2xl lg:flex-row md:flex-row flex-col lg:mt-[96px] md:mt-[96px] mt-[48px] lg:w-[640px] lg:h-[320px] md:w-[640px] md:h-[320px] w-[343px] h-[424px]"
    >
      <div className="flex flex-col lg:mt-[50px] lg:ml-[24px] md:mt-[50px] md:ml-[24px] mt-[24px] ml-[24px]">
        <span className="text-[22px] text-[#2D3034] font-bold">직관적인</span>
        <span className="text-[22px] text-[#2D3034] font-bold">
          리뷰 시스템
        </span>
        <span className="text-[12px] font-normal text-[#9FACBD]">
          더 구체화된 리뷰 시스템으로
        </span>
        <span className="text-[12px] font-normal text-[#9FACBD]">
          쉽고 빠르게 와인 리뷰를 살펴보세요.
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.5 }}
        className="lg:ml-auto md:ml-auto lg:mt-[15px] lg:mr-[30px] md:mr-[30px] md:mt-auto mt-[25px] ml-auto"
      >
        <img
          src="/images/review.png"
          alt="review"
          className="lg:h-[320px] lg:w-[272px] w-[272px] h-[320px]"
        />
      </motion.div>
    </motion.div>
  );
};

export default LandingReviewSys;
