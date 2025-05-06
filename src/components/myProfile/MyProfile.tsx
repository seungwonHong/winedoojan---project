'use client';
import { User } from '@/types/schema';
import images from '../../../public/images/images';
import icons from '../../../public/icons/icons';
import { useEffect, useState } from 'react';
import {
  fetchUpdateNickname,
  fetchUpdateImg,
  fetchUploadImage,
} from '@/services/myProfileApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropZoneImageUploader from '../common/DropZoneImgUploader';
import { Dialog } from '@headlessui/react';
import ModalButton from '../common/ModalButton';
import clsx from 'clsx';
import { useAuthStore } from '@/store/authStore';

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
  const { getMe } = useAuthStore();

  // 닉네임 수정
  const handleNicknameUpdate = async () => {
    if (nickname.trim().length < 1) {
      toast.warning('닉네임을 입력해주세요!');
      setNickname(user.nickname);
      return;
    }
    try {
      await fetchUpdateNickname({
        teamId: user.teamId,
        nickname,
        token,
      });

      toast.success('닉네임이 변경되었습니다!');
      setIsEditNick(false);
      await getMe();
    } catch (err) {
      console.error('닉네임 업데이트 실패:', err);
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
          'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1/1745594933907/default_profile_img.png',
        token,
      });
      setImg(data.image);
      setIsModalOpen(false);
      await getMe();
    } catch (err) {
      console.error('기본 이미지로 변경 실패:', err);
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
      console.log('업로드된 이미지 URL:', uploaded.url);
      console.log('닉네임:', nickname);
      const data = await fetchUpdateImg({
        teamId: user.teamId,
        image: uploaded.url,
        token,
      });
      setImg(data.image);
      setIsModalOpen(false);
      await getMe();
      toast.success('프로필 이미지가 변경되었습니다!');
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await getMe();
      } catch (error) {
        console.error('사용자 정보 로딩 실패:', error);
      }
    };
    fetchUserData();
    console.log(fetchUserData);
  }, []);

  return (
    <div
      className={clsx(
        'border border-[#cfdbea] mx-auto rounded-[16px] shadow-[0_2px_20px_0_rgba(0_0_0_/_0.04)] w-full h-[190px]',
        'md:w-full md:h-[200px]',
        'lg:w-[280px] lg:h-[530px] lg:mx-0'
      )}
    >
      <div
        className={clsx(
          'py-[39px] flex flex-row gap-[16px] p-[20px]',
          'lg:flex-col lg:px-[20px] lg:items-center',
          'md:px-[40px] md:items-start'
        )}
      >
        {/* 프로필 이미지 */}
        <div className="relative group">
          <img
            src={img ?? images.defaultProfile}
            alt="유저 프로필 이미지"
            className={clsx(
              'rounded-full border border-[#cfdbea] object-cover size-[60px]',
              'lg:size-[164px]',
              'md:size-[80px]'
            )}
          />
          <div
            onClick={() => setIsModalOpen(true)}
            className={clsx(
              'absolute inset-0 bg-burgundy bg-opacity-40 rounded-full flex items-center justify-center opacity-0',
              'group-hover:opacity-100 cursor-pointer',
              'sm:size-[60px] lg:size-[164px] md:size-[80px]'
            )}
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
                    textColor="text-burgundy"
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
                    textColor="text-burgundy"
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
              'flex flex-col gap-[12px] w-[205px]',
              'lg:w-[240px] lg:flex-col lg:items-end',
              'md:flex-row md:w-max md:items-center'
            )}
          >
            <input
              className="w-full h-12 rounded-2xl px-[20px] py-[14px] border border-gray-300 focus:outline-none"
              name="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="flex justify-end gap-[8px]">
              <ModalButton
                children="취소"
                onClick={() => setIsEditNick(false)}
                rounded="rounded-[12px]"
                fontWeight="font-medium"
                bgColor="bg-mistyrose"
                textColor="text-burgundy"
                height="h-[42px]"
                width="w-max"
                className="px-[13px] py-[8px] md:h-12"
              />
              <ModalButton
                children="변경하기"
                onClick={handleNicknameUpdate}
                rounded="rounded-[12px]"
                fontWeight="font-medium"
                bgColor="bg-burgundy"
                textColor="text-white"
                height="h-[42px]"
                width="w-max"
                className="px-[13px] py-[8px] md:h-12"
              />
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
