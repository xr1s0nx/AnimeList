import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { default as axios } from "axios";

const Random: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get("https://api.jikan.moe/v4/random/anime").then((response) => {
      navigate(`/anime?id=${response.data.data.mal_id}`);
    });
  }, [navigate]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  );
};

export default Random;
