import React from 'react'
import Cards from './Cards'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'


const Course = () => {
  const [book, setBook] = useState([])
  const { authUser, setAuthUser } = useAuth();
  const getBook = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/book/allbooks`, { withCredentials: true });
      if (res.data.success) {
        setBook(res.data.book)
      }

    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getBook()

  }, [authUser])

  return (
    <>
      <div className='min-w-screen py-15 container mx-auto md:px-22 px-4' >
        <div className='text-center mt-20 '>
          <h1 className='tracking-tight text-2xl md:text-4xl'>We're delighted to have you <span className='text-pink-500'>Here! : )</span></h1>
          <p className='mt-12 leading-7'>Explore a wide collection of curated book courses designed to enhance your reading and understanding skills. From literature analysis to storytelling techniques, each course is crafted to help readers grow their knowledge and imagination. Whether you're a beginner or a passionate book lover, our learning tracks offer step-by-step guidance, expert insights, and engaging content to boost your love for books. Enroll now and discover the joy of learning through stories!
          </p>
          <NavLink to={'/'} ><button className='text-white mt-5 hover:bg-pink-700 hover:text-black transition-colors duration-500 cursor-pointer bg-pink-500 px-8 rounded-lg py-2'>Back</button></NavLink>

        </div>
        <div className='grid  place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {
            book.map((item) => (
              <Cards item={item} key={item._id} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Course
