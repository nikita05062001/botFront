import { createSlice } from '@reduxjs/toolkit';

const eqipSlice = createSlice({
  name: 'equip',
  initialState: {},
  reducers: {
    changeEquipMinus: (state, action) => {
      const item = state[action.payload["№"]];
      if (item) {
        if (item.count) {
          if (item.count === 1) {
            delete state[action.payload["№"]];
          } else {
            item.count -= 1;
          }
        }
      }
    },
    changeEquipPlus: (state, action) => {
      const item = state[action.payload["№"]];
      if (item) {
        if (item.count !== undefined) {
          item.count += 1;
        }
      } else {
        state[action.payload["№"]] = { ...action.payload, count: 1 };
      }
    },
  },
});

export const { changeEquipMinus, changeEquipPlus } = eqipSlice.actions;

export default eqipSlice.reducer;