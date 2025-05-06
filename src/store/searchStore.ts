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
  allWines: WineResponse["list"] | null;
  setAllWines: (allWines: WineResponse["list"] | null) => void;
  name: string | undefined;
  setName: (name: string | undefined) => void;
  nextCursor: number | undefined;
  setNextCursor: (nextCursor: number | undefined) => void;
  buttonClick: { red: boolean; white: boolean; sparkling: boolean };
  setButtonClick: (buttonClick: {
    red: boolean;
    white: boolean;
    sparkling: boolean;
  }) => void;
  checkBoxClick: {
    all: boolean;
    "4.5": boolean;
    "4": boolean;
    "3.5": boolean;
    "3": boolean;
  };
  setCheckBoxClick: (checkBoxClick: {
    all: boolean;
    "4.5": boolean;
    "4": boolean;
    "3.5": boolean;
    "3": boolean;
  }) => void;
}

const searchStore = create<Options>((set) => ({
  keyword: "",
  type: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  allWines: null,
  name: undefined,
  nextCursor: undefined,
  buttonClick: { red: false, white: false, sparkling: false },
  checkBoxClick: {
    all: false,
    "4.5": false,
    "4": false,
    "3.5": false,
    "3": false,
  },
  setKeyword: (keyword) => set({ keyword }),
  setType: (type) => set({ type }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setRating: (rating) => set({ rating }),
  setAllWines: (allWines) => set({ allWines }),
  setName: (name) => set({ name }),
  setNextCursor: (nextCursor) => set({ nextCursor }),
  setButtonClick: (buttonClick) => set({ buttonClick }),
  setCheckBoxClick: (checkBoxClick) => set({ checkBoxClick }),
}));

export default searchStore;
