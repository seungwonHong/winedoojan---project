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

    const wasLiked = isLike; // ✅ 클릭 전 상태 백업
    const nextLiked = !wasLiked; // ✅ optimistic 상태로 UI 먼저 반영
    const method = wasLiked ? "DELETE" : "POST"; // ✅ 요청 방식 결정

    setIsLike(nextLiked); // 낙관적 업데이트

    let token = useAuthStore.getState().accessToken;
    if (!token) {
      console.error("토큰 없음");
      setIsProcessing(false);
      setIsLike(wasLiked); // 롤백
      return;
    }

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

      // ❌ 실패한 경우 롤백
      if (!res.ok) {
        try {
          const error = await res.json();
          console.error("좋아요 실패:", error.message);
        } catch {
          console.error("좋아요 실패: 응답 파싱 오류");
        }
        setIsLike(wasLiked); // 상태 되돌리기
      }
    } catch (err) {
      console.error("좋아요 요청 중 에러:", err);
      setIsLike(wasLiked); // 상태 되돌리기
    } finally {
      setIsProcessing(false);
    }
  };

  return { isLike, handleClickLike };
};

export default useFetchHeart;
