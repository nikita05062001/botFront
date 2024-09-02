import { createSlice } from "@reduxjs/toolkit";

const pdfservicesSlice = createSlice({
  name: "pdfservices",
  initialState: {
    1: {
      title: "Услуги инженера-техника",
      description: "Монтаж демонтаж оборудования",
      count: "",
      price: "",
    },
    2: {
      title: "Услуги транспортировки",
      description: "Отправка грузка A-B, B-A.",
      count: "",
      price: "",
    },
  },
  reducers: {
    changeServices: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeServices } = pdfservicesSlice.actions;

export default pdfservicesSlice.reducer;
