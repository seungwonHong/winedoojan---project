"use client";

import { useEffect, useState } from "react";
import WineDetailCard from "./WineDetailCard";
import WineDetailReviewCardList from "./WineDetailReviewCardList";

const WineDetail = ({ wineId }: { wineId: string }) => {
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      await login();
      await fetchWine();
    };
    const fetchWine = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token이 없습니다.");
        }

        const res = await fetch(
          `https://winereview-api.vercel.app/14-2/wines/${wineId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("와인 정보를 불러오지 못했습니다.");
        }

        const data = await res.json();
        setWine(data);
      } catch (err: any) {
        setError(err.message || "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [wineId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!wine) return null;

  return (
    <div>
      <WineDetailCard wine={wine} />
      <div className="lg:w-[800px]">
        <div className="hidden lg:block mt-[60px] text-[20px] text-[#2D3034] font-[700]">
          리뷰 목록
        </div>
        <WineDetailReviewCardList wine={wine} />
      </div>
    </div>
  );
};

export default WineDetail;

interface Wine {
  name: string;
  region: string;
  image: string;
  price: number;
  reviews: any[];
}

//임시 로그인 로직
const login = async () => {
  try {
    const res = await fetch(
      "https://winereview-api.vercel.app/14-2/auth/signIn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "chlrnjswls@naver.com", // ✅ 테스트용 계정 입력
          password: "chlrnjswls",
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "로그인 실패");
    }

    localStorage.setItem("accessToken", data.accessToken);
  } catch (err: any) {
    alert(`로그인 실패: ${err.message}`);
  }
};
