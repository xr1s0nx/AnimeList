import React from "react";
import { motion } from "framer-motion";

const Support: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Support
    </motion.div>
  );
};

export default Support;
