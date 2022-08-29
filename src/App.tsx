import React from "react";
import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./Components/Pages/Main";
import Header from "./Components/Header/Header";
import { AnimatePresence } from "framer-motion";
import Catalog from "./Components/Pages/Catalog";
import Random from "./Components/Pages/Random";
import Support from "./Components/Pages/Support";
import SignPopUp from "./Components/SignPopUp/SignPopUp";

function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <SignPopUp />
      <AnimatePresence>
        <Routes location={location}>
          <Route path={"/"} element={<Main />} />
          <Route path={"/Catalog"} element={<Catalog />} />
          <Route path={"/Random"} element={<Random />} />
          <Route path={"/Support"} element={<Support />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
