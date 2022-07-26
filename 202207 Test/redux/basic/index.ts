/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BasicStates = {
  counts: number;
};

const initialState: BasicStates = {
  counts: 0,
};

const basicSlice = createSlice({
  name: "basic",
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.counts += action.payload;
    },
    decrement(state, action: PayloadAction<number>) {
      state.counts -= action.payload;
    },
  },
});

export const { increment, decrement } = basicSlice.actions;
export default basicSlice.reducer;
