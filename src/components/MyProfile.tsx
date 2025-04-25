"use client";

import { User } from "@/types/myprofileTypes";
import Image from "next/image";
import images from "../../public/images/images";
import icons from "../../public/icons/icons";
import { useState } from "react";
import { fetchUpdateUser } from "@/services/myProfileApi";
import Input from "./common/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MyProfileProps {
  user: User;
  token: string;
  loadData: () => void;
}

export default function MyProfile({ user, token, loadData }: MyProfileProps) {
  const [nickname, setNickname] = useState(user.nickname);
  const [isEditNick, setIsEditNick] = useState(false);

  const handleNicknameUpdate = async () => {
    if (nickname.trim().length < 1) {
      toast.warning("닉네임을 입력해주세요!");
      setNickname(user.nickname);
      return;
    }
    try {
      await fetchUpdateUser({
        teamId: user.teamId,
        image: user.image,
        nickname,
        token,
      });
      toast.success("닉네임이 변경되었습니다!");
      setIsEditNick(false);
    } catch (err) {
      console.error("닉네임 업데이트 실패:", err);
    }
    loadData();
  };

  return (
    <div className="w-[280px] h-[530px] border border-[#cfdbea] rounded-[16px] shadow-[0_2px_20px_0_rgba(0_0_0_/_0.04)]">
      <div className="px-[20px] py-[39px] flex flex-col items-center gap-[32px] ">
        <div className="relative group">
          <Image
            src={user.image || images.defaultProfile}
            alt="유저 프로필 이미지"
            width={164}
            height={164}
            className="rounded-full border border-[#cfdbea] object-cover h-[164px] w-[164px]"
          />
          <div className="absolute inset-0 bg-garnet bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <img src={icons.editProfile} className="size-[48px]" />
          </div>
        </div>
        {isEditNick ? (
          <div className="flex flex-col gap-[12px]">
            <Input
              name="nickname"
              type="text"
              label=""
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="flex justify-end gap-[8px]">
              <button
                onClick={() => setIsEditNick(false)}
                className="text-garnet bg-palepink px-[13px] py-[8px] rounded-[12px] font-medium"
              >
                취소
              </button>
              <button
                onClick={handleNicknameUpdate}
                className="text-white bg-garnet px-[13px] py-[8px] rounded-[12px] font-medium"
              >
                변경하기
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-end gap-[8px]">
            <div className="font-bold text-2xl">{nickname}</div>
            <img
              src={icons.editProfile}
              className="w-[22px] h-[25px] pb-[1px] cursor-pointer"
              onClick={() => setIsEditNick(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
