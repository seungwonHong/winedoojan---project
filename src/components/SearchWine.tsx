"use client";
import getWine from "@/services/getWine";
import searchStore from "@/store/searchStore";
import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {};

const SearchWine = (props: Props) => {
  const {
    setAllWines,
    type,
    maxPrice,
    minPrice,
    rating,
    setName,
    name,
    setNextCursor,
  } = searchStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("enter");
    try {
      console.log("search");
      console.log(`type: ${type}`);
      const res = await getWine({
        limit: 2,
        type,
        minPrice,
        maxPrice,
        rating,
        name,
      });
      console.log(`searching answer: ${res.list}`);
      setAllWines(res.list);
      setNextCursor(res.nextCursor);
    } catch (error: any) {
      if (error.response) {
        throw new Error("검색 실패");
      }
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className=" border-[1px] border-[#CFDBEA] lg:w-[800px] lg:h-[48px] md:w-[600px] md:h-[48px] w-[300px] h-[38px] pl-[55px] pr-[20px] py-[11px] lg:text-[16px] md:text-[16px] text-[14px] lg:font-normal md:font-normal font-medium rounded-[50px]"
          placeholder="와인을 검색해 보세요"
          onChange={(e) => setName(e.target.value)}
        />
        <IoSearch
          size={16.5}
          color="#9FACBD"
          className="absolute top-[16px] left-[20px]"
        />
      </form>
    </div>
  );
};

export default SearchWine;
