import WineDetailReviewCard from "./WineDetailReviewCard";

import { Wine } from "@/types/wineDetailTypes";

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
      ))}
    </>
  );
};

export default WineDetailReviewCardList;

interface WineDetailReviewCardListProps {
  wine: Wine;
  refetch: () => Promise<void>; // ✅ 추가
}
