import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import Logo from './icons/Logo';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);

  const activeLinkStyle = {
    color: '#0ea5e9',
    fontWeight: '600',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProjectsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProjectsDropdownOpen(false);
  };
  
  const NavLinks = ({ isMobile }) => {
     const navClass = isMobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-8";
     const linkClass = "text-gray-600 hover:text-sky-500 transition-colors duration-300 text-lg";

    return (
        <ul className={navClass}>
            <li><NavLink to="/" className={linkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeAllMenus}>Home</NavLink></li>
            <li><NavLink to="/about" className={linkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeAllMenus}>About</NavLink></li>
            <li><NavLink to="/services" className={linkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeAllMenus}>Services</NavLink></li>
            {isLoggedIn && <li><NavLink to="/alumni" className={linkClass} style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeAllMenus}>Alumni</NavLink></li>}
            <li className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsProjectsDropdownOpen(prev => !prev)}
                    className={`${linkClass} flex items-center space-x-1`}
                >
                    <span>Projects</span>
                    <svg className={`w-4 h-4 transform transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isProjectsDropdownOpen && (
                    <div className={` ${isMobile ? 'relative mt-2' : 'absolute top-full left-0 mt-2'} bg-white shadow-lg rounded-md py-2 w-48 z-20`}>
                        <Link to="/projects/live" className="block px-4 py-2 text-gray-700 hover:bg-sky-100" onClick={closeAllMenus}>Live Projects</Link>
                        <Link to="/projects/completed" className="block px-4 py-2 text-gray-700 hover:bg-sky-100" onClick={closeAllMenus}>Completed Projects</Link>
                    </div>
                )}
            </li>
        </ul>
    );
};

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" onClick={closeAllMenus}>
              <Logo />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks isMobile={false} />
          </nav>
           <div className="hidden md:block">
             {isLoggedIn ? (
               <button onClick={() => setIsLoggedIn(false)} className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-sm">
                  Logout
               </button>
             ) : (
               <button onClick={() => setIsLoginModalOpen(true)} className="bg-sky-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-sky-600 transition-all duration-300 shadow-sm">
                  Login
               </button>
             )}
           </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full px-8 pb-8 pt-4">
            <NavLinks isMobile={true} />
            <div className="mt-6">
                 {isLoggedIn ? (
                   <button onClick={() => setIsLoggedIn(false)} className="block text-center w-full bg-red-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-300 shadow-sm">
                      Logout
                   </button>
                 ) : (
                   <button onClick={() => setIsLoginModalOpen(true)} className="block text-center w-full bg-sky-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-sky-600 transition-all duration-300 shadow-sm">
                      Login
                   </button>
                 )}
            </div>
        </div>
      )}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={() => setIsLoggedIn(true)} 
      />
    </header>
  );
};

export default Header;