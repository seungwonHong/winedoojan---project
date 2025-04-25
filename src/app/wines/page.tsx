import Header from "@/components/common/Header";
import WineListRecWine from "@/components/WineListRecWine";
import React from "react";

interface Props {}

const page = (props: Props) => {
  return (
    <div className="flex flex-col items-center lg:px-[390px] lg:pt-[24px] lg:pb-[109px] md:px-[20px] md:pt-[24px] md:pb-[72px] px-[16px] pt-[16px] pb-[62px]">
      <Header />

      <WineListRecWine />
    </div>
  );
};

export default page;
