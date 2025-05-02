import { FiFilter } from "react-icons/fi";

import winegif from "../../../../public/images/winegif.gif";

const SkeletonWineReviewCard = () => {
  return (
    <div>
      <div className="flex items-center justify-between lg:w-[800px]">
        {/* 리뷰 목록 상단 헤더 */}
        <div className="lg:relative lg:w-[280px] mt-[60.5px] md:mt-[65px] lg:mt-[68px] text-[20px] text-[#2D3034] font-[700]">
          리뷰 목록
        </div>
        <div className="relative mt-[55px] md:mt-[70.5px] lg:mt-[77.5px] right-[8px]">
          <FiFilter size={20} color="gray" />
        </div>
      </div>

      {/* 모바일 태블릿 기준 리뷰, 평점 카드 */}
      <div className="block lg:hidden">
        <div className="mt-[30px] w-[345px] md:w-[704px] h-[250px] md:h-[200px] border border-[#CFDBEA] flex justify-center items-center rounded-[12px]">
          <img
            src={winegif.src}
            alt="wine card data loading..."
            className="w-[300px] h-[150px] rounded-[150px] object-contain"
          />
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="mt-[12px] w-[343px] h-[446px] md:w-[704px] md:h-[532px] border border-[#CFDBEA] flex justify-center items-center rounded-[12px]">
          <img
            src={winegif.src}
            alt="wine card data loading..."
            className="w-[300px] h-[150px] rounded-[150px] object-contain"
          />
        </div>
      </div>

      {/* 피씨 기준 리뷰, 평점 카드 */}
      <div className="relative hidden lg:block">
        <div className="w-[800px] h-[452px] border border-[#CFDBEA] mt-[28px] rounded-[16px] flex justify-center items-center">
          <div className="w-[800px] flex flex-col justify-center items-center">
            <img
              src={winegif.src}
              alt="wine card data loading..."
              className="w-[300px] h-[150px] rounded-[150px] object-contain"
            />
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="w-[310px] h-[315px] absolute bottom-[190px] left-[830px] border border-[#CFDBEA] flex justify-center items-center rounded-[12px]">
            <img
              src={winegif.src}
              alt="wine card data loading..."
              className="w-[300px] h-[150px] rounded-[150px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonWineReviewCard;
