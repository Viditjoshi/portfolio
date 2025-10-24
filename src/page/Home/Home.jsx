import React, { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiReact as SiReactNative, SiNextdotjs } from 'react-icons/si';
import { motion } from 'framer-motion';
import UserImage from '../../assets/images/me.jpeg';
import AnimatedButton from '../../components/AnimatedButton';
import CircularButton from '../../components/CircularButton';
import { Link } from 'react-router-dom';

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };
    return (
        <motion.div className="fixed inset-0 bg-gradient-to-t from-[#3e7fee]/50 to-[#000000] text-white font-sans overflow-hidden" initial="hidden"
            animate="visible"
            variants={containerVariants}>
            <main className="h-full flex items-center px-4 sm:px-6 lg:px-12 relative z-10">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
                    <div className={`order-2 lg:order-1 space-y-4 sm:space-y-6 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'} relative`}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Full-Stack Developer<br />
                            <span className="text-gray-400">MERN & React Native</span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 max-w-lg">
                            I build performant, scalable web and mobile applications with modern technologies.
                            Currently focused on creating seamless user experiences with React ecosystems.
                        </p>
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
                    </div>
                    <div
                        className={`order-1 lg:order-2 relative ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        onMouseEnter={() => !isMobile && setHovering(true)}
                        onMouseLeave={() => !isMobile && setHovering(false)}
                    >
                        <div className="relative w-full flex justify-center items-center">
                            <motion.div
                                className="relative z-10 w-48 h-72 sm:w-64 sm:h-96 md:w-72 md:h-[26rem] lg:w-80 lg:h-[28rem] rounded-md overflow-hidden border-2 border-white/10"
                            >
                                <img
                                    src={UserImage}
                                    alt="Developer Portrait"
                                    className={`h-full w-full object-cover  transition-all duration-700`}
                                />
                            </motion.div>
                            <div className={`absolute z-20 ${isMobile ? '-bottom-6 right-4' : '-bottom-10 right-20'}`}>
                                <Link to="/work">
                                    <CircularButton
                                        size="sm"
                                        text="MY WORK"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
                </div>
            </div>
        </motion.div>
    );
}