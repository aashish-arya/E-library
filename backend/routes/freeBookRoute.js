import express from 'express'
import { getFreeBooks } from '../controllers/freeBookController.js';
const router = express.Router();

router.get('/books',getFreeBooks);

export default router;