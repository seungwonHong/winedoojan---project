'use client';
import Header from '@/components/common/Header';
import SearchOptions from '@/components/SearchOptions';
import SearchWine from '@/components/SearchWine';
import WineCardBig from '@/components/WineCardBig';
import WineListRecWine from '@/components/WineListRecWine';
import useWineListWines from '@/hooks/useWineListWines';
import useWineRecommended from '@/hooks/useWineRecommended';
import { IoOptions } from 'react-icons/io5';
import React, { useEffect, useState } from 'react';
import WineCardBigSkeleton from '@/components/WineCardBigSkeleton';
import LoadingAnimation from '@/components/common/LoadingAnimation';
import ModalButton from '@/components/common/ModalButton';
import FilterModal from '@/components/modals/FilterModal';
import WineModal from '@/components/modals/WineModal';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

const Wines = () => {
  const [isClose, setIsClose] = useState(true);
  const [addWine, setAddWine] = useState(false);
  const { wines } = useWineRecommended();
  const { allWines, loading } = useWineListWines({ limit: 2 });
  const { accessToken, isAuthenticated } = useAuthStore.getState();

  const handleClick = () => {
    setAddWine(!addWine);
  };

  const AddModal = () => {
    setAddWine(!addWine);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:px-[390px] lg:pt-[24px] lg:pb-[109px] md:px-[20px] md:pt-[24px] md:pb-[72px] px-[16px] pt-[16px] pb-[62px]">
        <Header />

        <WineListRecWine wines={wines} />

        <div className="flex flex-row lg:w-[1140px] justify-center md:w-[704px] w-[343px]">
          <div className="flex flex-col md:flex-row lg:mt-[150px]  md:mt-[40px] mt-[24px]">
            <div className="lg:flex lg:flex-col md:flex-row hidden">
              <SearchOptions />
              {isAuthenticated && (
                <ModalButton
                  onClick={handleClick}
                  width="w-[284px]"
                  height="h-[50px]"
                >
                  와인 등록하기
                </ModalButton>
              )}
            </div>

            <div className="lg:hidden flex flex-row items-center justify-center lg:w-[48px] md:h-[48px] w-[36px] h-[36px]  md:w-[48px] lg:h-[48px] border-[1px] border-[#CFDBEA] rounded-lg ">
              <IoOptions
                size={19.5}
                className="cursor-pointer"
                onClick={() => setIsClose(false)}
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:mt-[40px] md:mt-[40px] mt-[24px] lg:ml-[60px] md:ml-auto ml-[10px]">
            <SearchWine />

            {isAuthenticated && (
              <ModalButton
                onClick={handleClick}
                width="w-[114px]"
                height="h-[38px]"
                fontSize="text-[14px]"
                className="lg:hidden ml-auto md:mt-[20px] mt-[10px] md:h-[48px] md:w-[220px]"
              >
                와인 등록하기
              </ModalButton>
            )}

            {allWines !== null && allWines?.length > 0 ? (
              <>
                {allWines.map((allwine) => (
                  <WineCardBig key={allwine.id} wine={allwine} />
                ))}
                {loading && <LoadingAnimation />}
              </>
            ) : allWines !== null && allWines?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Image
                  src="/images/empty.png"
                  alt="searchNotFound"
                  className="w-[120px] h-[120px] max-lg:mt-[100px]"
                  width={120}
                  height={120}
                />
                <span className="lg:text-[24px] font-semibold text-[#800020] lg:mt-[30px] md:mt-[20px] mt-[20px]">
                  검색 결과가 없습니다
                </span>
              </div>
            ) : (
              Array.from({ length: 10 }).map((_, index) => (
                <WineCardBigSkeleton key={index} />
              ))
            )}
          </div>
        </div>
      </div>
      {!isClose && <FilterModal setIsClose={setIsClose} />}
      {addWine && (
        <WineModal onClose={AddModal} mode="create" accessToken={accessToken} />
      )}
    </>
  );
};

export default Wines;
