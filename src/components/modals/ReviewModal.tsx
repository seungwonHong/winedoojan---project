"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/rangeSlider.css";
import ModalButton from "@/components/common/ModalButton";
import ReviewSlider from "@/components/common/ReviewSlider";
import handleResponseWithAuth from "@/utils/handleResponseWithAuth";
import type { Review } from "@/types/schema";

type Props = {
  onClose: () => void;
  accessToken: string;
  wineName: string;
  wineId: number;
  mode: "create" | "edit"; // post | patch
  existingReviewData?: Review;
};

export const AROMA_MAP: Record<string, string> = {
  체리: "CHERRY",
  베리: "BERRY",
  오크: "OAK",
  바닐라: "VANILLA",
  후추: "PEPPER",
  제빵: "BAKING",
  풀: "GRASS",
  사과: "APPLE",
  복숭아: "PEACH",
  시트러스: "CITRUS",
  트로피컬: "TROPICAL",
  미네랄: "MINERAL",
  꽃: "FLOWER",
  담뱃잎: "TOBACCO",
  흙: "EARTH",
  초콜릿: "CHOCOLATE",
  스파이스: "SPICE",
  카라멜: "CARAMEL",
  가죽: "LEATHER",
};

// Reverse mapping from English to Korean
const AROMA_MAP_REVERSE: Record<string, string> = Object.entries(
  AROMA_MAP
).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as Record<string, string>);

const AROMAS = Object.keys(AROMA_MAP);

