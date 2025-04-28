"use client";

import MyReviewCard from "@/components/MyReviewCard";
import { fetchReviews, fetchWines } from "../../services/myProfileApi";
import { ReviewsResponse, WinesResponse } from "@/types/myprofileTypes";
import MyProfile from "@/components/MyProfile";
import { useEffect, useState } from "react";
import MyWineCard from "@/components/MyWineCard";
import images from "../../../public/images/images";
import BlobButton from "@/components/common/BlobButton";
import Header from "@/components/common/Header";
import { useAuthStore } from "@/store/authStore";
import LeaveReviewModal from "@/components/modals/leaveReviewModal";
import RegisterWineModal from "@/components/modals/registerWineModal";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [winesData, SetWinesData] = useState<WinesResponse | null>(null);
  const [tab, setTab] = useState<"reviews" | "wines">("reviews");
  const [openId, setOpenId] = useState<number | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWineModalOpen, setIsWineModalOpen] = useState(false);
  const limit = 100;

  // console.log(user?.teamId, reviewsData, winesData);

  // 분리필요
  const loadData = async () => {
    if (!user || !accessToken) return;

    const reviewData = await fetchReviews({
      teamId: user.teamId,
      limit,
      token: accessToken,
    });
    setReviewsData(reviewData);

    const wineData = await fetchWines({
      teamId: user.teamId,
      limit,
      token: accessToken,
    });
    SetWinesData(wineData);
  };

  useEffect(() => {
    if (user && accessToken) {
      loadData();
    }
  }, [user, accessToken]);

  if (!user || !reviewsData || !winesData) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-[40px]">
      <Header />
      <div className="w-max flex justify-start m-auto gap-[60px]">
        <MyProfile user={user} token={accessToken} />
        <div>
          <div
            className={`flex gap-[32px] items-center ${
              tab === "reviews" ? "mb-[22px]" : "mb-[64px]"
            }`}
          >
            <button
              onClick={() => setTab("reviews")}
              className={`w-max h-[32px] font-bold text-xl ${
                tab === "reviews" ? "text-[#2D3034]" : "text-[#9FACBD]"
              }`}
            >
              내가 쓴 후기
            </button>
            <button
              onClick={() => setTab("wines")}
              className={`w-max h-[32px] font-bold text-xl ${
                tab === "wines" ? "text-[#2D3034]" : "text-[#9FACBD]"
              }`}
            >
              내가 등록한 와인
            </button>
            <div className="ml-auto text-sm text-garnet">
              총&nbsp;
              {tab === "reviews"
                ? reviewsData.totalCount
                : winesData.totalCount}
              개
            </div>
          </div>
          <div>
            {(tab === "reviews" && reviewsData.totalCount === 0) ||
            (tab === "wines" && winesData.totalCount === 0) ? (
              <div className="w-[800px] h-[530px] flex flex-col gap-[30px] items-center justify-center">
                <img
                  src={images.empty}
                  alt="등록된 리뷰/와인 없음"
                  className="size-[180px]"
                />
                <div className="font-bold text-2xl text-[#2D3034]">
                  등록된 {tab === "reviews" ? "리뷰가" : "와인이"} 없어요
                </div>
                <BlobButton
                  children={
                    tab === "reviews" ? "리뷰등록하러가기" : "와인등록하러가기"
                  }
                  onClick={
                    tab === "reviews"
                      ? () => setIsReviewModalOpen(true)
                      : () => setIsWineModalOpen(true)
                  }
                />
              </div>
            ) : null}
            <div>
              {tab === "reviews"
                ? reviewsData.list.map((review) => (
                    <MyReviewCard
                      key={review.id}
                      review={review}
                      teamId={user.teamId}
                      token={accessToken}
                      onDeleteSuccess={loadData}
                      tab={tab}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  ))
                : winesData.list.map((wine) => (
                    <MyWineCard
                      key={wine.id}
                      wine={wine}
                      teamId={user.teamId}
                      token={accessToken}
                      onDeleteSuccess={loadData}
                      tab={tab}
                      openId={openId}
                      setOpenId={setOpenId}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
      {isReviewModalOpen && (
        <LeaveReviewModal
          onClose={() => setIsReviewModalOpen(false)}
          wineName="임시 와인 이름"
          wineImage=""
          wineId={1}
        />
      )}

      {isWineModalOpen && (
        <RegisterWineModal onClose={() => setIsReviewModalOpen(false)} />
      )}
    </div>
  );
}
