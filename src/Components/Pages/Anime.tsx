import React from "react";
import { motion } from "framer-motion";

function Anime() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <p>Anime</p>
    </motion.main>
  );
}

export default Anime;
