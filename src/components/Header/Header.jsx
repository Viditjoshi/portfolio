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
      if (e.key === 'Escape') {
        setCommandOpen(false);
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
      <header className={`fixed top-5 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2 bg-black/80 backdrop-blur-md' : 'py-4 bg-transparent'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between relative">
            {/* Logo - Left */}
            <motion.div 
              className="z-50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a href="/" className="flex items-center">
                <h1 className="text-white font-['Bebas_Neue'] tracking-wider text-3xl leading-none">
                  <span className="text-white">V</span>
                  <span className="text-gray-400">J</span>
                </h1>
                <div className="h-1 w-full bg-gradient-to-r from-white to-transparent mt-1 ml-2"></div>
              </a>
            </motion.div>

            {/* Centered Navigation with Enhanced Glass Background */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <motion.div
                className={`relative bg-white/5 rounded-full`}

              >
                {/* Enhanced Glass Background */}
                <div className={`absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-full border border-white/10`} />
                
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-full pointer-events-none">
                  <div className="absolute inset-0 rounded-full bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]" />
                  <div className="absolute -inset-1 rounded-full blur-sm bg-white/10" />
                </div>

                <div className="relative p-1">
                  <div className="flex items-center justify-center px-0.5 py-0.5">
                    {/* Desktop Navigation */}
                    <nav
                      className="flex items-center space-x-1 relative"
                      ref={navRef}
                    >
                      {navItems.map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.path}
                          ref={(el) => (linkRefs.current[item.name] = el)}
                          onMouseEnter={() => handleHover(item.name)}
                          onMouseLeave={() => setHoveredLink(null)}
                          className={`relative px-4 py-2 rounded-full flex text-sm font-medium ${activeLink === item.name ? 'text-white' : 'text-gray-300'
                            } transition-colors duration-300 z-10`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {activeLink === item.name && (
                            <motion.span
                              className="absolute inset-0 rounded-full bg-white/20 border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                              layoutId="activeTab"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center px-2 gap-2">
                            <motion.span
                              animate={{
                                scale: activeLink === item.name ? [1, 1.05, 1] : 1,
                                textShadow: activeLink === item.name ? '0 0 8px rgba(255, 255, 255, 0.6)' : 'none'
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              {item.name}
                            </motion.span>
                          </span>
                        </motion.a>
                      ))}
                    </nav>
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
                          <div className="px-4 py-3 border-t border-white/20 mt-2 backdrop-blur-xl bg-white/5 rounded-lg">
                            {navItems.map((item, index) => (
                              <motion.a
                                key={item.name}
                                href={item.path}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-colors duration-300 ${activeLink === item.name
                                  ? 'bg-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                                  }`}
                                onClick={() => setMobileMenuOpen(false)}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                  x: 5,
                                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
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
                                      className="ml-auto w-2 h-2 bg-white rounded-full shadow-[0_0_6px_1px_rgba(255,255,255,0.8)]"
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
                              className="block mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-white to-white/70 text-gray-900 text-sm font-medium text-center hover:shadow-white/20 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                              whileTap={{ scale: 0.95 }}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: navItems.length * 0.1 }}
                            >
                              <motion.span
                                className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              />
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                <span className="text-gray-800">Book a Call</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                              </span>
                            </motion.a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Command Button */}
            <div className="flex items-start gap-4 z-50">
              <motion.button
                onClick={() => setCommandOpen(true)}
                className="hidden lg:flex items-center justify-center p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white"
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
                  <span className="px-1 py-0.5 bg-white/10 rounded text-[10px]">K</span>
                </div>
              </motion.button>

              {/* Mobile Menu Button */}
              {isMobile && (
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white focus:outline-none"
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
        </div>
      </header>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {commandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/80 backdrop-blur-lg"
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              className="w-full max-w-2xl mx-4 sm:mx-8 bg-white/5 rounded-xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center px-6 py-4 border-b border-white/10">
                  <motion.span>
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
                      className="px-2 py-1 bg-white/10 rounded-md"
                    >
                      ESC
                    </motion.span>
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  <div className="px-2 py-3">
                    <h3 className="text-xs uppercase tracking-wider text-white/80 px-4 py-2">Navigation</h3>
                    {navItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.path}
                        className="flex items-center px-6 py-4 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setCommandOpen(false)}
                        whileHover={{ x: 5 }}
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
                    <h3 className="text-xs uppercase tracking-wider text-white/80 px-4 py-2">Actions</h3>
                    <motion.a
                      href="#contact"
                      className="flex items-center px-6 py-4 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                      onClick={() => setCommandOpen(false)}
                      whileHover={{ x: 5 }}
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