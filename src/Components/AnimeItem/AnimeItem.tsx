import React from "react";
import styles from "./AnimeItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import qs from "qs";
import { default as axios } from "axios";
import {
  addAnimeToMarkers,
  changeStatusOfAnimeModal,
  setCharactersOfCurrentAnime,
  setCurrentAnime,
  setLoading,
  setRecommendationsOfCurrentAnime,
} from "../../redux/slices/mainSlice";
import loader from "../../assets/images/loader.svg";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import QueryString from "qs";
import RecomendationsBlock from "../RecomendationsBlock/RecomendationsBlock";
import CharactersBlock from "../CharactersBlock/CharactersBlock";
import AllCharactersModal from "../CharactersBlock/AllCharactersModal/AllCharactersModal";

function AnimeItem() {
  const currentItem = useSelector((state: RootState) => state.main.currentItem);
  const isLoading = useSelector((state: RootState) => state.main.isLoading);
  const characters = useSelector(
    (state: RootState) => state.main.currentItemCharacters
  );
  const dispatch = useDispatch();
  const stars: { id: number }[] = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];
  const [characterLoading, setcharacterLoading] = React.useState(false);
  const recommendations = useSelector(
    (state: RootState) => state.main.currentItemRecommendations
  );
  const location = useLocation();
  const [recommendationLoading, setRecommendationLoading] =
    React.useState(false);
  const statusModal = useSelector(
    (state: RootState) => state.main.statusModalAnimeItem
  );
  const statusValues = useSelector(
    (state: RootState) => state.main.markersValues
  );
  const [status, setStatus] = React.useState("Unwatched");
  const markers = useSelector((state: RootState) => state.main.animeMarkers);
  const [animeId, setAnimeId] = React.useState(0);
  const [valueColor, setColor] = React.useState("#fff");
  const characterModal = useSelector(
    (state: RootState) => state.main.charactersModalStatus
  );

  React.useEffect(() => {
    const id:
      | string
      | string[]
      | QueryString.ParsedQs
      | QueryString.ParsedQs[]
      | undefined = qs.parse(window.location.search.substring(1)).id;
    dispatch(setLoading(true));
    if (animeId !== (id as unknown as number)) {
      setAnimeId(parseInt(id as string));
      setTimeout(() => {
        axios
          .get(`https://api.jikan.moe/v4/anime/${id}/full`)
          .then((response) => {
            dispatch(setCurrentAnime(response.data.data));
            axios
              .get(`https://api.jikan.moe/v4/anime/${id}/characters`)
              .then((response) => {
                dispatch(setCharactersOfCurrentAnime(response.data.data));
                setcharacterLoading(true);
                axios
                  .get(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
                  .then((response) => {
                    dispatch(
                      setRecommendationsOfCurrentAnime(response.data.data)
                    );
                    setRecommendationLoading(true);
                    dispatch(setLoading(false));
                  });
              });
          });
      }, 3000);
    }
  }, [location]);

  React.useEffect(() => {
    setStatus("Unwatched");
    markers.map((item) => {
      if (item.id === animeId) {
        setStatus(item.status);
      }
      return null;
    });
    const obj = statusValues.find((item) => item.value === status);
    const currentColor = obj ? obj.color : "#fff";
    setColor(currentColor);
    dispatch(changeStatusOfAnimeModal(false));
  }, [markers, location, animeId, statusValues, status, dispatch]);

  React.useEffect(() => {
    if (characterModal) {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.removeAttribute("style");
    }
  }, [characterModal]);

  const addToMarkers = (id: number, value: string) => {
    dispatch(
      addAnimeToMarkers({
        id: id,
        status: value,
      })
    );
  };
  return (
    <>
      {isLoading ? (
        <div className={"loaderWrap"}>
          <img src={loader} alt="" className="loader" />
        </div>
      ) : (
        <div className="container">
          {characters.length > 1 ? (
            <CSSTransition
              in={characterModal}
              timeout={300}
              classNames="PopUp"
              unmountOnExit
            >
              <AllCharactersModal characters={characters} />
            </CSSTransition>
          ) : null}
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

                <CSSTransition
                  in={statusModal}
                  timeout={300}
                  classNames="content"
                  unmountOnExit
                >
                  <div className={styles.statusModal}>
                    {statusValues.map((item, i) => (
                      <button
                        key={i}
                        className={styles.modalBtn}
                        onClick={() => addToMarkers(animeId, item.value)}
                        style={{
                          color: item.color,
                          border: `1px solid ${item.color}`,
                        }}
                      >
                        {item.value}
                      </button>
                    ))}
                  </div>
                </CSSTransition>
              </div>
              <div className={styles.descContent}>
                <h1 className={styles.descTitle}>{currentItem.title}</h1>
                <p className={styles.titleJap}>{currentItem.title_japanese}</p>
                <div className={styles.descTextWrap}>
                  <p className={styles.descText}>{currentItem.synopsis}</p>
                </div>
                <div className={styles.descProps}>
                  <div className={styles.propsCol}>
                    <p className={styles.prop}>
                      Type: <span>{currentItem.type}</span>
                    </p>
                    <p className={styles.prop}>
                      Episodes:{" "}
                      <span>
                        {currentItem.episodes ? currentItem.episodes : "?"}
                      </span>
                    </p>
                  </div>
                  <div className={styles.propsCol}>
                    <p className={styles.prop}>
                      Status: <span>{currentItem.status}</span>
                    </p>
                    <p className={styles.prop}>
                      Year: <span>{currentItem.year}</span>
                    </p>
                  </div>
                  <div className={styles.propsCol}>
                    <p className={styles.prop}>
                      Season: <span>{currentItem.season}</span>
                    </p>
                    <p className={styles.prop}>
                      Studios:{" "}
                      {currentItem.studios === undefined
                        ? "None"
                        : currentItem.studios.map(
                            (
                              item: {
                                name:
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
                              },
                              i: number
                            ) => <span key={i}>{item.name}</span>
                          )}
                    </p>
                  </div>
                </div>
                <div className={styles.descScore}>
                  <div className={styles.scoreCount}>
                    <p className={styles.scoreText}>{currentItem.score}</p>
                  </div>
                  {stars.map((star) => {
                    return (
                      <svg
                        key={star.id}
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill={
                          star.id <= Math.round(currentItem.score / 2)
                            ? "#00F0FF"
                            : "none"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.starImg}
                      >
                        <path
                          d="M8.49997 1L10.8175 5.93784L16 6.72967L12.2499 10.5733L13.1353 16L8.49997 13.4382L3.86473 16L4.75015 10.5733L1 6.72967L6.18251 5.93784L8.49997 1Z"
                          stroke="#00F0FF"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    );
                  })}
                </div>
              </div>
            </div>
            {characters.length > 0 ? (
              <CharactersBlock
                characterLoading={characterLoading}
                characters={characters}
              />
            ) : null}
            {recommendations.length > 0 ? (
              <RecomendationsBlock
                recommendationLoading={recommendationLoading}
                recommendations={recommendations}
                title={"Recomendations"}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default AnimeItem;
