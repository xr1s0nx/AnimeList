import React from "react";
import styles from "./MainIntro.module.scss";
import { Link } from "react-router-dom";
import introImg from "../../assets/images/rimuruImg.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { changeActiveNav } from "../../redux/slices/mainSlice";

function MainIntro() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="container">
        <div className={styles.mainWrap}>
          <div className={styles.desc}>
            <h1 className={styles.title}>
              A new level of <span>anime listing</span>
            </h1>
            <p className={styles.text}>
              "Lorem ipsum dolor sit amet, consecrate adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud"
            </p>
            <Link
              onClick={() => dispatch(changeActiveNav(2))}
              className={styles.button}
              to={"/Catalog"}
            >
              Catalog
            </Link>
          </div>
          <div className={styles.imgBlock}>
            <img src={introImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainIntro;
