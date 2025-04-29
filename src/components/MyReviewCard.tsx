import Rating from "./Rating";
import { Review } from "@/types/myprofileTypes";
import HamburgerMenu from "./HamburgerMenu";
import { getTimeAgo } from "@/utils/getTimeAgo";
import { MyProfileCard } from "./MyProfileCard";

interface MyReviewCardProps {
  id: number;
  review: Review;
  teamId: string | null;
  token: string | null;
  onDeleteSuccess: () => void;
  tab: string;
  openId: number | null;
  setOpenId: (id: number | null) => void;
}

export default function MyReviewCard({ ...props }: MyReviewCardProps) {
  const timeAgo = getTimeAgo(props.review.updatedAt);

  return (
    <MyProfileCard pt="pt-[24px]" mb="mb-[8px]" className="flex-col pb-[30px]">
      {/* 평점, 작성 시간 */}
      <div className="flex items-center mb-[20px] gap-[15px]">
        <Rating rating={props.review.rating} />
        <div className="text-[#9facbd]">{timeAgo}</div>

        <div className="ml-auto">
          <HamburgerMenu {...props} />
        </div>
      </div>
      {/* 와인 이름 */}
      <div className="text-[#9facbd] font-medium mb-[10px]">
        {props.review.wine.name}
      </div>
      {/* 후기 내용 */}
      <div className="text-[#2D3034]">{props.review.content}</div>
    </MyProfileCard>
  );
}
