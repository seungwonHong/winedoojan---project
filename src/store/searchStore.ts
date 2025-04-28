import { WineResponse } from "@/services/getWine";
import { create } from "zustand";

interface Options {
  keyword: string;
  setKeyword: (keyword: string) => void;
  type: string | undefined;
  setType: (type: string | undefined) => void;
  minPrice: number | undefined;
  setMinPrice: (minPrice: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (maxPrice: number | undefined) => void;
  rating: number | undefined;
  setRating: (rating: number | undefined) => void;
  allWines: WineResponse["list"];
  setAllWines: (allWines: WineResponse["list"]) => void;
  name: string | undefined;
  setName: (name: string | undefined) => void;
  nextCursor: number | undefined;
  setNextCursor: (nextCursor: number | undefined) => void;
}

const searchStore = create<Options>((set) => ({
  keyword: "",
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  allWines: [],
  name: undefined,
  nextCursor: undefined,
  setKeyword: (keyword) => set({ keyword }),
  setType: (type) => set({ type }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setRating: (rating) => set({ rating }),
  setAllWines: (allWines) => set({ allWines }),
  setName: (name) => set({ name }),
  setNextCursor: (nextCursor) => set({ nextCursor }),
}));

export default searchStore;
