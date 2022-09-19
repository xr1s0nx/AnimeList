import React from "react";
import styles from "./AnimeItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import qs from "qs";
import { default as axios } from "axios";
import { setCurrentAnime, setLoading } from "../../redux/slices/mainSlice";

function AnimeItem() {
  const currentItem = useSelector((state: RootState) => state.main.currentItem);
  const isLoading = useSelector((state: RootState) => state.main.isLoading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const id = qs.parse(window.location.search.substring(1)).id;
    dispatch(setLoading(true));
    axios.get(`https://api.jikan.moe/v4/anime/${id}/full`).then((response) => {
      dispatch(setCurrentAnime(response.data.data));
      dispatch(setLoading(false));
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="container">
          <div className={styles.itemContent}>
            <div className={styles.mainDesc}>
              <div className={styles.descImg}>
                <div className={styles.imgWrap}>
                  <img
                    src={
                      currentItem.images
                        ? currentItem.images.webp.large_image_url
                        : null
                    }
                    alt=""
                  />
                </div>
                <button className={styles.viewStatus}>Not Viewed</button>
              </div>
              <div className={styles.descContent}>
                <h1 className={styles.descTitle}>{currentItem.title}</h1>
                <p className={styles.titleJap}>{currentItem.title_japanese}</p>
                <p className={styles.descrText}>{currentItem.synopsis}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnimeItem;
