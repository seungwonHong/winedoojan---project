import WineDetailReviewCard from "./WineDetailReviewCard";

import { Wine } from "@/types/wineDetailTypes";

const WineDetailReviewCardList = ({ wine }: { wine: Wine }) => {
  return (
    <>
      {wine.reviews.map((item) => (
        <WineDetailReviewCard key={item.id} item={item} />
      ))}
    </>
  );
};

export default WineDetailReviewCardList;
