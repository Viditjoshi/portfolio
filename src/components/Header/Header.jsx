import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiCommand, FiSearch } from 'react-icons/fi';
import { FaHome, FaUser, FaBriefcase, FaBlog, FaEllipsisH } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0 });
  const linkRefs = useRef({});
  const navRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome size={14} /> },
    { name: 'About', path: '/about', icon: <FaUser size={14} /> },
    { name: 'Work', path: '/work', icon: <FaBriefcase size={14} /> },
    { name: 'Blog', path: '/blog', icon: <FaBlog size={14} /> },
    { name: 'More', path: '/more', icon: <FaEllipsisH size={14} /> },
  ];

  const activeLink = navItems.find(item => location.pathname === item.path)?.name || 'Home';

  const handleHover = (name) => {
    setHoveredLink(name);
    if (linkRefs.current[name] && navRef.current) {
      const linkRect = linkRefs.current[name].getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      setHoverStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    window.addEventListener('keydown', handleKeyDown);
    checkMobile();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [commandOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <motion.div
          className={`mx-auto ${isScrolled ? 'max-w-4xl rounded-full px-6' : 'w-full px-8'} transition-all duration-500`}
        >
          <div className={`relative ${isScrolled ? 'bg-slate-400/10 rounded-full shadow-xl border border-white/10' : ''}`}>
            <div className={`absolute inset-0 ${isScrolled ? 'backdrop-blur-md' : ''} rounded-full`} />
            
            <div className="relative p-1">
              <div className="flex items-center justify-between px-4 py-2">
                {/* Logo */}
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <a href="/" className="text-white font-bold text-lg tracking-tight">
                    Vidit Joshi
                  </a>
                </motion.div>

                {/* Desktop Navigation */}
                <nav 
                  className="hidden lg:flex items-center space-x-1 relative"
                  ref={navRef}
                >
                  {/* Precise hover background */}
                  {hoveredLink && (
                    <motion.div
                      className="absolute h-[calc(100%-8px)] top-1 bg-white/5 rounded-full border border-white/10 z-0"
                      initial={{ opacity: 0, left: hoverStyle.left, width: hoverStyle.width }}
                      animate={{ 
                        opacity: 1,
                        left: hoverStyle.left,
                        width: hoverStyle.width
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.path}
                      ref={(el) => (linkRefs.current[item.name] = el)}
                      onMouseEnter={() => handleHover(item.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`relative px-4 py-2 rounded-full flex text-sm font-medium ${
                        activeLink === item.name ? 'text-white' : 'text-gray-300'
                      } transition-colors duration-300 z-10`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activeLink === item.name && (
                        <motion.span
                          className="absolute inset-0 rounded-full backdrop-brightness-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/50 border border-cyan-400/30"
                          layoutId="activeTab"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center px-2 gap-2">
                        <motion.span
                          animate={{ 
                            scale: activeLink === item.name ? [1, 1.05, 1] : 1,
                            textShadow: activeLink === item.name ? '0 0 8px rgba(56, 182, 255, 0.6)' : 'none'
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.name}
                        </motion.span>
                      </span>
                    </motion.a>
                  ))}

                  {/* Book a Call Button */}
                  <motion.a
                    href="#contact"
                    className="ml-2 px-4 py-2 rounded-full bg-white/5 border border-white/30 text-white text-sm relative overflow-hidden"
                  >
                    <span className="relative z-10">Book a Call</span>
                  </motion.a>
                </nav>

                {/* Right Side - Command Button */}
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => setCommandOpen(true)}
                    className="hidden lg:flex items-center justify-center p-2 rounded-full border border-white/10 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 text-gray-300 hover:text-white"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
                    }}
                    whileTap={{ scale: 0.9, rotate: -5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <motion.span
                        animate={{ 
                          rotate: commandOpen ? 360 : 0,
                          scale: commandOpen ? 1.2 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <FiCommand size={16} />
                      </motion.span>
                      <span className="px-1 py-0.5 bg-gray-700 rounded text-[10px]">K</span>
                    </div>
                  </motion.button>

                  {/* Mobile Menu Button */}
                  {isMobile && (
                    <motion.button
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="lg:hidden p-2 rounded-full border border-white/10 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white focus:outline-none"
                      aria-label="Toggle menu"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <AnimatePresence mode="wait">
                        {mobileMenuOpen ? (
                          <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiX className="h-5 w-5" />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiMenu className="h-5 w-5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Mobile Menu */}
              {isMobile && (
                <AnimatePresence>
                  {mobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="lg:hidden overflow-hidden"
                    >
                      <div className="px-4 py-3 border-t border-white/10 mt-2">
                        {navItems.map((item, index) => (
                          <motion.a
                            key={item.name}
                            href={item.path}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-colors duration-300 ${activeLink === item.name ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'}`}
                            onClick={() => setMobileMenuOpen(false)}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ 
                              x: 5,
                              backgroundColor: 'rgba(31, 41, 55, 0.7)'
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <motion.span
                                animate={{ 
                                  scale: activeLink === item.name ? [1, 1.2, 1] : 1
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {item.icon}
                              </motion.span>
                              {item.name}
                              {activeLink === item.name && (
                                <motion.span
                                  className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                              )}
                            </div>
                          </motion.a>
                        ))}

                        {/* Book a Call Button - Mobile */}
                        <motion.a
                          href="#contact"
                          className="block mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium text-center hover:shadow-cyan-500/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                          whileTap={{ scale: 0.95 }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: navItems.length * 0.1 }}
                        >
                          <motion.span 
                            className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          />
                          <span className="relative z-10">Book a Call</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Command Palette Modal */}
      <AnimatePresence className="blur-3xl" >
        {commandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-32  bg-gradient-to-t from-[#3e7fee]/10 backdrop-blur-sm to-[#000000] "
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              className="w-full max-w-2xl mx-8 bg-transparent  rounded-xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-3xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center px-6 py-4 border-b border-white/10">
                  <motion.span
                  >
                    <FiSearch className="text-gray-400 mr-3" />
                  </motion.span>
                  <input
                    type="text"
                    placeholder="Type a command or search..."
                    className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                    autoFocus
                  />
                  <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                    <motion.span 
                      className="px-2 py-1 bg-gray-800 rounded-md"
                    >
                      ESC
                    </motion.span>
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  <div className="px-2 py-3">
                    <h3 className="text-xs uppercase tracking-wider text-white px-4 py-2">Navigation</h3>
                    {navItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.path}
                        className="flex items-center px-6 py-4 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setCommandOpen(false)}
                      >
                        <motion.span 
                          className="mr-4"
                          animate={{ 
                            rotate: [0, 10, -5, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        {item.name}
                        <span className="ml-auto text-sm text-gray-500">⌘{item.name.charAt(0)}</span>
                      </motion.a>
                    ))}
                  </div>

                  <div className="px-2 py-3">
                    <h3 className="text-xs uppercase tracking-wider text-white px-4 py-2">Actions</h3>
                    <motion.a
                      href="#contact"
                      className="flex items-center px-6 py-4 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setCommandOpen(false)}
                    >
                      <motion.span 
                        className="mr-4"
                      >
                        📅
                      </motion.span>
                      Book a Call
                      <span className="ml-auto text-sm text-gray-500">⌘B</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;