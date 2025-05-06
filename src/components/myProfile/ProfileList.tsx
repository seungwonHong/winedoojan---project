import { Wine, Review } from '@/types/schema';
import SkeletonMyProfile from '@/components/myProfile/skeleton/SkeletonMyProfile';
import images from '../../../public/images/images';
import BlobButton from '@/components/common/BlobButton';
import MyWineCard from '@/components/myProfile/MyWineCard';
import MyReviewCard from './MyReviewCard';

interface ProfileListProps {
  tab: 'reviews' | 'wines';
  isLoading: boolean;
  reviews: Review[];
  wines: Wine[];
  onClickReview: (review: Review) => void;
  onClickWine: (wine: Wine) => void;
  commonCardProps: any;
  ref: (node?: Element | null) => void;
}

export default function ProfileList({
  tab,
  isLoading,
  reviews,
  wines,
  onClickReview,
  onClickWine,
  commonCardProps,
  ref,
}: ProfileListProps) {
  if (isLoading) {
    return (
      <>
        <SkeletonMyProfile />
        <SkeletonMyProfile />
        <SkeletonMyProfile />
      </>
    );
  }

  if (
    (tab === 'reviews' && reviews.length === 0) ||
    (tab === 'wines' && wines.length === 0)
  ) {
    return (
      <div className="lg:w-[800px] lg:h-[530px] flex flex-col gap-[30px] items-center justify-center">
        <img
          src={images.empty}
          alt="등록된 목록 없음"
          className="size-[180px]"
        />
        <div className="font-bold text-2xl text-[#2D3034]">
          등록된 {tab === 'reviews' ? '리뷰가' : '와인이'} 없어요
        </div>
        <BlobButton
          children={tab === 'reviews' ? '리뷰등록하러가기' : '와인등록하러가기'}
          onClick={() => {}}
        />
      </div>
    );
  }

  return (
    <>
      {tab === 'reviews'
        ? reviews.map((review) => (
            <MyReviewCard
              key={review.id}
              id={review.id}
              review={review}
              onClick={() => onClickReview(review)}
              {...commonCardProps}
            />
          ))
        : wines.map((wine) => (
            <MyWineCard
              key={wine.id}
              id={wine.id}
              wine={wine}
              onClick={() => onClickWine(wine)}
              {...commonCardProps}
            />
          ))}
      <div ref={ref} className="h-[1px]" />
    </>
  );
}
