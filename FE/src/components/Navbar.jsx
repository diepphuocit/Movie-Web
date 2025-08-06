import {HelpCircle, LogOut, Search, Settings} from 'lucide-react';
import React from 'react'
import Logo from '../assets/Logo.jpg'
import { Link } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const {user, signout} = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const AvatarUrl = user ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.username)}` : '';

  const handleSignout = async () => {
    const {message} = await signout();
    toast.success(message);
    setShowMenu(false);
  }

  const navigate = useNavigate(); 

  const fetchRandomMovie = async () => {
    try {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2M5N2Y0YWY3YzBlNWNhYzRkZTVjNTJiMTZiYjdhNCIsIm5iZiI6MTc1MzUxNTAzMi40MjksInN1YiI6IjY4ODQ4NDE4ZmJjYzJiNjkxNzM4ZjZjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.biEs1AATR9lWqZoD__cFiG5vZIwhB_Cr1rUR7xOri7E', 
        }
      });
      const data = await res.json();
      const movies = data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      navigate(`/movie/${randomMovie.id}`);
    } catch (error) {
      console.error('Error fetching random movie:', error);
      toast.error('Failed to load random movie!');
    }
  };


  return (
    <nav className='bg-black text-gray-200 flex justify-between items-center p-4 h-20 text-sm md:text-[15px] font-medium text-nowrap'>
        <Link to='/'>
          <img src={Logo} alt='Logo' className='w-17 cursor-pointer ' />
        </Link>
        <ul className='hidden xl:flex gap-6'>
          <li className='cursor-pointer hover:text-[#e50914]'>
            <Link to="/">Home</Link>
          </li>
          <li className='cursor-pointer hover:text-[#e50914]'>
            <Link to="/tv-shows">TV Shows</Link>
          </li>
          <li className='cursor-pointer hover:text-[#e50914]'>
            <Link to="/movies">Movies</Link>
          </li>
          <li className='cursor-pointer hover:text-[#e50914]'>
            <Link to="/new-popular">New & Popular</Link>
          </li>
          <li className='cursor-pointer hover:text-[#e50914]'>
            <Link to="/upcoming">Upcoming</Link>
          </li>
        </ul>
        
        <div className='flex items-center space-x-4 relative'>
            <div className='relative hidden md:inline-flex'>
                <input type="text" className='bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none' placeholder="Search..." />
                <Search className='absolute top-2 right-4 w-5 h-5'/>
            </div>

            {user ? (
              <button
                onClick={fetchRandomMovie}
                className='bg-[#e50914] px-5 py-2 text-white cursor-pointer'>
                Random Movie
              </button>
            ) : (
              <Link to='/signin'>
                <button className='bg-[#e50914] px-5 py-2 text-white cursor-pointer'>Random Movies</button>
              </Link>
            )}

            {!user ? (
              <Link to='/signin'>
              <button 
              className='bg-[#333333] px-5 py-2 text-white cursor-pointer'>Sign In</button>
            </Link> 
            ):( <div className='text-white font-medium'><img src={AvatarUrl} 
              alt='' className='w-10 h-10 rounded-full border-2 border-[#232323] cursor-pointer'
              onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className='absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border-[#333333]'>
                  <div className='flex flex-col items-center mb-2'>
                    <span className='text-white font-semibold text-base'>{user.username}</span>
                    <span className='text-xs text-gray-400'>{user.email}</span>
                  </div>
                  <button 
                  className='flex items-center px-4 py-3 rounded-lg text-white bg-[#232323] hover:bg-[#181818] gap-3 cursor-pointer'>
                    <HelpCircle className='w-5 h-5' />
                    Help
                  </button>
                  <button 
                  className='flex items-center px-4 py-3 rounded-lg text-white bg-[#232323] hover:bg-[#181818] gap-3 cursor-pointer'>
                    <Settings className='w-5 h-5' />
                    Settings
                  </button>
                  <button onClick={handleSignout}
                  className='flex items-center px-4 py-3 rounded-lg text-white bg-[#232323] hover:bg-[#181818] gap-3 cursor-pointer'>
                    <LogOut className='w-5 h-5' />
                    Signout
                  </button>
                </div>
              )}
              </div>
          )}
        </div>
    </nav>
  )
}

export default Navbar
