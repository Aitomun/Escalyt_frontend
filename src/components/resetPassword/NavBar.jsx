// src/NavBar.js
import React from 'react';
import escalogo from '../assets/escalaytlogo.svg'; // Adjust the path as needed

function NavBar  ()  {
  return (
    <nav className="flex pl-6 mt-1 mb-12">
      <img src={escalogo} alt="escalayt-logo" />
      <span className="font-bold ml-2 mt-1 text-primary text-blue-500">Escalayt</span>
    </nav>
  );
};

export default NavBar;
