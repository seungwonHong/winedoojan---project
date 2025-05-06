import Rating from '../Rating';
import { Review } from '@/types/schema';
import HamburgerMenu from '../HamburgerMenu';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { MyProfileCard } from './MyProfileCard';
import { motion } from 'framer-motion';

interface MyReviewCardProps {
  id: number;
  review: Review;
  teamId: string | null;
  token: string;
  onSuccess: () => void;
  tab: string;
  openId: number | null;
  setOpenId: (id: number | null) => void;
  onClick: () => void;
  onEdit: (item: Review) => void;
  onDelete: (item: Review) => void;
}

export default function MyReviewCard({ ...props }: MyReviewCardProps) {
  const timeAgo = getTimeAgo(props.review.updatedAt);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="cursor-pointer"
    >
      <MyProfileCard
        pt="pt-[24px]"
        mb="mb-[12px]"
        className="flex-col pb-[30px] text-[14px] md:text-[16px]"
        onClick={props.onClick}
      >
        {/* 평점, 작성 시간 */}
        <div className="flex items-center mb-[17px] lg:mb-[20px] gap-[15px]">
          <Rating rating={props.review.rating} />
          <div className="text-[#9facbd]">{timeAgo}</div>

          <div className="ml-auto">
            <HamburgerMenu
              {...props}
              onEdit={() => props.onEdit(props.review)}
              onDelete={() => props.onDelete(props.review)}
            />
          </div>
        </div>
        {/* 와인 이름 */}
        <div className="text-[#9facbd] font-medium mb-[10px]">
          {props.review.wine.name}
        </div>
        {/* 후기 내용 */}
        <div className="text-[#2D3034]">{props.review.content}</div>
      </MyProfileCard>
    </motion.div>
  );
}
