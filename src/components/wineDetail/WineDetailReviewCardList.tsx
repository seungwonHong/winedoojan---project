import WineDetailReviewCard from "./WineDetailReviewCard";

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

interface Wine {
  name: string;
  region: string;
  image: string;
  price: number;
  reviews: any[];
}
