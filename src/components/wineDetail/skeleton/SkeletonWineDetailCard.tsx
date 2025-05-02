import winegif from "../../../../public/images/winegif.gif";

const SkeletonWineDetailCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-[343px] h-[190px] bg-[#ffffff] rounded-[12px] mt-[29px] border border-[#CFDBEA] relative md:w-[704px] md:h-[260px] md:mt-[62px] lg:w-[1140px]">
        <img
          src={winegif.src}
          alt="wine card data loading..."
          className="w-[300px] h-[150px] rounded-[150px] object-contain"
        />
      </div>
    </div>
  );
};

export default SkeletonWineDetailCard;
