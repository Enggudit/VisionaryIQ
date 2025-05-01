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

// Routes
server.use('/fetch', fetchRoutes);
server.use('/submit', submitRoutes);

// Root route
server.get('/', (req, res) => {
  res.send('Hey Buddy! Your backend runs great!');
});

// Server start
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
