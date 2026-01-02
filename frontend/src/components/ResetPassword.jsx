import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast'

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm();

    const password = watch("password");

    useEffect(() => {
        if (!token) {
            toast.error('Invalid reset link');
            navigate('/forget-password');
        }
    }, [token, navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/user/reset-password`, 
                { 
                    token: token,
                    password: data.password 
                }
            );

            if (response.data.success) {
                toast.success('Password reset successfully!')
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Reset password error:', error)
            toast.error(error.response?.data?.message || 'Failed to reset password. Please try again.')
        }
    }

    if (isSuccess) {
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Reset Successful!</h2>
                        <p className="text-gray-600 mb-6">
                            Your password has been reset successfully. You can now login with your new password.
                        </p>
                        <NavLink 
                            to="/"
                            className="btn btn-primary w-full"
                        >
                            Go to Login
                        </NavLink>
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
                        <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Enter your new password below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* New Password Field */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">New Password</span>
                            </label>
                            <div className="relative">
                                <input 
                                    className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    id="password" 
                                    placeholder="Enter new password (min 6 characters)"
                                    {...register("password", { 
                                        required: { value: true, message: "Password is required" },
                                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                                    })} 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {errors.password && (
                                <label className="label">
                                    <span className="label-text-alt text-red-500">{errors.password.message}</span>
                                </label>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Confirm New Password</span>
                            </label>
                            <div className="relative">
                                <input 
                                    className={`input input-bordered w-full pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                                    type={showConfirmPassword ? "text" : "password"} 
                                    name="confirmPassword" 
                                    id="confirmPassword" 
                                    placeholder="Confirm new password"
                                    {...register("confirmPassword", { 
                                        required: { value: true, message: "Please confirm your password" },
                                        validate: value => value === password || "Passwords do not match"
                                    })} 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <label className="label">
                                    <span className="label-text-alt text-red-500">{errors.confirmPassword.message}</span>
                                </label>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={isSubmitting} 
                            type='submit' 
                            className='btn btn-primary w-full disabled:cursor-not-allowed mt-6'
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Resetting...
                                </>
                            ) : (
                                'Reset Password'
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

export default ResetPassword
