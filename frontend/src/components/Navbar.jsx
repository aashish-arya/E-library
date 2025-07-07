import React, { useEffect, useRef, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import Login from './Login'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
const Navbar = () => {
    const navigate = useNavigate()
    const { authUser, setAuthUser } = useAuth();
    const [sticky, setSticky] = useState(false)
    const modalRef = useRef();

    const handleLogin = () => {
        modalRef.current?.showModal();
    }

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/logout`, {}, { withCredentials: true })
            setAuthUser(null)
            localStorage.removeItem('user')
            toast.success("Logout Successfully")
            navigate('/')
        } catch (error) {
            toast.error("Error", error.message)
        }
    }
    const handleCourse = () => {
        if (authUser) {
            navigate('/course')
        }
        else {
            toast.error('Please Login First')
        }
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    useEffect(() => {

    }, [authUser])

    const navItems = (
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li onClick={handleCourse}><NavLink to={`${authUser ? '/course' : "#"}`}>Course</NavLink></li>
            <li><NavLink to={'/contact'}>Contact</NavLink></li>
            <li><NavLink to={'/about'}>About</NavLink></li>
        </>
    )
    return (
        <>
            <div className={`min-w-screen z-10 h-16 container px-4 md:px-20 fixed top-0 left-0  ${sticky ? "sticky-navbar shadow-md backdrop-blur-xs bg-white/3 duration-900 transition-color ease-in-out" : "sticky-navbar  "}`}>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {navItems}
                            </ul>
                        </div>
                        <a className=" text-2xl font-bold cursor-pointer">BookStore</a>
                    </div>
                    <div className='navbar-end'>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {navItems}
                            </ul>
                        </div>
                        <div className='hidden sm:block'>
                            <label className="input transition-colors duration-500 focus-within:outline-none focus-within:ring-0 focus-within:border-1">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input className='' type="search" required placeholder="Search" />
                            </label>
                        </div>

                        <div className="">
                            {authUser ? <a onClick={handleLogout} className="ml-2 py-2.5 px-4 rounded-md hover:cursor-pointer bg-red-500 hover:bg-slate-800 duration-200 text-white"
                            >
                                Logout
                            </a> : <a className="ml-2 py-2.5 px-4 rounded-md hover:cursor-pointer bg-black hover:bg-slate-800 duration-200 text-white"
                                onClick={handleLogin}>
                                Login
                            </a>}
                            <Login modalRef={modalRef} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
