import React from "react";
import styles from "./ErrorModal.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function ErrorModal() {
  const errorText = useSelector((state: RootState) => state.main.errorText);

  return (
    <div className={styles.errorBlock}>
      <p className={styles.errorText}>{errorText}</p>
    </div>
  );
}

export default ErrorModal;
