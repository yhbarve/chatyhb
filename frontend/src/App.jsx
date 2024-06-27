import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Prompt from './components/Prompt';
import Response from './components/Response';
import List from './components/List';
import Navbar from './components/Navbar';
import axios from "axios"
import { Router, BrowserRouter, createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';


function App() {

  return (
    <div className=''>
      <BrowserRouter >
        <Routes>
          <Route path='/chat/:id' element={<ChatPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
