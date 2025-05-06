"use client";

import { useState, useEffect } from "react";

import { notFound, useRouter } from "next/navigation";

import useFetchWine from "@/hooks/winedetail/useFetchWine";

import ErrorBoundary from "../common/ErrorBoundary";
import WineDetailCard from "./WineDetailCard";
import WineDetailRatingCard from "./WineDetailRatingCard";
import WineDetailReviewCardList from "./WineDetailReviewCardList";
import ReviewListFilter from "./ReviewListFilter";
import SkeletonWineDetailCard from "./skeleton/SkeletonWineDetailCard";
import SkeletonWineReviewCard from "./skeleton/SkeletonWineReviewCard";

import { Review } from "@/types/wineDetailTypes";

const WineDetail = ({ wineId }: { wineId: string }) => {
  const { wine, loading, error, refetch } = useFetchWine(wineId);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (error === "Access token이 없습니다.") {
      router.push("/signin");
    } else if (error === "와인 정보를 불러오는 데 실패했습니다.") {
      notFound();
    }
  }, [error]);

  useEffect(() => {
    if (wine) {
      setFilteredReviews(wine.reviews);
    }
  }, [wine]);

  if (loading)
    return (
      <>
        <SkeletonWineDetailCard mode="skeleton" />
        <SkeletonWineReviewCard mode="skeleton" />
      </>
    );

  if (error || !wine) return null;

  return (
    <div>
      <ErrorBoundary fallback={<SkeletonWineDetailCard mode="error" />}>
        <WineDetailCard wine={wine} />
      </ErrorBoundary>
      <div
        className={`${
          !wine || wine.reviews.length === 0 ? "" : "lg:w-[800px]"
        } `}
      >
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
        <ErrorBoundary fallback={<SkeletonWineReviewCard mode="error" />}>
          <div className="lg:relative lg:w-[280px]">
            <WineDetailRatingCard wine={wine} refetch={refetch} />
          </div>
          <WineDetailReviewCardList
            wine={{ ...wine, reviews: filteredReviews }}
            refetch={refetch}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default WineDetail;
