// 와인 등록(수정)하기 모달

"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imageCompression from "browser-image-compression";
import ModalButton from "@/components/common/ModalButton";
import DropdownSelect from "@/components/common/DropdownSelect";
import type { Wine } from "@/types/schema";
import { uploadWineImage, submitWineData } from "@/services/wineApi";

type WineWithType = Wine & {
  type: "Red" | "White" | "Sparkling";
};

type Props = {
  onClose: () => void;
  accessToken: string | null;
  mode: "create" | "edit"; // post | patch
  wineData?: WineWithType;
};

const WINE_TYPES = ["Red", "White", "Sparkling"] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 600,
};

export default function WineModal({
  onClose,
  accessToken,
  mode,
  wineData,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 상태를 하나로 묶기
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    price: "",
    selectedOption: "Red" as (typeof WINE_TYPES)[number],
    imagePreview: null as string | null,
    compressedImageFile: null as File | null,
  });

  // 수정 모드일 때 초기값 세팅
  useEffect(() => {
    if (mode === "edit" && wineData) {
      setFormData({
        name: wineData.name,
        region: wineData.region,
        price: wineData.price.toString(),
        selectedOption: wineData.type,
        imagePreview: wineData.image,
        compressedImageFile: null,
      });
    } else {
      setFormData({
        name: "",
        region: "",
        price: "",
        selectedOption: "Red",
        imagePreview: null,
        compressedImageFile: null,
      });
    }
  }, [mode, wineData]);

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(
        (prev) =>
          ({
            ...prev,
            [field]: e.target.value,
          } as typeof formData)
      );
    };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // 파일이 없으면 함수 종료

    if (file.size > MAX_FILE_SIZE) {
      toast.warning("파일 크기가 너무 큽니다. 5MB 이하의 파일을 업로드하세요.");
      return;
    }

    try {
      const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
      setFormData(
        (prev) =>
          ({
            ...prev,
            compressedImageFile: compressedFile,
          } as typeof formData)
      );

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData(
            (prev) =>
              ({
                ...prev,
                imagePreview: reader.result,
              } as typeof formData)
          );
        }
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("이미지 압축 실패:", error);
      toast.warning("이미지 압축 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!accessToken) {
      toast.warning("로그인해주세요.");
      return;
    }

    const { name, region, price, imagePreview, compressedImageFile } = formData;

    if (
      !name ||
      !region ||
      !imagePreview ||
      isNaN(parseFloat(price)) ||
      parseFloat(price) <= 0
    ) {
      toast.warning("모든 항목을 입력해주세요.");
      return;
    }

    let imageUrl = wineData?.image; // 기존 이미지 URL을 저장해두기
    if (compressedImageFile) {
      imageUrl = await uploadWineImage(compressedImageFile, accessToken);
    }

    const winePayload = {
      name,
      region,
      image: imageUrl,
      price: parseFloat(price),
      type: formData.selectedOption.toUpperCase(),
    };

    try {
      const result = await submitWineData({
        mode,
        accessToken,
        winePayload,
        wineId: wineData?.id,
      });

      toast.success(
        mode === "create"
          ? "와인이 성공적으로 등록되었습니다."
          : "와인이 성공적으로 수정되었습니다."
      );
      if (mode === "create" && result.id) {
        router.push(`/wines/${result.id}`);
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.warning(
        mode === "create"
          ? "와인 등록 중 오류가 발생했습니다."
          : "와인 수정 중 오류가 발생했습니다."
      );
    }
  };

  const labelClass = "block text-base font-medium mb-4";
  const inputClass =
    "w-full h-12 border border-gray-300 rounded-2xl px-5 py-2 mb-8 placeholder-gray-500";

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
        className="bg-white w-[460px] rounded-2xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-gray-800 font-bold mb-10">
          {mode === "create" ? "와인 등록" : "와인 수정"}
        </h2>

        <label className={labelClass}>와인 이름</label>
        <input
          className={inputClass}
          placeholder="와인 이름 입력"
          value={formData.name}
          onChange={handleInputChange("name")}
        />

        <label className={labelClass}>가격</label>
        <input
          type="number"
          className={`${inputClass} placeholder:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          placeholder="가격 입력"
          value={formData.price}
          onChange={handleInputChange("price")}
        />

        <label className={labelClass}>원산지</label>
        <input
          className={inputClass}
          placeholder="원산지 입력"
          value={formData.region}
          onChange={handleInputChange("region")}
        />

        <label className={labelClass}>타입</label>
        <DropdownSelect
          options={WINE_TYPES}
          selected={formData.selectedOption}
          onSelect={(selected) =>
            setFormData((prev) => ({ ...prev, selectedOption: selected }))
          }
        />

        <label className={labelClass}>와인 사진</label>
        <div
          className="w-36 h-36 border-2 border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer relative"
          onClick={handleImageClick}
        >
          {formData.imagePreview ? (
            <img
              src={formData.imagePreview}
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
          <ModalButton
            width="w-[108px]"
            bgColor="bg-[#F3E7E6]"
            textColor="text-garnet"
            onClick={onClose}
          >
            취소
          </ModalButton>
          <ModalButton width="w-[294px]" onClick={handleSubmit}>
            {mode === "create" ? "와인 등록하기" : "와인 수정하기"}
          </ModalButton>
        </div>
      </div>
    </div>
  );
}
