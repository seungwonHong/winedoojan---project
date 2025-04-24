import WineDetailCard from "@/components/wineDetail/WineDetailCard";

const WineDetailPage = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-[343px] mx-auto mt-[29px] md:w-[704px] xl:w-[1140px]">
        <div>nav컴포넌트 자리</div>
        <WineDetailCard wineId={params.id} />
      </div>
    </>
  );
};

export default WineDetailPage;
