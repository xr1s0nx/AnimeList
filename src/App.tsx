import React from "react";
import "./App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "./Components/Pages/Main";
import Header from "./Components/Header/Header";
import { AnimatePresence } from "framer-motion";
import Catalog from "./Components/Pages/Catalog";
import Random from "./Components/Pages/Random";
import Support from "./Components/Pages/Support";
import SignPopUp from "./Components/SignPopUp/SignPopUp";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { CSSTransition } from "react-transition-group";
import NotFound from "./Components/Pages/NotFound";
import qs from "qs";
import Anime from "./Components/Pages/Anime";

function App() {
  const location = useLocation();
  const signPopUpActive = useSelector(
    (state: RootState) => state.main.signPopUpActive
  );

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <CSSTransition
        in={signPopUpActive}
        timeout={300}
        classNames="PopUp"
        unmountOnExit
      >
        <SignPopUp />
      </CSSTransition>

      <AnimatePresence>
        <Routes location={location}>
          <Route path={"/"} element={<Main />} />
          <Route path={"/Catalog"} element={<Catalog />} />
          <Route path={"/Random"} element={<Random />} />
          <Route path={"/Support"} element={<Support />} />
          <Route path={"/Anime"} element={<Anime />} />
          <Route path={"/*"} element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
