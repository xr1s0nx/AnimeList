import React from "react";
import styles from "./Catalog.module.scss";
import Filter from "./Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CatalogItem from "./CatalogItem/CatalogItem";
import ReactPaginate from "react-paginate";
import {
  changeSortProps,
  setAnimeData,
  setHasNextPage,
  setLoading,
  setPagesCount,
} from "../../redux/slices/mainSlice";
import { default as axios } from "axios";
import loader from "../../assets/images/loader.svg";
import { useNavigate } from "react-router-dom";
import qs from "qs";
function Catalog() {
  const animeData = useSelector((state: RootState) => state.main.animeList);
  const isLoading = useSelector((state: RootState) => state.main.isLoading);
  const pagesCount = useSelector((state: RootState) => state.main.pagesCount);
  const { currentPage } = useSelector(
    (state: RootState) => state.main.sortProps
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);

  const getPizzas = () => {
    dispatch(setLoading(true));
    window.scrollTo(0, 0);
    axios
      .get(`https://api.jikan.moe/v4/anime?page=${currentPage}&limit=50`)
      .then((response) => {
        dispatch(setAnimeData(response.data.data));
        dispatch(setLoading(false));
        dispatch(setHasNextPage(response.data.pagination.has_next_page));
        dispatch(setPagesCount(response.data.pagination.last_visible_page));
      });
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(changeSortProps(params));
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [dispatch, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [currentPage, navigate]);

  return (
    <>
      <Filter />
      <div className={styles.catalogContent}>
        {isLoading ? (
          <div className={"loaderWrap"}>
            <img src={loader} alt="" className="loader" />
          </div>
        ) : (
          <div className={styles.gridWrap}>
            {animeData.map(
              (item: {
                mal_id: number;
                title_english: string;
                title: string;
                images: any;
                watchStatus: string;
                episodes: number;
                score: number;
              }) => {
                return (
                  <CatalogItem
                    key={item.mal_id}
                    id={item.mal_id}
                    score={item.score}
                    title={
                      item.title_english === null
                        ? item.title
                        : item.title_english
                    }
                    imgUrl={item.images.jpg.image_url}
                    episodes={item.episodes}
                    watchStatus={item.watchStatus}
                  />
                );
              }
            )}
          </div>
        )}
        <ReactPaginate
          breakLabel="..."
          nextLabel=""
          onPageChange={(event) => {
            dispatch(changeSortProps({ currentPage: event.selected + 1 }));
          }}
          pageRangeDisplayed={3}
          pageClassName={styles.page}
          pageCount={pagesCount}
          className={styles.pagintaion}
          activeClassName={styles.activePage}
          previousLabel=""
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
}

export default Catalog;
