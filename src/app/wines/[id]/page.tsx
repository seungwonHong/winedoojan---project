import Header from "@/components/common/Header";
import WineDetail from "@/components/wineDetail/WineDetail";

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
