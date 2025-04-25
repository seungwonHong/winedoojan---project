import Rating from "./Rating";
import { Review } from "@/types/myprofileTypes";
import HamburgerMenu from "./HamburgerMenu";
import { getTimeAgo } from "@/utils/getTimeAgo";

interface MyReviewCardProps {
  review: Review;
  teamId: string;
  token: string | null;
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
  const timeAgo = getTimeAgo(review.updatedAt);

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
