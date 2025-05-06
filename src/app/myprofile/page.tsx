"use client";

import {
  fetchReviews,
  fetchWines,
  fetchDeleteReviewId,
  fetchDeleteWineId,
} from "../../services/myProfileApi";
import { Wine, Review } from "@/types/myprofileTypes";
import MyProfile from "@/components/myProfile/MyProfile";
import { useEffect, useState } from "react";
import images from "../../../public/images/images";
import Header from "@/components/common/Header";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import WineModal from "@/components/modals/WineModal";
import Image from "next/image";
import clsx from "clsx";
import DeleteModal from "@/components/modals/DeleteModal";
import ReviewModal from "@/components/modals/ReviewModal";
import ProfileHeader from "@/components/myProfile/ProfileHeader";
import ProfileList from "@/components/myProfile/ProfileList";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [tab, setTab] = useState<"reviews" | "wines">("reviews");
  const [openId, setOpenId] = useState<number | null>(null); // 햄버거 버튼 열기/닫기를 위한 상태
  const [myProfileData, setMyProfileData] = useState({
    reviews: [] as Review[],
    reviewCursor: null as number | null,
    wines: [] as Wine[],
    wineCursor: null as number | null,
    totalCount: 0,
    updatedAt: null as string | null,
  });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isWineModalOpen, setIsWineModalOpen] = useState(false);
  // HamburgerMenu에 모달이 종속되는 문제 해결하기 위한 state
  const [editModalData, setEditModalData] = useState<{
    type: "review" | "wine";
    item: Review | Wine;
  } | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<{
    type: "review" | "wine";
    item: Review | Wine;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const limit = 3;

  // 리뷰/와인 목록 가져오기
  const getList = async (tab: "reviews" | "wines", isLoadMore = false) => {
    if (!user || !accessToken) return;

    const cursorKey = tab === "reviews" ? "reviewCursor" : "wineCursor";
    const cursor = isLoadMore ? myProfileData[cursorKey] : undefined;
    const listKey = tab;

    if (isLoadMore && cursor === null) return;

    const res =
      tab === "reviews"
        ? await fetchReviews({
            teamId: user.teamId,
            limit,
            token: accessToken,
            cursor,
          })
        : await fetchWines({
            teamId: user.teamId,
            limit,
            token: accessToken,
            cursor,
          });

    setMyProfileData((prev) => {
      const newList = isLoadMore ? [...prev[listKey], ...res.list] : res.list;

      newList.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      return {
        ...prev,
        [listKey]: newList,
        [cursorKey]: res.nextCursor ?? null,
        totalCount: res.totalCount,
      };
    });
  };

  const loadData = async (tab: "reviews" | "wines", isLoadMore = false) => {
    // skeleton ui 보여주기
    if (!isLoadMore) setIsLoading(true);
    await getList(tab, isLoadMore);
    if (!isLoadMore) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const handleEdit = (type: "review" | "wine", item: Review | Wine) => {
    setEditModalData({ type, item });
  };

  const handleDelete = (type: "review" | "wine", item: Review | Wine) => {
    setDeleteModalData({ type, item });
  };

  // 초기 로딩
  useEffect(() => {
    if (user && accessToken) {
      setMyProfileData((prev) => ({
        ...prev,
        reviews: [],
        reviewCursor: null,
        wines: [],
        wineCursor: null,
        totalCount: 0,
      }));
      loadData(tab);
    }
  }, [user, accessToken, tab]);

  // 스크롤 시 추가 로딩
  useEffect(() => {
    loadData(tab, true);
  }, [inView, tab]);

  // 등록된 리뷰 없을 때 버튼 클릭 함수
  useEffect(() => {
    if (isReviewModalOpen) {
      router.push("/wines");
    }
  }, [isReviewModalOpen]);

  useEffect(() => {
    loadData(tab);
  }, [myProfileData.updatedAt]);

  // useEffect(() => {
  //   if (!user || !accessToken) {
  //     router.push("/signin");
  //   }
  // }, [user, accessToken]);

  if (!user || !accessToken) {
    return (
      <div className="flex flex-col gap-[8px] justify-center items-center h-screen text-lg font-bold text-burgundy">
        <Image
          className="max-md:w-28"
          src={images.wineGif}
          alt="로딩중..."
          width={200}
          height={100}
        />
        로딩 중...
      </div>
    );
  }

  // 리뷰카드, 와인카드에 넘겨줄 props
  const commonCardProps = {
    teamId: user.teamId,
    token: accessToken,
    onSuccess: () => loadData(tab),
    tab,
    openId,
    setOpenId,
    onEdit: (item: Review | Wine) =>
      handleEdit(tab === "reviews" ? "review" : "wine", item),
    onDelete: (item: Review | Wine) =>
      handleDelete(tab === "reviews" ? "review" : "wine", item),
  };

  return (
    <div className="w-max mx-auto mt-5 md:mt-10">
      <Header />

      <div
        className={clsx(
          "flex justify-start gap-[30px] md:gap-10 lg:gap-[60px] flex-col mx-auto w-[343px] mt-5 lg:mt-[37px]",
          "lg:flex-row lg:w-[1140px] md:w-[704px]"
        )}
      >
        {/* 프로필 이미지, 닉네임*/}
        <MyProfile user={user} token={accessToken} />

        <div>
          {/* 탭 */}
          <ProfileHeader
            tab={tab}
            setTab={setTab}
            totalCount={myProfileData.totalCount}
          />

          {/* 목록 */}
          <ProfileList
            tab={tab}
            isLoading={isLoading}
            reviews={myProfileData.reviews}
            wines={myProfileData.wines}
            onClickReview={(review) => router.push(`/wines/${review.wine.id}`)}
            onClickWine={(wine) => router.push(`/wines/${wine.id}`)}
            commonCardProps={commonCardProps}
            ref={ref}
          />
        </div>
      </div>
      {/* 등록된 와인이 없을 경우 */}
      {isWineModalOpen && (
        <WineModal
          onClose={async () => {
            setEditModalData(null);
            await loadData(tab);
          }}
          accessToken={accessToken}
          mode="create"
        />
      )}
      {/* 수정 모달 */}
      {editModalData &&
        (editModalData.type === "review" ? (
          <ReviewModal
            onClose={async () => {
              setEditModalData(null);
              await loadData(tab);
            }}
            accessToken={accessToken}
            wineName={(editModalData.item as Review).wine.name}
            wineId={editModalData.item.id}
            mode="edit"
            existingReviewData={editModalData.item as Review}
          />
        ) : (
          <WineModal
            onClose={() => setEditModalData(null)}
            accessToken={accessToken}
            mode="edit"
            wineData={editModalData.item as Wine}
          />
        ))}

      {/* 삭제 모달 */}
      {deleteModalData && (
        <DeleteModal
          onClose={() => setDeleteModalData(null)}
          onConfirm={async () => {
            if (deleteModalData.type === "review") {
              await fetchDeleteReviewId({
                teamId: user.teamId,
                id: deleteModalData.item.id,
                token: accessToken,
              });
            } else {
              await fetchDeleteWineId({
                teamId: user.teamId,
                id: deleteModalData.item.id,
                token: accessToken,
              });
            }
            await loadData(tab);
            setDeleteModalData(null);
          }}
          accessToken={accessToken}
          id={deleteModalData.item.id.toString()}
          type={deleteModalData.type}
        />
      )}
    </div>
  );
}
