import Header from "@/components/common/Header";
import getWine from "@/services/getWine";
import Image from "next/image";
import WineMotionList from "@/components/WineMotionList";
import LandingWineRec from "@/components/LandingWineRec";
import getWineRecommended from "@/services/getWineRecommended";
import LandingWineFilter from "@/components/LandingWineFilter";
import LandingReviewSys from "@/components/LandingReviewSys";
import ExploreWineButton from "@/components/ExploreWineButton";
import LandingPageRedirect from "@/components/LandingPageRedirect";

export const metadata = {
  title: "와인두잔 | 랜딩 페이지",
  description:
    "전세계의 다양한 와인들이 모두 있는 최고의 와인 공유 플랫폼입니다. 와인두잔과 함께하며 다양한 와인들을 만나보세요!",
};

export default async function Home() {
  const wines = await getWine({ limit: 5 });
  const { wines: winesRecommended } = await getWineRecommended({
    limit: 2,
  });

  return (
    <div className="flex flex-col items-center lg:px-[390px] lg:pt-[24px] lg:pb-[109px] md:px-[20px] md:pt-[24px] md:pb-[72px] px-[16px] pt-[16px] pb-[62px]">
      <LandingPageRedirect />

      <Header />

      <div className="flex flex-col items-center overflow-hidden lg:mt-[80px] mt-[24px] lg:px[98px] lg:pb-0 md:px-[58px] lg:w-[1140px] lg:h-[535px] md:w-[704px] md:h-[394px] w-[343px] h-[403px] rounded-2xl bg-[#171A21]">
        <Image
          width={140}
          height={100}
          alt="logo_letter"
          src="/images/와인두잔.svg"
          quality={100}
          className="lg:mt-[100px] md:mt-[70px] mt-[70px]"
        />
        <div className="flex flex-col items-center lg:mt-[30px] md:mt-[30px] text-[white] text-2xl font-bold">
          <p>한 곳에서 관리하는</p>
          <p>나만의 와인창고</p>
        </div>

        <div className="flex flex-row items-end justify-center">
          <WineMotionList wines={wines.list} />
        </div>
      </div>

      <LandingWineRec winesRecommended={winesRecommended} />

      <LandingWineFilter />

      <LandingReviewSys />

      <ExploreWineButton />
    </div>
  );
}
