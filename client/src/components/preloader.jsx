import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Preloader({ onComplete, duration = 3000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 100;
    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // short pause
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

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
