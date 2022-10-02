import React from "react";
import styles from "./CharactersBlock.module.scss";
import { Link } from "react-router-dom";
import loader from "../../assets/images/loader.svg";
import CharacterItem from "./CharacterItem/CharacterItem";
import { useDispatch, useSelector } from "react-redux";
import { changeCharactersModalVisible } from "../../redux/slices/mainSlice";
import { RootState } from "../../redux/store";

function CharactersBlock({
  characterLoading,
  characters,
}: {
  characterLoading: boolean;
  characters: any[];
}) {
  const dispatch = useDispatch();
  const modalVisible = useSelector(
    (state: RootState) => state.main.charactersModalStatus
  );
  return (
    <div className={styles.itemCharacters}>
      <div className={styles.titleRow}>
        <h1 className={styles.charactersTitle}>Characters</h1>
        {characters.length > 5 ? (
          <button
            onClick={() =>
              dispatch(changeCharactersModalVisible(!modalVisible))
            }
            className={styles.moreBtn}
          >
            All characters
          </button>
        ) : null}
      </div>
      {characterLoading ? (
        <div className={styles.characterItems}>
          {characters.map((item, i) => {
            if (i < 6) {
              return <CharacterItem item={item} />;
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

export default CharactersBlock;
