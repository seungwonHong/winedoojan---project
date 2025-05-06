import { FiFilter } from "react-icons/fi";

const SkeletonWineReviewCard = ({ mode }: { mode: string }) => {
  return (
    <div>
      {mode === "skeleton" ? (
        <>
          <div className="flex items-center justify-between lg:w-[800px]">
            {/* 리뷰 목록 상단 헤더 */}
            <div className="lg:relative lg:w-[280px] mt-[60.5px] md:mt-[65px] lg:mt-[68px] text-[20px] text-[#2D3034] font-[700]">
              리뷰 목록
            </div>
            <div className="relative mt-[55px] md:mt-[70.5px] lg:mt-[77.5px] right-[8px]">
              <FiFilter size={20} color="gray" />
            </div>
          </div>

          {/* 모바일 태블릿 기준 리뷰, 평점 카드 */}
          <div className="block lg:hidden">
            <div className="bg-[#e8e8e8] mt-[30px] w-[345px] md:w-[704px] h-[250px] md:h-[200px] border border-[#CFDBEA] rounded-[12px]">
              <div className="flex flex-col md:flex-row ">
                <div className="flex">
                  <div className="bg-[#c8c7c7] w-[45px] h-[35px] mt-[20px] ml-[5px] rounded-xl md:mt-[45px] md:ml-[60px] md:w-[70px] md:h-[50px]" />
                  <div className="flex flex-col mt-[20px] gap-[5px] md:mt-[50px]">
                    <div className="bg-[#c8c7c7] w-[100px] h-[15px] ml-[5px] rounded-xl" />
                    <div className="bg-[#c8c7c7] w-[80px] h-[15px] ml-[5px] rounded-xl" />
                  </div>
                  <div className="bg-[#c8c7c7] w-[113px] h-[42px] mt-[11px] ml-[75px] rounded-xl md:hidden" />
                </div>
                <div className="flex flex-col mt-[35px] gap-[15px] md:mt-[40px] md:ml-[110px]">
                  <div className="flex">
                    <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px]  rounded-xl"></div>
                    <div className="bg-[#c8c7c7] w-[300px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                  </div>
                  <div className="flex">
                    <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                    <div className="bg-[#c8c7c7] w-[300px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                  </div>
                  <div className="flex">
                    <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                    <div className="bg-[#c8c7c7] w-[300px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                  </div>
                  <div className="flex">
                    <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                    <div className="bg-[#c8c7c7] w-[300px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                  </div>
                  <div className="flex">
                    <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                    <div className="bg-[#c8c7c7] w-[300px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                  </div>
                </div>
              </div>
              <div className="relative bottom-[40px] bg-[#c8c7c7] w-[113px] h-[42px] ml-[60px] rounded-xl hidden md:block " />
            </div>
          </div>
          <div className="block lg:hidden">
            <div className="bg-[#e8e8e8] mt-[12px] w-[343px] h-[446px] md:w-[704px] md:h-[532px] border border-[#CFDBEA] rounded-[12px]">
              <div className="flex mt-[15px] ml-[15px] md:mt-[30px] md:ml-[35px]">
                <div className="bg-[#c8c7c7] w-[42px] ml-[5px] h-[42px] rounded-[100px]" />
                <div className="flex flex-col gap-[8px] ml-[5px] mt-[5px]">
                  <div className="bg-[#c8c7c7] w-[150px] ml-[5px] h-[15px] rounded-xl md:w-[200px]" />
                  <div className="bg-[#c8c7c7] w-[100px] ml-[5px] h-[15px] rounded-xl" />
                </div>
                <div className="bg-[#c8c7c7] w-[10px] ml-[80px] h-[35px] rounded-xl md:ml-[351px]" />
              </div>
              <div className="flex mt-[36px]">
                <div className="bg-[#c8c7c7] w-[200px] ml-[20px] h-[28px] rounded-xl md:w-[530px]" />
                <div className="bg-[#c8c7c7] w-[70px] ml-[40px] h-[28px] rounded-xl md:ml-[40px]" />
              </div>
              <div className="bg-[#c8c7c7] w-[300px] mt-[20px] ml-[20px] h-[120px] rounded-xl md:w-[500px] md:h-[80px]" />
              <div className="bg-[#c8c7c7] w-[300px] mt-[10px] ml-[20px] h-[30px] rounded-xl md:w-[650px] md:ml-[40px]" />
              <div className="bg-[#c8c7c7] w-[300px] mt-[16px] ml-[20px] h-[30px] rounded-xl md:w-[650px] md:ml-[40px]" />
              <div className="bg-[#c8c7c7] w-[300px] mt-[16px] ml-[20px] h-[30px] rounded-xl md:w-[650px] md:ml-[40px]" />
              <div className="bg-[#c8c7c7] w-[300px] mt-[16px] ml-[20px] h-[30px] rounded-xl md:w-[650px] md:ml-[40px]" />
            </div>
          </div>

          {/* 피씨 기준 리뷰, 평점 카드 */}
          <div className="relative hidden lg:block">
            <div className="w-[800px] h-[452px] border border-[#CFDBEA] mt-[28px] rounded-[16px] flex justify-center items-center">
              <div className="w-[800px] flex flex-col justify-center items-center">
                <div className="hidden lg:block">
                  <div className="bg-[#e8e8e8] mt-[80px] w-[804px] md:h-[532px] border border-[#CFDBEA] rounded-[12px]">
                    <div className="flex mt-[15px] ml-[36px]">
                      <div className="bg-[#c8c7c7] w-[42px] ml-[5px] h-[42px] rounded-[100px]" />
                      <div className="flex flex-col gap-[8px] ml-[5px] mt-[5px]">
                        <div className="bg-[#c8c7c7] w-[150px] ml-[5px] h-[15px] rounded-xl md:w-[200px]" />
                        <div className="bg-[#c8c7c7] w-[100px] ml-[5px] h-[15px] rounded-xl" />
                      </div>
                      <div className="bg-[#c8c7c7] w-[10px] ml-[80px] h-[35px] rounded-xl md:ml-[448px]" />
                    </div>
                    <div className="flex mt-[30px] ml-[25px]">
                      <div className="bg-[#c8c7c7] w-[200px] ml-[20px] h-[38px] rounded-xl md:w-[590px]" />
                      <div className="bg-[#c8c7c7] w-[80px] ml-[40px] h-[38px] rounded-xl md:ml-[50px]" />
                    </div>
                    <div className="bg-[#c8c7c7] w-[300px] mt-[20px] ml-[40px] h-[120px] rounded-xl md:w-[500px] md:h-[80px]" />
                    <div className="bg-[#c8c7c7] w-[300px] mt-[16px] ml-[25px] h-[30px] rounded-xl md:w-[730px] md:ml-[45px]" />
                    <div className="bg-[#c8c7c7] w-[300px] mt-[16px] ml-[25px] h-[30px] rounded-xl md:w-[730px] md:ml-[45px]" />
                    <div className="bg-[#c8c7c7] w-[300px] mt-[16px] ml-[25px] h-[30px] rounded-xl md:w-[730px] md:ml-[45px]" />
                    <div className="bg-[#c8c7c7] w-[300px] mt-[16px] ml-[25px] h-[30px] rounded-xl md:w-[730px] md:ml-[45px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-[#e8e8e8] mt-[30px] w-[312px] h-[315px] absolute bottom-[200px] left-[830px] border border-[#CFDBEA] flex justify-center items-center rounded-[12px]">
                <div className="flex flex-col ">
                  <div className="flex relative left-[-55px]">
                    <div className="relative bg-[#c8c7c7] w-[75px] h-[55px] ml-[40px] rounded-xl bottom-[30px] " />
                    <div className="relative flex flex-col mt-[20px] gap-[5px] bottom-[45px] left-[10px]">
                      <div className="bg-[#c8c7c7] w-[100px] h-[15px] ml-[5px] rounded-xl" />
                      <div className="bg-[#c8c7c7] w-[80px] h-[15px] ml-[5px] rounded-xl" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[15px] relative left-[-15px]">
                    <div className="flex">
                      <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px]  rounded-xl"></div>
                      <div className="bg-[#c8c7c7] w-[200px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                    </div>
                    <div className="flex">
                      <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                      <div className="bg-[#c8c7c7] w-[200px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                    </div>
                    <div className="flex">
                      <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                      <div className="bg-[#c8c7c7] w-[200px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                    </div>
                    <div className="flex">
                      <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                      <div className="bg-[#c8c7c7] w-[200px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                    </div>
                    <div className="flex">
                      <div className="bg-[#c8c7c7] w-[22px] ml-[5px] h-[15px] rounded-xl"></div>
                      <div className="bg-[#c8c7c7] w-[200px] ml-[15px] h-[5px] mt-[5px] rounded-xl"></div>
                    </div>
                  </div>
                  <div className="relative bg-[#c8c7c7] w-[113px] h-[42px] rounded-xl top-[40px] left-[-14px]" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 모바일 태블릿 기준 리뷰, 평점 카드 */}
          <div className="block lg:hidden">
            <div className="flex justify-center items-center bg-[#e8e8e8] mt-[30px] w-[345px] md:w-[704px] h-[250px] md:h-[200px] border border-[#CFDBEA] rounded-[12px]">
              <div className="text-garnet">평점을 불러올 수 없습니다.</div>
            </div>
          </div>
          <div className="block lg:hidden">
            <div className="flex justify-center items-center bg-[#e8e8e8] mt-[12px] w-[343px] h-[446px] md:w-[704px] md:h-[532px] border border-[#CFDBEA] rounded-[12px]">
              <div className="text-garnet">리뷰를 불러올 수 없습니다.</div>
            </div>
          </div>

          {/* 피씨 기준 리뷰, 평점 카드 */}
          <div className="relative hidden lg:block">
            <div className="w-[800px] h-[452px] border border-[#CFDBEA] mt-[28px] rounded-[16px] flex justify-center items-center">
              <div className="w-[800px] flex flex-col justify-center items-center">
                <div className="hidden lg:block">
                  <div className="flex justify-center items-center bg-[#e8e8e8] mt-[80px] w-[804px] md:h-[532px] border border-[#CFDBEA] rounded-[12px]">
                    <div className="text-garnet">
                      리뷰를 불러올 수 없습니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-[#e8e8e8] mt-[30px] w-[312px] h-[315px] absolute bottom-[200px] left-[830px] border border-[#CFDBEA] flex justify-center items-center rounded-[12px]">
                <div className="flex flex-col ">
                  <div className="text-garnet">평점을 불러올 수 없습니다.</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkeletonWineReviewCard;
