// 삭제하기 모달

'use client';

import React from 'react';

type Props = {
  onClose: () => void;
  onConfirm: (id: string, type: 'wine' | 'review') => void;
  id: string;
  type: 'wine' | 'review';
};

export default function DeleteConfirmModal({ onClose, onConfirm, id, type }: Props) {
  const handleDelete = async (id: string, type: 'wine' | 'review') => {
    const endpoint = type === 'wine'
      ? `https://winereview-api.vercel.app/14-2/wines/${id}`
      : `https://winereview-api.vercel.app/14-2/reviews/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`삭제 실패: ${errorText}`);
      }

      alert('삭제가 완료되었습니다.');
      onConfirm(id, type); // 삭제 후 부모 컴포넌트에서 상태 업데이트 처리
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="w-[353px] h-[182px] bg-white rounded-2xl px-4 shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mt-8">
          정말 삭제하시겠습니까?
        </h2>

        <div className="flex justify-end gap-4 mt-10 mb-6">
          <button
            className="w-[154px] h-[54px] px-4 py-2 bg-[#F3E7E6] text-garnet text-base font-bold rounded-xl"
            onClick={onClose}
          >
            취소
          </button>

          <button
            className="w-[154px] h-[54px] px-4 py-2 bg-garnet text-white text-base font-bold rounded-xl"
            onClick={() => handleDelete(id, type)} // onConfirm에 id와 type 전달
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}