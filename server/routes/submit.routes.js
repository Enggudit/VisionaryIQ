import express from 'express';
import { postSubmitAnswers, getSubmissionResult } from '../controllers/submit.controller.js';

const router = express.Router();

router.post('/', postSubmitAnswers);
router.get('/', getSubmissionResult);

export default router;
