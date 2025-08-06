import React from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Moviepage from './pages/Moviepage'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import ViewAll from './pages/Viewall'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'

const App = () => {
  const {fetchUser, fetchingUser} = useAuthStore();

  useEffect(() => {
    fetchUser()
  }, [fetchUser]);

  if (fetchingUser){
    return <p>Loading...</p>;
  }

  return (
    <div className='text-3xl'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<Moviepage/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/view-all/:category" element={<ViewAll />} />
      </Routes>
    </div>
  )
}

export default App