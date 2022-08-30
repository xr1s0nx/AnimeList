import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export interface CounterState {
  signPopUpActive: boolean;
  nowActiveSign: number;
  navBtns: { id: number; title: string; active: boolean; type: string }[];
  navBtnsPages: { id: number; title: string; active: boolean; link: string }[];
  nowSignTab: string;
  registrationPage: {
    login: string;
    password: string;
    confirmPassword: string;
  };
  signInPage: { login: string; password: string };
}

const initialState: CounterState = {
  signPopUpActive: false,
  nowActiveSign: 0,
  nowSignTab: "SignIn",
  registrationPage: { login: "", password: "", confirmPassword: "" },
  signInPage: { login: "", password: "" },
  navBtns: [
    { id: 0, title: "Sign In", active: true, type: "SignIn" },
    { id: 1, title: "Registration", active: false, type: "Registration" },
  ],
  navBtnsPages: [
    { id: 1, title: "Main", active: true, link: "/" },
    { id: 2, title: "Catalog", active: false, link: "/Catalog" },
    { id: 3, title: "Random", active: false, link: "/Random" },
    { id: 4, title: "Support", active: false, link: "/Support" },
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changePopUpActive: (state, action: PayloadAction<boolean>) => {
      state.signPopUpActive = action.payload;
    },
    changeActiveSign: (
      state,
      action: PayloadAction<{ id: number; type: string }>
    ) => {
      state.nowActiveSign = action.payload.id;
      state.nowSignTab = action.payload.type;
    },
    changeActiveNav: (state, action: PayloadAction<number>) => {
      state.navBtnsPages = state.navBtnsPages.map((item) => {
        item.active = item.id === action.payload;
        return item;
      });
    },
    signInLoginValueChange: (state, action: PayloadAction<string>) => {
      state.signInPage.login = action.payload;
    },
    registrationLoginValueChange: (state, action: PayloadAction<string>) => {
      state.registrationPage.login = action.payload;
    },
    regPassChange: (state, action: PayloadAction<string>) => {
      state.registrationPage.password = action.payload;
    },
  },
});

export const {
  changePopUpActive,
  changeActiveSign,
  changeActiveNav,
  signInLoginValueChange,
  registrationLoginValueChange,
  regPassChange,
} = counterSlice.actions;

export default counterSlice.reducer;
