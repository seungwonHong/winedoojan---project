import React from "react";
import { motion } from "framer-motion";

type Props = {};

const LoadingAnimation = (props: Props) => {
  return (
    <motion.div
      className="flex items-center justify-center w-6 h-6 border-[3px] border-gray-300 border-t-gray-500 rounded-full mt-[30px]"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
};

export default LoadingAnimation;
