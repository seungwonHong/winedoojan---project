import Header from "@/components/common/Header";
import WineDetail from "@/components/wineDetail/WineDetail";

export const metadata = {
  title: "와인두잔 | 와인 상세 페이지",
  description:
    "와인두잔 페이지에 등록된 다양한 와인들의 상세 정보를 담고 있는 와인 상세 페이지입니다. 궁금한 와인들의 자세한 정보를 탐색해보세요!",
};

const WineDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <>
      <div className="w-[343px] mx-auto mt-[29px] md:w-[704px] lg:w-[1140px]">
        <Header />
        <WineDetail wineId={id} />
      </div>
    </>
  );
};

export default WineDetailPage;
