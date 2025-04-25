// 와인 등록하기 모달

'use client';

import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression'; // 이미지 압축 라이브러리

type Props = {
  onClose: () => void;
};

const wineTypes = ['Red', 'White', 'Sparkling'];

export default function RegisterWineModal({ onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Red');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleSubmit = async () => {
    if (!name || !region || !price || !selectedOption || !imagePreview) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    const data = {
      name,
      region,
      image: imagePreview, // base64 이미지 문자열
      price: parseFloat(price),
      type: selectedOption.toUpperCase(), // 'Red' → 'RED'
    };
  
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // 오류 메시지 받기
        console.error('API 오류:', errorText); // 오류 로그 찍기
        throw new Error(`HTTP 오류! 상태: ${response.status}, 내용: ${errorText}`);
      }
  
      const result = await response.json();
      console.log('와인 등록 성공:', result);
      alert('와인이 성공적으로 등록되었습니다.');
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('등록 실패:', error);
      alert('와인 등록 중 오류가 발생했습니다.');
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleImageBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 체크
      if (file.size > maxFileSize) {
        alert('파일 크기가 너무 큽니다. 10MB 이하의 파일을 업로드하세요.');
        return;
      }

      // 이미지 압축
      const options = {
        maxSizeMB: 0.5, // 최대 압축 크기 1MB
        maxWidthOrHeight: 600, // 이미지 크기 제한
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(compressedFile); // 압축된 파일을 base64로 변환하여 미리보기
      } catch (error) {
        console.error('이미지 압축 실패:', error);
        alert('이미지 압축 중 오류가 발생했습니다.');
      }
    }
  };

  const labelClass = 'block text-base font-medium mb-4';
  const inputClass = 'w-full h-12 border border-gray-300 rounded-2xl px-5 py-2 mb-8 placeholder-gray-500';
  const buttonClass = 'h-[54px] px-4 py-2 rounded-xl text-base font-bold';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white w-[460px] rounded-2xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-gray-800 font-bold mb-10">와인 등록</h2>

        <label className={labelClass}>와인 이름</label>
        <input
          className={inputClass}
          placeholder="와인 이름 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={labelClass}>가격</label>
        <input
          type="number"
          className={`${inputClass} placeholder:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          placeholder="가격 입력"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label className={labelClass}>원산지</label>
        <input
          className={inputClass}
          placeholder="원산지 입력"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <label className={labelClass}>타입</label>
        <div className="relative mb-8">
          <div
            className="w-full h-12 border border-gray-300 rounded-2xl px-5 py-3 pr-10 cursor-pointer"
            onClick={toggleDropdown}
          >
            {selectedOption}
            <img
              src="/images/dropdown.svg"
              alt="드롭다운 세모 아이콘"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>

          {isOpen && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-2xl z-10">
              {wineTypes.map((type) => (
                <li
                  key={type}
                  onClick={() => handleSelect(type)}
                  className="m-[6px] px-4 py-2 bg-white rounded-2xl hover:bg-[#F3E7E6] hover:text-garnet cursor-pointer"
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>

        <label className={labelClass}>와인 사진</label>
        <div
          className="w-36 h-36 border-2 border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer relative"
          onClick={handleImageBoxClick}
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
          <button
            className={`${buttonClass} w-[108px] bg-[#F3E7E6] text-garnet`}
            onClick={onClose}
          >
            취소
          </button>
          <button
            className={`${buttonClass} w-[294px] bg-garnet text-white`}
            onClick={handleSubmit}
          >
            와인 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}