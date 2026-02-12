import { createSlice } from "@reduxjs/toolkit";

const eqipSlice = createSlice({
  name: "equip",
  initialState: {},
  reducers: {
    changeEquipMinus: (state, action) => {
      const item = state[action.payload["id"]];
      if (item) {
        if (item.count) {
          if (item.count === 1) {
            delete state[action.payload["id"]];
          } else {
            item.count -= 1;
          }
        }
      }
    },
    changeEquipPlus: (state, action) => {
      const item = state[action.payload["id"]];
      if (item) {
        if (item.count !== undefined) {
          item.count += 1;
        }
      } else {
        state[action.payload["id"]] = { ...action.payload, count: 1 };
      }
    },
    changeEquipPrice: (state, action) => {
      const item = state[action.payload["id"]];
      if (item) {
        item.price = action.payload["price"];
      }
    },
  },
});

export const { changeEquipMinus, changeEquipPlus, changeEquipPrice } =
  eqipSlice.actions;

export default eqipSlice.reducer;
