import React, { useEffect, useState } from 'react';
import HomePage from '../assets/homepage.jpg'; 
import {Bookmark, Play} from 'lucide-react'; 
import { Link } from 'react-router';

const Hero = () => {
  const [movie, setMovie] =useState(null);
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M5N2Y0YWY3YzBlNWNhYzRkZTVjNTJiMTZiYjdhNCIsIm5iZiI6MTc1MzUxNTAzMi40MjksInN1YiI6IjY4ODQ4NDE4ZmJjYzJiNjkxNzM4ZjZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.biEs1AATR9lWqZoD__cFiG5vZIwhB_Cr1rUR7xOri7E'
  }
};

useEffect(() => {
  fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => {
    if(res.results && res.results.length > 0){
      const randomIndex = Math.floor(Math.random() * res.results.length);
      setMovie(res.results[randomIndex]); 
    }
  })
  .catch(err => console.error(err)); 
}, []);

  
  return (
    <div>
        <img 
  src={movie?.backdrop_path 
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` 
    : HomePage} 
  alt={movie?.title || 'HomePage'} 
  className="w-full rounded-2xl h-[480px] object-center object-cover" 
/>

        <div className='flex space-x-2 md:space-x-4 absolute bottom-24 left-7 md:bottom-30 md:left-10 font-medium text-white'>
            <button className='flex justify-center items-center bg-black hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Bookmark className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Save for later</button>
            <Link to={`movie/${movie?.id}`}>
              <button className='flex justify-center items-center bg-black hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base'><Play className='mr-2 w-4 h-5 md:w-5 md:h-5'/>Watch now</button>
            </Link>           
        </div>
    </div>
  )
}

export default Hero