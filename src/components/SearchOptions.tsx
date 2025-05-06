"use client";
import searchStore from "@/store/searchStore";
import {
  backgroundColor,
  handleCheck,
  handleClick,
  textColor,
} from "@/utils/searchOptionsManage";
import React, { useState } from "react";

const SearchOptions = () => {
  const { setMinPrice, setMaxPrice, checkBoxClick } = searchStore();

  return (
    <div className="w-[284px] h-[518px] flex flex-col">
      <span className="text-[20px] text-[#2D3034] font-bold">WINE TYPES</span>

      <div className="flex flex-row mt-[12px]">
        <div
          onClick={() => handleClick("RED")}
          className={`flex flex-row items-center justify-center w-[65px] h-[42px] rounded-full border-[1px] border-[#CFDBEA] ${
            backgroundColor().red
          } cursor-pointer`}
        >
          <span className={`text-[16px] ${textColor().red} font-medium`}>
            Red
          </span>
        </div>
        <div
          onClick={() => handleClick("WHITE")}
          className={`flex flex-row items-center justify-center w-[79px] h-[42px] rounded-full border-[1px] border-[#CFDBEA] ml-[15px] ${
            backgroundColor().white
          } cursor-pointer`}
        >
          <span className={`text-[16px] ${textColor().white} font-medium`}>
            White
          </span>
        </div>
        <div
          onClick={() => handleClick("SPARKLING")}
          className={`flex flex-row items-center justify-center w-[105px] h-[42px] rounded-full border-[1px] border-[#CFDBEA] ml-[15px] ${
            backgroundColor().sparkling
          } cursor-pointer`}
        >
          <span className={`text-[16px] ${textColor().sparkling} font-medium`}>
            Sparkling
          </span>
        </div>
      </div>

      <span className="text-[20px] text-[#2D3034] font-bold mt-[53px]">
        PRICE
      </span>
      <div className="flex flex-row items-center mt-[20px]">
        <input
          type="number"
          inputMode="numeric"
          onKeyDown={(e) => {
            if (["-", "+", "e", "E", ".", ","].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-[1px] border-[#CFDBEA] rounded-2xl w-[120px] h-[30px] px-[10px]"
          onChange={(e) => {
            const value = e.target.value;
            setMinPrice(value === "" ? undefined : Number(value));
          }}
        />
        <span className="ml-[15px] mr-[15px]">~</span>
        <input
          type="number"
          inputMode="numeric"
          onKeyDown={(e) => {
            if (["-", "+", "e", "E", ".", ","].includes(e.key)) {
              e.preventDefault();
            }
          }}
          className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-[1px] border-[#CFDBEA] rounded-2xl w-[120px] h-[30px] px-[10px]"
          onChange={(e) => {
            const value = e.target.value;
            setMaxPrice(value === "" ? undefined : Number(value));
          }}
        />
      </div>

      <span className="text-[20px] text-[#2D3034] font-bold mt-[56px]">
        RATING
      </span>
      <div className="flex flex-row mt-[10px]">
        <div
          onClick={() => handleCheck("all")}
          className="w-[20px] h-[20px] border-[1px] border-[#CFDBEA] bg-[#F2F4F8] rounded-md mr-[5px] px-[5px] py-[5px] cursor-pointer"
        >
          {checkBoxClick.all ? (
            <div className="w-[10px] h-[10px] bg-[#800020] rounded-[3px]"></div>
          ) : (
            <></>
          )}
        </div>
        <span className="text-[16px] text-[#2D3034] font-medium">전체</span>
      </div>
      <div className="flex flex-row mt-[10px]">
        <div
          onClick={() => handleCheck("4.5")}
          className="w-[20px] h-[20px] border-[1px] border-[#CFDBEA] bg-[#F2F4F8] rounded-md mr-[5px] px-[5px] py-[5px] cursor-pointer"
        >
          {checkBoxClick["4.5"] ? (
            <div className="w-[10px] h-[10px] bg-[#800020] rounded-[3px]"></div>
          ) : (
            <></>
          )}
        </div>
        <span className="text-[16px] text-[#2D3034] font-medium">
          5.0 ~ 4.5
        </span>
      </div>
      <div className="flex flex-row mt-[10px]">
        <div
          onClick={() => handleCheck("4")}
          className="w-[20px] h-[20px] border-[1px] border-[#CFDBEA] bg-[#F2F4F8] rounded-md mr-[5px] px-[5px] py-[5px] cursor-pointer"
        >
          {checkBoxClick["4"] ? (
            <div className="w-[10px] h-[10px] bg-[#800020] rounded-[3px]"></div>
          ) : (
            <></>
          )}
        </div>
        <span className="text-[16px] text-[#2D3034] font-medium">
          4.5 ~ 4.0
        </span>
      </div>
      <div className="flex flex-row mt-[10px]">
        <div
          onClick={() => handleCheck("3.5")}
          className="flex flex-row items-center justify-center w-[20px] h-[20px] border-[1px] border-[#CFDBEA] bg-[#F2F4F8] rounded-md mr-[5px] cursor-pointer"
        >
          {checkBoxClick["3.5"] ? (
            <div className="w-[10px] h-[10px] bg-[#800020] rounded-[3px]"></div>
          ) : (
            <></>
          )}
        </div>
        <span className="text-[16px] text-[#2D3034] font-medium">
          4.0 ~ 3.5
        </span>
      </div>
      <div className="flex flex-row mt-[10px]">
        <div
          onClick={() => handleCheck("3")}
          className="flex flex-row items-center justify-center w-[20px] h-[20px] border-[1px] border-[#CFDBEA] bg-[#F2F4F8] rounded-md mr-[5px] cursor-pointer"
        >
          {checkBoxClick["3"] ? (
            <div className="w-[10px] h-[10px] bg-[#800020] rounded-[3px]"></div>
          ) : (
            <></>
          )}
        </div>
        <span className="text-[16px] text-[#2D3034] font-medium">
          3.5 ~ 3.0
        </span>
      </div>
    </div>
  );
};

export default SearchOptions;
