"use client";

import MyReviewCard from "@/components/MyReviewCard";
import {
  fetchReviews,
  fetchLogin,
  fetchWines,
} from "../../services/myProfileApi";
import { ReviewsResponse, WinesResponse, User } from "@/types/myprofileTypes";
import MyProfile from "@/components/MyProfile";
import { useEffect, useState } from "react";
import MyWineCard from "@/components/MyWineCard";
import images from "../../../public/images/images";
import BlobButton from "@/components/common/BlobButton";
import Header from "@/components/common/Header";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [reviewsData, setReviewsData] = useState<ReviewsResponse | null>(null);
  const [winesData, SetWinesData] = useState<WinesResponse | null>(null);
  const [tab, setTab] = useState<"reviews" | "wines">("reviews");
  const [token, setToken] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const limit = 100;
  const teamId = "14-2";

  // 분리필요
  const loadData = async () => {
    const loginData = await fetchLogin(teamId);
    setUser(loginData.user);
    setToken(loginData.accessToken);

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

  useEffect(() => {
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
    <div className="flex flex-col items-center mt-[40px]">
      <Header />
      <div className="w-max flex justify-start m-auto gap-[60px]">
        <MyProfile user={user} token={token} loadData={loadData} />
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
                      token={token}
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
                      token={token}
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
    </div>
  );
}
