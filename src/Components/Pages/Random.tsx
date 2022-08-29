import React from "react";
import { motion } from "framer-motion";

const Random: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Random
    </motion.div>
  );
};

export default Random;
