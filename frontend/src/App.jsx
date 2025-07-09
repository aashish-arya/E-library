import React from 'react'
import Home from './pages/Home'
import Signup from './components/Signup'
import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import Contact from './pages/Contact'
import About from './pages/About'
import Readpage from './pages/Readpage'
import ScrollToTop from './components/Scrolltop'
import Bookspage from './pages/Bookspage'


const App = () => {
  const { authUser, setAuthUser } = useAuth();
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <div className='overflow-hidden '>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book' element={authUser && <Bookspage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/reader' element={<Readpage />} />
        </Routes>
        <Toaster />
      </div>
    </AnimatePresence>
  )
}

export default App
