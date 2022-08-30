import React from "react";
import styles from "../SignContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  registrationLoginValueChange,
  signInLoginValueChange,
} from "../../../redux/slices/mainSlice";

function SignInContent() {
  const login = useSelector((state: RootState) => state.main.signInPage.login);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(signInLoginValueChange(""));
    };
  }, [dispatch]);

  return (
    <>
      <div className={styles.block}>
        <div className={styles.inputRow}>
          <p>Login</p>
          <input
            value={login}
            onChange={(e) => {
              dispatch(signInLoginValueChange(e.currentTarget.value));
            }}
            type="text"
          />
        </div>
        <div className={styles.inputRow}>
          <p>Password</p>
          <input type="password" />
        </div>
        <button className={styles.button}>Sign In</button>
      </div>
    </>
  );
}

export default SignInContent;
