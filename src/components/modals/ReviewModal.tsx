// 리뷰 남기기 모달

'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/rangeSlider.css';
import ModalButton from '@/components/common/ModalButton';
import ReviewSlider from '@/components/common/ReviewSlider';
import type { Review } from '@/types/wineDetailTypes';
import { submitReview } from '@/services/reviewApi';

type Props = {
  onClose: () => void;
  accessToken: string;
  wineName: string;
  wineId: number;
  mode: 'create' | 'edit'; // post | patch
  existingReviewData?: Review;
};

export const AROMA_MAP: Record<string, string> = {
  체리: 'CHERRY',
  베리: 'BERRY',
  오크: 'OAK',
  바닐라: 'VANILLA',
  후추: 'PEPPER',
  제빵: 'BAKING',
  풀: 'GRASS',
  사과: 'APPLE',
  복숭아: 'PEACH',
  시트러스: 'CITRUS',
  트로피컬: 'TROPICAL',
  미네랄: 'MINERAL',
  꽃: 'FLOWER',
  담뱃잎: 'TOBACCO',
  흙: 'EARTH',
  초콜릿: 'CHOCOLATE',
  스파이스: 'SPICE',
  카라멜: 'CARAMEL',
  가죽: 'LEATHER',
};

const AROMAS = Object.keys(AROMA_MAP);

export default function ReviewModal({
  onClose,
  accessToken,
  wineName,
  wineId,
  mode,
  existingReviewData,
}: Props) {
  const [reviewData, setReviewData] = useState({
    rating: existingReviewData?.rating ?? 0,
    content: existingReviewData?.content ?? '',
    aroma: (existingReviewData?.aroma ?? []).filter(
      (a): a is keyof typeof AROMA_MAP =>
        typeof a === 'string' && a in AROMA_MAP
    ),
    lightBold: existingReviewData?.lightBold ?? 5,
    smoothTannic: existingReviewData?.smoothTannic ?? 5,
    drySweet: existingReviewData?.drySweet ?? 5,
    softAcidic: existingReviewData?.softAcidic ?? 5,
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleAromaSelect = (aroma: string) => {
    const englishAroma = AROMA_MAP[aroma];
    setReviewData((prev) => ({
      ...prev,
      aroma: prev.aroma.includes(englishAroma)
        ? prev.aroma.filter((a) => a !== englishAroma)
        : [...prev.aroma, englishAroma],
    }));
  };

  const handleSliderChange = (
    key: 'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic',
    value: number
  ) => {
    setReviewData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (
      reviewData.rating === 0 ||
      reviewData.content.trim() === '' ||
      reviewData.aroma.length === 0
    ) {
      toast.warning('별점, 후기, 향을 모두 입력해주세요.');
      return;
    }

    const baseData = {
      rating: reviewData.rating,
      lightBold: reviewData.lightBold,
      smoothTannic: reviewData.smoothTannic,
      drySweet: reviewData.drySweet,
      softAcidic: reviewData.softAcidic,
      aroma: reviewData.aroma
        .filter((a): a is keyof typeof AROMA_MAP => a in AROMA_MAP)
        .map((a) => AROMA_MAP[a]),
      content: reviewData.content,
    };

    try {
      const response = await submitReview({
        data: baseData,
        wineId,
        accessToken,
        mode,
        existingReviewId: mode === 'edit' ? existingReviewData?.id : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('리뷰 제출 실패:', errorText);
        toast.warning('리뷰 등록/수정 중 오류가 발생했습니다.');
        return;
      }

      toast.success(`리뷰가 ${mode === 'create' ? '등록' : '수정'}되었습니다!`);
      // 토스트 메시지가 보여지고 나서 모달이 닫히도록 변경
      setTimeout(() => {
        onClose();
      }, 2000); // 2초 후에 모달이 닫히도록 설정
    } catch (err) {
      console.error('리뷰 제출 중 네트워크 오류', err);
      toast.warning('리뷰 제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="light"
      />
      <div
        className="bg-white w-[528px] rounded-2xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {mode === 'create' ? '리뷰 등록' : '리뷰 수정'}
        </h2>

        {/* 별점 */}
        <div className="flex items-center my-6 gap-3">
          <img
            src="/images/wine.svg"
            alt="와인 아이콘"
            className="w-12 h-12 rounded-xl p-1 bg-gray-100"
          />
          <div>
            <span className="font-semibold text-base text-gray-800">
              {wineName}
            </span>
            <div className="flex gap-1 mt-2">
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
                        ? '/images/staryellow.svg'
                        : '/images/star.svg'
                    }
                    className="w-5 h-5"
                    alt={`${num}점`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 후기 입력 */}
        <textarea
          className="w-full h-[120px] border border-gray-300 rounded-2xl px-5 py-3 mb-10 placeholder-gray-500 resize-none"
          placeholder="후기를 작성해주세요."
          value={reviewData.content}
          onChange={(e) =>
            setReviewData((prev) => ({ ...prev, content: e.target.value }))
          }
        />

        {/* 슬라이더 */}
        <div className="mb-10">
          <label className="block text-xl font-bold text-gray-800 mb-6">
            와인의 맛은 어땠나요?
          </label>
          <ReviewSlider
            label="바디감"
            value={reviewData.lightBold}
            onChange={(val) => handleSliderChange('lightBold', val)}
            leftLabel="가벼워요"
            rightLabel="진해요"
          />
          <ReviewSlider
            label="타닌"
            value={reviewData.smoothTannic}
            onChange={(val) => handleSliderChange('smoothTannic', val)}
            leftLabel="부드러워요"
            rightLabel="떫어요"
          />
          <ReviewSlider
            label="당도"
            value={reviewData.drySweet}
            onChange={(val) => handleSliderChange('drySweet', val)}
            leftLabel="드라이해요"
            rightLabel="달아요"
          />
          <ReviewSlider
            label="산미"
            value={reviewData.softAcidic}
            onChange={(val) => handleSliderChange('softAcidic', val)}
            leftLabel="안 셔요"
            rightLabel="많이 셔요"
          />
        </div>

        {/* 향 */}
        <div className="mb-12">
          <label className="block text-xl font-bold text-gray-800 mb-6">
            기억에 남는 향이 있나요?
          </label>
          <div className="flex flex-wrap gap-[10px]">
            {AROMAS.map((aroma) => {
              const english = AROMA_MAP[aroma];
              const isSelected = reviewData.aroma.includes(english);
              const widthClass =
                aroma.length === 1
                  ? 'w-[50px]'
                  : aroma.length === 2
                  ? 'w-[64px]'
                  : aroma.length === 3
                  ? 'w-[78px]'
                  : 'w-[92px]';

              return (
                <button
                  key={aroma}
                  onClick={() => handleAromaSelect(aroma)}
                  className={`h-[46px] py-[10px] border border-gray-300 rounded-3xl text-base ${
                    isSelected
                      ? 'bg-garnet text-white'
                      : 'bg-white text-gray-800'
                  } ${widthClass}`}
                >
                  {aroma}
                </button>
              );
            })}
          </div>
        </div>

        {/* 버튼 */}
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
            {mode === 'create' ? '리뷰 남기기' : '리뷰 수정하기'}
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
