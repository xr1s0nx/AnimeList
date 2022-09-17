import React from "react";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  changeActiveNav,
  changePopUpActive,
} from "../../redux/slices/mainSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navBtns = useSelector((state: RootState) => state.main.navBtnsPages);

  const onNavClick = (id: number) => {
    dispatch(changeActiveNav(id));
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link
            to={"/"}
            className={styles.logo}
            onClick={() => dispatch(changeActiveNav(1))}
          >
            <img src={logoImg} alt="" />
            <p className={styles.text}>
              Anime<span>List</span>
            </p>
          </Link>
          <nav className={styles.nav}>
            {navBtns.map((item) => {
              return (
                <NavLink
                  onClick={() => onNavClick(item.id)}
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? `${styles.item} ${styles.active}` : styles.item
                  }
                >
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
          <button
            onClick={() => {
              dispatch(changePopUpActive(true));
            }}
            className={styles.signIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
