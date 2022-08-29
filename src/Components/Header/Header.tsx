import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to={"/"} className={styles.logo}>
          <img src={logoImg} alt="" />
          <p className={styles.text}>
            Anime<span>List</span>
          </p>
        </Link>
        <nav className={styles.nav}>
          <Link to={"/"}>Main</Link>
          <Link to={"/Catalog"}>Catalog</Link>
          <Link to={"/Random"}>Random</Link>
          <Link to={"/Support"}>Support</Link>
        </nav>
        <button className={styles.signIn}>Sign In</button>
      </div>
    </header>
  );
};

export default Header;
