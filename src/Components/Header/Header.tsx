import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

const Header: React.FC = () => {
  const [navBtns, changeActiveNav] = React.useState<
    {
      id: number;
      title: string;
      active: boolean;
      link: string;
    }[]
  >([
    { id: 1, title: "Main", active: true, link: "/" },
    { id: 2, title: "Catalog", active: false, link: "/Catalog" },
    { id: 3, title: "Random", active: false, link: "/Random" },
    { id: 4, title: "Support", active: false, link: "/Support" },
  ]);

  const onNavClick = (id: number) => {
    changeActiveNav(
      navBtns.map((item) => {
        item.active = item.id === id;
        return item;
      })
    );
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to={"/"} className={styles.logo}>
            <img src={logoImg} alt="" />
            <p className={styles.text}>
              Anime<span>List</span>
            </p>
          </Link>
          <nav className={styles.nav}>
            {navBtns.map((item) => {
              return (
                <Link
                  onClick={() => onNavClick(item.id)}
                  key={item.id}
                  to={item.link}
                  className={
                    item.active
                      ? `${styles.item} ${styles.active}`
                      : `${styles.item}`
                  }
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <button className={styles.signIn}>Sign In</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
