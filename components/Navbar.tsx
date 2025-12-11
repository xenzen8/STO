import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Custom Target SVG Logo */}
            <div className="w-12 h-12 text-white relative flex-shrink-0 transition-transform duration-700 group-hover:rotate-90">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="0" y1="50" x2="100" y2="50" />
                <circle cx="50" cy="50" r="18" />
                <circle cx="50" cy="50" r="32" />
                <circle cx="50" cy="50" r="46" />
              </svg>
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="font-oswald text-4xl font-bold italic tracking-tighter text-orange-600 leading-none drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">STO</span>
              <span className="font-sans text-[0.6rem] font-bold tracking-[0.2em] text-white leading-none mt-1 opacity-90">TARGET SYSTEM</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-400 hover:text-orange-500 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Admin Link */}
              <Link 
                to={isAuthenticated ? "/admin" : "/login"}
                className={`ml-4 p-2 rounded-full transition-colors flex items-center gap-2 ${isActive('/admin') || isActive('/login') ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-orange-500 hover:bg-gray-800'}`}
                title={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
              >
                {isAuthenticated ? <LayoutDashboard className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium uppercase ${
                  isActive(link.path) ? 'bg-neutral-800 text-orange-500' : 'text-gray-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
                to={isAuthenticated ? "/admin" : "/login"}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium uppercase flex items-center gap-2 ${
                  isActive('/admin') || isActive('/login') ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {isAuthenticated ? <LayoutDashboard className="w-4 h-4" /> : <Lock className="w-4 h-4" />} 
                {isAuthenticated ? "Dashboard" : "Admin Login"}
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};