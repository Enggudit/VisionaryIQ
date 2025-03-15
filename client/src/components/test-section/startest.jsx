import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

function StartTest() {
  useEffect(() => {
    // Function to enter full-screen mode
    
    const enterFullScreen = () => {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen(); // Firefox
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen(); // IE/Edge
      }
    };

    // Enter full-screen when the component is mounted
    enterFullScreen();

    // Prevent ESC key and F11 key from exiting full-screen mode
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "F11") {
        enterFullScreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get("N");

  return (
    <div className="text-white w-full h-[100vh] flex justify-center items-center bg-gradient-to-r from-indigo-900 to-black">
      {/* Animated Instructions Box */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-zinc-800/80 w-[65vw] pb-5 rounded-xl my-8 border-zinc-600 border-[5px] text-white px-6 py-4 text-lg gap-2 flex flex-col shadow-lg"
      >
        {[
          "The test is timed, and once started, you cannot pause or restart it.",
          "All answers must be submitted before the timer runs out.",
          "No external assistance or reference materials are allowed during the test.",
          "Participants must ensure a stable internet connection to avoid disruptions.",
          "Only one attempt is permitted per test.",
          "All results are final and cannot be disputed after submission.",
          "The test must be taken individually. Collaboration is strictly prohibited.",
          "In case of technical difficulties, reach out to support before the test ends.",
          "Cheating or unethical behavior will result in disqualification.",
          "Personal information may be collected to verify identity and ensure test integrity.",
          "The test organizers reserve the right to modify the terms and conditions at any time.",
          "By starting the test, you agree to abide by these terms and conditions."
        ].map((rule, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="mb-1"
          >
            {rule}
          </motion.li>
        ))}
      </motion.div>

      {/* Start Button with Hover Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 right-16"
      >
        <Link to="/Start">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 px-8 py-3 rounded-2xl text-2xl font-semibold shadow-md hover:bg-red-600 transition"
          >
            Start Test
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default StartTest;
