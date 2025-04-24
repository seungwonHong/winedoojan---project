"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Wine {
  name: string;
  region: string;
  image: string;
  price: number;
}

const WineDetailCard = ({ wineId }: { wineId: string }) => {
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
    <div className="flex w-[343px] h-[190px] rounded-[12px] mt-[29px] border border-[#CFDBEA] relative md:w-[704px] md:h-[260px] md:mt-[62px] xl:w-[1140px]">
      <div className="object-cover w-[58px] h-[209px] relative bottom-[19px] ml-[20px] z-1 md:w-[84px] md:h-[302px] md:bottom-[42px] md:ml-[60px] xl:w-[58px] xl:h-[209px] xl:top-[50px]">
        <Image src={wine.image} alt={wine.name} fill className="object-cover" />
      </div>

      <div className="w-[200px] flex flex-col justify-center gap-[15px] ml-[20px] md:ml-[60px] md:gap-[20px] md:w-[300px] xl:w-[400px]">
        <div className="font-[600] text-[20px] text-[#2D3034] md:text-[30px] break-keep ">
          {wine.name}
        </div>
        <div className="flex flex-col gap-[4.5px] md:gap-[13px]">
          <div className="font-[400] text-[14px] text-[#9FACBD] md:text-[16px]">
            {wine.region}
          </div>
          <div className="w-[86px] h-[36px] flex justify-center items-center rounded-[10px] font-[700] text-[14px] text-[#830E00] bg-[#ffe9e6] md:text-[18px] md:w-[114px] md:h-[37px]">
            ₩ {wine.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDetailCard;

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
