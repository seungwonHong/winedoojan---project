import WineDetailReviewCard from "./WineDetailReviewCard";

import { Review } from "@/types/wineDetailTypes";

const WineDetailReviewCardList = ({
  wine,
  refetch,
}: WineDetailReviewCardListProps) => {
  return (
    <div>
      {wine.reviews.map((item) => (
        <WineDetailReviewCard
          key={item.id}
          item={item}
          wine={wine}
          refetch={refetch}
        />
      ))}
    </div>
  );
};

export default WineDetailReviewCardList;

interface WineDetailReviewCardListProps {
  wine: Wine;
  refetch: () => Promise<void>; // ✅ 추가
}
