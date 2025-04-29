import { FaStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
}

// 리뷰에 들어가는 별점
export default function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center bg-mistyrose px-[10px] py-[6px] md:px-[15px] md:py-[8px] w-max h-min rounded-[12px] gap-[3px]">
      <FaStar className="text-burgundy size-[11px] md:size-[16px]" />
      <div className="font-bold text-sm md:text-lg text-burgundy ">
        {rating.toFixed(1)}
      </div>
    </div>
  );
}
