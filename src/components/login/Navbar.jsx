import React from 'react'
import logo from '../../assets/escalogo.svg';
// import './Navbar.module.css'

export default function Navbar() {
  return (
    <div>
        <nav>
        <img src={logo} alt="Escalayt Logo" className="m-5 escalayt-logo" />
        </nav>
        
    </div>
  )
}
