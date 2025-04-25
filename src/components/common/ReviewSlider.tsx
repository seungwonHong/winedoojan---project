'use client';

import React from 'react';
import '@/styles/rangeSlider.css';

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
};

export default function ReviewSlider({ label, value, onChange, leftLabel, rightLabel }: Props) {
  const sliderLabelClass =
    'w-[56px] h-[25px] bg-gray-100 text-gray-400 text-sm font-medium rounded-lg px-2 py-[6px] flex flex-shrink-0 items-center justify-center text-center overflow-hidden whitespace-nowrap';

  return (
    <div className="flex items-center mt-4">
      <label className={sliderLabelClass}>{label}</label>
      <div className="flex items-center gap-2 w-fit ml-6">
        <div className="w-[70px] text-base text-gray-800 text-left whitespace-nowrap">{leftLabel}</div>
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="wine-slider w-[260px] h-2"
        />
        <div className="w-[56px] text-base text-gray-800 text-right whitespace-nowrap">{rightLabel}</div>
      </div>
    </div>
  );
}