'use client';

import MyReviewCard from '@/components/MyReviewCard';
import { fetchReviews, fetchWines } from '../../services/myProfileApi';
import { Wine, Review } from '@/types/myprofileTypes';
import MyProfile from '@/components/MyProfile';
import { useEffect, useState } from 'react';
import MyWineCard from '@/components/MyWineCard';
import images from '../../../public/images/images';
import BlobButton from '@/components/common/BlobButton';
import Header from '@/components/common/Header';
import { useAuthStore } from '@/store/authStore';
import RegisterWineModal from '@/components/modals/WineModal';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [tab, setTab] = useState<'reviews' | 'wines'>('reviews');
  const [openId, setOpenId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCursor, setReviewCursor] = useState<number | null>(null);
  const [wines, setWines] = useState<Wine[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [wineCursor, setWineCursor] = useState<number | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWineModalOpen, setIsWineModalOpen] = useState(false);
  const { ref, inView } = useInView();
  const limit = 3;

  // 리뷰 초기 로딩
  const loadReview = async () => {
    if (!user || !accessToken) return;

    try {
      const res = await fetchReviews({
        teamId: user.teamId,
        limit,
        token: accessToken,
      });
      setReviews(res.list);
      setReviewCursor(res.nextCursor ?? null);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error('리뷰 초기 로딩 실패', error);
    }
  };

  // 리뷰 추가 로딩
  const loadMoreReview = async () => {
    if (!user || !accessToken || reviewCursor === null) return;

    try {
      const res = await fetchReviews({
        teamId: user.teamId,
        limit,
        cursor: reviewCursor,
        token: accessToken,
      });
      setReviews((prev) => [...prev, ...res.list]);
      setReviewCursor(res.nextCursor ?? null);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error('리뷰 추가 로딩 실패', error);
    }
  };

  // 와인 초기 로딩
  const loadWine = async () => {
    if (!user || !accessToken) return;

    try {
      const res = await fetchWines({
        teamId: user.teamId,
        limit,
        token: accessToken,
      });
      setWines(res.list);
      setWineCursor(res.nextCursor ?? null);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error('와인 초기 로딩 실패', error);
    }
  };

  // 와인 추가 로딩
  const loadMoreWine = async () => {
    if (!user || !accessToken || wineCursor === null) return;

    try {
      const res = await fetchWines({
        teamId: user.teamId,
        limit,
        cursor: wineCursor,
        token: accessToken,
      });
      setWines((prev) => [...prev, ...res.list]);
      setWineCursor(res.nextCursor ?? null);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error('와인 추가 로딩 실패', error);
    }
  };

  // 초기 로딩
  useEffect(() => {
    if (user && accessToken) {
      if (tab === 'reviews') {
        setReviews([]);
        setReviewCursor(null);
        loadReview();
      } else {
        setWines([]);
        setWineCursor(null);
        loadWine();
      }
    }
  }, [user, accessToken, tab]);

  // 스크롤 시 추가 로딩
  useEffect(() => {
    if (inView) {
      if (tab === 'reviews') {
        loadMoreReview();
      } else {
        loadMoreWine();
      }
    }
  }, [inView, tab]);

  // 등록된 리뷰 없을 때 버튼 클릭 함수
  useEffect(() => {
    if (isReviewModalOpen) {
      router.push('/wines');
    }
  }, [isReviewModalOpen]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  // 리뷰카드, 와인카드에 넘겨줄 props
  const commonCardProps = {
    teamId: user.teamId,
    token: accessToken,
    onDeleteSuccess: tab === 'reviews' ? loadReview : loadWine,
    tab,
    openId,
    setOpenId,
  };

  return (
    <div className="flex flex-col items-center mt-[40px]">
      <Header />

      <div className="w-max flex justify-start m-auto gap-[60px] lg:flex-row md:flex-col">
        <MyProfile user={user} token={accessToken} />

        <div>
          {/* 탭 */}
          <div
            className={`flex gap-[32px] items-center ${
              tab === 'reviews' ? 'mb-[22px]' : 'mb-[64px]'
            }`}
          >
            <button
              onClick={() => setTab('reviews')}
              className={`w-max h-[32px] font-bold text-xl ${
                tab === 'reviews' ? 'text-[#2D3034]' : 'text-[#9FACBD]'
              }`}
            >
              내가 쓴 후기
            </button>
            <button
              onClick={() => setTab('wines')}
              className={`w-max h-[32px] font-bold text-xl ${
                tab === 'wines' ? 'text-[#2D3034]' : 'text-[#9FACBD]'
              }`}
            >
              내가 등록한 와인
            </button>

            <div className="ml-auto text-sm text-garnet">
              총&nbsp;{totalCount}개
            </div>
          </div>

          {/* 목록 */}
          <div>
            {(tab === 'reviews' && reviews.length === 0) ||
            (tab === 'wines' && wines.length === 0) ? (
              <div className="w-[800px] h-[530px] flex flex-col gap-[30px] items-center justify-center">
                <img
                  src={images.empty}
                  alt="등록된 없음"
                  className="size-[180px]"
                />
                <div className="font-bold text-2xl text-[#2D3034]">
                  등록된 {tab === 'reviews' ? '리뷰가' : '와인이'} 없어요
                </div>
                <BlobButton
                  children={
                    tab === 'reviews' ? '리뷰등록하러가기' : '와인등록하러가기'
                  }
                  onClick={() => {
                    if (tab === 'reviews') {
                      setIsReviewModalOpen(true);
                    } else {
                      setIsWineModalOpen(true);
                    }
                  }}
                />
              </div>
            ) : (
              <>
                {tab === 'reviews'
                  ? reviews.map((review) => (
                      <MyReviewCard
                        key={review.id}
                        id={review.id}
                        review={review}
                        {...commonCardProps}
                      />
                    ))
                  : wines.map((wine) => (
                      <MyWineCard
                        key={wine.id}
                        id={wine.id}
                        wine={wine}
                        {...commonCardProps}
                      />
                    ))}

                {/* 스크롤 감지용 */}
                <div ref={ref} className="h-[1px]" />
              </>
            )}
          </div>
        </div>
      </div>
      {/* 등록된 와인이 없을 경우 */}
      {isWineModalOpen && (
        <RegisterWineModal onClose={() => setIsWineModalOpen(false)} />
      )}
    </div>
  );
}
