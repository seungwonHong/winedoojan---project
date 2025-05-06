const SkeletonWineDetailCard = ({ mode }: { mode: string }) => {
  return (
    <div>
      {mode === "skeleton" ? (
        <div className="flex flex-col w-[343px] h-[190px] bg-[#e8e8e8] rounded-[12px] mt-[29px] border border-[#CFDBEA] relative md:w-[704px] md:h-[260px] md:mt-[62px] lg:w-[1140px]">
          <div className="flex">
            <div className="bg-[#c8c7c7] rounded-xl w-[58px] h-[190px] ml-[20px] md:w-[84px] md:h-[260px] md:ml-[60px] lg:w-[45px] lg:h-[200px] lg:ml-[70px] lg:mt-[58px]" />
            <div className="flex flex-col gap-[15px] mt-[15px] ">
              <div className="bg-[#c8c7c7] rounded-xl w-[200px] h-[20px] ml-[23px] md:w-[450px] md:h-[30px] md:ml-[60px] lg:mt-[20px] lg:w-[400px]  " />
              <div className="bg-[#c8c7c7] rounded-xl w-[200px] h-[20px] ml-[23px] md:w-[400px] md:h-[30px] md:ml-[60px] lg:w-[400px]  " />
              <div className="bg-[#c8c7c7] rounded-xl w-[200px] h-[20px] ml-[23px] md:w-[250px] md:h-[30px] md:ml-[60px] lg:w-[400px]" />
              <div className="bg-[#c8c7c7] rounded-xl w-[150px] h-[20px] ml-[23px] md:w-[150px] md:h-[30px] md:ml-[60px] md:mt-[13px] lg:mt-[0px] " />
              <div className="bg-[#c8c7c7] rounded-xl w-[100px] h-[20px] ml-[23px] md:w-[150px] md:h-[30px] md:ml-[60px] " />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-[343px] h-[190px] bg-[#e8e8e8] rounded-[12px] mt-[29px] border border-[#CFDBEA] relative md:w-[704px] md:h-[260px] md:mt-[62px] lg:w-[1140px]">
          <div className="text-garnet ">와인 정보를 불러오지 못했습니다.</div>
        </div>
      )}
    </div>
  );
};

export default SkeletonWineDetailCard;
