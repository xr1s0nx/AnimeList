import React from "react";
import { motion } from "framer-motion";

const Catalog: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Catalog
    </motion.div>
  );
};

export default Catalog;
