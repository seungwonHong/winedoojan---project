import { useState } from "react";

import { FaStar, FaRegStar } from "react-icons/fa";

import ModalButton from "../common/ModalButton";
import ReviewModal from "../modals/ReviewModal";
import { useAuthStore } from "@/store/authStore";

import emptyReview from "../../../public/images/404-wine.png";

import { WineDetailReviewCardListProps } from "@/types/wineDetailTypes";

const WineDetailRatingCard = ({
  wine,
  refetch,
}: WineDetailReviewCardListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let token = useAuthStore.getState().accessToken;

  const totalReviews = Object.values(wine.avgRatings).reduce(
    (acc, cur) => acc + cur,
    0
  );
  const fullStars = Math.floor(wine.avgRating);
  const emptyStars = 5 - fullStars;

  const handleClose = async () => {
    await refetch();
    setIsModalOpen(false);
  };

  // 리뷰 없을 때
  if (!wine || wine.reviews.length === 0)
    return (
      <div className="flex flex-col justify-center items-center gap-[20px] w-[343px] h-[405px] md:w-[704px] md:h-[442px] lg:w-[800px]">
        <img
          src={emptyReview.src}
          alt="wineImage"
          className="w-[250px] md:w-[300px] md:h-[150px] object-contain"
        />
        <div>작성된 리뷰가 없어요</div>
        <ModalButton
          onClick={() => setIsModalOpen(true)}
          fontSize="text-[14px] md:text-[16px]"
          width="w-[113px]"
          height="h-[42px]"
          className="flex flex-wrap justify-center items-center"
        >
          리뷰 남기기
        </ModalButton>
        {isModalOpen && (
          <ReviewModal
            accessToken={token as string}
            wineName={wine.name}
            wineId={wine.id}
            mode={"create"}
            onClose={handleClose}
          />
        )}
      </div>
    );

  return (
    <div className="mt-[40px] md:flex md:justify-between md:w-[576px] md:mx-auto md:items-center lg:inline-block lg:w-[280px] lg:m-0 lg:absolute lg:top-[-40px] lg:left-[850px]">
      <div className="flex justify-between md:flex-col md:gap-[20px] lg:flex-row">
        <div className="flex gap-[16px]">
          <div className="text-[36px] text-[#2D3034] font-[800] md:text-[54px]">
            {wine.avgRating?.toFixed(1)}
          </div>
          <div className="flex flex-col gap-[5px] justify-center">
            {/* 별 아이콘 */}
            <div className="flex ">
              {Array.from({ length: fullStars }).map((_, index) => (
                <FaStar
                  key={index}
                  className="text-[#830E00] w-[18px] h-[18px]"
                />
              ))}
              {Array.from({ length: emptyStars }).map((_, index) => (
                <FaRegStar
                  key={index}
                  className="text-[#D1D5DB] w-[18px] h-[18px]"
                />
              ))}
            </div>
            <div className="text-[14px] text-[#9FACBD] font-[400]">
              {wine.reviewCount}개의 후기
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <ModalButton
            onClick={() => setIsModalOpen(true)}
            fontSize="text-[14px] md:text-[16px]"
            width="w-[113px]"
            height="h-[42px]"
            className="flex flex-wrap justify-center items-center"
          >
            리뷰 남기기
          </ModalButton>
        </div>
      </div>

      {isModalOpen && (
        <ReviewModal
          accessToken={token as string}
          wineName={wine.name}
          wineId={wine.id}
          mode={"create"}
          onClose={handleClose}
        />
      )}

      {/* 점수별 퍼센트 바 */}
      <div className="mt-[24px] space-y-[8px] lg:mt-[10px]">
        {Object.entries(wine.avgRatings)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([score, count]) => {
            const percent =
              totalReviews === 0 ? 0 : (count / totalReviews) * 100;

            return (
              <div key={score} className="flex items-center">
                <div className="w-[30px] mr-[16px] text-[#8D94A0] font-[700] text-[16px]">
                  {score}점
                </div>
                <div className="relative w-[303px] h-[6px] bg-[#F0F2F5] rounded-[4px] md:w-[241px]">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#830E00] rounded-[4px]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className="hidden lg:block mt-[30px]">
        <ModalButton
          onClick={() => setIsModalOpen(true)}
          fontSize="text-[14px] md:text-[16px]"
          width="w-[113px]"
          height="h-[42px]"
          className="flex flex-wrap justify-center items-center"
        >
          리뷰 남기기
        </ModalButton>
      </div>
    </div>
  );
};

export default WineDetailRatingCard;
