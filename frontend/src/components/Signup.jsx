import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
    const navigate = useNavigate();
    const { register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const { name, email, password } = data;
            const user = {
                name, email, password
            }
            // console.log(user)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/signup`, user)
            if (response.data.success) {
                toast.success('Signup successfully')
            }
            localStorage.setItem('users', JSON.stringify(response.data.user))
            reset();
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

    }
    return (
        <>
            <div className='flex justify-center items-center w-screen h-screen'>
                <div id="my_modal_3" className="h-[60%]  ">
                    <div className="w-screen flex items-center justify-center flex-col">
                        <form method="dialog" onSubmit={handleSubmit(onSubmit)} className='w-[90%] md:w-[50%] flex flex-col justify-center items-center '>
                            {/* if there is a button in form, it will close the modal */}
                            {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                            <h3 className="font-bold text-center text-lg">SignUp <span className='text-pink-500'>page : )</span> </h3>

                            <div className='flex justify-center items-center rounded-md mt-5 w-full  md:w-[90%]  border flex-col gap-5 py-8  '>
                                <div className='flex flex-col sm:flex-row justify-start items-start sm:justify-around sm:items-center  w-[85%] gap-2 '>
                                    <label className='rounded-md text-nowrap px-2  font-bold border md:py-1' htmlFor="name">Name :-</label>
                                    <input className='rounded-md py-1 px-2 border-1 outline-none' type="text" name="name" id="name" placeholder='Enter your Name..' {...register("name", { required: { value: true, message: 'Please Fill this field' } })} />
                                </div>{errors.name ? <div className='font-bold text-red-500 text-sm '>{errors.name && <span>{errors.name.message}</span>}</div> : ""}

                                <div className='flex flex-col sm:flex-row justify-start items-start sm:justify-around sm:items-center  w-[85%] gap-2 '>
                                    <label className='rounded-md text-nowrap px-2  font-bold border md:py-1' htmlFor="email">Email :-</label>
                                    <input className='rounded-md py-1 px-2 border-1 outline-none' type="text" name="email" id="email" placeholder='Enter your email..' {...register("email", { required: { value: true, message: 'Please Fill this field' } })} />
                                </div>
                                {errors.email ? <div className='font-bold text-red-500 text-sm '>{errors.email && <span>{errors.email.message}</span>}</div> : ""}

                                <div className='flex flex-col sm:flex-row justify-start items-start sm:justify-around sm:items-center  w-[79%] gap-2 '>
                                    <label className='rounded-md text-nowrap px-2  font-bold border md:py-1 ' htmlFor="password">Password :-</label>
                                    <input className='rounded-md py-1 px-1   border-1 outline-none' type="password" name="password" id="password" placeholder='Enter password..' {...register("password", { required: { value: true, message: "Please Fill this field" } })} />
                                </div>
                                {errors.password ? <div className='font-bold text-red-500 text-sm '>{errors.password && <span>{errors.password.message}</span>}</div> : ""}

                                <div className='flex flex-col justify-start items-start sm:flex-row sm:justify-around gap-4 sm:gap-10 text-nowrap sm:items-center w-[85%]'>
                                    <button disabled={isSubmitting} className='active:scale-90 hover:bg-pink-700 transition-colors duration-400 bg-pink-500 text-white px-5 py-2 rounded-md cursor-pointer'>Sign Up</button>
                                    <p className='mr-12'>OR?
                                        <NavLink to={'/'} ><span className=' text-pink-500 cursor-pointer underline'> Go To Home</span></NavLink></p>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
