import React from "react";
import styles from "./CatalogItem.module.scss";
import { Link } from "react-router-dom";

function CatalogItem({
  id,
  title,
  imgUrl,
  episodes,
  score,
}: {
  id: number;
  title: string;
  imgUrl: string;
  watchStatus: string;
  episodes: number;
  score: number;
}) {
  const stars: { id: number }[] = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  return (
    <Link to={`/anime?id=${id}`} className={styles.catalogItem}>
      <div className={styles.imgWrap}>
        <img src={imgUrl} alt="" />
      </div>
      <p className={styles.title}>{`${title}`}</p>
      <p className={styles.episodes}>{`${
        episodes === null ? "ongoing" : episodes + " ep"
      }`}</p>
      <div className={styles.stars}>
        {stars.map((star) => {
          return (
            <svg
              key={star.id}
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill={star.id <= Math.round(score / 2) ? "#00F0FF" : "none"}
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
    </Link>
  );
}

export default CatalogItem;
