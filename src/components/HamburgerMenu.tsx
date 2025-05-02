"use client";
import icons from "../../public/icons/icons";
import {
  fetchDeleteWineId,
  fetchDeleteReviewId,
} from "@/services/myProfileApi";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import ModalButton from "./common/ModalButton";
import clsx from "clsx";
import { Review, Wine } from "@/types/myprofileTypes";
import ReviewModal from "./modals/ReviewModal";
import WineModal from "./modals/WineModal";
import { useAuthStore } from "@/store/authStore";
import DeleteModal from "./modals/DeleteModal";

interface HamburgerMenuProps {
  teamId: string | null;
  id: number;
  token: string;
  tab: string;
  openId: number | null;
  review?: Review;
  wine?: Wine;
  setOpenId: (id: number | null) => void;
  onDeleteSuccess: () => void;
}

const HamburgerMenuDiv = clsx(
  "w-[118px] px-[22px] py-[12px] text-center hover:rounded-[12px] hover:bg-mistyrose hover:text-burgundy cursor-pointer"
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
          <ReviewModal
            onClose={() => setIsEditModalOpen(false)}
            accessToken={token}
            wineName={review?.wine.name ?? ""}
            wineId={id}
            mode="edit"
            existingReviewData={review}
          />
        ) : (
          <WineModal
            onClose={() => setIsEditModalOpen(false)}
            accessToken={token}
            mode="edit"
            wineData={wine}
          />
        ))}
      {isDelModalOpen &&
        (tab === "reviews" ? (
          <DeleteModal
            onClose={() => setIsDelModalOpen(false)}
            onConfirm={handleDelete}
            accessToken={token}
            id={id.toString()}
            type="review"
          />
        ) : (
          <DeleteModal
            onClose={() => setIsDelModalOpen(false)}
            onConfirm={handleDelete}
            accessToken={token}
            id={id.toString()}
            type="wine"
          />
        ))}
    </div>
  );
}
