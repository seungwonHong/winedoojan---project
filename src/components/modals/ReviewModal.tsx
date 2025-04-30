// 리뷰 남기기 모달

'use client';

import React, { useState } from 'react';
import '@/styles/rangeSlider.css';
import ModalButton from '@/components/common/ModalButton';
import ReviewSlider from '@/components/common/ReviewSlider';

type Props = {
  onClose: () => void;
  accessToken: string;
  wineName: string;
  wineId: number;
  mode: 'create' | 'edit'; // post | patch
  existingReviewData?: {
    id: number;
    rating: number;
    content: string;
    flavors: string[];
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
  };
}

const FLAVOR_MAP: Record<string, string> = {
  '체리': 'CHERRY',
  '베리': 'BERRY',
  '오크': 'OAK',
  '바닐라': 'VANILLA',
  '후추': 'PEPPER',
  '제빵': 'BAKING',
  '풀': 'GRASS',
  '사과': 'APPLE',
  '복숭아': 'PEACH',
  '시트러스': 'CITRUS',
  '트로피컬': 'TROPICAL',
  '미네랄': 'MINERAL',
  '꽃': 'FLOWER',
  '담뱃잎': 'TOBACCO',
  '흙': 'EARTH',
  '초콜릿': 'CHOCOLATE',
  '스파이스': 'SPICE',
  '카라멜': 'CARAMEL',
  '가죽': 'LEATHER',
};
const FLAVORS = Object.keys(FLAVOR_MAP);

export default function ReviewModal({ onClose,
  accessToken,
  wineName,
  wineId,
  mode,
  existingReviewData,
}: Props) {
  const [reviewData, setReviewData] = useState({
    rating: existingReviewData?.rating ?? 0,
    content: existingReviewData?.content ?? '',
    flavors: existingReviewData?.flavors ?? [],
    lightBold: existingReviewData?.lightBold ?? 5,
    smoothTannic: existingReviewData?.smoothTannic ?? 5,
    drySweet: existingReviewData?.drySweet ?? 5,
    softAcidic: existingReviewData?.softAcidic ?? 5,
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleFlavorSelect = (flavor: string) => {
    setReviewData(prev => ({
      ...prev,
      flavors: prev.flavors.includes(flavor)
        ? prev.flavors.filter(f => f !== flavor)
        : [...prev.flavors, flavor],
    }));
  };

  const handleSliderChange = (
    key: 'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic',
    value: number
  ) => {
    setReviewData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (
      reviewData.rating === 0 ||
      reviewData.content.trim() === '' ||
      reviewData.flavors.length === 0
    ) {
      alert('별점, 후기, 향을 모두 입력해주세요.');
      return;
    }

    const dataToSend = {
      rating: reviewData.rating,
      lightBold: reviewData.lightBold,
      smoothTannic: reviewData.smoothTannic,
      drySweet: reviewData.drySweet,
      softAcidic: reviewData.softAcidic,
      aroma: reviewData.flavors.map(flavor => FLAVOR_MAP[flavor]),
      content: reviewData.content,
      wineId,
    };

    const url =
      mode === 'create'
        ? 'https://winereview-api.vercel.app/14-2/reviews'
        : `https://winereview-api.vercel.app/14-2/reviews/${existingReviewData?.id}`;

    const method = mode === 'create' ? 'POST' : 'PATCH';

    async function sendRequest(currentAccessToken: string) {
      return fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentAccessToken}`,
        },
        body: JSON.stringify(dataToSend),
      });
    }

    try {
      let response = await sendRequest(accessToken);

      if (response.status === 401) {
        const refreshResponse = await fetch('https://winereview-api.vercel.app/14-2/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (!refreshResponse.ok) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          onClose();
          return;
        }

        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.accessToken;

        if (!newAccessToken) {
          alert('새 토큰을 받지 못했습니다. 다시 로그인해주세요.');
          onClose();
          return;
        }

        response = await sendRequest(newAccessToken);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`${mode === 'create' ? '리뷰 등록' : '리뷰 수정'} 실패:`, errorText);
        alert(`${mode === 'create' ? '리뷰 등록' : '리뷰 수정'} 중 오류가 발생했습니다.`);
        return;
      }

      alert(`${mode === 'create' ? '리뷰가 등록' : '리뷰가 수정'}되었습니다!`);
      onClose();
    } catch (error) {
      console.error('리뷰 제출 중 오류', error);
      alert('리뷰 등록 중 네트워크 오류가 발생했습니다.');
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
            {mode === 'create' ? '리뷰 등록' : '리뷰 수정'}
          </h2>
        </div>

        {/* 와인 아이콘 + 와인이름 + 별점 */}
        <div className="flex items-center my-6 gap-3">
          <img src="/images/wine.svg" alt="와인 아이콘" className="bg-gray-100 w-12 h-12 rounded-xl p-1" />
          <div>
            <span className="text-base text-gray-800 font-semibold">{wineName}</span>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() =>
                    setReviewData(prev => ({ ...prev, rating: prev.rating === num ? 0 : num }))
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
            setReviewData(prev => ({ ...prev, content: e.target.value }))
          }
        />

        {/* 맛 선택 range */}
        <div className="mb-10">
          <label className="block text-xl text-gray-800 font-bold mb-6">와인의 맛은 어땠나요?</label>
          <ReviewSlider label="바디감" value={reviewData.lightBold} onChange={(val) => handleSliderChange('lightBold', val)} leftLabel="가벼워요" rightLabel="진해요" />
          <ReviewSlider label="타닌" value={reviewData.smoothTannic} onChange={(val) => handleSliderChange('smoothTannic', val)} leftLabel="부드러워요" rightLabel="떫어요" />
          <ReviewSlider label="당도" value={reviewData.drySweet} onChange={(val) => handleSliderChange('drySweet', val)} leftLabel="드라이해요" rightLabel="달아요" />
          <ReviewSlider label="산미" value={reviewData.softAcidic} onChange={(val) => handleSliderChange('softAcidic', val)} leftLabel="안셔요" rightLabel="많이셔요" />
        </div>

        {/* 향 선택 버튼(중복 가능) */}
        <div className="mb-12">
          <label className="block text-xl text-gray-800 font-bold mb-6">기억에 남는 향이 있나요?</label>
          <div className="flex flex-wrap gap-[10px]">
            {FLAVORS.map(flavor => {
              const isSelected = reviewData.flavors.includes(flavor);
              const length = flavor.length;
              const widthClass =
                length === 1 ? 'w-[50px]' :
                length === 2 ? 'w-[64px]' :
                length === 3 ? 'w-[78px]' :
                'w-[92px]';

              return (
                <button
                  key={flavor}
                  onClick={() => handleFlavorSelect(flavor)}
                  className={`h-[46px] py-[10px] border border-gray-300 rounded-3xl text-base text-gray-800 
                    ${widthClass} ${isSelected ? 'bg-garnet text-white' : 'bg-white'}`}
                >
                  {flavor}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <ModalButton width="w-[108px]" bgColor="bg-[#F3E7E6]" textColor="text-garnet" onClick={onClose}>
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