import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../services/emailService.js';

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address' })
        }

        const user = await userModel.findOne({ email: email.toLowerCase() })
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' })
        }

        // hashing of password
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        // creating user in database
        const createdUser = await userModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashed
        })

        // setting token
        const token = jwt.sign({ _id: createdUser._id, email: createdUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({ 
            success: true, 
            message: "Account created successfully", 
            user: { name: createdUser.name, email: createdUser.email } 
        })
    } catch (error) {
        console.error('signup error:', error)
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' })
        }

        const user = await userModel.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({ 
            success: true, 
            message: 'Logged in successfully', 
            user: { name: user.name, email: user.email } 
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}
const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// Forget Password - Generate reset token and send email
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validation
        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is required' 
            })
        }

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide a valid email address' 
            })
        }

        // Find user by email
        const user = await userModel.findOne({ email: email.toLowerCase().trim() });
        
        // If user not found, return error
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found. Please check your email address or sign up for a new account.' 
            })
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        // Save reset token to user
        user.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send password reset email
        const emailResult = await sendPasswordResetEmail(
            user.email, 
            resetToken, 
            user.name
        );

        // Check if email was sent successfully
        if (!emailResult.success) {
            // If email service is not configured, return token for development
            const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
            
            if (isDevelopment && emailResult.error === 'Email service not configured') {
                const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
                console.log('\n========================================');
                console.log('🔐 PASSWORD RESET REQUEST');
                console.log('========================================');
                console.log('Email:', user.email);
                console.log('User:', user.name);
                console.log('Reset Token:', resetToken);
                console.log('Reset Link:', resetLink);
                console.log('========================================\n');
                
                return res.status(200).json({ 
                    success: true, 
                    message: 'Password reset link generated. Check backend console for the link.',
                    resetToken: resetToken,
                    resetLink: resetLink,
                    emailSent: false
                })
            }
            
            // If email sending failed for other reasons
            console.error('Failed to send password reset email:', emailResult.error);
            return res.status(500).json({ 
                success: false, 
                message: 'Failed to send password reset email. Please try again later.' 
            })
        }

        // Email sent successfully
        console.log('✅ Password reset email sent successfully to:', user.email);
        
        res.status(200).json({ 
            success: true, 
            message: 'Password reset link has been sent to your email address. Please check your inbox and spam folder.',
            emailSent: true
        })
    } catch (error) {
        console.error('Forget Password Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error. Please try again later.' 
        })
    }
}

// Reset Password - Use reset token to set new password
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ success: false, message: 'Token and password are required' })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' })
        }

        // Hash the token to compare with stored hash
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userModel.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' })
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update password and clear reset token
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' })
    } catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

// Get current user
const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password -resetToken -resetTokenExpiry');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, user: { name: user.name, email: user.email } })
    } catch (error) {
        console.error('Get Current User Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
}

export {
    signup,
    login,
    logout,
    forgetPassword,
    resetPassword,
    getCurrentUser
}