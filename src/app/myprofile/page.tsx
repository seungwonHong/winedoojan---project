'use client';

import MyReviewCard from '@/components/MyReviewCard';
import { fetchReviews, fetchWines } from '../../services/myProfileApi';
import { Wine, Review } from '@/types/schema';
import MyProfile from '@/components/MyProfile';
import { useEffect, useState } from 'react';
import MyWineCard from '@/components/MyWineCard';
import images from '../../../public/images/images';
import BlobButton from '@/components/common/BlobButton';
import Header from '@/components/common/Header';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import WineModal from '@/components/modals/WineModal';
import Image from 'next/image';
import clsx from 'clsx';

const MyCardSkeleton = () => (
  <div className="w-[343px] lg:w-[800px] md:w-[704px] flex flex-row gap-[16px] rounded-xl border border-gray-200 bg-white p-12 shadow-sm animate-pulse mb-2.5">
    <div className="w-2/5 h-[160px] bg-gray-100 rounded-md mb-4" />
    <div className="w-3/5">
      <div className="w-1/3 h-[32px] bg-gray-200 rounded mb-2" />
      <div className="h-[24px] bg-gray-100 rounded mb-1" />
      <div className="h-[24px] bg-gray-100 rounded mb-1" />
      <div className="h-[24px] bg-gray-100 rounded mb-1" />
    </div>
  </div>
);

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [tab, setTab] = useState<'reviews' | 'wines'>('reviews');
  const [openId, setOpenId] = useState<number | null>(null); // 햄버거 버튼 열기/닫기를 위한 상태
  const [myProfileData, setMyProfileData] = useState({
    reviews: [] as Review[],
    reviewCursor: null as number | null,
    wines: [] as Wine[],
    wineCursor: null as number | null,
    totalCount: 0,
    updatedAt: null as string | null,
  });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWineModalOpen, setIsWineModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const limit = 3;

  // 리뷰/와인 목록 가져오기
  const getList = async (tab: 'reviews' | 'wines', isLoadMore = false) => {
    if (!user || !accessToken) return;

    const cursorKey = tab === 'reviews' ? 'reviewCursor' : 'wineCursor';
    const cursor = isLoadMore ? myProfileData[cursorKey] : undefined;
    const listKey = tab;

    if (isLoadMore && cursor === null) return;

    const res =
      tab === 'reviews'
        ? await fetchReviews({
            teamId: user.teamId,
            limit,
            token: accessToken,
            cursor,
          })
        : await fetchWines({
            teamId: user.teamId,
            limit,
            token: accessToken,
            cursor,
          });

    setMyProfileData((prev) => {
      const newList = isLoadMore ? [...prev[listKey], ...res.list] : res.list;

      newList.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      return {
        ...prev,
        [listKey]: newList,
        [cursorKey]: res.nextCursor ?? null,
        totalCount: res.totalCount,
      };
    });
  };

  const loadData = async (tab: 'reviews' | 'wines', isLoadMore = false) => {
    // skeleton ui 보여주기
    if (!isLoadMore) setIsLoading(true);
    await getList(tab, isLoadMore);
    if (!isLoadMore) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  // 초기 로딩
  useEffect(() => {
    if (user && accessToken) {
      setMyProfileData((prev) => ({
        ...prev,
        reviews: [],
        reviewCursor: null,
        wines: [],
        wineCursor: null,
        totalCount: 0,
      }));
      loadData(tab);
    }
  }, [user, accessToken, tab]);

  // 스크롤 시 추가 로딩
  useEffect(() => {
    loadData(tab, true);
  }, [inView, tab]);

  // 등록된 리뷰 없을 때 버튼 클릭 함수
  useEffect(() => {
    if (isReviewModalOpen) {
      router.push('/wines');
    }
  }, [isReviewModalOpen]);

  useEffect(() => {
    loadData(tab);
  }, [myProfileData.updatedAt]);

  if (!user || !accessToken) {
    return (
      <div className="flex flex-col gap-[8px] justify-center items-center h-screen text-lg font-bold text-burgundy">
        <Image
          className="max-md:w-28"
          src={images.wineGif}
          alt="로딩중..."
          width={200}
          height={100}
        />
        로딩 중...
      </div>
    );
  }

  // 리뷰카드, 와인카드에 넘겨줄 props
  const commonCardProps = {
    teamId: user.teamId,
    token: accessToken,
    onSuccess: () => loadData(tab),
    tab,
    openId,
    setOpenId,
  };

  return (
    <div className="w-max mx-auto mt-5 md:mt-10">
      <Header />

      <div
        className={clsx(
          'flex justify-start gap-[30px] md:gap-10 lg:gap-[60px] flex-col mx-auto w-[343px] mt-5 lg:mt-[37px]',
          'lg:flex-row lg:w-[1140px] md:w-[704px]'
        )}
      >
        {/* 프로필 이미지, 닉네임*/}
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
              className={`w-max h-[32px] font-bold text-lg md:text-xl  ${
                tab === 'reviews' ? 'text-[#2D3034]' : 'text-[#9FACBD]'
              }`}
            >
              내가 쓴 후기
            </button>
            <button
              onClick={() => setTab('wines')}
              className={`w-max h-[32px] font-bold text-lg md:text-xl ${
                tab === 'wines' ? 'text-[#2D3034]' : 'text-[#9FACBD]'
              }`}
            >
              내가 등록한 와인
            </button>

            <div className="ml-auto text-sm text-burgundy">
              총&nbsp;{myProfileData.totalCount}개
            </div>
          </div>

          {/* 목록 */}
          <div>
            {/* 로딩중 : skeleton UI 표시 */}
            {isLoading ? (
              <>
                <MyCardSkeleton />
                <MyCardSkeleton />
                <MyCardSkeleton />
              </>
            ) : (tab === 'reviews' && myProfileData.reviews.length === 0) ||
              (tab === 'wines' && myProfileData.wines.length === 0) ? (
              // {/* 데이터 없을 때 : 이미지 + 버튼 */}
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
              //{/* 데이터 있을 때 : 와인/리뷰 카드 */}
              <>
                {tab === 'reviews'
                  ? myProfileData.reviews.map((review) => (
                      <MyReviewCard
                        key={review.id}
                        id={review.id}
                        review={review}
                        onClick={() => {
                          router.push(`/wines/${review.wine.id}`);
                        }}
                        {...commonCardProps}
                      />
                    ))
                  : myProfileData.wines.map((wine) => (
                      <MyWineCard
                        key={wine.id}
                        id={wine.id}
                        wine={wine}
                        onClick={() => {
                          router.push(`/wines/${wine.id}`);
                        }}
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
        <WineModal
          onClose={() => setIsWineModalOpen(false)}
          accessToken={accessToken}
          mode="create"
        />
      )}
    </div>
  );
}
