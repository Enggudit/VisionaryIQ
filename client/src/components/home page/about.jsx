import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";

function About() {
  useEffect(() => {
    anime({
      targets: ".subject-card",
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: anime.stagger(200),
    });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-10">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-12 tracking-wide uppercase">
        Test Series
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <Link to="/Aptitude/topic/question">
          <div className="subject-card relative w-[300px] sm:w-[350px] h-[200px] bg-black/30 backdrop-blur-lg rounded-lg shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-[0px_0px_20px_2px_#00aaff]">
            <div className="absolute top-5 left-5 text-white text-2xl font-bold">
              Aptitude
            </div>
            <div className="absolute bottom-5 right-5 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <img loading="lazy" src="./images/apti.png" alt="Aptitude" className="w-10 h-10" />
            </div>
          </div>
        </Link>

        {/* Verbal Card */}
        <Link to="/Verbal">
          <div className="subject-card relative w-[300px] sm:w-[350px] h-[200px] bg-black/30 backdrop-blur-lg rounded-lg shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-[0px_0px_20px_2px_#00ff80]">
            <div className="absolute top-5 left-5 text-white text-2xl font-bold">
              Verbal
            </div>
            <div className="absolute bottom-5 right-5 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <img loading="lazy" src="./images/verval.png" alt="Verbal" className="w-10 h-10" />
            </div>
          </div>
        </Link>

        {/* Coding Card */}
        <Link to="/coding">
          <div className="subject-card relative w-[300px] sm:w-[350px] h-[200px] bg-black/30 backdrop-blur-lg rounded-lg shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-[0px_0px_20px_2px_#ff0080]">
            <div className="absolute top-5 left-5 text-white text-2xl font-bold">
              Coding
            </div>
            <div className="absolute bottom-5 right-5 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <img loading="lazy" src="./images/coding.jpg" alt="Coding" className="w-10 h-10" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default About;
