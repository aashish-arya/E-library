import React from 'react'
import Navbar from '../components/Navbar'
import about3 from '../assets/about3.avif'
import { motion } from 'framer-motion'
import Footer from '../components/Footer';


const pageVariants = {
    initial: {
        opacity: 0,
        filter: 'blur(10px)',
    },
    animate: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

const About = () => {
    return (
        <div>
            <div >
                <Navbar />
            </div>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-[90vh] " >
                <div className='py-7 sm:py-20 mt-16 w-screen min-h-[84vh] z-0 text-black'>
                    <div className='flex gap-3 sm:gap-0 flex-col sm:flex-row mx-auto h-[80%] w-[90%] justify-between items-center'>
                        <div className='sm:w-[35%] h-1/2 w-[82%] overflow-hidden  rounded-4xl text-center flex flex-col justify-center items-center'>
                            <img className='object-cover' src={about3} alt="" />
                        </div>
                        <div className='sm:w-[55%] h-[80%] w-[82%] py-10 px-4 tracking-tighter bg-pink-100 rounded-4xl text-center flex flex-col items-center'>
                            <h1 className='text-3xl underline'>About Project</h1>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-8">
                                This is a full-stack MERN Book Store application built using React, Express, MongoDB, and JWT for authentication. I’ve implemented protected routes on both the frontend (via Context API) and backend (via middleware) to secure access to "Books" page. The app features user signup, login, and logout with token-based authentication using cookies. It fetches book data from MongoDB and showcases both paid and free books through responsive React components, toast notifications, and a slick carousel for free Books.
                            </p>


                        </div>
                    </div>
                </div>
                <Footer />
            </motion.div>
        </div>
    )
}

export default About
