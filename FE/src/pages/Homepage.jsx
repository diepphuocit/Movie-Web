import React from 'react'
import Hero from '../components/Hero'
import Cardlist from '../components/Cardlist'
import Footer from '../components/Footer'

const Homepage = () => {
  return (
    <div className='p-5'>
        <Hero />
        <Cardlist title= 'Latest' category='now_playing' />
        <Cardlist title= 'Top Rated' category='top_rated' />
        <Cardlist title= 'Popular' category='popular' />
        <Footer />
    </div>
  )
}

export default Homepage