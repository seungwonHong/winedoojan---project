interface ProfileHeaderProps {
  tab: "reviews" | "wines";
  setTab: (tab: "reviews" | "wines") => void;
  totalCount: number;
}

export default function ProfileHeader({
  tab,
  setTab,
  totalCount,
}: ProfileHeaderProps) {
  return (
    <div
      className={`flex gap-[32px] items-center ${
        tab === "reviews" ? "mb-[22px]" : "mb-[64px]"
      }`}
    >
      <button
        onClick={() => setTab("reviews")}
        className={`w-max h-[32px] font-bold text-lg md:text-xl ${
          tab === "reviews" ? "text-[#2D3034]" : "text-[#9FACBD]"
        }`}
      >
        내가 쓴 후기
      </button>
      <button
        onClick={() => setTab("wines")}
        className={`w-max h-[32px] font-bold text-lg md:text-xl ${
          tab === "wines" ? "text-[#2D3034]" : "text-[#9FACBD]"
        }`}
      >
        내가 등록한 와인
      </button>
      <div className="ml-auto text-sm text-burgundy">총 {totalCount}개</div>
    </div>
  );
}
