import React from "react";
import MainIntro from "../MainIntro/MainIntro";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyComponent: React.FC = () => {
  const data = useSelector((state: RootState) => state.main.animeList);

  React.useEffect(() => {
    console.log(data);
  });

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
