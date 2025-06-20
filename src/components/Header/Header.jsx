// components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="text-white font-bold text-xl sm:text-2xl flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                <span className="hidden sm:inline">YourName</span>
                <span className="sm:hidden">YN</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative group"
              >
                <motion.div
                  className="px-4 py-2 rounded-md transition-all duration-300"
                  whileHover={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            ))}
            
            {/* Right side buttons (social + resume) */}
            <div className="flex items-center ml-4 space-x-2">
              {/* Resume Download Button */}
              <motion.a
                href="/resume.pdf"
                download
                className="flex items-center px-3 py-2 rounded-md border border-white/10 bg-black/50 hover:bg-white/10 transition-all duration-300"
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="text-gray-300 mr-2" size={14} />
                <span className="text-xs font-medium text-gray-300">Resume</span>
              </motion.a>

              {/* Social Icons - Desktop */}
              <div className="flex items-center space-x-1 ml-2">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-white/10 bg-black/50 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiGithub className="text-gray-300" size={16} />
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md border border-white/10 bg-black/50 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiLinkedin className="text-gray-300" size={16} />
                </motion.a>

                <motion.a
                  href="mailto:example@email.com"
                  className="p-2 rounded-md border border-white/10 bg-black/50 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiMail className="text-gray-300" size={16} />
                </motion.a>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          {isMobile && (
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md border border-white/10 bg-black/50 hover:bg-white/10 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="bg-black/80 border border-white/10 rounded-lg backdrop-blur-sm p-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="block px-4 py-3 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-300 mb-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Resume Download Button - Mobile */}
              <motion.a
                href="/resume.pdf"
                download
                className="flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-300 mb-1"
                whileTap={{ scale: 0.95 }}
              >
                <span>Download Resume</span>
                <FiDownload className="ml-2" size={14} />
              </motion.a>

              {/* Social Icons - Mobile */}
              <div className="flex justify-center space-x-4 pt-2 mt-2 border-t border-white/10">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/10 bg-black/50 hover:bg-white/10 transition-all duration-300"
                  whileTap={{ scale: 0.9 }}
                >
                  <FiGithub className="text-gray-300" size={18} />
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/10 bg-black/50 hover:bg-white/10 transition-all duration-300"
                  whileTap={{ scale: 0.9 }}
                >
                  <FiLinkedin className="text-gray-300" size={18} />
                </motion.a>

                <motion.a
                  href="mailto:example@email.com"
                  className="p-2 rounded-full border border-white/10 bg-black/50 hover:bg-white/10 transition-all duration-300"
                  whileTap={{ scale: 0.9 }}
                >
                  <FiMail className="text-gray-300" size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;