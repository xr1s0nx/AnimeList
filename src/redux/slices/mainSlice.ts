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
  sortProps: {
    currentPage: number;
    searchValue: string;
    startDate: string;
    endDate: string;
    orderBy: string;
    sortType: string;
  };
  allDates: { value: string }[];
  startDateModal: boolean;
  endDateModal: boolean;
  sortModal: boolean;
  allSortProps: { title: string; value: string }[];
  currentItem: any;
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
    startDate: "1980",
    endDate: "2022",
    orderBy: "score",
    sortType: "desc",
  },
  allDates: [
    { value: "1980" },
    { value: "1981" },
    { value: "1982" },
    { value: "1983" },
    { value: "1984" },
    { value: "1985" },
    { value: "1986" },
    { value: "1987" },
    { value: "1988" },
    { value: "1989" },
    { value: "1990" },
    { value: "1991" },
    { value: "1992" },
    { value: "1993" },
    { value: "1994" },
    { value: "1995" },
    { value: "1996" },
    { value: "1997" },
    { value: "1998" },
    { value: "1999" },
    { value: "2000" },
    { value: "2001" },
    { value: "2002" },
    { value: "2003" },
    { value: "2004" },
    { value: "2005" },
    { value: "2006" },
    { value: "2007" },
    { value: "2008" },
    { value: "2009" },
    { value: "2010" },
    { value: "2011" },
    { value: "2012" },
    { value: "2013" },
    { value: "2014" },
    { value: "2015" },
    { value: "2016" },
    { value: "2017" },
    { value: "2018" },
    { value: "2019" },
    { value: "2020" },
    { value: "2021" },
    { value: "2022" },
  ],
  allSortProps: [
    { title: "rating", value: "score" },
    { title: "start date", value: "start_date" },
    { title: "end date", value: "end_date" },
    { title: "title", value: "title" },
  ],
  startDateModal: false,
  endDateModal: false,
  sortModal: false,
  currentItem: {},
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
    startDateModalChange: (state, action) => {
      state.startDateModal = action.payload;
      state.endDateModal = false;
      state.sortModal = false;
    },
    endDateModalChange: (state, action) => {
      state.endDateModal = action.payload;
      state.startDateModal = false;
      state.sortModal = false;
    },
    sortModalChange: (state, action) => {
      state.sortModal = action.payload;
      state.endDateModal = false;
      state.startDateModal = false;
    },
    setCurrentAnime: (state, action) => {
      state.currentItem = action.payload;
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
  startDateModalChange,
  endDateModalChange,
  sortModalChange,
  setCurrentAnime,
} = counterSlice.actions;

export default counterSlice.reducer;
