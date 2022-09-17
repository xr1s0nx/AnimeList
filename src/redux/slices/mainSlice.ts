import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  signPopUpActive: boolean;
  nowActiveSign: number;
  navBtns: { id: number; title: string; active: boolean; type: string }[];
  navBtnsPages: { id: number; title: string; active: boolean; link: string }[];
  animeList: {
    mal_id: number;
    title_english: string;
    title: string;
    images: string;
    watchStatus: string;
    episodes: number;
    score: number;
  }[];
  nowSignTab: string;
  registrationPage: {
    login: string;
    password: string;
    confirmPassword: string;
  };
  signInPage: { login: string; password: string };
  errorText: string;
  errorStatus: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
  pagesCount: number;
  sortProps: { currentPage: number; searchValue: string };
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
  errorText: "",
  errorStatus: false,
  animeList: [],
  isLoading: false,
  hasNextPage: true,
  pagesCount: 0,
  sortProps: {
    currentPage: 1,
    searchValue: "",
  },
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
      if (action.payload.search(/[а-яА-ЯёЁ]/g) === -1) {
        state.errorStatus = false;
        state.registrationPage.login = action.payload;
      } else {
        state.errorText = "Login must contain only latin letters";
        state.errorStatus = true;
      }
    },
    regPassChange: (state, action: PayloadAction<string>) => {
      if (action.payload.search(/[а-яА-ЯёЁ]/g) === -1) {
        state.errorStatus = false;
        state.registrationPage.password = action.payload;
      } else {
        state.errorText = "Password must contain only latin letters";
        state.errorStatus = true;
      }
    },
    confirmPassChange: (state, action: PayloadAction<string>) => {
      if (action.payload.search(/[а-яА-ЯёЁ]/g) === -1) {
        state.errorStatus = false;
        state.registrationPage.confirmPassword = action.payload;
      } else {
        state.errorText = "Password must contain only latin letters";
        state.errorStatus = true;
      }
    },
    registrationDataSend: (state) => {
      state.errorText = "";
      state.errorStatus = false;
      if (state.registrationPage.login.replace(/ /g, "") === "") {
        state.errorText = "Enter Login";
      } else if (state.registrationPage.password.replace(/ /g, "") === "") {
        state.errorText = "Enter a password";
      } else if (
        state.registrationPage.password !==
        state.registrationPage.confirmPassword
      ) {
        state.errorText = "Passwords don't match";
      }
      if (state.errorText !== "") {
        state.errorStatus = true;
      }
    },
    setAnimeData: (state, action) => {
      state.animeList = [...action.payload];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    changeSortProps: (state, action) => {
      state.sortProps = { ...action.payload };
    },
    setHasNextPage: (state, action) => {
      state.hasNextPage = action.payload;
    },
    setPagesCount: (state, action) => {
      state.pagesCount = action.payload;
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
  confirmPassChange,
  registrationDataSend,
  setAnimeData,
  setLoading,
  changeSortProps,
  setHasNextPage,
  setPagesCount,
} = counterSlice.actions;

export default counterSlice.reducer;
