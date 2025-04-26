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
  const sliderLabelClass = [
    'w-[56px] h-[25px] px-2 py-[6px] bg-gray-100 rounded-lg',
    'text-gray-400 text-sm text-center font-medium',
    'flex items-center justify-center overflow-hidden whitespace-nowrap flex-shrink-0'
  ].join(' ');

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
      <label className={sliderLabelClass}>{label}</label>
      <div className="flex items-center flex-1 min-w-0 gap-2">
        <div className="w-[70px] flex-shrink-0 text-base text-gray-800 text-left whitespace-nowrap">
          {leftLabel}
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="wine-slider h-2 flex-1 min-w-0"
        />
        <div className="w-[56px] flex-shrink-0 text-base text-gray-800 text-right whitespace-nowrap">
          {rightLabel}
        </div>
      </div>
    </div>
  );
}