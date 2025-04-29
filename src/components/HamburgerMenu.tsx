"use client";
import icons from "../../public/icons/icons";
import {
  fetchDeleteWineId,
  fetchDeleteReviewId,
} from "@/services/myProfileApi";
import { useState } from "react";
import LeaveReviewModal from "./modals/leaveReviewModal";
import { Dialog } from "@headlessui/react";
import ModalButton from "./common/ModalButton";
import clsx from "clsx";
import { Review, Wine } from "@/types/myprofileTypes";
import RegisterWineModal from "./modals/registerWineModal";

interface HamburgerMenuProps {
  teamId: string | null;
  id: number;
  token: string | null;
  tab: string;
  openId: number | null;
  review?: Review;
  wine?: Wine;
  setOpenId: (id: number | null) => void;
  onDeleteSuccess: () => void;
}

const HamburgerMenuDiv = clsx(
  "w-[118px] px-[22px] py-[12px] text-center hover:rounded-[12px] hover:bg-palepink hover:text-garnet cursor-pointer"
);

export default function HamburgerMenu({
  teamId,
  id,
  token,
  tab,
  openId,
  setOpenId,
  onDeleteSuccess,
  review,
  wine,
}: HamburgerMenuProps) {
  const isOpen = openId === id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  // console.log(props.id);

  // 리뷰/와인 삭제하기
  const handleDelete = async () => {
    try {
      if (tab === "wines") {
        await fetchDeleteWineId({ teamId, id, token });
      } else {
        await fetchDeleteReviewId({ teamId, id, token });
      }
      onDeleteSuccess();
    } catch (err) {
      console.error("삭제 실패:", err);
    }
    setIsDelModalOpen(false);
  };

  // 햄버거 버튼 열림/닫힘
  const handleOpenSelect = () => {
    setOpenId(isOpen ? null : id);
  };

  return (
    <div className="relative">
      <img
        src={icons.hamburger}
        alt="더보기 버튼"
        className="size-[26px] cursor-pointer"
        onClick={handleOpenSelect}
      />
      {isOpen && (
        <div className="absolute right-0 top-[35px] bg-white border border-gray-300 rounded-[16px] w-[126px] h-[104px] flex flex-col items-center justify-center">
          <div
            onClick={() => setIsEditModalOpen(true)}
            className={HamburgerMenuDiv}
          >
            수정하기
          </div>
          <div
            className={HamburgerMenuDiv}
            onClick={() => setIsDelModalOpen(true)}
          >
            삭제하기
          </div>
        </div>
      )}
      {/* 수정하기 모달 */}
      {isEditModalOpen &&
        (tab === "reviews" ? (
          <LeaveReviewModal
            onClose={() => setIsEditModalOpen(false)}
            wineName={review?.wine.name ?? ""}
            wineId={id}
            wineImage={review?.wine.image ?? ""}
          />
        ) : (
          <RegisterWineModal onClose={() => setIsEditModalOpen(false)} />
        ))}

      <Dialog open={isDelModalOpen} onClose={() => setIsDelModalOpen(false)}>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsDelModalOpen(false)}
        >
          <div
            className="w-[353px] h-[182px] bg-white rounded-2xl px-4 shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center text-gray-800 mt-8">
              정말 삭제하시겠습니까?
            </h2>
            <div className="flex justify-end gap-4 mt-10 mb-6">
              <ModalButton
                bgColor="bg-[#F3E7E6]"
                textColor="text-garnet"
                onClick={() => setIsDelModalOpen(false)}
              >
                취소
              </ModalButton>
              <ModalButton onClick={handleDelete}>삭제하기</ModalButton>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