export default function ReviewModal({
  onClose,
  accessToken,
  wineName,
  wineId,
  mode,
  existingReviewData,
}: Props) {
  // Convert English aroma codes to Korean terms for existing reviews
  const initialAroma = existingReviewData?.aroma
    ? existingReviewData.aroma
        .map((code) => AROMA_MAP_REVERSE[code])
        .filter(Boolean)
    : [];

  const [reviewData, setReviewData] = useState({
    rating: existingReviewData?.rating ?? 0,
    content: existingReviewData?.content ?? "",
    aroma: initialAroma,
    lightBold: existingReviewData?.lightBold ?? 5,
    smoothTannic: existingReviewData?.smoothTannic ?? 5,
    drySweet: existingReviewData?.drySweet ?? 5,
    softAcidic: existingReviewData?.softAcidic ?? 5,
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleAromaSelect = (aroma: string) => {
    setReviewData((prev) => ({
      ...prev,
      aroma: prev.aroma.includes(aroma)
        ? prev.aroma.filter((a) => a !== aroma)
        : [...prev.aroma, aroma],
    }));
  };

  const handleSliderChange = (
    key: "lightBold" | "smoothTannic" | "drySweet" | "softAcidic",
    value: number
  ) => {
    setReviewData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (
      reviewData.rating === 0 ||
      reviewData.content.trim() === "" ||
      reviewData.aroma.length === 0
    ) {
      toast.warning("별점, 후기, 향을 모두 입력해주세요.");
      return;
    }

    // Convert Korean aroma terms to English codes
    const aromaEnglishCodes = reviewData.aroma
      .map((koreanAroma) => AROMA_MAP[koreanAroma])
      .filter(Boolean); // Remove any undefined entries

    // Make sure we have at least one valid aroma code
    if (aromaEnglishCodes.length === 0) {
      toast.warning("유효한 향이 선택되지 않았습니다.");
      return;
    }

    const baseData = {
      rating: reviewData.rating,
      lightBold: reviewData.lightBold,
      smoothTannic: reviewData.smoothTannic,
      drySweet: reviewData.drySweet,
      softAcidic: reviewData.softAcidic,
      aroma: aromaEnglishCodes,
      content: reviewData.content,
    };

    const dataToSend = mode === "create" ? { ...baseData, wineId } : baseData;

    const url =
      mode === "create"
        ? "https://winereview-api.vercel.app/14-2/reviews"
        : `https://winereview-api.vercel.app/14-2/reviews/${existingReviewData?.id}`;

    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await handleResponseWithAuth(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => response.text());
        console.error(
          `${mode === "create" ? "리뷰 등록" : "리뷰 수정"} 실패:`,
          errorData
        );
        toast.warning(
          `${
            mode === "create" ? "리뷰 등록" : "리뷰 수정"
          } 중 오류가 발생했습니다.`
        );
        return;
      }

      toast.success(
        `${mode === "create" ? "리뷰가 등록" : "리뷰가 수정"}되었습니다!`
      );
      onClose();
    } catch (error) {
      console.error("리뷰 제출 중 오류", error);
      toast.warning("리뷰 등록 중 네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[528px] rounded-2xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gray-800 font-bold">
            {mode === "create" ? "리뷰 등록" : "리뷰 수정"}
          </h2>
        </div>

        {/* 와인 아이콘 + 와인이름 + 별점 */}
        <div className="flex items-center my-6 gap-3">
          <img
            src="/images/wine.svg"
            alt="와인 아이콘"
            className="bg-gray-100 w-12 h-12 rounded-xl p-1"
          />
          <div>
            <span className="text-base text-gray-800 font-semibold">
              {wineName}
            </span>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setReviewData((prev) => ({
                      ...prev,
                      rating: prev.rating === num ? 0 : num,
                    }))
                  }
                  onMouseEnter={() => setHoverRating(num)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <img
                    src={
                      num <= (hoverRating || reviewData.rating)
                        ? "/images/staryellow.svg"
                        : "/images/star.svg"
                    }
                    alt={`${num}점`}
                    className="w-5 h-5 cursor-pointer"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 후기 작성 */}
        <textarea
          className="w-full h-[120px] border border-gray-300 rounded-2xl px-5 py-3 mb-10 placeholder-gray-500 resize-none"
          placeholder="후기를 작성해주세요."
          value={reviewData.content}
          onChange={(e) =>
            setReviewData((prev) => ({ ...prev, content: e.target.value }))
          }
        />

        {/* 맛 선택 range */}
        <div className="mb-10">
          <label className="block text-xl text-gray-800 font-bold mb-6">
            와인의 맛은 어땠나요?
          </label>
          <ReviewSlider
            label="바디감"
            value={reviewData.lightBold}
            onChange={(val) => handleSliderChange("lightBold", val)}
            leftLabel="가벼워요"
            rightLabel="진해요"
          />
          <ReviewSlider
            label="타닌"
            value={reviewData.smoothTannic}
            onChange={(val) => handleSliderChange("smoothTannic", val)}
            leftLabel="부드러워요"
            rightLabel="떫어요"
          />
          <ReviewSlider
            label="당도"
            value={reviewData.drySweet}
            onChange={(val) => handleSliderChange("drySweet", val)}
            leftLabel="드라이해요"
            rightLabel="달아요"
          />
          <ReviewSlider
            label="산미"
            value={reviewData.softAcidic}
            onChange={(val) => handleSliderChange("softAcidic", val)}
            leftLabel="안셔요"
            rightLabel="많이셔요"
          />
        </div>

        {/* 향 선택 버튼(중복 가능) */}
        <div className="mb-12">
          <label className="block text-xl text-gray-800 font-bold mb-6">
            기억에 남는 향이 있나요?
          </label>
          <div className="flex flex-wrap gap-[10px]">
            {AROMAS.map((aroma) => {
              const isSelected = reviewData.aroma.includes(aroma);
              const length = aroma.length;
              const widthClass =
                length === 1
                  ? "w-[50px]"
                  : length === 2
                  ? "w-[64px]"
                  : length === 3
                  ? "w-[78px]"
                  : "w-[92px]";

              return (
                <button
                  key={aroma}
                  onClick={() => handleAromaSelect(aroma)}
                  className={`h-[46px] py-[10px] border border-gray-300 rounded-3xl text-base text-gray-800 
                    ${widthClass} ${
                    isSelected ? "bg-garnet text-white" : "bg-white"
                  }`}
                >
                  {aroma}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <ModalButton
            width="w-[108px]"
            bgColor="bg-[#F3E7E6]"
            textColor="text-garnet"
            onClick={onClose}
          >
            취소
          </ModalButton>
          <ModalButton width="w-[362px]" onClick={handleSubmit}>
            {mode === "create" ? "리뷰 남기기" : "리뷰 수정하기"}
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
