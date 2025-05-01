import mongoose from 'mongoose';

// In-memory cache (move to Redis or DB for production use)
let allQuestionsCache = [];

export const postFetchQuestions = async (req, res) => {
  const topics = req.body.topic;
  const totalQuestions = req.body.numberOfQuestions;

  if (!Array.isArray(topics) || topics.length === 0) {
    return res.status(400).json({ message: 'Invalid topics array' });
  }

  if (totalQuestions < topics.length) {
    return res.status(400).json({
      message: 'Total questions requested must be at least equal to the number of topics',
    });
  }

  const questionsPerTopic = Math.floor(totalQuestions / topics.length);
  const allQuestions = [];

  try {
    for (const topic of topics) {
      try {
        const collection = mongoose.connection.collection(topic);
        const questions = await collection.aggregate([{ $sample: { size: questionsPerTopic } }]).toArray();
        allQuestions.push(...questions);
      } catch (error) {
        console.error(`Error fetching questions from topic ${topic}:`, error);
      }
    }

    allQuestionsCache = allQuestions;
    res.json({ totalQuestions: allQuestions.length, questions: allQuestions });

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

export const getCachedQuestions = (req, res) => {
  if (allQuestionsCache.length === 0) {
    return res.status(404).json({
      message: 'No cached questions available. Please use POST /fetch first.',
    });
  }

  res.json({
    totalQuestions: allQuestionsCache.length,
    questions: allQuestionsCache,
  });
};
