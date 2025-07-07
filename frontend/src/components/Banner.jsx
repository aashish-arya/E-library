import React from 'react'
import banner from '../assets/Bannerdownload.png'


const Banner = () => {
    return (
        <>
            <div className='min-w-screen container px-4 sm:px-20 flex flex-col gap-2 md:flex-row md:justify-center items-center  my-10'>
                <div className='order-2 md:order-1 w-full md:w-1/2 mt-12 sm:mt-32'>
                    <div className='space-y-12'>
                        <h1 className='text-4xl font-bold'>Hello, Welcome here to learn something <span className='text-pink-500'>new everyday!!!</span> </h1>
                        <p className='text-xl font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id natus tenetur adipisci recusandae atque repudiandae facere incidunt doloribus deserunt assumenda. Minima earum ratione tenetur mollitia.</p>
                        <label className="input focus-within:outline-none focus-within:ring-0 focus-within:border-1 validator w-full ">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" placeholder="Email" required />
                        </label>
                    </div>
                    <button className="btn mt-5 tracking-widest hover:bg-pink-700 rounded-md active:scale-95 bg-pink-500 text-white">Subscribe</button>


                </div>
                <div className='order-1 md:order-2 w-full md:w-1/2'>
                    <img className='' src={banner} alt="" />
                </div>

            </div>
        </>
    )
}

export default Banner
