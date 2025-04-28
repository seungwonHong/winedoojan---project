"use client";
import Header from "@/components/common/Header";
import SearchOptions from "@/components/SearchOptions";
import SearchWine from "@/components/SearchWine";
import WineCardBig from "@/components/WineCardBig";
import WineListRecWine from "@/components/WineListRecWine";
import useWineListWines from "@/hooks/useWineListWines";
import useWineRecommended from "@/hooks/useWineRecommended";
import { IoOptions } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import WineCardBigSkeleton from "@/components/WineCardBigSkeleton";
import { useRef } from "react";
import LoadingAnimation from "@/components/common/LoadingAnimation";

const page = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const { wines } = useWineRecommended();
  const { allWines, loading } = useWineListWines({ limit: 2 });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center lg:px-[390px] lg:pt-[24px] lg:pb-[109px] md:px-[20px] md:pt-[24px] md:pb-[72px] px-[16px] pt-[16px] pb-[62px]">
      <Header />

      <WineListRecWine wines={wines} />

      <div className="flex flex-row w-full justify-center">
        <div className="lg:mt-[150px]  md:mt-[40px] mt-[24px]">
          {isDesktop ? (
            <SearchOptions />
          ) : (
            <div className="flex flex-row items-center justify-center lg:w-[48px] md:h-[48px] w-[36px] h-[36px]  md:w-[48px] lg:h-[48px] border-[1px] border-[#CFDBEA] rounded-lg ">
              <IoOptions size={19.5} className="cursor-pointer" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center lg:mt-[40px] md:mt-[40px] mt-[24px] lg:ml-auto md:ml-[60px] ml-[10px]">
          <SearchWine />
          {allWines?.length > 0 ? (
            <>
              {allWines.map((allwine) => (
                <WineCardBig key={allwine.id} wine={allwine} />
              ))}
              {loading && <LoadingAnimation />}
            </>
          ) : (
            Array.from({ length: 10 }).map((_, index) => (
              <WineCardBigSkeleton key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
