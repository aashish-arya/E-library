import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import Books from '../components/Books'

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

const Bookspage = () => {
    return (
        <div>
            <Navbar />
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen " >
                <Books />
            </motion.div>
            <Footer />
        </div>
    )
}

export default Bookspage
