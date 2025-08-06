import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router';

const Cardlist = ({ title, category }) => {
  const [data, setData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M5N2Y0YWY3YzBlNWNhYzRkZTVjNTJiMTZiYjdhNCIsIm5iZiI6MTc1MzUxNTAzMi40MjksInN1YiI6IjY4ODQ4NDE4ZmJjYzJiNjkxNzM4ZjZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.biEs1AATR9lWqZoD__cFiG5vZIwhB_Cr1rUR7xOri7E'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setData(res.results))
      .catch(err => console.error(err));
  }, [category]); // ✅ Add dependency

  return (
    <div className='text-white md:px-4'>
      <div className='pt-10 pb-5 flex justify-between items-center'>
        <h2 className='text-lg font-medium'>{title}</h2>
        <Link to={`/view-all/${category}`} className='text-sm text-[#e50914] hover:underline'>
          View All
        </Link>
      </div>
      <Swiper slidesPerView={'auto'} spaceBetween={10} className='mySwiper'>
        {data.map((item, index) => (
          <SwiperSlide key={index} className='max-w-72'>
            <Link to={`/movie/${item.id}`} className='block'>
              <img
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : '/fallback.jpg'}
                alt={item.title}
                className='h-44 w-full object-cover object-center rounded-lg'
              />
              <p className='mt-2 text-sm'>{item.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cardlist;

      
    