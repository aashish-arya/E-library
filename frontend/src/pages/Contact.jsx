import React from 'react'
import Navbar from '../components/Navbar'
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import about1 from '../assets/about1.avif'
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

const Contact = () => {
  return (
    <div>
      <div >
        <Navbar />
      </div>
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="min-h-[90vh] " >
        <div className='sm:py-20 mt-16 w-screen min-h-[84vh] z-0 text-black'>
          <div className='py-7 flex gap-5 sm:gap-0 flex-col sm:flex-row mx-auto h-[80%] w-[90%] justify-between items-center'>
            <div className='sm:w-[35%] h-1/2 w-[82%] overflow-hidden sm:flex-row rounded-4xl text-center flex flex-col justify-center items-center'>
              <img className='object-cover' src={about1} alt="" />
            </div>
            <div className='sm:w-[55%] h-[80%] w-[82%] py-10 px-4 tracking-tighter bg-pink-100 rounded-4xl text-center flex flex-col items-center'>
              <h1 className='text-3xl underline'>Contact Info</h1>
              <p className="text-base md:text-lg text-gray-700 mt-10 leading-relaxed">
                Hi, I'm <strong>Aashish Kumar Arya</strong> — a passionate MERN stack developer who enjoys building real-world web projects using React, Node.js, and MongoDB. I love learning by creating, and I constantly challenge myself by building new features and improving my skills. I'm actively looking for a job opportunity where I can grow as a developer and contribute to real-world applications.
              </p>
              <div className='mt-10'>
                <ul className='flex gap-4 bg-pink-200 px-5 py-4'>
                  <li><a href="https://github.com/aashish-arya" target='_blank'><FaGithub size={35} /></a></li>
                  <li><a href="https://www.linkedin.com/in/aashish-arya-34065433a/" target='_blank'><FaLinkedin size={35} /></a></li>
                  <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=ashisharya9058@gmail.com" target="_blank"><SiGmail size={35} /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      <Footer />
      </motion.div>
    </div>
  )
}

export default Contact
