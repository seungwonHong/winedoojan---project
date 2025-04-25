// 리뷰 남기기 모달

'use client';

import React, { useState } from 'react';
import '@/styles/rangeSlider.css';
import ModalButton from '@/components/common/ModalButton';
import ReviewSlider from '@/components/common/ReviewSlider';

type Props = {
  onClose: () => void;
  wineName: string;
  wineImage: string;
  wineId: number;
};

export default function LeaveReviewModal({ onClose, wineName, wineId }: Props) {
  const [reviewData, setReviewData] = useState({
    rating: 0,
    content: '',
    flavors: [] as string[],
    lightBold: 5,
    smoothTannic: 5,
    drySweet: 5,
    softAcidic: 5,
  });

  const [hoverRating, setHoverRating] = useState(0);

  const FLAVORS = [
    '체리', '베리', '오크', '바닐라', '후추', '제빵', '풀', '사과',
    '복숭아', '시트러스', '트로피컬', '미네랄', '꽃', '담뱃잎',
    '흙', '초콜릿', '스파이스', '카라멜', '가죽',
  ];

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
      aroma: reviewData.flavors,
      content: reviewData.content,
      wineId,
    };

    try {
      const response = await fetch('https://winereview-api.vercel.app/14-2/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('리뷰가 등록되었습니다!');
        onClose();
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review', error);
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
          <h2 className="text-2xl text-gray-800 font-bold">리뷰 등록</h2>
        </div>

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

        <textarea
          className="w-full h-[120px] border border-gray-300 rounded-2xl px-5 py-3 mb-10 placeholder-gray-500 resize-none"
          placeholder="후기를 작성해주세요."
          value={reviewData.content}
          onChange={(e) =>
            setReviewData(prev => ({ ...prev, content: e.target.value }))
          }
        />

        <div className="mb-10">
          <label className="block text-xl text-gray-800 font-bold mb-6">와인의 맛은 어땠나요?</label>
          <ReviewSlider label="바디감" value={reviewData.lightBold} onChange={(val) => handleSliderChange('lightBold', val)} leftLabel="가벼워요" rightLabel="진해요" />
          <ReviewSlider label="타닌" value={reviewData.smoothTannic} onChange={(val) => handleSliderChange('smoothTannic', val)} leftLabel="부드러워요" rightLabel="떫어요" />
          <ReviewSlider label="당도" value={reviewData.drySweet} onChange={(val) => handleSliderChange('drySweet', val)} leftLabel="드라이해요" rightLabel="달아요" />
          <ReviewSlider label="산미" value={reviewData.softAcidic} onChange={(val) => handleSliderChange('softAcidic', val)} leftLabel="안셔요" rightLabel="많이셔요" />
        </div>

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
            리뷰 남기기
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
