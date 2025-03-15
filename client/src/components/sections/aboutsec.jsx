import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import { useNavigate } from "react-router-dom";
import Preloader from "../preloader"; // Import the preloader

function AboutSec({ setCanAccessTest }) {
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    return () => document.removeEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    const scroll = new LocomotiveScroll({ el: document.querySelector(".navbar"), smooth: true });
    return () => scroll.destroy();
  }, []);

  const collectionToTopicMap = {
    average: "Average",
    Boattimes: "Boat Times",
    calender: "Calendar",
    clock: "Clock",
    distanceprogression: "Distance Progressions",
    hcflcm: "HCF & LCM",
    mixtureandallegations: "Mixtures and Allegations",
    numbersystem: "Number System",
    PartnershipMixture: "Partnership Mixture",
    Percentage: "Percentage",
    permutationandcombination: "Permutation & Combination",
    probability: "Probability",
    problemonages: "Problem on Ages",
    profitlossanddiscount: "Profit, Loss & Discount",
    RatioandProportion: "Ratio & Proportion",
    simpleandcompoundinterest: "Simple & Compound Interest",
    speedtimeanddistance: "Speed, Time & Distance",
    timeandwork: "Time & Work",
    trains: "Trains",
    workpipes: "Work Pipes",
  };

  const topics = Object.values(collectionToTopicMap);

  const handleStartTest = async () => {
    if (selectedTopics.length === 0 || loading) return;

    setLoading(true);
    setCanAccessTest(true);

    const selectedCollections = selectedTopics.map((topic) =>
      Object.keys(collectionToTopicMap).find((key) => collectionToTopicMap[key] === topic)
    );

    const formData = {
      topic: selectedCollections,
      numberOfQuestions: questionCount,
      topiclength: selectedTopics.length,
    };

    try {
      await fetch("http://localhost:3000/fetch", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      // Show Preloader before navigation
      setShowPreloader(true);

    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  return (
    <>
      {showPreloader ? (
        <Preloader onComplete={() => navigate("/Aptitude/topic/question/teststart")} />
      ) : (
        <div className="relative navbar flex flex-col items-center py-10 w-screen">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl font-bold text-gray-100 mt-5">Start Your Test</h1>
            <p className="text-gray-100 mt-2">Select your preferred topics and number of questions to begin.</p>
          </motion.div>

          <motion.div className="w-full max-w-3xl bg-zinc-400 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Topics</h2>
              <button onClick={() => { setSelectAll(!selectAll); setSelectedTopics(selectAll ? [] : topics); }} className="text-blue-600 hover:underline focus:outline-none">
                {selectedTopics.length === topics.length ? "Deselect All" : "Select All"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topics.map((topic) => (
                <motion.div key={topic} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={selectedTopics.includes(topic)} onChange={() => setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic])} />
                    <span className="text-gray-700">{topic}</span>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="mt-8 w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col rounded-2xl">
              <h1 className="text-3xl flex justify-center items-center gap-4 mt-4">
                Number of Questions:
                <button onClick={() => setQuestionCount(prev => prev > 10 ? prev - selectedTopics.length : prev)} className="bg-red-500 hover:bg-red-700 text-white border-black border-[1px] font-bold px-4 rounded">-</button>
                <input name="Howmanyquesitons" className="w-16 text-black text-center" type="number" value={questionCount} readOnly />
                <button onClick={() => setQuestionCount(prev => prev + selectedTopics.length)} className="bg-green-500 hover:bg-green-700 border-black border-[1px] text-white font-bold px-4 rounded">+</button>
              </h1>
              <br />
              <button onClick={handleStartTest} className={`w-full py-2.5 rounded-2xl text-2xl ${selectedTopics.length === 0 || loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`} disabled={selectedTopics.length === 0 || loading}>
                {loading ? "Loading..." : "Start Test"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default AboutSec;
