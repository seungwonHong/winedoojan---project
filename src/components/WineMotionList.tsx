"use client";
import { motion } from "framer-motion";
import WineCardSmall from "@/components/common/WineCardSmall";
import { useEffect, useState } from "react";

interface Props {
  wines: any[];
}

export default function WineMotionList({ wines }: Props) {
  const centerIndex = Math.floor(wines.length / 2);
  const maxOffset = centerIndex;
  const [spacing, setSpacing] = useState(180);

  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth;
      if (width >= 768 && width <= 1024) {
        setSpacing(120);
      } else {
        setSpacing(180);
      }
    }
    updateSpacing();
    window.addEventListener("resize", updateSpacing);

    return () => window.removeEventListener("resize", updateSpacing);
  },[spacing])

  return (
    <div className="relative flex flex-row items-end justify-center">
      {wines.map((wine, index) => {
        const offset = index - centerIndex;
        return (
          <motion.div
            className="absolute lg:top-[120px] md:top-[85px] top-[110px]"
            key={wine.id}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: offset * spacing,
              y: -(maxOffset - Math.abs(offset)) * 20,
              zIndex: wines.length - Math.abs(offset),
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <WineCardSmall wine={wine} />
          </motion.div>
        );
      })}
    </div>
  );
}
