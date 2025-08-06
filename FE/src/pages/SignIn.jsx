import React from 'react';
import SignInImage from '../assets/SignIn.jpg';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';


const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signin, isLoading, error } = useAuthStore();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const {message} = await signin(username, password);
      toast.success(message);
      navigate('/'); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className='min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${SignInImage})`,
      }}
    >
      <div 
      className='max-w-[450px] mx-auto bg-[#181818] p-8 rounded-lg shadow-lg'>
        <form onSubmit={handleSignin}
        className='flex flex-col gap-5 max-w-md mx-auto'>
          <h1 
          className='text-3xl font-medium text-white mb-7'>Sign In</h1>
          <input 
          type='text' placeholder='Username' 
          value={username} onChange={(e) => setUsername(e.target.value)}
          className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base'/>
          <input 
          type='password' placeholder='Password' 
          value={password} onChange={(e) => setPassword(e.target.value)}
          className='w-full h-[50px] bg-[#333] text-white rounded px-5 text-base'/>
          
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          
          <button 
          type='submit' 
          disabled={isLoading}
          className='w-full bg-[#e50914] text-white font-medium py-2 rounded text-base hover:opacity-90 cursor:pointer'>Sign In</button>
        </form>
        <div 
        className='mt-10 text-[#737373] text-sm text-center'>
          <p>Don't have an account? <span onClick={() => navigate('/signup')} className='text-white font-medium cursor-pointer ml-2 hover:underline'>Sign up now</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
