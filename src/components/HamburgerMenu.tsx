"use client";
import icons from "../../public/icons/icons";
import {
  fetchDeleteWineId,
  fetchDeleteReviewId,
} from "@/services/myProfileApi";

interface HamburgerMenuProps {
  teamId: string;
  id: number;
  token: string | null;
  tab: string;
  openId: number | null;
  setOpenId: (id: number | null) => void;
  onDeleteSuccess: () => void;
}

export default function HamburgerMenu({
  teamId,
  id,
  token,
  tab,
  openId,
  setOpenId,
  onDeleteSuccess,
}: HamburgerMenuProps) {
  const isOpen = openId === id;

  const handleDeleteWine = async () => {
    try {
      if (tab === "wines") {
        await fetchDeleteWineId({ teamId, id, token });
      } else if (tab === "reviews") {
        await fetchDeleteReviewId({ teamId, id, token });
      }
      onDeleteSuccess();
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  const handleOpenSelect = () => {
    if (isOpen) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
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
          <div className="w-[118px] px-[22px] py-[12px] text-center hover:rounded-[12px] hover:bg-palepink hover:text-garnet cursor-pointer">
            수정하기
          </div>
          <div
            className="w-[118px] px-[22px] py-[12px] text-center hover:rounded-[12px] hover:bg-palepink hover:text-garnet cursor-pointer"
            onClick={handleDeleteWine}
          >
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
}
