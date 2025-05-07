"use client";
import { motion } from "framer-motion";

const SkeletonMyProfile = () => {
  return (
    <div className="w-[343px] lg:w-[800px] md:w-[704px] flex flex-row gap-[16px] rounded-xl border border-[#CFDBEA] p-12 shadow-sm mb-2.5 relative overflow-hidden">
      <motion.div className="w-2/5 h-[160px] bg-[#cfcccc] rounded-md mb-4 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
        />
      </motion.div>
      <div className="w-3/5">
        <motion.div className="relative overflow-hidden w-1/3 h-[32px] bg-[#cfcccc] rounded mb-3">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
          />
        </motion.div>
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden h-[24px] bg-[#cfcccc] rounded mb-1"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#ffffff20] to-transparent"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonMyProfile;
