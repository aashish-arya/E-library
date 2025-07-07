import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Freebook from '../components/Freebook'
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

const Home = () => {
    return (
        <div>
            <Navbar />
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-screen " >
                <Banner />
                <Freebook />
                <Footer />
            </motion.div>
        </div>
    )
}

export default Home
