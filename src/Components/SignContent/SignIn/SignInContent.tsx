import React from "react";
import styles from "../SignContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  signInLoginValueChange,
  signInPasswordValueChange,
} from "../../../redux/slices/mainSlice";

function SignInContent() {
  const { login } = useSelector((state: RootState) => state.main.signInPage);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(signInLoginValueChange(""));
    };
  }, [dispatch]);

  const loggin = () => {};

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
          <input
            onChange={(e) =>
              dispatch(signInPasswordValueChange(e.currentTarget.value))
            }
            type="password"
          />
        </div>
        <button onClick={loggin} className={styles.button}>
          Sign In
        </button>
      </div>
    </>
  );
}

export default SignInContent;
