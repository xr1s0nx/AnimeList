import React, { useCallback, useRef, useState } from "react";
import styles from "./Filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  changeSortProps,
  endDateModalChange,
  sortModalChange,
  startDateModalChange,
} from "../../../redux/slices/mainSlice";
import lodash, { orderBy } from "lodash";
import qs from "qs";
import QueryString from "qs";
import { useLocation } from "react-router-dom";

function Filter() {
  const sortProps = useSelector((state: RootState) => state.main.sortProps);
  const dispatch = useDispatch();
  const searchRef: any = useRef();
  const [searchValueState, changeSearchValue] = useState();
  const location = useLocation();
  const allDates = useSelector((state: RootState) => state.main.allDates);
  const allSorts = useSelector((state: RootState) => state.main.allSortProps);
  const startDateModal = useSelector(
    (state: RootState) => state.main.startDateModal
  );
  const endDateModal = useSelector(
    (state: RootState) => state.main.endDateModal
  );
  const sortModal = useSelector((state: RootState) => state.main.sortModal);

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
    lodash.debounce((sortPropsCurrent) => {
      dispatch(
        changeSortProps({
          ...sortPropsCurrent,
          currentPage: 1,
          startDate: "1980",
          endDate: "2022",
          searchValue: searchRef.current.value ? searchRef.current.value : "",
        })
      );
      searchRef.current.focus();
    }, 1000),
    []
  );

  const changeSearchVal = (e: any) => {
    changeSearchValue(e.target.value);
    debounceSearch({ ...sortProps });
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
        <div className={styles.filter}>
          <p className={styles.filterTitle}>Sort By</p>
          <button
            onClick={() => dispatch(sortModalChange(!sortModal))}
            className={styles.filterButton}
          >
            <>
              {
                allSorts.filter((item) => sortProps.orderBy === item.value)[0]
                  .title
              }
            </>
          </button>
          <div
            className={
              sortModal ? `${styles.modal} ${styles.active}` : `${styles.modal}`
            }
          >
            {allSorts.map((item, i) => (
              <button
                key={i}
                className={
                  item.value === sortProps.orderBy ? styles.active : ""
                }
                onClick={() => {
                  dispatch(
                    changeSortProps({ ...sortProps, orderBy: item.value })
                  );
                  dispatch(sortModalChange(false));
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filter}>
          <p className={styles.filterTitle}>Start Date</p>
          <button
            onClick={() => dispatch(startDateModalChange(!startDateModal))}
            className={styles.filterButton}
          >
            {sortProps.startDate}
          </button>
          <div
            className={
              startDateModal
                ? `${styles.modal} ${styles.active}`
                : `${styles.modal}`
            }
          >
            {allDates.map((date, i) => (
              <button
                key={i}
                className={
                  sortProps.startDate === date.value
                    ? styles.active
                    : "" + sortProps.endDate <= date.value
                    ? styles.disabled
                    : ""
                }
                onClick={() => {
                  dispatch(
                    changeSortProps({ ...sortProps, startDate: date.value })
                  );
                  dispatch(startDateModalChange(false));
                }}
              >
                {date.value}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filter}>
          <p className={styles.filterTitle}>End Date</p>
          <button
            onClick={() => dispatch(endDateModalChange(!endDateModal))}
            className={styles.filterButton}
          >
            {sortProps.endDate}
          </button>
          <div
            className={
              endDateModal
                ? `${styles.modal} ${styles.active}`
                : `${styles.modal}`
            }
          >
            {allDates.map((date, i) => (
              <button
                key={i}
                className={
                  sortProps.endDate === date.value
                    ? styles.active
                    : "" + sortProps.startDate >= date.value
                    ? styles.disabled
                    : ""
                }
                onClick={() => {
                  dispatch(
                    changeSortProps({ ...sortProps, endDate: date.value })
                  );
                  dispatch(endDateModalChange(false));
                }}
              >
                {date.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
