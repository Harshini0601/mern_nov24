import { useState } from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'

function App() {
  

  return (
    <>
      <h1>Hello world</h1>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>

      <nav>
        <ul>
          <li><Link to = "/" >Home</Link></li>
          <li><Link to = "/contact" >Contact_us_page</Link></li>
          <li><Link to = "/about" >About_us</Link></li></ul>
      </nav>
    </>

  )
}

export default App
