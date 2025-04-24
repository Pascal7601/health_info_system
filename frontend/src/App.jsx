import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../Pages/SignIn/SignIn'

function App() {

  return (
    <Routes>
      <Route path='/sign_up' element={ <SignIn /> }/>
    </Routes>
  )

}

export default App
