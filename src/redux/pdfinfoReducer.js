import { createSlice } from "@reduxjs/toolkit";

const pdfinfoSlice = createSlice({
  name: "pdfinfo",
  initialState: {
    adres: "",
    date: "",
    title: "",
    description: "",
    discount: "",
  },
  reducers: {
    changeInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changeInfo } = pdfinfoSlice.actions;

export default pdfinfoSlice.reducer;
