import React from "react";
import styles from "./RecomendationsBlock.module.scss";
import { Link } from "react-router-dom";
import loader from "../../assets/images/loader.svg";

function RecomendationsBlock({
  recommendationLoading,
  recommendations,
}: {
  recommendationLoading: boolean;
  recommendations: any[];
}) {
  return (
    <div className={styles.itemRecommendations}>
      <h1 className={styles.title}>Recommendations</h1>
      {recommendationLoading ? (
        <div className={styles.recommendationItems}>
          {recommendations.map((item, i) => {
            if (i < 5) {
              return (
                <Link
                  key={i}
                  className={styles.item}
                  to={`/anime?id=${item.entry.mal_id}`}
                >
                  <div className={styles.imgWrap}>
                    <img src={item.entry.images.webp.large_image_url} alt="" />
                  </div>
                  <p className={styles.title}>{item.entry.title}</p>
                </Link>
              );
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <img src={loader} alt="" />
      )}
    </div>
  );
}

export default RecomendationsBlock;
