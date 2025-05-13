import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectToDatabase } from './databases/db.js';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import fetchRoutes from './routes/fetch.routes.js'; 
import submitRoutes from './routes/submit.routes.js'; 

dotenv.config();

const server = express();

// Middleware
server.use(helmet());
server.use(bodyParser.json());
server.use(corsMiddleware);

// Connect to DB
connectToDatabase();

<<<<<<< HEAD
server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  methods: ['GET', 'POST', ],
  allowedHeaders: ['Content-Type']
}));


// Connect to MongoDB with enhanced error handling
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB disconnected! Retrying...');
      connectToDatabase();
    });
    
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1) // Exit if connection fails
  }
}
connectToDatabase().catch(error => {
  console.error('Error during initial connection:', error)
})

// Caches
let allQuestionsCache = [] // Cache for storing questions temporarily
let submissionCache = {} // Cache for storing submission data temporarily

// POST endpoint to fetch questions
server.post('/fetch', async (req, res) => {
  const topics = req.body.topic // Array of topic names
  const totalQuestions = req.body.numberOfQuestions // Total number of questions requested
  // Validate input

  if (!Array.isArray(topics) || topics.length === 0) {
    return res.status(400).json({ message: 'Invalid topics array' })
  }

  if (totalQuestions < topics.length) {
    return res.status(400).json({
      message:
        'Total questions requested must be at least equal to the number of topics'
    })
  }

  const questionsPerTopic = Math.floor(totalQuestions / topics.length)

  try {
    const allQuestions = []
    for (const topic of topics) {
      try {
        const collection = mongoose.connection.collection(topic)
        const questions = await collection
          .aggregate([{ $sample: { size: questionsPerTopic } }]) // Fetch random questions
          .toArray()

        allQuestions.push(...questions)
      } catch (error) {
        console.error(`Error fetching questions from topic ${topic}:`, error)
      }
    }
    allQuestionsCache = allQuestions // Store in cache
    res.json({ totalQuestions: allQuestions.length, questions: allQuestions })
  } catch (error) {
    console.error('Error fetching questions:', error)
    res.status(500).json({ message: 'Error fetching questions', error })
  }
})

// GET endpoint to retrieve cached questions
server.get('/fetch', (req, res) => {
  if (allQuestionsCache.length === 0) {
    return res.status(404).json({
      message: 'No cached questions available. Please use POST /fetch first.'
    })
  }
  res.json({
    totalQuestions: allQuestionsCache.length,
    questions: allQuestionsCache
  })
})

// POST endpoint to submit answers and calculate score
server.post('/submit', (req, res) => {
  const { answers, selectedOption, questions, tabSwitchCount } = req.body
  const score = Object.keys(selectedOption).reduce((acc, key) => {
    return selectedOption[key] === answers[key] ? acc + 1 : acc
  }, 0)

  const finalScore = score * 5 - tabSwitchCount * 5

  submissionCache = {
    finalScore,
    score,
    tabSwitchCount,
    questions,
    answers,
    selectedOption
  }
  res.json({ finalScore, tabSwitchCount })
})

// GET endpoint to retrieve submission result
server.get('/submit', (req, res) => {
  res.json(submissionCache)
})
=======
// Routes
server.use('/fetch', fetchRoutes);
server.use('/submit', submitRoutes);
>>>>>>> 42b8b4df752df24083c5da330ba7202e82fc85c4

// Root route
server.get('/', (req, res) => {
  res.send('Hey Buddy! Your backend runs great!');
});

// Server start
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
