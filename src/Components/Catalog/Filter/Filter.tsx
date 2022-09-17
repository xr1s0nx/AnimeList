import React from "react";
import styles from "./Filter.module.scss";

function Filter() {
  return (
    <div className={styles.filterBlock}>
      <p className={styles.title}>Catalog</p>
      <div className={styles.searchBlock}>
        <input type="text" placeholder="search" />
      </div>
      <div className={styles.filters}>
        <div className={styles.filter}></div>
      </div>
    </div>
  );
}

export default Filter;
