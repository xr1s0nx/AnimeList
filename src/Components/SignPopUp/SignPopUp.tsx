import React from "react";
import styles from "./SignPopUp.module.scss";
import closeImg from "../../assets/images/close.svg";

function SignPopUp() {
  const [navBtns, changeActive] = React.useState<
    {
      title: string;
      active: boolean;
      id: number;
    }[]
  >([
    { id: 0, title: "Sign In", active: true },
    { id: 1, title: "Registration", active: false },
  ]);

  return (
    <>
      <div className={styles.popUpWrap}>
        <div className={styles.block}>
          <button className={styles.close}>
            <img src={closeImg} alt="" />
          </button>
          <div className={styles.navBtns}>
            {navBtns.map((btn) => {
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    changeActive(
                      navBtns.map((item) => {
                        item.active = item.id === btn.id;
                        return item;
                      })
                    );
                  }}
                  className={
                    btn.active
                      ? `${styles.btn} ${styles.active}`
                      : `${styles.btn}`
                  }
                >
                  {btn.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignPopUp;
