import React from "react";
import styles from "./CharacterItem.module.scss";
import { Link } from "react-router-dom";

function CharacterItem({ item }: { item: any }) {
  return (
    <Link
      to={"/character?id=" + item.character.mal_id}
      key={item.character.mal_id ? item.character.mal_id : null}
      className={styles.item}
    >
      <div className={styles.imgWrap}>
        <img
          src={item.character ? item.character.images.jpg.image_url : ""}
          alt=""
        />
      </div>
      <p className={styles.characterName}>{item.character.name}</p>
    </Link>
  );
}

export default CharacterItem;
