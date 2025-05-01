// 와인 등록(수정)하기 모달

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from 'browser-image-compression';
import ModalButton from '@/components/common/ModalButton';
import DropdownSelect from '@/components/common/DropdownSelect';
import handleResponseWithAuth from '@/utils/handleResponseWithAuth';
import type { Wine } from '@/types/wineDetailTypes';

type WineWithType = Wine & {
  type: 'Red' | 'White' | 'Sparkling';
};

type Props = {
  onClose: () => void;
  accessToken: string;
  mode: 'create' | 'edit'; // post | patch
  wineData?: WineWithType;
};

const WINE_TYPES = ['Red', 'White', 'Sparkling'] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1000,
};

export default function WineModal({ onClose, accessToken, mode, wineData }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');
  const [selectedOption, setSelectedOption] = useState<(typeof WINE_TYPES)[number]>('Red');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 수정 모드일 때 초기값 세팅
  useEffect(() => {
    if (mode === 'edit' && wineData) {
      setName(wineData.name);
      setRegion(wineData.region);
      setPrice(wineData.price.toString());
      setSelectedOption(wineData.type);
      setImagePreview(wineData.image);
    } else {
      setName('');
      setRegion('');
      setPrice('');
      setSelectedOption('Red');
      setImagePreview(null);
    }
  }, [mode, wineData]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.warning('파일 크기가 너무 큽니다. 5MB 이하의 파일을 업로드하세요.');
      return;
    }

    try {
      const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
      console.log('압축된 이미지 크기:', compressedFile.size);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('이미지 압축 실패:', error);
      toast.warning('이미지 압축 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (!name || !region || !price || !imagePreview) {
      toast.warning('모든 항목을 입력해주세요.');
      return;
    }

    const winePayload = {
      name,
      region,
      image: imagePreview,
      price: parseFloat(price),
      type: selectedOption.toUpperCase(),
    };

    const url =
      mode === 'create'
        ? 'https://winereview-api.vercel.app/14-2/wines'
        : `https://winereview-api.vercel.app/14-2/wines/${wineData?.id}`;

    const method = mode === 'create' ? 'POST' : 'PATCH';
    
    try {
      const response = await handleResponseWithAuth(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(winePayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API 오류:', errorText);
        throw new Error(`HTTP 오류! 상태: ${response.status}, 내용: ${errorText}`);
      }

      const result = await response.json();
      console.log(mode === 'create' ? '와인 등록 성공:' : '와인 수정 성공:', result);
      toast.success(mode === 'create' ? '와인이 성공적으로 등록되었습니다.' : '와인이 성공적으로 수정되었습니다.');
      
      if (mode === 'create' && result.id) {
        router.push(`/wines/${result.id}`); // 상세 페이지로 리다이렉트
      }
    } catch (error) {
      console.error(mode === 'create' ? '등록 실패:' : '수정 실패:', error);
      toast.warning(mode === 'create' ? '와인 등록 중 오류가 발생했습니다.' : '와인 수정 중 오류가 발생했습니다.');
    }
  };

  const labelClass = 'block text-base font-medium mb-4';
  const inputClass = 'w-full h-12 border border-gray-300 rounded-2xl px-5 py-2 mb-8 placeholder-gray-500';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white w-[460px] rounded-2xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-gray-800 font-bold mb-10">
          {mode === 'create' ? '와인 등록' : '와인 수정'}
        </h2>

        <label className={labelClass}>와인 이름</label>
        <input
          className={inputClass}
          placeholder="와인 이름 입력"
          value={name}
          onChange={handleInputChange(setName)}
        />

        <label className={labelClass}>가격</label>
        <input
          type="number"
          className={`${inputClass} placeholder:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          placeholder="가격 입력"
          value={price}
          onChange={handleInputChange(setPrice)}
        />

        <label className={labelClass}>원산지</label>
        <input
          className={inputClass}
          placeholder="원산지 입력"
          value={region}
          onChange={handleInputChange(setRegion)}
        />

        <label className={labelClass}>타입</label>
        <DropdownSelect
          options={WINE_TYPES}
          selected={selectedOption}
          onSelect={setSelectedOption}
        />

        <label className={labelClass}>와인 사진</label>
        <div
          className="w-36 h-36 border-2 border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer relative"
          onClick={handleImageClick}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="와인 사진 미리보기"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <img
              src="/images/photo.svg"
              alt="와인 사진 아이콘"
              className="w-14 h-14"
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <ModalButton width = "w-[108px]" bgColor="bg-[#F3E7E6]" textColor="text-garnet" onClick={onClose}>
            취소
          </ModalButton>
          <ModalButton width = "w-[294px]" onClick={handleSubmit}>
            {mode === 'create' ? '와인 등록하기' : '와인 수정하기'}
          </ModalButton>
        </div>
      </div>
    </div>
  );
}