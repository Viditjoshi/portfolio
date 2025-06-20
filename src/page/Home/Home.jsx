import React, { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiReact as SiReactNative, SiNextdotjs } from 'react-icons/si';
import { motion } from 'framer-motion';
import UserImage from '../../assets/images/user.png';
import AnimatedButton from '../../components/AnimatedButton';
import CircularButton from '../../components/CircularButton';

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setLoaded(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const techStack = [
        { icon: <SiReact className="text-blue-400" />, name: 'React', color: 'from-blue-900/20 to-blue-400/10' },
        { icon: <SiReactNative className="text-blue-300" />, name: 'React Native', color: 'from-blue-800/20 to-blue-300/10' },
        { icon: <SiExpress className="text-gray-200" />, name: 'Express', color: 'from-gray-800/20 to-gray-200/10' },
        { icon: <SiMongodb className="text-green-400" />, name: 'MongoDB', color: 'from-green-800/20 to-green-400/10' },
        { icon: <SiNextdotjs className="text-white" />, name: 'Next.js', color: 'from-gray-900/20 to-white/10' },
        { icon: <SiNodedotjs className="text-green-500" />, name: 'Node.js', color: 'from-green-900/20 to-green-500/10' },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
            {/* Scroll Indicator */}
            {!isMobile && (
                <motion.div 
                    className="fixed right-6 bottom-6 flex flex-col items-center z-20"
                    animate={{
                        y: [0, 10, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-px h-16 bg-gradient-to-t from-blue-400 to-transparent"></div>
                    <span className="text-xs text-gray-400 mt-2">SCROLL</span>
                </motion.div>
            )}

            <main className="min-[120vh] flex items-center px-4 sm:px-6 py-16 md:py-0 relative z-10">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
                    {/* Text Content */}
                    <div 
                            className="absolute bottom-10 left-0 right-0 h-32 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at center, #FFFFFF 5%, #FFFFFF 5%, transparent 70%)",
                                filter: "blur(200px)",
                                transform: "translateY(50%)"
                            }}
                        />
                    <div className={`order-2 lg:order-1 space-y-4 sm:space-y-6 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} relative`}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Full-Stack Developer<br />
                            <span className="text-gray-400">MERN & React Native</span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 max-w-lg">
                            I build performant, scalable web and mobile applications with modern technologies.
                            Currently focused on creating seamless user experiences with React ecosystems.
                        </p>

                        {/* Core Technology Stack */}
                        <div className="pt-4">
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Core Technology Stack</h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {techStack.map((tech, i) => (
                                    <motion.div
                                        key={i}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r ${tech.color} border border-white/10 backdrop-blur-sm`}
                                        whileHover={{ scale: isMobile ? 1 : 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <span className="text-lg sm:text-xl">{tech.icon}</span>
                                            <span className="font-medium text-xs sm:text-sm">{tech.name}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 sm:pt-8 items-center">
                            <AnimatedButton
                                href="#work"
                                variant="light"
                                className="w-full sm:w-auto"
                            >
                                View My Work
                            </AnimatedButton>
                        </div>
                    </div>

                    {/* Portrait Image with Hover Effects */}
                    <div
                        className={`order-1 lg:order-2 relative ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        onMouseEnter={() => !isMobile && setHovering(true)}
                        onMouseLeave={() => !isMobile && setHovering(false)}
                    >
                        
                        <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center group">
                            {/* Glowing outline effect - Desktop only */}
                            {!isMobile && (
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-t  from-[#3b82f9]/20 to-[3b82f6]/20 blur-3xl"
                                    initial={{ opacity: 0, scale: 1 }}
                                    animate={{
                                        opacity: hovering ? 0.8 : 0,
                                        scale: hovering ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}

                            {/* Main image container */}
                            <motion.div
                                className="relative z-10 w-56 h-80 sm:w-64 sm:h-96 md:w-72 md:h-[26rem] lg:w-80 lg:h-[28rem] rounded-md overflow-hidden border-2 border-white/10"
                                initial={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <img
                                    src={UserImage}
                                    alt="Developer Portrait"
                                    className={`h-full w-full object-cover grayscale contrast-100 brightness-90 transition-all duration-700 ${hovering ? 'grayscale-0 contrast-100 brightness-100' : ''}`}
                                />

                                {/* Animated scan lines */}
                                <div className={`absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_100%)] bg-[length:100%_4px] mix-blend-overlay transition-opacity duration-300 ${hovering ? 'opacity-50' : 'opacity-30'}`} />

                                {/* Digital noise */}
                                <div className={`absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] transition-opacity duration-300 ${hovering ? 'opacity-30' : 'opacity-20'}`} />
                            </motion.div>

                            {/* Floating tech icons - Desktop only */}
                            {!isMobile && (
                                <>
                                    <motion.div
                                        className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-900/20 border border-blue-400/30 flex items-center justify-center text-blue-300 text-xl sm:text-2xl backdrop-blur-sm"
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: hovering ? 1.2 : 1,
                                            rotate: hovering ? 10 : 0,
                                            y: hovering ? -5 : 0
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 10,
                                        }}
                                    >
                                        <SiReact className="hover:animate-spin-slow" />
                                    </motion.div>
                                    
                                    <motion.div
                                        className="absolute -bottom-4 -left-4 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/30 flex items-center justify-center text-white text-lg sm:text-xl backdrop-blur-sm"
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: hovering ? 1.2 : 1,
                                            rotate: hovering ? -10 : 0,
                                            y: hovering ? 5 : 0
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 10,
                                        }}
                                    >
                                        <SiNextdotjs className="hover:animate-spin-slow" />
                                    </motion.div>
                                </>
                            )}
                            
                            {/* Circular Contact Button */}
                            <div className={`absolute z-20 ${isMobile ? '-bottom-6 right-4' : '-bottom-10 right-20'}`}>
                                <CircularButton
                                    href="#contact"
                                    size="sm"
                                    text="HIRE ME"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Enhanced Social Links */}
            <div className={`fixed ${isMobile ? 'bottom-4 left-0 right-0 flex justify-center' : 'left-4 sm:left-6 bottom-6'} z-20`}>
                <div className={`flex ${isMobile ? 'flex-row gap-4 bg-black/80 px-4 py-2 rounded-full border border-white/10' : 'flex-col space-y-3 sm:space-y-4'}`}>
                    <motion.a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group"
                        whileHover={{ y: isMobile ? 0 : -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className={`${isMobile ? 'w-10 h-10' : 'w-10 h-10'} rounded-full bg-black/80 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300`}>
                            <FiGithub
                                size={isMobile ? 18 : 20}
                                className="text-gray-400 group-hover:text-white transition-colors duration-300"
                            />
                        </div>
                        {!isMobile && (
                            <span className="absolute left-full ml-3 px-2 py-1 text-xs bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                GitHub
                            </span>
                        )}
                    </motion.a>

                    <motion.a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group"
                        whileHover={{ y: isMobile ? 0 : -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className={`${isMobile ? 'w-10 h-10' : 'w-10 h-10'} rounded-full bg-black/80 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300`}>
                            <FiLinkedin
                                size={isMobile ? 18 : 20}
                                className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300"
                            />
                        </div>
                        {!isMobile && (
                            <span className="absolute left-full ml-3 px-2 py-1 text-xs bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                LinkedIn
                            </span>
                        )}
                    </motion.a>

                    <motion.a
                        href="mailto:example@email.com"
                        className="relative group"
                        whileHover={{ y: isMobile ? 0 : -5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className={`${isMobile ? 'w-10 h-10' : 'w-10 h-10'} rounded-full bg-black/80 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300`}>
                            <FiMail
                                size={isMobile ? 18 : 20}
                                className="text-gray-400 group-hover:text-red-400 transition-colors duration-300"
                            />
                        </div>
                        {!isMobile && (
                            <span className="absolute left-full ml-3 px-2 py-1 text-xs bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Email
                            </span>
                        )}
                    </motion.a>
                </div>
            </div>
        </div>
    );
}