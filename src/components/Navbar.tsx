import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Book, Home, Info, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Trang Chủ', path: '/', icon: <Home size={18} /> },
    { name: 'Mẫu Truyện', path: '/templates', icon: <Sparkles size={18} /> },
    { name: 'Giới Thiệu', path: '/about', icon: <Info size={18} /> },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-primary-700"
          >
            <Book className="w-8 h-8" />
            <span className="hidden sm:inline">Thế Giới Vô Tận</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-700 font-medium'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/story/new"
              className="btn btn-primary flex items-center space-x-1"
            >
              <Sparkles size={18} />
              <span>Bắt Đầu Truyện Mới</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 py-3 bg-white rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-3 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                to="/story/new"
                className="btn btn-primary flex items-center justify-center space-x-1"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles size={18} />
                <span>Bắt Đầu Truyện Mới</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;