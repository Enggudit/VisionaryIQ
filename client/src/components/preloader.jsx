import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30); 

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white text-5xl font-bold z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: count === 100 ? 0 : 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
        {count}%
      </motion.div>
    </motion.div>
  );
}

export default Preloader;
