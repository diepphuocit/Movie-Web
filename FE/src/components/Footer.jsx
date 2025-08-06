import React from 'react'

const Footer = () => {
  return (
    <div className='text-[#737373] md:px-10'>
        <div className='py-20'>
            <p>Developed by Diep Gia Phuoc</p>
        </div>
        <p className='pb-5'>Question ? Contact us</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 text-sm'>
            <ul className='flex flex-col gap-2'>
                <li className='cursor-pointer hover:text-[#e50914]'>About</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Contact</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Privacy Policy</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Terms of Use</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Cookie Preferences</li>
            </ul>
            <ul className='flex flex-col gap-2'>
                <li className='cursor-pointer hover:text-[#e50914]'>About</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Contact</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Privacy Policy</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Terms of Use</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Cookie Preferences</li>
            </ul>
            <ul className='flex flex-col gap-2'>
                <li className='cursor-pointer hover:text-[#e50914]'>About</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Contact</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Privacy Policy</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Terms of Use</li>
                <li className='cursor-pointer hover:text-[#e50914]'>Cookie Preferences</li>
            </ul>
        </div>
    </div>
  )
}

export default Footer