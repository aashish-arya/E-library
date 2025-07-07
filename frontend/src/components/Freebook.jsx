import React, { useEffect, useState } from 'react'
import list from '../assets/list.json'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios'

const Freebook = () => {
  const [filterData, setFilterData] = useState([])
  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/free/books`);
      const freebook = res.data.filter((item) => item.category === 'free');
      setFilterData(freebook)
    }
    getBooks()
  }, [])


 var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className='max-w-screen min-h-[90vh] container px-4 sm:px-20'>
        <div>
          <h1 className='font-semibold text-xl px-5 md:p-0 pb-2'>Free Offered Courses</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quibusdam, inventore possimus asperiores fuga perspiciatis architecto porro aliquam nobis alias unde nostrum quis earum, temporibus similique aspernatur culpa deleniti!</p>
        </div>
        <div className='px-4 sm:px-20 mb-10 mx-auto'>
          <Slider {...settings}>
            {filterData.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Freebook
