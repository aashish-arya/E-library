import React from 'react'
import Navbar from '../components/Navbar'
import Course from '../components/Course'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

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

const Courses = () => {
    return (
        <div>
            <Navbar />
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen " >
                <Course />
            </motion.div>
            <Footer />
        </div>
    )
}

export default Courses
