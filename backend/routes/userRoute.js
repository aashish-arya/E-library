import express from 'express'
const router = express.Router();
import {
    signup,
    login,
    logout,
    forgetPassword,
    resetPassword,
    getCurrentUser
} from '../controllers/userController.js'
import authMiddleware from '../middlewares/userAuth.js'

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)
router.get('/me', authMiddleware, getCurrentUser)

export default router