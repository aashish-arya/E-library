
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';

const Reader = () => {
  const location = useLocation();
  const { book } = location.state;
  return (
    <div className='min-w-screen  mt-16 bg- py-5 container mx-auto md:px-22 px-4' >

      <div className='w-full min-h-screen bg-gray-100 rounded-3xl py-5 px-12'>

        <h1 className='mx-auto text-4xl hover:bg-gray-200 hover:cursor-pointer  transition-all duration-500 w-fit p-5 rounded-2xl'> <span className=''>TITLE -</span> {book.name.toUpperCase()}</h1>
        <div className=' flex flex-col justify-center items-center'>
          <div className='mt-5'>
            <img className='w-[500px] rounded-4xl shadow-2xl shadow-gray-900' src={book.photo} alt={book.title} />
          </div>
          <div className='mt-10 leading-loose '>
            <p className='text-justify'>{book.story}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reader
