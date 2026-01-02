import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast'

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resetToken, setResetToken] = useState(null);

    const { register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/user/forget-password`, 
                { email: data.email.trim() }
            );

            if (response.data.success) {
                // Email sent successfully
                if (response.data.emailSent) {
                    toast.success(response.data.message)
                    setIsSubmitted(true);
                    setResetToken(null); // No token needed if email was sent
                } 
                // Development mode - email service not configured
                else if (response.data.resetToken) {
                    toast.success('Reset link generated (Development Mode)')
                    setIsSubmitted(true);
                    setResetToken(response.data.resetToken);
                } 
                // Fallback
                else {
                    toast.success(response.data.message)
                    setIsSubmitted(true);
                }
            }
        } catch (error) {
            console.error('Forget password error:', error)
            
            // Handle different error cases
            if (error.response?.status === 404) {
                // User not found
                toast.error(error.response.data.message || 'User not found. Please check your email address or sign up for a new account.')
            } else if (error.response?.status === 400) {
                // Validation error
                toast.error(error.response.data.message || 'Please provide a valid email address.')
            } else if (error.response?.status === 500) {
                // Server error
                toast.error(error.response.data.message || 'Server error. Please try again later.')
            } else {
                // Network or other errors
                toast.error(error.response?.data?.message || 'Failed to process request. Please check your connection and try again.')
            }
        }
    }

    if (isSubmitted) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="mb-6">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h2>
                        <p className="text-gray-600 mb-6">
                            We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                        </p>
                        
                        {/* Development mode - show reset token if email service not configured */}
                        {resetToken ? (
                            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800 font-semibold mb-3">🔧 Development Mode</p>
                                <p className="text-xs text-yellow-700 mb-3">
                                    Email service is not configured. Use the link below to reset your password:
                                </p>
                                <div className="mb-3 p-2 bg-white rounded border">
                                    <p className="text-xs text-gray-600 mb-1">Reset Link:</p>
                                    <code className="text-xs break-all block text-blue-600">
                                        {window.location.origin}/reset-password/{resetToken}
                                    </code>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/reset-password/${resetToken}`);
                                    }}
                                    className="btn btn-warning w-full"
                                >
                                    🔗 Click to Reset Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.origin}/reset-password/${resetToken}`);
                                        toast.success('Link copied to clipboard!');
                                    }}
                                    className="btn btn-outline btn-sm w-full mt-2"
                                >
                                    📋 Copy Link
                                </button>
                            </div>
                        ) : (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-800 font-semibold mb-1">Email Sent Successfully!</p>
                                        <p className="text-xs text-green-700 mb-2">
                                            Password reset link has been sent to your email address. 
                                            Please check your inbox and spam folder.
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            <strong>Note:</strong> The link will expire in 15 minutes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setResetToken(null);
                                }}
                                className="btn btn-outline w-full"
                            >
                                Try Another Email
                            </button>
                            <NavLink 
                                to="/"
                                className="block text-center text-sm text-pink-500 hover:text-pink-700 hover:underline"
                            >
                                Back to Login
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Forgot Password?</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            No worries! Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Email Address</span>
                            </label>
                            <input 
                                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address"
                                    }
                                })} 
                            />
                            {errors.email && (
                                <label className="label">
                                    <span className="label-text-alt text-red-500">{errors.email.message}</span>
                                </label>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={isSubmitting} 
                            type='submit' 
                            className='btn btn-primary w-full disabled:cursor-not-allowed'
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>

                        {/* Back to Login Link */}
                        <div className="text-center">
                            <NavLink 
                                to="/"
                                className="text-sm text-pink-500 hover:text-pink-700 hover:underline"
                            >
                                ← Back to Login
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
