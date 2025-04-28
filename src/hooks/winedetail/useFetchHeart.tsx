import { useState, useEffect } from "react";

import { useAuthStore } from "@/store/authStore";

const useFetchHeart = (itemId: number, initialIsLiked: boolean) => {
  const [isLike, setIsLike] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);

  const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);

  useEffect(() => {
    setIsLike(initialIsLiked);
  }, [initialIsLiked]);

  const handleClickLike = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    let token = useAuthStore.getState().accessToken;

    if (!token) {
      console.error("토큰 없음");

      setIsProcessing(false);

      return;
    }

    const method = isLike ? "DELETE" : "POST";
    try {
      let res = await fetch(
        `https://winereview-api.vercel.app/14-2/reviews/${itemId}/like`,
        {
          method,
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
            `https://winereview-api.vercel.app/14-2/reviews/${itemId}/like`,
            {
              method,
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

      if (res.status === 204) {
        setIsLike((prev) => !prev);
      } else {
        const error = await res.json();
        console.error("좋아요 실패:", error.message);
      }
    } catch (err) {
      console.error("좋아요 요청 중 에러:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return { isLike, handleClickLike };
};

export default useFetchHeart;
