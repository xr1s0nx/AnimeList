import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  signPopUpActive: boolean;
  nowActiveSign: number;
}

const initialState: CounterState = {
  signPopUpActive: false,
  nowActiveSign: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changePopUpActive: (state, action: PayloadAction<boolean>) => {
      state.signPopUpActive = action.payload;
    },
    changeActiveSign: (state, action: PayloadAction<number>) => {
      state.nowActiveSign = action.payload;
    },
  },
});

export const { changePopUpActive } = counterSlice.actions;

export default counterSlice.reducer;
