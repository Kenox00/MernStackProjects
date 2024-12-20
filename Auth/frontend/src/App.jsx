import React from 'react'
import { Home, Login, Signup } from './pages'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </div>
  )
}

export default App