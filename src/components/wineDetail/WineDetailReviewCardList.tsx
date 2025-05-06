import WineDetailReviewCard from "./WineDetailReviewCard";

import { WineDetailReviewCardListProps } from "@/types/wineDetailTypes";

const WineDetailReviewCardList = ({
  wine,
  refetch,
}: WineDetailReviewCardListProps) => {
  return (
    <div className="mb-[200px]">
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
