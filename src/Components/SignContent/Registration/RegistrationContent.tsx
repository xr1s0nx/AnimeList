import React from "react";
import styles from "../SignContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  confirmPassChange,
  registrationLoginValueChange,
  regPassChange,
} from "../../../redux/slices/mainSlice";
function RegistrationContent() {
  const userData = useSelector((state: RootState) => state.main.userData);
  const registrationPage = useSelector(
    (state: RootState) => state.main.registrationPage
  );
  const dispatch = useDispatch();

  const regSend = async () => {};

  React.useEffect(() => {}, [userData]);

  React.useEffect(() => {
    return () => {
      dispatch(registrationLoginValueChange(""));
      dispatch(regPassChange(""));
      dispatch(confirmPassChange(""));
    };
  }, [dispatch]);

  return (
    <>
      <div className={styles.block}>
        <div className={styles.inputRow}>
          <p>Login</p>
          <input
            value={registrationPage.login}
            onChange={(e) =>
              dispatch(registrationLoginValueChange(e.currentTarget.value))
            }
            type="text"
          />
        </div>
        <div className={styles.inputRow}>
          <p>Password</p>
          <input
            value={registrationPage.password}
            type="password"
            onChange={(e) => dispatch(regPassChange(e.currentTarget.value))}
          />
        </div>
        <div className={styles.inputRow}>
          <p>Confirm Password</p>
          <input
            value={registrationPage.confirmPassword}
            onChange={(e) => dispatch(confirmPassChange(e.target.value))}
            type="password"
          />
        </div>
        <button onClick={regSend} className={styles.button}>
          Registration
        </button>
      </div>
    </>
  );
}

export default RegistrationContent;
