const WineTasteSlider = ({
  value,
  flavorKeyword,
  minLabel,
  maxLabel,
}: Review) => {
  return (
    <div className="flex items-center gap-[8px] w-full mt-[16px] mb-[12px]">
      <div className="w-[60px] text-center py-[6px] px-[12px] bg-[#F4F6FA] text-[#9FACBD] text-[12px] font-semibold rounded-[12px]">
        {flavorKeyword}
      </div>
      <div className="text-[#2D3034] w-[70px] text-[14px]">{minLabel}</div>
      <div className="relative w-[110px] h-[6px] bg-[#E3EAF2] rounded-full md:w-[396px] lg:w-[491px]">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[12px] h-[12px] bg-[#830E00] rounded-full"
          style={{
            left: `${(value / 10) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
      <div className="text-[#2D3034] w-[70px] text-[14px] text-right">
        {maxLabel}
      </div>
    </div>
  );
};

export default WineTasteSlider;

interface Review {
  value: number;
  flavorKeyword: string;
  minLabel: string;
  maxLabel: string;
}
