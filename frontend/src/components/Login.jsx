import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext';

const Login = ({ modalRef }) => {
    const { setAuthUser } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const closeLogin = () => {
        modalRef.current?.close();
        reset();
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/user/login`, 
                { email: data.email.trim(), password: data.password }, 
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success('Logged in successfully!')
                setAuthUser(response.data.user)
                localStorage.setItem('user', JSON.stringify(response.data.user));
                modalRef.current?.close()
                reset();
            }

        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.response?.data?.message || 'Login failed. Please try again.')
        }
    }

    return (
        <div>
            <dialog ref={modalRef} id="login_modal" className="modal z-50">
                <div className="modal-box w-full max-w-md">
                    <form onSubmit={handleSubmit(onSubmit)} method='dialog' className="space-y-6">
                        <button 
                            type="button"
                            onClick={closeLogin} 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>
                        
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
                            <p className="text-sm text-gray-500 mt-1">Login to your account</p>
                        </div>

                        <div className="space-y-4">
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

                            {/* Password Field */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <div className="relative">
                                    <input 
                                        className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        id="password" 
                                        placeholder="Enter your password"
                                        {...register("password", { 
                                            required: { value: true, message: 'Password is required' }, 
                                            minLength: { value: 6, message: 'Password must be at least 6 characters' } 
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

                            {/* Forget Password Link */}
                            <div className="text-right">
                                <NavLink 
                                    to="/forget-password"
                                    onClick={closeLogin}
                                    className="text-sm text-pink-500 hover:text-pink-700 hover:underline"
                                >
                                    Forgot password?
                                </NavLink>
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
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <NavLink 
                                        to="/signup"
                                        onClick={closeLogin}
                                        className="text-pink-500 font-semibold hover:text-pink-700 hover:underline"
                                    >
                                        Sign up
                                    </NavLink>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeLogin}>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Login
