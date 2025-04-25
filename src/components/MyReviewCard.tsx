import Rating from "./Rating";
import { Review } from "@/types/myprofileTypes";
import icons from "../../public/icons/icons";
import HamburgerMenu from "./HamburgerMenu";

interface MyReviewCardProps {
  review: Review;
  teamId: string;
  token: string;
  onDeleteSuccess: () => void;
  tab: string;
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

export default function MyReviewCard({
  review,
  teamId,
  token,
  onDeleteSuccess,
  openId,
  setOpenId,
  tab,
}: MyReviewCardProps) {
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

        <div className="ml-auto">
          <HamburgerMenu
            teamId={teamId}
            id={review.id}
            token={token}
            tab={tab}
            onDeleteSuccess={onDeleteSuccess}
            openId={openId}
            setOpenId={setOpenId}
          />
        </div>
      </div>
      <div className="text-[#9facbd] font-medium mb-[10px]">
        {review.wine.name}
      </div>
      <div className="text-[#2D3034]">{review.content}</div>
    </div>
  );
}
