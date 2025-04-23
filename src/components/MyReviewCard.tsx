import Rating from "./Rating";
import { Review } from "@/types/myprofileTypes";
import hamburgerIcon from "@/public/icons/ic_hamburger.png";

interface MyReviewCardProps {
  review: Review;
}

export default function MyReviewCard({ review }: MyReviewCardProps) {
  // 시간 계산 로직
  const now = new Date();
  const updateTime = new Date(review.updatedAt);
  const diff = now.getTime() - updateTime.getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  const diffHours = Math.floor(diff / 1000 / 60 / 60);
  const diffDays = Math.floor(diffHours / 24);

  // 시간 표시 문자열 생성
  let timeAgo: string;
  if (diffMinutes < 60) {
    timeAgo = `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    timeAgo = `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    timeAgo = `${diffDays}일 전`;
  } else if (diffDays < 14) {
    timeAgo = "1주 전";
  } else if (diffDays <= 31) {
    timeAgo = "한 달 전";
  } else {
    timeAgo = updateTime.toISOString().split("T")[0].replace(/-/g, ".");
  }

  return (
    <div className="w-[800px] border border-[#cfdbea] rounded-[16px] pt-[24px] pr-[40px] pb-[30px] pl-[40px] mb-[8px]">
      <div className="flex items-center mb-[20px] gap-[15px]">
        <Rating rating={review.rating} />
        <div className="text-[#9facbd]">{timeAgo}</div>
        <img
          src={hamburgerIcon.src}
          alt="더보기버튼"
          className="ml-auto size-[26px]"
        />
      </div>
      <div className="text-[#9facbd] font-medium mb-[10px]">
        {review.wine.name}
      </div>
      <div className="text-[#2D3034]">{review.content}</div>
    </div>
  );
}
