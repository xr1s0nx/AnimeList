import React from "react";
import { motion } from "framer-motion";
import AnimeItem from "../AnimeItem/AnimeItem";

function Anime() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <AnimeItem />
    </motion.main>
  );
}

export default Anime;
