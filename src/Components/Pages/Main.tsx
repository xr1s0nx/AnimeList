import React from "react";
import MainIntro from "../MainIntro/MainIntro";
import { motion } from "framer-motion";

const MyComponent: React.FC = () => {
  return (
    <motion.main
      initial={{ x: "100%" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.1 }}
    >
      <MainIntro />
    </motion.main>
  );
};

export default MyComponent;
