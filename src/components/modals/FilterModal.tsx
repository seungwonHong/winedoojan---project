"use client";
import React from "react";
import SearchOptions from "../SearchOptions";
import { IoClose } from "react-icons/io5";
import ModalButton from "../common/ModalButton";
import searchStore from "@/store/searchStore";

interface Props {
  setIsClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterModal = ({ setIsClose }: Props) => {
  const {
    setType,
    setMinPrice,
    setMaxPrice,
    setRating,
    setButtonClick,
    setCheckBoxClick,
  } = searchStore();

  const handleReset = () => {
    setType(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setRating(undefined);
    setButtonClick({ red: false, white: false, sparkling: false });
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": false,
      "3": false,
    });
  };

  const handleClose = () => {
    setIsClose(true);
  };
  return (
    <div className="flex-col bg-[#101318]/30 fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col w-[375px] h-[700px] rounded-2xl bg-[#FFFFFF] px-[24px] py-[24px]">
        <div className="flex flex-row items-center justify-center mb-[32px]">
          <span className="text-[20px] text-[#2D3034] font-bold">필터</span>
          <IoClose
            size={24}
            className="ml-auto cursor-pointer"
            onClick={() => setIsClose(true)}
          />
        </div>
        <SearchOptions />
        <div className="flex flex-row items-center">
          <ModalButton
            onClick={handleReset}
            bgColor="bg-[#FFE1E1]"
            width="w-[96px]"
            height="h-[54px]"
            textColor="text-[#800020]"
          >
            초기화
          </ModalButton>
          <ModalButton
            onClick={handleClose}
            bgColor="bg-[#800020]"
            width="w-[223px]"
            height="h-[54px]"
            className="ml-auto"
          >
            필터 적용하기
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
