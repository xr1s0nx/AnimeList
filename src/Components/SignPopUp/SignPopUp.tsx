import React from "react";
import styles from "./SignPopUp.module.scss";
import closeImg from "../../assets/images/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import qs from "qs";

import {
  changeActiveSign,
  changePopUpActive,
} from "../../redux/slices/mainSlice";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import SignInContent from "../SignContent/SignIn/SignInContent";
import RegistrationContent from "../SignContent/Registration/RegistrationContent";

const SignPopUp: React.FC = () => {
  const nowActiveBtn = useSelector(
    (state: RootState) => state.main.nowActiveSign
  );
  const navigate = useNavigate();
  const navBtns = useSelector((state: RootState) => state.main.navBtns);
  const dispatch = useDispatch<AppDispatch>();
  const nowSignTab = useSelector((state: RootState) => state.main.nowSignTab);

  return (
    <>
      <div className={styles.popUpWrap}>
        <div className={styles.block}>
          <button
            onClick={() => {
              dispatch(changePopUpActive(false));
            }}
            className={styles.close}
          >
            <img src={closeImg} alt="" />
          </button>
          <div className={styles.navBtns}>
            {navBtns.map((btn) => {
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    dispatch(changeActiveSign({ id: btn.id, type: btn.type }));
                  }}
                  className={
                    nowActiveBtn === btn.id
                      ? `${styles.btn} ${styles.active}`
                      : `${styles.btn}`
                  }
                >
                  {btn.title}
                </button>
              );
            })}
          </div>
          <CSSTransition
            in={nowSignTab === "SignIn"}
            timeout={300}
            classNames="content"
            unmountOnExit
          >
            <SignInContent />
          </CSSTransition>
          <CSSTransition
            in={nowSignTab === "Registration"}
            timeout={300}
            classNames="content"
            unmountOnExit
          >
            <RegistrationContent />
          </CSSTransition>
        </div>
      </div>
    </>
  );
};

export default SignPopUp;
