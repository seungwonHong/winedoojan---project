import getWine, { WineResponse } from "@/services/getWine";
import searchStore from "@/store/searchStore";
import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";

interface Props {
  limit: number;
}

const useWineListWines = ({ limit }: Props) => {
  const {
    type,
    minPrice,
    maxPrice,
    rating,
    setAllWines,
    allWines,
    name,
    nextCursor,
    setNextCursor,
  } = searchStore();
  const loadingRef = useRef(false); // 즉시 반영을 위해 ref
  const [loading, setLoading] = useState(false);

  const bringWines = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    const res = await getWine({
      limit,
      cursor: nextCursor,
      type,
      minPrice,
      maxPrice,
      rating,
      name,
    });

    setAllWines(
      allWines?.length === 0
        ? res.list ?? []
        : [...(allWines ?? []), ...(res.list ?? [])]
    );
    setNextCursor(res.nextCursor ?? undefined);
    loadingRef.current = false;
    setLoading(false);
  }, [nextCursor]);
  console.log(`nextCursor: ${nextCursor}`);

  useEffect(() => {
    bringWines();
  }, []);

  // 스크롤 이벤트(무한 스크롤)
  useEffect(() => {
    const handleScroll = () => {
      if (loadingRef.current || nextCursor === undefined) {
        console.log("안불림");
        return;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20
      ) {
        console.log("불림");
        bringWines();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextCursor, bringWines]);

  return {
    allWines,
    loading,
  };
};

export default useWineListWines;
