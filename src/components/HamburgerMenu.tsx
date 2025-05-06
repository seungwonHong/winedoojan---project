// "use client";
import icons from "../../public/icons/icons";
import clsx from "clsx";
import { Review, Wine } from "@/types/myprofileTypes";

const HamburgerMenuDiv = clsx(
  "w-[118px] px-[22px] py-[12px] text-center hover:rounded-[12px] hover:bg-mistyrose hover:text-burgundy cursor-pointer"
);

interface HamburgerMenuProps {
  teamId: string | null;
  id: number;
  token: string;
  tab: string;
  openId: number | null;
  review?: Review;
  wine?: Wine;
  setOpenId: (id: number | null) => void;
  onSuccess: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HamburgerMenu({ ...props }: HamburgerMenuProps) {
  const isOpen = props.openId === props.id;

  const handleOpenSelect = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    props.setOpenId(isOpen ? null : props.id);
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
            onClick={(e) => {
              e.stopPropagation();
              props.onEdit();
            }}
            className={HamburgerMenuDiv}
          >
            수정하기
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              props.onDelete();
            }}
            className={HamburgerMenuDiv}
          >
            삭제하기
          </div>
        </div>
      )}
    </div>
  );
}
