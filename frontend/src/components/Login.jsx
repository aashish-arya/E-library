import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const Login = ({ modalRef }) => {
    const { authUser, setAuthUser } = useAuth();

    const { register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const closeLogin = () => {
        modalRef.current?.close();
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`, data, { withCredentials: true });
            console.log(response)
            if (response.data.success) {
                toast.success('Loggedin Successfully')
                setAuthUser(response.data.user)
                localStorage.setItem('user', JSON.stringify(response.data.user));
                modalRef.current?.close()
                reset();
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    
    useEffect(() => {
        console.log(authUser)
    }, [authUser])

    return (
        <div >
            <dialog ref={modalRef} id="my_modal_3" className="modal z-0">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method='dialog'>
                        {/* if there is a button in form, it will close the modal */}
                        <span onClick={closeLogin} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</span>
                        <h3 className="font-bold text-center text-lg">Login <span className='text-pink-500'>page : )</span> </h3>

                        <div className='flex rounded-md mt-5 border flex-col gap-8 sm:gap-5 py-8  justify-center items-center'>
                            <div className='flex  flex-col sm:flex-row justify-start items-start sm:justify-around sm:items-center  w-[85%] gap-2 '>
                                <label className='rounded-md font-bold border py-1 px-7' htmlFor="email">Email :-</label>
                                <input className='rounded-md py-1 px-2 border-1 outline-none' type="text" name="email" id="email" placeholder='Enter your email..'
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address"
                                        }
                                    }
                                    )} />

                            </div>
                            <div className='text-red-500 text-sm '>{errors.email && <span>{errors.email.message}</span>}</div>
                            <div className='flex flex-col sm:flex-row justify-start items-start sm:justify-around sm:items-center  w-[85%] gap-2 '>
                                <label className='rounded-md font-bold border py-1 px-3' htmlFor="password">Password :-</label>
                                <input className='rounded-md py-1 px-2 border-1 outline-none' type="password" name="password" id="password" placeholder='Enter your password..'
                                    {...register("password", { required: { value: true, message: 'this field is required' }, minLength: { value: 4, message: 'pasword must be greater than 4 alphabets' } })} />
                            </div>
                            <div className='text-red-500 text-sm'>{errors.password && <span>{errors.password.message}</span>}</div>
                            <div className='flex mt-2 flex-col sm:flex-row justify-start items-start sm:justify-around sm:items-center w-[85%]'>
                                <button type='submit' className='active:scale-90 hover:bg-pink-700 transition-colors duration-400 bg-pink-500 text-white px-5 py-2 rounded-md cursor-pointer'>Login</button>
                                <p className='mt-4 '>Not registered ?
                                    <NavLink to={'/signup'}><span className=' text-pink-500 cursor-pointer underline'> Sign up!</span></NavLink></p>
                            </div>
                        </div>
                    </form>

                </div>
            </dialog>
        </div>
    )
}

export default Login
