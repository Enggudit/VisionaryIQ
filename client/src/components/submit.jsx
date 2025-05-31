import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";

function Submit() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loaderRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const fetchData = async () => {
    try {
      const response = await fetch(`${backendURL}/submit`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    // GSAP animation for the loader
    gsap.to(loaderRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 1.2,
      ease: "linear",
    });

    fetchData();

    const handleBackNavigation = () => {
      navigate("/");
    };

    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => handleBackNavigation();
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center mt-28 px-4 text-white"> 
      {/* Project Name Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-1/2 transform opacity-55 -translate-x-1/2 text-4xl font-bold text-yellow-500"
      >
        VisionaryIQ
      </motion.div>

      {/* Loader - Show only if data is null */}
      {!data && (
        <div className="flex flex-col items-center pt-5 justify-center h-[50vh]">
          <div
            ref={loaderRef}
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
          />
          <p className="mt-4 text-xl text-gray-400">Loading...</p>
        </div>
      )}

      {data && (
        <>
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl bg-gray-800 pt-16 shadow-lg rounded-xl border border-gray-700 p-6 text-center"
          >
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="material-symbols-outlined text-9xl text-green-500"
            >
              verified
            </motion.span>
            <h1 className="text-3xl font-bold mt-2">
              Your Score: {data.finalScore}
            </h1>

            <div className="flex justify-between text-lg font-semibold mt-4">
              <p>✅ Correct: {data.score}</p>
              <p>❌ Incorrect: {data.numberOfSelectedOptions- data.score}</p>
              <p>❓ Unattempted: {data.numberOfQuestions - data.numberOfSelectedOptions}</p>
              <p>❓ Total: {data.numberOfQuestions}</p>
            </div>

            <p className="text-gray-400 mt-2">🔄 Tab Switched: {data.tabSwitchCount}</p>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Go to Home
            </motion.button>
          </motion.div>

          {/* Questions Section */}
          <div className="w-full max-w-3xl mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions & Correct Answers:
            </h3>
            <div className="space-y-4">
              {data.questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800 p-4 shadow-md rounded-lg border-l-4 border-green-500"
                >
                  <p className="text-lg font-semibold">
                    Q{index + 1}: {question.questions}
                  </p>
                  <div className="mt-2 space-y-2">
                    {question.option.map((option, optionIndex) => {
                      let optionClass =
                        "p-2 rounded-md border border-gray-600 text-gray-300 bg-gray-700"; // Default style

                      if (option === question.answer) {
                        optionClass =
                          "p-2 rounded-md border border-green-500 bg-green-800 text-green-400 font-semibold";
                      } else if (
                        data.selectedOption &&
                        data.selectedOption[index] === option &&
                        option !== question.answer
                      ) {
                        optionClass =
                          "p-2 rounded-md border border-red-500 bg-red-800 text-red-400";
                      }

                      return (
                        <motion.p
                          key={optionIndex}
                          whileHover={{ scale: 1.02 }}
                          className={optionClass}
                        >
                          {optionIndex + 1}. {option}
                        </motion.p>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Submit;
