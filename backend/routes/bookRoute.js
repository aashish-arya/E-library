import express from 'express'
import { getBook } from '../controllers/bookController.js'
import authMiddleware from '../middlewares/userAuth.js';

const router = express.Router();


router.get('/allbooks', authMiddleware, getBook)

export default router;