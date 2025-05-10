
import React, { useState, useEffect } from 'react';
import escalaytlogo from '../../assets/escalayt-logo.svg'
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
    

      <header className="bg-blue-50 py-2 border-1 relative z-50">
        
        <nav className="bg-blue-50 py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center pl-6">
              <img src={escalaytlogo} alt="The escalayt logo" className='mt-1' />
              <span className='font-bold ml-2 mt-1 text-blue-500'>Escalayt</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#demos" className="text-lg hover:text-blue-600">Demos</a>
              <a href="#about" className="text-lg hover:text-blue-600">About</a>
              <a href="#blog" className="text-lg hover:text-blue-600">Blog</a>
              <a href="#pages" className="text-lg hover:text-blue-600">Pages</a>
              <a href="#contact" className="text-lg hover:text-blue-600">Contact</a>
            </div>
           <div className="flex items-center space-x-2">
  <Link to="/login">
    <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md">
      Login
    </button>
  </Link>
  <Link to="/signup">
    <button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md">
      Start Free Trial
    </button>
  </Link>
</div>

            
            <button onClick={toggleMenu} className="md:hidden flex items-center px-3 py-2 border rounded text-blue-600 border-blue-600">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0zM0 7h20v2H0zM0 11h20v2H0z" />
              </svg>
            </button>
            {/* </Link> */}
          </div>
        </nav>
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 top-16 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
            <div className="fixed inset-0 top-16 bg-blue-50 p-4 z-40 flex flex-col items-center justify-center space-y-4">
              <a href="#demos" className="block text-lg py-2 hover:text-blue-600">Demos</a>
              <a href="#about" className="block text-lg py-2 hover:text-blue-600">About</a>
              <a href="#blog" className="block text-lg py-2 hover:text-blue-600">Blog</a>
              <a href="#pages" className="block text-lg py-2 hover:text-blue-600">Pages</a>
              <a href="#contact" className="block text-lg py-2 hover:text-blue-600">Contact</a>
              <Link to="/signup"><button className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md mt-2">Start Free Trial</button></Link>
              
              
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default Header