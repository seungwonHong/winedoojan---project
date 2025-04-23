import hamburgerIcon from "@/public/ic_hamburger.png";
import { Wine } from "@/types/myprofileTypes";
import Image from "next/image";
import defaultImg from "@/public/default_profile_img.png";

interface MyWineCardProps {
  wine: Wine;
}

export default function MyWineCard({ wine }: MyWineCardProps) {
  if (wine.image === "string") {
    wine.image = defaultImg.src;
  }

  return (
    <div className="flex gap-[40px] pt-[30px] w-[800px] h-[228px] border border-[#cfdbea] rounded-[16px] px-[40px] bg-white shadow-sm mb-[62px] items-end">
      <div className="overflow-hidden">
        <Image
          src={wine.image || defaultImg}
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
        <img
          src={hamburgerIcon.src}
          alt="더보기 버튼"
          className="size-[26px]"
        />
      </div>
    </div>
  );
}
