import { Wine } from "@/types/myprofileTypes";
import Image from "next/image";
import images from "../../public/images/images";
import HamburgerMenu from "./HamburgerMenu";

interface MyWineCardProps {
  wine: Wine;
  teamId: string;
  token: string | null;
  tab: string;
  openId: number | null;
  setOpenId: (id: number | null) => void;
  onDeleteSuccess: () => void;
}

export default function MyWineCard({
  teamId,
  wine,
  token,
  tab,
  openId,
  setOpenId,
  onDeleteSuccess,
}: MyWineCardProps) {
  if (wine.image === "string") {
    wine.image = images.defaultProfile;
  }

  return (
    <div className="flex gap-[40px] pt-[30px] w-[800px] h-[228px] border border-[#cfdbea] rounded-[16px] px-[40px] bg-white shadow-sm mb-[62px] items-end">
      <div className="overflow-hidden">
        <Image
          src={wine.image || images.defaultProfile}
          alt="와인이미지"
          width={76}
          height={270}
          className="w-[76px] h-[300px] translate-y-[24px] object-cover"
        />
      </div>

      {/* 텍스트 정보 */}
      <div className=" flex flex-col items-start h-full ">
        <div className="text-[#2D3034] font-bold text-[30px] mb-[20px]">
          {wine.name}
        </div>
        <div className="text-[#9facbd] text-sm mb-[13px]">{wine.region}</div>
        <div className="flex items-center bg-palepink text-garnet px-[15px] py-[6px] rounded-[12px] w-max">
          <div className="font-bold text-md">
            ₩ {wine.price.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 햄버거 아이콘 */}
      <div className="h-full ml-auto">
        <HamburgerMenu
          id={wine.id}
          teamId={teamId}
          token={token}
          onDeleteSuccess={onDeleteSuccess}
          tab={tab}
          openId={openId}
          setOpenId={setOpenId}
        />
      </div>
    </div>
  );
}
