import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import CreateBook from './pages/CreateBook'
import ShowBook from './pages/ShowBook'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<CreateBook/>}/>
      <Route path="/details/:id" element={<ShowBook/>}/>
      <Route path="/delete/:id" element={<DeleteBook/>}/>
      <Route path="/edit/:id" element={<EditBook/>}/>
    </Routes>
  )
}

export default App