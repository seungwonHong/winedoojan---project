'use client'
import React from "react";
import { motion } from "framer-motion";

const WineCardBigSkeleton = () => {
  return (
    <div className="flex flex-col rounded-2xl border-[1px]  bg-[#c7c5c5] border-[#CFDBEA] lg:w-[800px] lg:h-[375px] md:w-[600px] md:h-[375px] w-[300px] h-[360px] lg:mt-[42px] lg:pb-[19px] pt-[36.5px] md:mt-[74px] md:pb-[10px] pb-[15px] mt-[30px]">
      <div className="flex flex-row">
        {/* 사진 */}
        <motion.div className="relative overflow-hidden lg:w-[60px] lg:h-[208px] md:w-[74px] md:h-[208px] w-[60px] h-[212px] lg:ml-[60px] md:ml-[20px] ml-[10px]  bg-[#5d5b5b] rounded-lg">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
          />
        </motion.div>

        <div className="flex lg:flex-row md:flex-row flex-col lg:ml-[81px] md:ml-[37px] lg:mr-[60px] md:mr-[20px] ml-[15px] mr-[15px] w-full">
          <div className="flex flex-col lg:w-[300px] md:w-[250px] w-[180px]">
            {/* 이름 */}
            <motion.div className="relative overflow-hidden lg:w-[300px] lg:h-[42px] md:w-[300px] md:h-[36px] w-[150px] h-[32px] rounded-lg bg-[#5d5b5b]">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
              />
            </motion.div>
            {/* 지역 */}
            <motion.div className="relative overflow-hidden lg:w-[200px] lg:h-[26px] md:w-[130px] md:h-[26px] w-[100px] h-[24px] rounded-lg lg:mt-[20px] md:mt-[20px] mt-[15px] bg-[#5d5b5b]">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
              />
            </motion.div>
            {/* 가격 */}
            <motion.div className="relative overflow-hidden lg:w-[114px] lg:h-[42px] md:w-[114px] md:h-[42px] w-[65px] h-[24px] lg:mt-[16px] md:mt-[14px] mt-[10px] rounded-xl bg-[#5d5b5b] lg:mb-[10px] md:mb-[15px]">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
              />
            </motion.div>
          </div>

          <div className="flex lg:flex-col md:flex-col flex-row lg:ml-auto md:ml-auto lg:mt-0 md:mt-0 mt-[20px]">
            {/* 평점 */}
            <motion.div className="relative overflow-hidden lg:w-[60px] lg:h-[30px] md:w-[40px] md:h-[20px] w-[30px] h-[20px]  rounded-lg bg-[#5d5b5b] ">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
              />
            </motion.div>
            <div className="lg:ml-0 md:ml-0 ml-[20px]">
              {/* 별점 */}
              <motion.div className="relative overflow-hidden lg:mt-[20px] md:mt-[20px] lg:w-[80px] lg:h-[15px] md:w-[60px] md:h-[10px] w-[40px] h-[8px]  rounded-lg bg-[#5d5b5b] ">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.0,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
                />
              </motion.div>
              {/* 후기 개수 */}
              <motion.div className="relative overflow-hidden lg:mt-[20px] md:mt-[20px] lg:w-[50px] lg:h-[10px] md:w-[40px] md:h-[10px] w-[40px] h-[8px] mt-[2px]  rounded-lg bg-[#5d5b5b] ">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.0,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:w-[680px] lg:h-[88px] md:w-[524px] md:h-[88px] w-[250px] h-[100px] lg:mx-[60px] lg:mt-[19px] md:mx-[20px] md:mt-[10px] mx-[10px] mt-[5px]">
        {/* 최신 후기 */}
        <motion.div className="relative overflow-hidden lg:mt-[20px] md:mt-[20px] lg:w-[60px] lg:h-[26px] md:w-[60px] md:h-[26px] w-[52px] h-[24px] rounded-lg bg-[#5d5b5b]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.0,
              ease: "linear",
            }}
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
          />
        </motion.div>
        <motion.div className="relative overflow-hidden lg:mt-[10px] md:mt-[10px] mt-[5px] lg:w-[680px] lg:h-[25px] md:w-[550px] md:h-[25px] w-[250px] h-[13px]  rounded-lg bg-[#5d5b5b]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.0,
              ease: "linear",
            }}
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
          />
        </motion.div>
        <motion.div className="relative overflow-hidden lg:mt-[3px] md:mt-[3px] mt-[2px] lg:w-[680px] lg:h-[25px] md:w-[550px] md:h-[25px] w-[250px] h-[13px]  rounded-lg bg-[#5d5b5b]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.0,
              ease: "linear",
            }}
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WineCardBigSkeleton;
