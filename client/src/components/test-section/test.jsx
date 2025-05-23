import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from 'react-router-dom';

function Test() {
    const [searchParams] = useSearchParams();
    const [n, setN] = useState(5); // Default value; updated from backend
    const [questions, setQuestions] = useState([]);
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(n * 60); // Initial time set to n minutes
    const [selectedQuestion, setSelectedQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState({});
    const [answers, setAnswers] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false); // New state for confirmation popup
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
    const [blockedQuestions, setBlockedQuestions] = useState(new Set()); // Track blocked questions
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const backendURL = import.meta.env.VITE_BACKEND_URL;


    // Disable right-click context menu
    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    // Fetch value of "n" and questions from backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${backendURL}/fetch`, {
                    method: 'GET',
                });
                const data = await response.json();
                setN(data.totalQuestions);
                setQuestions(data.questions || []);
                const answers = data.questions.map((q) => q.answer);
                setAnswers(answers);
                setTimeLeft(data.totalQuestions * 60); // Set time based on number of questions
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, []);

    // Timer logic with auto-submit when time is up
    useEffect(() => {
        if (timeLeft === 0 && !isSubmitted) {
            handleSubmit(); // Auto-submit when time is up
        }
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, [timeLeft, isSubmitted]);

    // Format time function
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Tab switch handling
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                setTabSwitchCount((prevCount) => prevCount + 1);
                setTimeLeft((prevTime) => (prevTime > 20 ? prevTime - 20 : 0));
                
                // Mark current question as blocked, reset option, and move to the next question
                setBlockedQuestions((prev) => new Set(prev).add(selectedQuestion));
                setSelectedOption((prevState) => ({
                    ...prevState,
                    [selectedQuestion]: null, // Reset selected option for the blocked question
                }));
                
                if (selectedQuestion < n - 1) {
                    setSelectedQuestion(selectedQuestion + 1);
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [selectedQuestion, n]);

    // Handle option click, unselect if already selected
    const handleOptionClick = (option, questionIndex) => {
        if (blockedQuestions.has(questionIndex)) return; // Prevent selection on blocked question
        setSelectedOption((prevState) => ({
            ...prevState,
            [questionIndex]: prevState[questionIndex] === option ? null : option,
        }));
        setSelectedQuestion(questionIndex);
    };

    const handleNextQuestion = () => {
        if (selectedQuestion < n - 1) {
            setSelectedQuestion(selectedQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (selectedQuestion > 0) {
            setSelectedQuestion(selectedQuestion - 1);
        }
    };

    const handleQuestionSelect = (index) => {
        if (!blockedQuestions.has(index)) {
            setSelectedQuestion(index);
        }
    };

    
    // Submit function
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission if there is a form tag wrapping the button
        if (!isSubmitted) {
          setShowConfirmation(true);
        }
      };
    const handleConfirmSubmit = () => {
        if (isSubmitted) return; // Prevent multiple submissions
        setIsSubmitted(true);
        setShowConfirmation(false);

        const lastData = {
            selectedOption: selectedOption,
            answers: answers,
            questions: questions,
            tabSwitchCount: tabSwitchCount,
            n: n,
        };

        fetch(`${backendURL}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lastData),
        });
    };

    // Generate question number boxes based on n
    const quesNumbers = Array.from({ length: n }, (_, i) => (
        <div
            key={i}
            className={`${
                blockedQuestions.has(i) 
                    ? "bg-red-500" 
                    : selectedOption[i] ? "bg-green-500" : "bg-white"
            } rounded-2xl flex justify-center font-bold items-center text-[1.4vw] p-2 text-black m-2 h-[35px] w-[55px] cursor-pointer border-zinc-500 border-[3px]`}
            onClick={() => handleQuestionSelect(i)}
        >
            Q.{i + 1}
        </div>
    ));

    return (
      <div className="w-screen h-screen flex overflow-x-hidden overflow-y-hidden">
          <div className="sidebar h-screen bg-zinc-900 w-[85px] rounded-s-md border-zinc-100 border-r-2 overflow-x-hidden overflow-auto" dir="rtl">
              {quesNumbers}
          </div>
          <div className="w-[95vw] h-screen">
              
              <div className="timer bg-[#39466a23] w-full rounded-br-md rounded-bl-md border-zinc-100 border-b-[1px] flex flex-wrap justify-between px-5">
                  <h1 className="text-white text-xl ml-4 mt-3 font-serif">TabSwitch Count: {tabSwitchCount}</h1>
                  <h1 className="text-white text-2xl mr-4 mt-2 font-serif">Time Left: {formatTime(timeLeft)}</h1>
                  <a href="/testSubmit">
                  <button
                    className="p-4 bg-red-500 rounded-xl h-5 flex items-center my-2 border-zinc-500 border-[2px] text-xl font-mono"
                    onClick={handleSubmit}
                    disabled={isSubmitted}
                    >
                        SUBMIT
                    </button>
                  </a>
              </div>
              <div className="w-[94vw] h-[92.1vh] flex justify-center items-center">
                  <div className="w-[93vw] bg-zinc-900/55 rounded-xl shadow-sm shadow-zinc-100 h-[87vh] flex flex-col justify-between">
                      {questions.length > 0 && questions[selectedQuestion] && !blockedQuestions.has(selectedQuestion) && (
                          <div className="text-white ml-5 mt-5 overflow-auto">
                              <h1 className="overflow-auto font-bold text-2xl">
                                  Q. {questions[selectedQuestion].questions}
                              </h1>
                              <div className="mt-5 flex flex-col gap-2 ml-10">
                                  {(questions[selectedQuestion].option || []).map((option, index) => (
                                      <h2
                                          key={index}
                                          className={`pl-6 w-[82vw] rounded-lg h-[40px] text-2xl items-center flex cursor-pointer ${
                                              selectedOption[selectedQuestion] === option ? "bg-green-500 text-white" : "bg-zinc-200/50 text-black"
                                          }`}
                                          onClick={() => handleOptionClick(option, selectedQuestion)}
                                      >
                                          {option}
                                      </h2>
                                  ))}
                              </div>
                          </div>
                      )}
                      <div className="flex gap-5 mb-[5vh] justify-end w-[92vw]">
                          <button
                              className="text-white bg-red-500 w-[150px] h-[45px] text-2xl rounded-xl"
                              type="button"
                              onClick={handlePreviousQuestion}
                              disabled={selectedQuestion === 0}
                          >
                              <i className="ri-arrow-left-s-line"></i>PREVIOUS
                          </button>
                          <button
                              className="text-black bg-green-500 w-[95px] h-[45px] text-2xl rounded-xl"
                              type="button"
                              onClick={handleNextQuestion}
                              disabled={selectedQuestion === n - 1}
                          >
                              NEXT<i className="ri-arrow-right-s-line text-2xl"></i>
                          </button>
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
