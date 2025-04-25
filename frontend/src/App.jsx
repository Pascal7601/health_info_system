import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../Pages/SignIn/SignIn'
import Home from '../Pages/Home/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={ <SignIn /> }/>
        <Route path='/home' element={ <Home />} />
      </Routes>
    </>
  )

}

export default App
