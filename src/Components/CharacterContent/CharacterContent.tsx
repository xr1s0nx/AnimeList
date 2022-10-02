import React from "react";
import styles from "./CharacterContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import qs from "qs";
import {
  setCharacterInfo,
  setCurrentCharacterId,
  setLoading,
} from "../../redux/slices/mainSlice";
import { default as axios } from "axios";
import { RootState } from "../../redux/store";
import loader from "../../assets/images/loader.svg";
import RecomendationsBlock from "../RecomendationsBlock/RecomendationsBlock";
function CharacterContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((state: RootState) => state.main.isLoading);
  const characterInfo = useSelector(
    (state: RootState) => state.main.currentCharacterInfo
  );

  React.useEffect(() => {
    const param = qs.parse(window.location.search.substring(1));
    dispatch(setCurrentCharacterId(param.id));
    dispatch(setLoading(true));
    axios
      .get(`https://api.jikan.moe/v4/characters/${param.id}/full`)
      .then((response) => {
        dispatch(setCharacterInfo(response.data.data));
        dispatch(setLoading(false));
      });
  }, [dispatch, location]);
  return (
    <div className="container">
      {isLoading ? (
        <img src={loader} alt="" className="loader" />
      ) : (
        <div className={styles.content}>
          <div className={styles.mainDescr}>
            <div className={styles.imgWrap}>
              <img
                src={
                  characterInfo.images === undefined
                    ? null
                    : characterInfo.images.jpg.image_url
                }
                alt=""
              />
            </div>
            <div className={styles.descr}>
              <h3 className={styles.name}>{characterInfo.name}</h3>
              <div className={styles.descrText}>{characterInfo.about}</div>
            </div>
          </div>
          {characterInfo.anime !== undefined ? (
            <>
              <p className={styles.title}>Anime with character</p>
              <div className={styles.anime}>
                {characterInfo.anime.map(
                  (
                    item: {
                      anime: any;
                      entry: {
                        mal_id: any;
                        images: {
                          webp: { large_image_url: string | undefined };
                        };
                        title:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      };
                    },
                    i: React.Key | null | undefined
                  ) => {
                    return (
                      <Link
                        key={i}
                        className={styles.item}
                        to={`/anime?id=${item.anime.mal_id}`}
                      >
                        <div className={styles.imgWrap}>
                          <img
                            src={item.anime.images.webp.large_image_url}
                            alt=""
                          />
                        </div>
                        <p className={styles.title}>{item.anime.title}</p>
                      </Link>
                    );
                  }
                )}
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default CharacterContent;
