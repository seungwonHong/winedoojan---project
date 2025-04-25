'use client';

import MyReviewCard from '@/components/MyReviewCard';
import { fetchReviews, fetchLogin, fetchWines } from '../lib/api';
import { ReviewsResponse, WinesResponse } from '@/types/myprofileTypes';
import MyProfile from '@/components/MyProfile';
import { useEffect, useState } from 'react';
import MyWineCard from '@/components/MyWineCard';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [winesData, SetWinesData] = useState<WinesResponse | null>(null);
  const [tab, setTab] = useState<'reviews' | 'wines'>('reviews');
  const [error, setError] = useState<string | null>(null);
  const limit = 100;
  const teamId = '14-2';

  useEffect(() => {
    const loadData = async () => {
      // 임시 로그인 데이터
      const loginData = await fetchLogin(teamId);
      setUser(loginData.user);

      // 리뷰 데이터
      const reviewData = await fetchReviews({
        teamId: loginData.user.teamId,
        limit,
        token: loginData.accessToken,
      });
      setReviewsData(reviewData);

      const wineData = await fetchWines({
        teamId: loginData.user.teamId,
        limit,
        token: loginData.accessToken,
      });
      SetWinesData(wineData);
    };

    loadData();
  }, []);

  if (!user || !reviewsData || !winesData) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="w-max flex justify-start m-auto gap-[60px] mt-[37px]">
      <MyProfile user={user} />
      <div>
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
            총&nbsp;
            {tab === 'reviews' ? reviewsData.totalCount : winesData.totalCount}
            개
          </div>
        </div>
        <div>
          <div>
            {tab === 'reviews'
              ? reviewsData.list.map((review) => (
                  <MyReviewCard key={review.id} review={review} />
                ))
              : winesData.list.map((wine) => (
                  <MyWineCard key={wine.id} wine={wine} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
