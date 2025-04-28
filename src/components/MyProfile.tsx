"use client";

import { User } from "@/types/myprofileTypes";
import Image from "next/image";
import images from "../../public/images/images";
import icons from "../../public/icons/icons";
import { useState } from "react";
import { fetchUpdateUser, fetchUploadImage } from "@/services/myProfileApi";
import Input from "./common/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropZoneImageUploader from "./common/DropZoneImgUploader";
import { Dialog } from "@headlessui/react";

interface MyProfileProps {
  user: User;
  token: string | null;
}

export default function MyProfile({ user, token }: MyProfileProps) {
  const [nickname, setNickname] = useState(user.nickname);
  const [img, setImg] = useState(user.image);
  const [isEditNick, setIsEditNick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
  };

  const handleDropImg = (file: File) => {
    setImgFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleResetImage = async () => {
    try {
      const data = await fetchUpdateUser({
        teamId: user.teamId,
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1/1745594933907/default_profile_img.png",
        nickname,
        token,
      });
      setImg(data.image);
      setIsModalOpen(false);
    } catch (err) {
      console.error("기본 이미지로 변경 실패:", err);
    }
  };

  const handleImgUpload = async () => {
    if (!imgFile) {
      return;
    }
    try {
      const uploaded = await fetchUploadImage(user.teamId, token, imgFile);
      const data = await fetchUpdateUser({
        teamId: user.teamId,
        image: uploaded.url,
        nickname,
        token,
      });
      setImg(data.image);
      setIsModalOpen(false);
      toast.success("프로필 이미지가 변경되었습니다!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreview(null);
    setImgFile(null);
  };

  return (
    <div className="w-[280px] h-[530px] border border-[#cfdbea] rounded-[16px] shadow-[0_2px_20px_0_rgba(0_0_0_/_0.04)]">
      <div className="px-[20px] py-[39px] flex flex-col items-center gap-[32px] ">
        <div className="relative group">
          <img
            src={img ?? images.defaultProfile}
            alt="유저 프로필 이미지"
            className="rounded-full border border-[#cfdbea] object-cover h-[164px] w-[164px]"
          />
          <div
            onClick={() => setIsModalOpen(true)}
            className="absolute inset-0 bg-garnet bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <img src={icons.editProfile} className="size-[48px]" />
          </div>
        </div>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-lg font-semibold mb-4">이미지 업로드</h2>
              <DropZoneImageUploader onFileSelected={handleDropImg} />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="미리보기 이미지"
                    className="w-32 h-32 rounded-full object-cover mx-auto border"
                  />
                </div>
              )}
              <button
                onClick={handleImgUpload}
                className="mt-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                변경하기
              </button>
              <button
                onClick={handleResetImage}
                className="mt-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                기본이미지로 변경하기
              </button>
              <button
                className="mt-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCloseModal}
              >
                닫기
              </button>
            </div>
          </div>
        </Dialog>
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
        <div className="flex items-end justify-center gap-[8px]">
          <div className="font-bold text-2xl">{nickname}</div>
          <img
            src={icons.editProfile}
            className="w-[22px] h-[25px] pb-[1px] cursor-pointer"
            onClick={() => setIsEditNick(true)}
          />
        </div>
      )}
    </div>
  );
}
