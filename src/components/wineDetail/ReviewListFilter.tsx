import { useState } from "react";

import { FiFilter } from "react-icons/fi";

import { ReviewListFilterProps } from "@/types/wineDetailTypes";

const ReviewListFilter = ({ reviews, onSort }: ReviewListFilterProps) => {
  const [sortOption, setSortOption] = useState<
    "latest" | "highRating" | "lowRating"
  >("latest");
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (option: "latest" | "highRating" | "lowRating") => {
    const sorted = [...reviews].sort((a, b) => {
      if (option === "latest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (option === "highRating") return b.rating - a.rating;
      return a.rating - b.rating;
    });
    setSortOption(option);
    onSort(sorted);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen((prev) => !prev)} className="p-[8px]">
        <FiFilter size={20} color="gray" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-[8px] w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg z-30">
          <button
            onClick={() => handleSort("latest")}
            className={`w-full px-4 py-2 text-left rounded-t-md ${
              sortOption === "latest"
                ? "bg-garnet text-white"
                : "hover:bg-palepink"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => handleSort("highRating")}
            className={`w-full px-4 py-2 text-left ${
              sortOption === "highRating"
                ? "bg-garnet text-white"
                : "hover:bg-palepink"
            }`}
          >
            높은 별점순
          </button>
          <button
            onClick={() => handleSort("lowRating")}
            className={`w-full px-4 py-2 text-left rounded-b-md ${
              sortOption === "lowRating"
                ? "bg-garnet text-white"
                : "hover:bg-palepink"
            }`}
          >
            낮은 별점순
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewListFilter;
