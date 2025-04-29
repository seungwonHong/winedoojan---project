import WineDetailReviewCard from "./WineDetailReviewCard";

import { Review } from "@/types/wineDetailTypes";

const WineDetailReviewCardList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="mb-[300px]">
      {reviews.map((item) => (
        <WineDetailReviewCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WineDetailReviewCardList;
