// 리뷰 남기기 모달

'use client';

import React, { useState } from 'react';
import '@/styles/rangeSlider.css';

type Props = {
  onClose: () => void;
  wineName: string;
  wineImage: string;
  wineId: number; // 와인 ID 추가
};

export default function LeaveReviewModal({ onClose, wineName, wineId }: Props) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [flavors, setFlavors] = useState<string[]>([]);
  const [body, setBody] = useState(5);
  const [tannin, setTannin] = useState(5);
  const [sweetness, setSweetness] = useState(5);
  const [acidity, setAcidity] = useState(5);

  const sliderLabelClass = 'w-[56px] h-[25px] bg-gray-100 text-gray-400 text-sm font-medium rounded-lg px-2 py-[6px] flex flex-shrink-0 items-center justify-center text-center overflow-hidden whitespace-nowrap';
  const buttonClass = 'h-[54px] px-4 py-2 rounded-xl text-base font-bold';

  const FLAVORS = [
    '체리', '베리', '오크', '바닐라', '후추', '제빵', '풀', '사과',
    '복숭아', '시트러스', '트로피컬', '미네랄', '꽃', '담뱃잎',
    '흙', '초콜릿', '스파이스', '카라멜', '가죽',
  ];

  const handleFlavorSelect = (flavor: string) => {
    setFlavors(prev =>
      prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleSubmit = async () => {
    const reviewData = {
      rating,
      lightBold: body,
      smoothTannic: tannin,
      drySweet: sweetness,
      softAcidic: acidity,
      aroma: flavors as any[], // Enum 처리: 실제 enum 값으로 수정해야 할 수 있음
      content: review,
      wineId,
    };

    try {
      const response = await fetch('https://winereview-api.vercel.app/14-2/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log('Review submitted successfully');
        onClose();
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  const renderSlider = (
    label: string,
    value: number,
    setValue: (v: number) => void,
    leftLabel: string,
    rightLabel: string
  ) => (
    <div className="flex items-center mt-4">
      <label className={sliderLabelClass}>{label}</label>
      <div className="flex items-center gap-2 w-fit ml-6">
        <div className="w-[70px] text-base text-gray-800 text-left whitespace-nowrap">{leftLabel}</div>
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="wine-slider w-[260px] h-2"
        />
        <div className="w-[56px] text-base text-gray-800 text-right whitespace-nowrap">{rightLabel}</div>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
      onClick={onClose}
    >
      <div 
        className="bg-white w-[528px] rounded-2xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-gray-800 font-bold">리뷰 등록</h2>
        </div>

        {/* Wine Info & Rating */}
        <div className="flex items-center my-6 gap-3">
          <img src="/images/wine.svg" alt="와인 아이콘" className="bg-gray-100 w-12 h-12 rounded-xl p-1" />
          <div>
            <span className="text-base text-gray-800 font-semibold">{wineName}</span>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => setRating(prev => (prev === num ? 0 : num))}
                  onMouseEnter={() => setHoveredRating(num)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <img
                    src={num <= (hoveredRating || rating)
                      ? '/images/staryellow.svg'
                      : '/images/star.svg'}
                    alt={`${num}점`}
                    className="w-5 h-5 cursor-pointer"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full h-[120px] border border-gray-300 rounded-2xl px-5 py-3 mb-10 placeholder-gray-500 resize-none"
          placeholder="후기를 작성해주세요."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        {/* Sliders */}
        <div className="mb-10">
          <label className="block text-xl text-gray-800 font-bold mb-6">와인의 맛은 어땠나요?</label>
          {renderSlider('바디감', body, setBody, '가벼워요', '진해요')}
          {renderSlider('타닌', tannin, setTannin, '부드러워요', '떫어요')}
          {renderSlider('당도', sweetness, setSweetness, '드라이해요', '달아요')}
          {renderSlider('산미', acidity, setAcidity, '안셔요', '많이셔요')}
        </div>

        {/* Flavors */}
        <div className="mb-12">
          <label className="block text-xl text-gray-800 font-bold mb-6">
            기억에 남는 향이 있나요?
          </label>
          <div className="flex flex-wrap gap-[10px]">
            {FLAVORS.map(flavor => {
              const length = flavor.length;
              let widthClass = '';

              if (length === 1) widthClass = 'w-[50px]';
              else if (length === 2) widthClass = 'w-[64px]';
              else if (length === 3) widthClass = 'w-[78px]';
              else widthClass = 'w-[92px]'; // 4글자 이상

              const isSelected = flavors.includes(flavor);

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

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className={`${buttonClass} w-[108px] bg-[#F3E7E6] text-garnet`} onClick={onClose}>
            취소
          </button>
          <button className={`${buttonClass} w-[362px] bg-garnet text-white`} onClick={handleSubmit}>
            리뷰 남기기
          </button>
        </div>
      </div>
    </div>
  );
}