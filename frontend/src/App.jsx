import React from 'react'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Signup from './components/Signup'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import Contact from './pages/Contact'
import About from './pages/About'


const App = () => {
  const { authUser, setAuthUser } = useAuth();
  const location = useLocation()
  return (
    <AnimatePresence mode="">
      <div className='overflow-hidden '>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/course' element={authUser && <Courses />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Toaster />
      </div>
    </AnimatePresence>
  )
}

export default App
