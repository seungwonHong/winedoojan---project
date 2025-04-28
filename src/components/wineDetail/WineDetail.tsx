"use client";

import useFetchWine from "@/hooks/useFetchWine";

import WineDetailCard from "./WineDetailCard";
import WineDetailReviewCardList from "./WineDetailReviewCardList";

const WineDetail = ({ wineId }: { wineId: string }) => {
  const { wine, loading, error } = useFetchWine(wineId);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!wine) return null;

  return (
    <div>
      <WineDetailCard wine={wine} />
      <div className="lg:w-[800px]">
        <div className="hidden lg:block mt-[60px] text-[20px] text-[#2D3034] font-[700]">
          리뷰 목록
        </div>
        <WineDetailReviewCardList wine={wine} />
      </div>
    </div>
  );
};

export default WineDetail;
