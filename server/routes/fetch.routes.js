import express from 'express';
import { postFetchQuestions, getCachedQuestions } from '../controllers/fetch.controller.js';

const router = express.Router();

router.post('/', postFetchQuestions);
router.get('/', getCachedQuestions);

export default router;
