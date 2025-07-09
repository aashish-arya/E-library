import express from 'express'
import { getFreeBooks, readFreeBook } from '../controllers/freeBookController.js';
const router = express.Router();

// free books for Home and reading 
router.get('/books',getFreeBooks);
router.get('/read/:id',readFreeBook)

export default router;