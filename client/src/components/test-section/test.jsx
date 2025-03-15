import React, { useState, useEffect, useRef } from "react";

function Test() {
  const [n, setN] = useState(5); // Number of questions
  const [questions, setQuestions] = useState([]);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(n * 60); // Timer in seconds
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation popup

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL; // Load from .env

  
  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${backendURL}/fetch`);
        const data = await response.json();
        setN(data.totalQuestions);
        setQuestions(data.questions || []);
        setAnswers(data.questions.map(q => q.answer));
        setTimeLeft(data.totalQuestions * 60);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      setShowConfirmation(true); // Show popup when time runs out
    }

    if (isSubmitted) return; // Prevent countdown after submission

    const countdown = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, isSubmitted]);

  // Format timer
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle test submission (opens confirmation popup)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission if there is a form tag wrapping the button
    if (!isSubmitted) {
      setShowConfirmation(true);
    }
  };

  // Confirm and finalize test submission
  const handleConfirmSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setShowConfirmation(false); // Hide confirmation popup

    const lastData = {
      selectedOption,
      answers,
      questions,
      tabSwitchCount,
      n,
      submitresult: true,
    };

    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lastData),
    }).then(() => {
      // Optionally, navigate to a result page after submitting
      // navigate('/results'); or similar
    });
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="sidebar h-screen bg-zinc-900 w-[85px] rounded-s-md border-zinc-100 border-r-2 overflow-auto">
        {Array.from({ length: n }, (_, i) => (
          <div
            key={i}
            className={`rounded-2xl flex justify-center items-center font-bold text-[1.4vw] p-2 text-black m-2 h-[35px] w-[55px] cursor-pointer border-zinc-500 border-[3px]
            ${selectedOption[i] ? "bg-green-500" : "bg-white"}`}
          >
            Q.{i + 1}
          </div>
        ))}
      </div>

      <div className="w-[95vw] h-screen">
        <div className="timer bg-[#39466a23] w-full rounded-br-md rounded-bl-md border-zinc-100 border-b-[1px] flex justify-between px-5">
          <h1 className="text-white text-xl ml-4 mt-3 font-serif">TabSwitch Count: {tabSwitchCount}</h1>
          <h1 className="text-white text-2xl mr-4 mt-2 font-serif">Time Left: {formatTime(timeLeft)}</h1>
          <button
            className="p-4 bg-red-500 rounded-xl h-5 flex items-center my-2 border-zinc-500 border-[2px] text-xl font-mono"
            onClick={handleSubmit}
            disabled={isSubmitted}
          >
            SUBMIT
          </button>
        </div>

        <div className="w-[94vw] h-[92.1vh] flex justify-center items-center">
          <div className="w-[93vw] bg-zinc-900/55 rounded-xl shadow-sm shadow-zinc-100 h-[87vh] flex flex-col justify-between">
            {questions.length > 0 && questions[selectedQuestion] && (
              <div className="text-white ml-5 mt-5">
                <h1 className="font-bold text-2xl">Q. {questions[selectedQuestion].questions}</h1>
                <div className="mt-5 flex flex-col gap-2 ml-10">
                  {(questions[selectedQuestion].option || []).map((option, index) => (
                    <h2
                      key={index}
                      className={`pl-6 w-[82vw] rounded-lg h-[40px] text-2xl flex items-center cursor-pointer 
                      ${selectedOption[selectedQuestion] === option ? "bg-green-500 text-white" : "bg-zinc-200/50 text-black"}`}
                      onClick={() => setSelectedOption(prev => ({
                        ...prev,
                        [selectedQuestion]: prev[selectedQuestion] === option ? null : option
                      }))}
                    >
                      {option}
                    </h2>
                  ))}
                </div>
              </div>
            )}

            <div className="flex mb-[5vh] justify-between w-[92vw] h-[25%]">
              <div className="camera relative left-5 w-[20%] h-[100%] rounded-lg">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-5 items-end">
                <button
                  className="text-white bg-red-500 border-white border-[1px] w-[150px] h-[45px] text-2xl rounded-xl"
                  onClick={() => setSelectedQuestion(prev => Math.max(prev - 1, 0))}
                >
                  PREVIOUS
                </button>
                <button
                  className="text-white bg-green-500 border-white border-[1px] w-[150px] h-[45px] text-2xl rounded-xl"
                  onClick={() => setSelectedQuestion(prev => Math.min(prev + 1, n - 1))}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-4">Confirm Submission</h2>
            <p className="mb-4">Are you sure you want to submit the test?</p>
            <div className="flex justify-center gap-4">
              <a href="/testSubmit">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={handleConfirmSubmit}
              >
                Yes, Submit
              </button>
              </a>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
