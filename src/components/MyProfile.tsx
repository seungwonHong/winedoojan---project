"use client";

import { User } from "@/types/myprofileTypes";
import Image from "next/image";
import images from "../../public/images/images";
import icons from "../../public/icons/icons";
import { useState } from "react";
import {
  fetchUpdateNickname,
  fetchUpdateImg,
  fetchUploadImage,
} from "@/services/myProfileApi";
import Input from "./common/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropZoneImageUploader from "./common/DropZoneImgUploader";
import { Dialog } from "@headlessui/react";
import ModalButton from "./common/ModalButton";
import clsx from "clsx";

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

  // 닉네임 수정
  const handleNicknameUpdate = async () => {
    if (nickname.trim().length < 1) {
      toast.warning("닉네임을 입력해주세요!");
      setNickname(user.nickname);
      return;
    }
    try {
      await fetchUpdateNickname({
        teamId: user.teamId,
        nickname,
        token,
      });

      toast.success("닉네임이 변경되었습니다!");
      setIsEditNick(false);
    } catch (err) {
      console.error("닉네임 업데이트 실패:", err);
    }
  };

  // 드롭존 이미지 등록
  const handleDropImg = (file: File) => {
    setImgFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 기본이미지로 변경
  const handleResetImage = async () => {
    try {
      const data = await fetchUpdateImg({
        teamId: user.teamId,
        image:
          "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1/1745594933907/default_profile_img.png",
        token,
      });
      setImg(data.image);
      setIsModalOpen(false);
    } catch (err) {
      console.error("기본 이미지로 변경 실패:", err);
    }
  };

  // 프로필 이미지 수정
  const handleImgUpload = async () => {
    if (!imgFile) return;

    try {
      const uploaded = await fetchUploadImage({
        teamId: user.teamId,
        token,
        file: imgFile,
      });
      console.log("업로드된 이미지 URL:", uploaded.url);
      console.log("닉네임:", nickname);
      const data = await fetchUpdateImg({
        teamId: user.teamId,
        image: uploaded.url,
        token,
      });
      setImg(data.image);
      setIsModalOpen(false);
      toast.success("프로필 이미지가 변경되었습니다!");
    } catch (err) {
      console.error(err);
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreview(null);
    setImgFile(null);
  };

  return (
    <div
      className={clsx(
        "border border-[#cfdbea] mx-auto rounded-[16px] shadow-[0_2px_20px_0_rgba(0_0_0_/_0.04)] w-[343px] h-[241px]",
        "md:w-[704px] md:h-[247px]",
        "lg:w-[280px] lg:h-[530px]"
      )}
    >
      <div
        className={clsx(
          "py-[39px] flex flex-row gap-[16px] p-[20px]",
          "lg:flex-col lg:px-[20px]",
          "md:px-[40px] md:items-start"
        )}
      >
        {/* 프로필 이미지 */}
        <div className="relative group">
          <img
            src={img ?? images.defaultProfile}
            alt="유저 프로필 이미지"
            className={clsx(
              "rounded-full border border-[#cfdbea] object-cover size-[60px]",
              "lg:size-[164px]",
              "md:size-[80px]"
            )}
          />
          <div
            onClick={() => setIsModalOpen(true)}
            className="absolute inset-0 bg-garnet bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <img src={icons.editProfile} className="size-[48px]" />
          </div>
        </div>
        {/* 프로필 수정 모달 */}
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
              <div className="flex flex-col gap-[8px] mt-[20px]">
                <div className="flex gap-[10px]">
                  <ModalButton
                    children="닫기"
                    onClick={handleCloseModal}
                    width="w-[108px]"
                    bgColor="bg-[#F3E7E6]"
                    textColor="text-garnet"
                  />
                  <ModalButton
                    children="변경하기"
                    onClick={handleImgUpload}
                    width="w-[280px]"
                  />
                </div>
                <div className="flex justify-end">
                  <ModalButton
                    children="기본이미지로 변경하기"
                    onClick={handleResetImage}
                    width="w-auto"
                    bgColor="bg-white"
                    textColor="text-garnet"
                    fontSize="text-[14px]"
                    fontWeight="font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        {/* 닉네임 수정 */}
        {isEditNick ? (
          <div
            className={clsx(
              "flex flex-col gap-[12px] w-[205px]",
              "lg:w-[240px]",
              "md:flex-row md:w-max md:items-center"
            )}
          >
            <input
              className="w-fill h-12 rounded-2xl px-[20px] py-[14px] border border-gray-300 focus:outline-none"
              name="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="flex justify-end gap-[8px]">
              <button
                onClick={() => setIsEditNick(false)}
                className="text-garnet bg-palepink px-[13px] py-[8px] rounded-[12px] font-medium md:h-12 md:mt-[10px]"
              >
                취소
              </button>
              <button
                onClick={handleNicknameUpdate}
                className="text-white bg-garnet px-[13px] py-[8px] rounded-[12px] font-medium md:h-12 md:mt-[10px]"
              >
                변경하기
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-[8px] md:pt-[7px]">
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
