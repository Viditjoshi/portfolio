import React, { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { SiMongodb, SiExpress, SiReact, SiNextdotjs } from 'react-icons/si';
import UserImage from '../../assets/images/user.png';

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    // Enhanced MERN Stack with better visual representation
    const mernStack = [
        {
            name: 'MongoDB',
            icon: <SiMongodb className="text-green-400" />,
            color: 'bg-green-900/20',
            border: 'border-green-400/30',
            pulse: 'bg-green-400'
        },
        {
            name: 'Express',
            icon: <SiExpress className="text-gray-200" />,
            color: 'bg-gray-800/20',
            border: 'border-gray-400/30',
            pulse: 'bg-gray-300'
        },
        {
            name: 'React',
            icon: <SiReact className="text-blue-300" />,
            color: 'bg-blue-900/20',
            border: 'border-blue-400/30',
            pulse: 'bg-blue-400'
        },
        {
            name: 'Next.js',
            icon: <SiNextdotjs className="text-white" />,
            color: 'bg-gray-900/20',
            border: 'border-white/30',
            pulse: 'bg-white'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
            <main className="min-h-screen flex items-center px-4 sm:px-6 py-16 md:py-0">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
                    {/* Text Content */}
                    <div className={`order-2 lg:order-1 space-y-4 sm:space-y-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Full-Stack Developer<br />
                            <span className="text-gray-400">MERN & React Native</span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 max-w-lg">
                            I build performant, scalable web and mobile applications with modern technologies.
                            Currently focused on creating seamless user experiences with React ecosystems.
                        </p>

                        {/* Enhanced MERN Stack Visualization */}
                        <div className="pt-4">
                            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Core Technology Stack</h3>

                            {/* Stack Cards with Connection Flow */}
                            <div className="relative">
                                <div className="grid grid-cols-4 gap-2">
                                    {mernStack.map((tech, index) => (
                                        <div
                                            key={tech.name}
                                            className={`relative z-10 p-1 rounded-lg ${tech.color} border ${tech.border} backdrop-blur-sm hover:scale-[1.02] transition-transform`}
                                        >
                                            <div className="flex flex-col items-center p-3">
                                                <span className="text-2xl mb-2">{tech.icon}</span>
                                                <span className="font-medium text-sm">{tech.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-8">
                            <a href="#work" className="group flex items-center justify-center px-6 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition-all shadow-lg hover:shadow-white/40">
                                <span>View My Work</span>
                                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a href="#contact" className="group flex items-center justify-center px-6 py-3 border border-white/30 rounded-full hover:bg-gray-900/50 transition-all shadow-lg hover:shadow-white/20">
                                <span className="group-hover:text-blue-300">Contact Me</span>
                            </a>
                        </div>
                    </div>

                    {/* Portrait Image - Enhanced Presentation */}
                    <div className={`order-1 lg:order-2 relative transition-all duration-1000 delay-150 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                            <img
                                src={UserImage}
                                alt="Vidit Joshi"
                                className="h-full w-auto max-w-full object-contain"
                            />
                            {/* Subtle glow effect */}
                            {/* <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/60 to-white/90 pointer-events-none"></div> */}
                            {/* Accent glow */}
                            <div style={{
                                filter: 'grayscale(100%) contrast(105%) brightness(90%)'
                            }} className="absolute -inset-0 rounded-lg bg-black/45 pointer-events-none animate-pulse-slow"></div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Enhanced Social Links */}
            <div className="fixed left-4 sm:left-6 bottom-6 hidden md:flex flex-col space-y-3 sm:space-y-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all hover:scale-110 group">
                    <FiGithub size={22} className="group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-300 transition-all hover:scale-110 group">
                    <FiLinkedin size={22} className="group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.7)]" />
                </a>
                <a href="mailto:vidit.joshi@example.com"
                    className="text-gray-400 hover:text-red-300 transition-all hover:scale-110 group">
                    <FiMail size={22} className="group-hover:drop-shadow-[0_0_10px_rgba(248,113,113,0.7)]" />
                </a>
            </div>
        </div>
    );
}