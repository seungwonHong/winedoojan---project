import icons from "../../public/icons/icons";

interface RatingProps {
  rating: number;
}

// 리뷰에 들어가는 별점
export default function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center bg-palepink/50 px-[15px] py-[8px] w-max h-min rounded-[12px] gap-[2px]">
      <img src={icons.ratingStar} className="w-[20px] h-[20px]" />
      <div className="font-bold text-lg text-garnet">{rating.toFixed(1)}</div>
    </div>
  );
}
