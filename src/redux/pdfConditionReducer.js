import { createSlice } from "@reduxjs/toolkit";

const pdfconditionSlice = createSlice({
  name: "pdfconditions",
  initialState: [],
  reducers: {
    addCondition: (state, action) => {
      // Добавляем новое условие в массив
      const newCondition = { id: action.payload.id, text: action.payload.text };
      state.push(newCondition);
    },
    changeCondition: (state, action) => {
      // Находим индекс элемента по id и обновляем его текст
      const index = state.findIndex(
        (condition) => condition.id === action.payload.id
      );
      if (index !== -1) {
        state[index].text = action.payload.text;
      }
    },
    removeCondition: (state, action) => {
      // Удаляем элемент по id
      return state.filter((condition) => condition.id !== action.payload.id);
    },
  },
});

export const { addCondition, changeCondition, removeCondition } =
  pdfconditionSlice.actions;
export default pdfconditionSlice.reducer;
