"use client";
import searchStore from "@/store/searchStore";

export const backgroundColor = () => {
  const { buttonClick } = searchStore.getState();

  return {
    red: buttonClick.red ? "bg-[#800020]" : "bg-[#FFFFFF]",
    white: buttonClick.white ? "bg-[#800020]" : "bg-[#FFFFFF]",
    sparkling: buttonClick.sparkling ? "bg-[#800020]" : "bg-[#FFFFFF]",
  };
};
export const textColor = () => {
  const { buttonClick } = searchStore.getState();

  return {
    red: buttonClick.red ? "text-[#FFFFFF]" : "text-[#2D3034]",
    white: buttonClick.white ? "text-[#FFFFFF]" : "text-[#2D3034]",
    sparkling: buttonClick.sparkling ? "text-[#FFFFFF]" : "text-[#2D3034]",
  };
};

export const handleClick = (type: "RED" | "WHITE" | "SPARKLING") => {
  const { setType, buttonClick, setButtonClick } = searchStore.getState();

  if (type === "RED" && buttonClick.red === true) {
    setButtonClick({ red: false, white: false, sparkling: false });
    setType(undefined);
    return;
  } else if (type === "WHITE" && buttonClick.white === true) {
    setButtonClick({ red: false, white: false, sparkling: false });
    setType(undefined);
    return;
  } else if (type === "SPARKLING" && buttonClick.sparkling === true) {
    setButtonClick({ red: false, white: false, sparkling: false });
    setType(undefined);
    return;
  } else if (type === "RED") {
    setButtonClick({ red: true, white: false, sparkling: false });
  } else if (type === "WHITE") {
    setButtonClick({ red: false, white: true, sparkling: false });
  } else if (type === "SPARKLING") {
    setButtonClick({ red: false, white: false, sparkling: true });
  }
  setType(type);
};

export const handleCheck = (rate: "all" | "4.5" | "4" | "3.5" | "3") => {
  const { setRating, checkBoxClick, setCheckBoxClick } = searchStore.getState();

  if (rate === "all" && checkBoxClick.all === false) {
    setCheckBoxClick({
      all: true,
      "4.5": false,
      "4": false,
      "3.5": false,
      "3": false,
    });
    setRating(undefined);
  } else if (rate === "all" && checkBoxClick.all === true) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": false,
      "3": false,
    });
    setRating(undefined);
  } else if (rate === "4.5" && checkBoxClick["4.5"] === false) {
    setCheckBoxClick({
      all: false,
      "4.5": true,
      "4": false,
      "3.5": false,
      "3": false,
    });
    setRating(Number(rate));
  } else if (rate === "4.5" && checkBoxClick["4.5"] === true) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": false,
      "3": false,
    });
    setRating(undefined);
  } else if (rate === "4" && checkBoxClick[4] === false) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": true,
      "3.5": false,
      "3": false,
    });
    setRating(Number(rate));
  } else if (rate === "4" && checkBoxClick[4] === true) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": false,
      "3": false,
    });
    setRating(undefined);
  } else if (rate === "3.5" && checkBoxClick["3.5"] === false) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": true,
      "3": false,
    });
    setRating(Number(rate));
  } else if (rate === "3.5" && checkBoxClick["3.5"] === true) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": true,
      "3": false,
    });
    setRating(undefined);
  } else if (rate === "3" && checkBoxClick[3] === false) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": false,
      "3": true,
    });
    setRating(Number(rate));
  } else if (rate === "3" && checkBoxClick[3] === true) {
    setCheckBoxClick({
      all: false,
      "4.5": false,
      "4": false,
      "3.5": false,
      "3": true,
    });
    setRating(undefined);
  }
};
