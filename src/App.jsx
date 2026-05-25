import { useState } from 'react'

import './App.css'
import { Route, Router, Routes } from 'react-router'
import ManagePage from './pages/ManagePage'
import HomePage from './pages/HomePage'


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="manage" element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
