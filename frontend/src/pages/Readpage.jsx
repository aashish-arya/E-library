import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import Reader from '../components/Reader';



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


const Readpage = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-[90vh] " >
                <Reader />
            </motion.div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Readpage
