import express from 'express'
import {
    getBook,
    readBook
} from '../controllers/bookController.js'

import authMiddleware from '../middlewares/userAuth.js';

const router = express.Router();

//paid books for course and reading
router.get('/allbooks', authMiddleware, getBook)
router.get('/read/:id', authMiddleware, readBook)

export default router;