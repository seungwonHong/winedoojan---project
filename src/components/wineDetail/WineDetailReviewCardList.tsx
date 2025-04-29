import WineDetailReviewCard from "./WineDetailReviewCard";

import { Review } from "@/types/wineDetailTypes";

<<<<<<< HEAD
const WineDetailReviewCardList = ({
  wine,
  refetch,
}: WineDetailReviewCardListProps) => {
  return (
    <>
      {wine.reviews.map((item) => (
        <WineDetailReviewCard
          key={item.id}
          item={item}
          wine={wine}
          refetch={refetch}
        />
=======
const WineDetailReviewCardList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="mb-[300px]">
      {reviews.map((item) => (
        <WineDetailReviewCard key={item.id} item={item} />
>>>>>>> d71f241 (리뷰 필터 기능 구현)
      ))}
    </div>
  );
};

export default WineDetailReviewCardList;

interface WineDetailReviewCardListProps {
  wine: Wine;
  refetch: () => Promise<void>; // ✅ 추가
}
