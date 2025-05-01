// In-memory cache (same note: move to Redis or persistent store in production)
let submissionCache = {};

export const postSubmitAnswers = (req, res) => {
  const { answers, selectedOption, questions, tabSwitchCount } = req.body;

  const score = Object.keys(selectedOption).reduce((acc, key) => {
    return selectedOption[key] === answers[key] ? acc + 1 : acc;
  }, 0);

  const finalScore = score * 5 - tabSwitchCount * 5;

  submissionCache = {
    finalScore,
    score,
    tabSwitchCount,
    questions,
    answers,
    selectedOption,
  };

  res.json({ finalScore, tabSwitchCount });
};

export const getSubmissionResult = (req, res) => {
  res.json(submissionCache);
};
