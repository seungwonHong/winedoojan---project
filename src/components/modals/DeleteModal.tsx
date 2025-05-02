// 삭제하기 모달

'use client';

import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalButton from '@/components/common/ModalButton';
import handleResponseWithAuth from '@/utils/handleResponseWithAuth';

type Props = {
  onClose: () => void;
  onConfirm: (id: string, type: 'wine' | 'review') => void;
  accessToken: string;
  id: string;
  type: 'wine' | 'review';
};

export default function DeleteModal({ onClose, onConfirm, accessToken, id, type }: Props) {
  const handleDelete = async (id: string, type: 'wine' | 'review') => {
    const endpoint = type === 'wine'
      ? `https://winereview-api.vercel.app/14-2/wines/${id}`
      : `https://winereview-api.vercel.app/14-2/reviews/${id}`;

    try {
      const response = await handleResponseWithAuth(endpoint, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`삭제 실패: ${errorText}`);
      }
  
      toast.success('삭제가 완료되었습니다.');
      onConfirm(id, type);
      onClose();
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      toast.warning('삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[353px] h-[182px] bg-white rounded-2xl px-4 shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mt-8">
          정말 삭제하시겠습니까?
        </h2>

        <div className="flex justify-end gap-4 mt-10 mb-6">
          <ModalButton bgColor="bg-[#F3E7E6]" textColor="text-garnet" onClick={onClose}>
            취소
          </ModalButton>

          <ModalButton onClick={() => handleDelete(id, type)}>
            삭제하기
          </ModalButton>
        </div>
      </div>
    </div>
  );
}