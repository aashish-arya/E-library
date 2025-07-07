import React from 'react'

const Cards = ({ item }) => {
    return (
        <>
            <div className='min-h-[auto] px-2 hover:scale-100 transition-all duration-400'>
                <div className="card bg-base-100 mt-12 border hover:scale-105 transition-all duration-400">
                    <figure className=' rounded-4xl overflow-hidden '>
                        <img
                            loading="lazy"
                            className=' p-2 rounded-4xl  transition-all'
                            src={item.image}
                            alt="books" />
                    </figure>
                    <div className="card-body mt-5 ">
                        <h2 className="card-title">
                            {item.name}
                            <div className="badge badge-secondary">{item.category}</div>
                        </h2>
                        <p> <span className='text-pink-500 font-semibold'>About : - </span>{item.title}</p>
                        <div className="card-actions justify-between">
                            <div className="badge badge-outline hover:bg-pink-500 duration-400 cursor-pointer hover:scale-125 hover:py-1">${item.price}</div>
                            <div className="badge badge-outline hover:bg-pink-500 duration-400 cursor-pointer hover:scale-125 hover:py-1">Products</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards
