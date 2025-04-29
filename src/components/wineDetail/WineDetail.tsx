"use client";

import { useState, useEffect } from "react";

import useFetchWine from "@/hooks/winedetail/useFetchWine";

import WineDetailCard from "./WineDetailCard";
import WineDetailRatingCard from "./WineDetailRatingCard";
import WineDetailReviewCardList from "./WineDetailReviewCardList";
import ReviewListFilter from "./ReviewListFilter";

import { Review } from "@/types/wineDetailTypes";

import { Wine } from "@/types/wineDetailTypes";

const WineDetail = ({ wineId }: { wineId: string }) => {
  const { wine, loading, error, refetch } = useFetchWine(wineId);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  console.log(wine);

  useEffect(() => {
    if (wine) {
      setFilteredReviews(wine.reviews);
    }
  }, [wine]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!wine) return null;

  return (
    <div>
      <WineDetailCard wine={wine} />
      <div className="lg:w-[800px]">
        <div className="flex justify-between items-center">
          <div className="mt-[60px] text-[20px] text-[#2D3034] font-[700]">
            리뷰 목록
          </div>
          <div className="mt-[55px] md:mt-[65px] lg:mt-[70px]">
            <ReviewListFilter
              reviews={wine.reviews}
              onSort={setFilteredReviews}
            />
          </div>
        </div>
        <div className="lg:relative lg:w-[280px]">
          <WineDetailRatingCard wine={wine} refetch={refetch} />
        </div>
        <WineDetailReviewCardList wine={wine} refetch={refetch} />
      </div>
    </div>
  );
};

export default WineDetail;
