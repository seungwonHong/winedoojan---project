'use client'
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const ExploreWineButton = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href="/wines"
        className="bg-[#6A42DB] w-[280px] h-[50px] rounded-full mt-[104px] flex flex-row items-center justify-center text-[16px] font-bold text-[white]"
      >
        와인 보러가기
      </Link>
    </motion.div>
  );
};

export default ExploreWineButton;
