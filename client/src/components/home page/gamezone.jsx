import React, { useState, useEffect } from 'react';

const Game = () => {
  const [score, setScore] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  // Function to generate random positions
  const getRandomPosition = () => {
    const top = Math.random() * (window.innerHeight - 100); // Subtract 100 to ensure button stays within the window
    const left = Math.random() * (window.innerWidth - 100);
    return { top, left };
  };

  // Update button position every time it is clicked
  const handleButtonClick = () => {
    setScore(score + 1);
    setButtonPosition(getRandomPosition());
  };

  // Update position every 1 second to create randomness even if the player doesn't click the button
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonPosition(getRandomPosition());
    }, 1000);
    
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="flex justify-center relative items-center h-screen">
      <div className="text-center w-[80%] h-[80%] bg-blue-900 relative flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold text-blue-100 mb-4">Click the Button Game!</h1>
        <p className="text-xl text-blue-200 mb-4">Score: {score}</p>
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          style={{
            position: 'absolute',
            top: `${buttonPosition.top}px`,
            left: `${buttonPosition.left}px`,
          }}
        >
          Click Me!
        </button>
      </div>
    </div>
  );
};

export default Game;
