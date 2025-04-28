import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";

import { Wine } from "../types/wineDetailTypes";

const useFetchWine = (wineId: string) => {
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);

  useEffect(() => {
    const fetchWine = async () => {
      try {
        let token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token이 없습니다.");
        }

        let res = await fetch(
          `https://winereview-api.vercel.app/14-2/wines/${wineId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 401) {
          const success = await refreshAccessToken();
          if (success) {
            token = useAuthStore.getState().accessToken;
            res = await fetch(
              `https://winereview-api.vercel.app/14-2/wines/${wineId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
          } else {
            throw new Error("토큰 갱신 실패");
          }
        }

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

    fetchWine();
  }, [wineId]);

  return { wine, loading, error };
};

export default useFetchWine;
