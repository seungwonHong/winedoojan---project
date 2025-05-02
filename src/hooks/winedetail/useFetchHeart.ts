import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import handleResponseWithAuth from "@/utils/handleResponseWithAuth";
import { useAuthStore } from "@/store/authStore";

const useFetchHeart = (itemId: number, initialIsLiked: boolean) => {
  const [isLike, setIsLike] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    setIsLike(initialIsLiked);
  }, [initialIsLiked]);

  const handleClickLike = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const wasLiked = isLike;
    const nextLiked = !wasLiked;
    const method = wasLiked ? "DELETE" : "POST";

    setIsLike(nextLiked);

    const rollback = () => {
      setIsLike(wasLiked);
      toast.warning(
        method === "POST"
          ? "하트 누르기에 실패했습니다."
          : "하트 지우기에 실패했습니다."
      );
    };

    if (!token) {
      console.error("토큰 없음");
      setIsProcessing(false);
      setIsLike(wasLiked);
      return;
    }

    try {
      let res = await handleResponseWithAuth(
        `https://winereview-api.vercel.app/14-2/reviews/${itemId}/like`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        toast.success(
          method === "POST" ? "하트를 눌렀습니다." : "하트를 지웠습니다."
        );
      } else {
        try {
          const error = await res.json();
          console.error("좋아요 실패:", error.message);
        } catch {
          console.error("좋아요 실패: 응답 파싱 오류");
        }
        setIsLike(wasLiked);
        rollback();
      }
    } catch (err) {
      console.error("좋아요 요청 중 에러:", err);
      setIsLike(wasLiked);
      rollback();
    } finally {
      setIsProcessing(false);
    }
  };

  return { isLike, handleClickLike };
};

export default useFetchHeart;
