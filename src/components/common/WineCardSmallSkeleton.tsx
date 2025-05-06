import React from "react";
import { motion } from "framer-motion";

type Props = {};

const WineCardSmallSkeleton = (props: Props) => {
  return (
    <div className=" overflow-hidden flex flex-row pb-0 mb-0 lg:w-[232px] lg:h-[185px] lg:px-[15px] lg:pt-[24px] md:pt-[24px] pt-[24px] md:w-[140px] md:h-[111px] md:px-[12px] w-[208px] h-[166.5px] px-[10px] bg-[#f9f8f8] rounded-2xl">
      {/* 사진 */}
      <motion.div className="relative overflow-hidden lg:mr-[20px] md:mr-[15px] mr-[15px] lg:w-[60px] lg:h-[168px] md:w-[30px] md:h-[97px] w-[40px] h-[145px]  bg-[#cfcccc] rounded-lg">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
        />
      </motion.div>
      <div className="flex flex-col w-full">
        {/* 평균 점수 */}
        <motion.div className="relative overflow-hidden lg:w-[57px] lg:h-[43px] md:w-[47px] md:h-[33px]  w-[45px] h-[33px] rounded-lg bg-[#cfcccc] ">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
          ></motion.div>
        </motion.div>

        {/* 별 */}
        <motion.div className="relative overflow-hidden flex lg:mt-[8px] md:mt-[3px] mt-[10px] lg:w-[90px] lg:h-[18px] md:w-[70px] md:h-[12px] w-[80px] h-[14px] rounded-lg bg-[#cfcccc]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
          ></motion.div>
        </motion.div>
        {/* 이름 */}

        <div className="md:mt-[5px] mt-[10px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden flex lg:mt-[3px] md:mt-[3px] mt-[5px] lg:w-[130px] lg:h-[12px] md:w-[60px] md:h-[6px] w-[120px] h-[10px] rounded-lg bg-[#cfcccc]"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WineCardSmallSkeleton;
