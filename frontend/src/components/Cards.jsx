import axios from 'axios'
import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Cards = ({ item, free }) => {
    const navigate = useNavigate()
    const { authUser, setAuthUser } = useAuth();

    const handleRead = async (id) => {
        try {
            const url = free
                ? `${import.meta.env.VITE_BACKEND_URI}/free/read/${id}`
                : `${import.meta.env.VITE_BACKEND_URI}/book/read/${id}`

            const res = await axios.get(url, { withCredentials: true });
            if(!res.data.book){
                toast.error('Book is not avalaible')
            }
            navigate('/reader',{state:{book: res.data.book}})
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='px-2 hover:scale-100 transition-all duration-400'>
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
                            <div className="badge badge-outline hover:bg-pink-500 duration-400 cursor-pointer hover:scale-125 hover:py-1">$ {item.price}</div>
                            {free ? <div onClick={() => handleRead(item._id)} className="badge badge-outline hover:bg-pink-500 duration-400 cursor-pointer hover:scale-125 hover:py-1">Read free</div> : <div onClick={() => handleRead(item._id)} className="badge badge-outline hover:bg-pink-500 duration-400 cursor-pointer hover:scale-125 hover:py-1">Read</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards
