let submissionCache = {}; // Global scope to retain submission data

export const postSubmitAnswers = (req, res) => {
  let { answers, selectedOption, questions, tabSwitchCount } = req.body;

  // Normalize questions
  questions = questions.map(q => ({
    questions: q.questions || "Untitled Question",
    option: Array.isArray(q.option) ? q.option : [],
    answer: q.answer || null,
  }));

  const score = Object.keys(selectedOption).reduce((acc, key) => {
    return selectedOption[key] === answers[key] ? acc + 1 : acc;
  }, 0);

  const finalScore = score * 5 - tabSwitchCount * 5;
  const numberOfQuestions = questions.length;
  const numberOfSelectedOptions = Object.keys(selectedOption).length;

  // Store all submission data
  submissionCache = {
    finalScore,
    score,
    tabSwitchCount,
    numberOfQuestions,
    numberOfSelectedOptions,
    questions,
    answers,
    selectedOption,
  };

  // Send partial result immediately
  res.json({
    finalScore,
    tabSwitchCount,
    numberOfQuestions,
    numberOfSelectedOptions,
  });
};

export const getSubmissionResult = (req, res) => {
  if (!submissionCache.questions) {
    return res.status(404).json({ error: "No submission found." });
  }
  res.json(submissionCache);
};
