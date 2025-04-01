import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './pages/PrivateRoute'

const App = () => {
  const location = useLocation();

  // Use the pathname to decide which class to apply
  useEffect(() => {
    const root = document.documentElement;
    if (location.pathname.includes('dashboard')) {
      root.classList.add('page-light');
      root.classList.remove('page-dark');
    } else {
      root.classList.add('page-dark');
      root.classList.remove('page-light');
    }
  }, [location]);
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        {/* <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>} />} /> */}
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  )
}

export default App
