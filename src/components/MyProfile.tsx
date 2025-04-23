"use client";

import { User } from "@/types/myprofileTypes";
import Image from "next/image";
import defaultImg from "@/public/images/default_profile_img.png";
import editIcon from "@/public/icons/ic_edit.png";
import { useState } from "react";

interface MyProfileProps {
  user: User;
}

export default function MyProfile({ user }: MyProfileProps) {
  const [nickname, setNickname] = useState(user.nickname);

  return (
    <div className="w-[280px] h-[530px] border border-[#cfdbea] rounded-[16px] shadow-[0_2px_20px_0_rgba(0_0_0_/_0.04)]">
      <div className="px-[20px] py-[39px] flex flex-col items-center gap-[32px]">
        <Image
          src={user.image || defaultImg}
          alt="유저 프로필 이미지"
          width={164}
          height={164}
          className="rounded-full border border-[#cfdbea] object-cover h-[164px] w-[164px]"
        />
        <div className="flex items-end gap-[8px]">
          <div className="font-bold text-2xl">{user.nickname}</div>
          <img src={editIcon.src} className="w-[22px] h-[25px] pb-[1px]" />
        </div>
      </div>
    </div>
  );
}
