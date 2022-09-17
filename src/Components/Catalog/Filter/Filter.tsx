import React, { useCallback, useRef, useState } from "react";
import styles from "./Filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { changeSortProps } from "../../../redux/slices/mainSlice";
import lodash from "lodash";
import qs from "qs";
import QueryString from "qs";
import { useLocation } from "react-router-dom";

function Filter() {
  const sortProps = useSelector((state: RootState) => state.main.sortProps);

  const dispatch = useDispatch();
  const searchRef: any = useRef();
  const [searchValueState, changeSearchValue] = useState();
  const location = useLocation();

  React.useEffect(() => {
    const search:
      | string
      | string[]
      | QueryString.ParsedQs
      | QueryString.ParsedQs[]
      | undefined = qs.parse(window.location.search.substring(1)).searchValue;
    if (search !== undefined) {
      // @ts-ignore
      changeSearchValue(search);
    }
  }, [location]);

  const debounceSearch = useCallback(
    lodash.debounce(() => {
      dispatch(
        changeSortProps({
          ...sortProps,
          currentPage: 1,
          searchValue: searchRef.current.value ? searchRef.current.value : "",
        })
      );
    }, 1000),
    []
  );

  const changeSearchVal = (e: any) => {
    changeSearchValue(e.target.value);
    debounceSearch();
  };

  return (
    <div className={styles.filterBlock}>
      <p className={styles.title}>Catalog</p>
      <div className={styles.searchBlock}>
        <input
          ref={searchRef}
          value={searchValueState}
          onChange={(e) => changeSearchVal(e)}
          type="text"
          placeholder="search"
        />
      </div>
      <div className={styles.filters}>
        <div className={styles.filter}></div>
      </div>
    </div>
  );
}

export default Filter;
