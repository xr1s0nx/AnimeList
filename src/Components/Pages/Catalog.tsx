import React from "react";
import { motion } from "framer-motion";
import Catalog from "../Catalog/Catalog";

const CatalogPage: React.FC = () => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: "0" }}
      transition={{ delay: 0.1 }}
    >
      <div className="container">
        <Catalog />
      </div>
    </motion.div>
  );
};

export default CatalogPage;
