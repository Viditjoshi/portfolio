import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const GlassButton = ({
  children,
  href = "#",
  variant = "primary",
  icon = <FiArrowRight />,
  className = "",
  glowColor = null, // Custom glow color override
  ...props 
}) => {
  const variants = {
    // Modern Tech Variants
    primary: {
      base: "bg-gradient-to-br from-indigo-900/50 via-purple-800/40 to-blue-900/50",
      border: "border border-indigo-400/30",
      glow: "0 0 15px rgba(79, 70, 229, 0.5), 0 0 30px rgba(99, 102, 241, 0.4)",
      text: "text-white",
      liquid: "from-indigo-500/60 via-purple-400/50 to-blue-500/60",
      iconColor: "text-indigo-200"
    },
    secondary: {
      base: "bg-gradient-to-br from-slate-800/40 via-gray-800/30 to-slate-900/40",
      border: "border border-gray-400/30",
      glow: "0 0 10px rgba(148, 163, 184, 0.3), 0 0 20px rgba(148, 163, 184, 0.2)",
      text: "text-gray-100",
      liquid: "from-slate-600/50 via-gray-500/40 to-slate-600/50",
      iconColor: "text-gray-300"
    },
    accent: {
      base: "bg-gradient-to-br from-purple-700/60 via-indigo-600/50 to-cyan-700/60",
      border: "border border-cyan-300/30",
      glow: "0 0 20px rgba(6, 182, 212, 0.6), 0 0 35px rgba(79, 70, 229, 0.5)",
      text: "text-white",
      liquid: "from-purple-400/60 via-indigo-300/50 to-cyan-400/60",
      iconColor: "text-cyan-200"
    },
    
    // New Vibrant Variants
    electric: {
      base: "bg-gradient-to-br from-blue-600/50 via-cyan-500/40 to-blue-700/50",
      border: "border border-cyan-300/40",
      glow: "0 0 20px rgba(34, 211, 238, 0.7), 0 0 35px rgba(6, 182, 212, 0.6)",
      text: "text-white",
      liquid: "from-blue-400/70 via-cyan-300/60 to-blue-400/70",
      iconColor: "text-cyan-100"
    },
    neon: {
      base: "bg-gradient-to-br from-fuchsia-700/50 via-purple-600/40 to-pink-600/50",
      border: "border border-pink-300/40",
      glow: "0 0 20px rgba(236, 72, 153, 0.6), 0 0 35px rgba(217, 70, 239, 0.5)",
      text: "text-white",
      liquid: "from-fuchsia-500/70 via-purple-400/60 to-pink-500/70",
      iconColor: "text-pink-200"
    },
    sunset: {
      base: "bg-gradient-to-br from-amber-600/50 via-orange-500/40 to-red-600/50",
      border: "border border-orange-300/40",
      glow: "0 0 20px rgba(251, 146, 60, 0.6), 0 0 35px rgba(249, 115, 22, 0.5)",
      text: "text-white",
      liquid: "from-amber-400/70 via-orange-300/60 to-red-400/70",
      iconColor: "text-amber-200"
    },
    
    // Light Variants
    light: {
      base: "bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90",
      border: "border border-gray-300/50",
      glow: "0 0 15px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.3)",
      text: "text-gray-800",
      liquid: "from-white/60 via-gray-100/50 to-white/60",
      iconColor: "text-gray-600"
    },
    lightAccent: {
      base: "bg-gradient-to-br from-blue-50/90 via-cyan-50/80 to-blue-50/90",
      border: "border border-cyan-300/40",
      glow: "0px 120px 55px rgba(165, 243, 252, 0.5), 0 0 65px rgba(207, 250, 254, 0.4)",
      text: "text-cyan-800",
      liquid: "from-blue-100/70 via-cyan-100/60 to-blue-100/70",
      iconColor: "text-cyan-500"
    },
    
    // Dark Variants
    dark: {
      base: "bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80",
      border: "border border-gray-600/30",
      glow: "0 0 15px rgba(255, 255, 255, 0.1), 0 0 25px rgba(255, 255, 255, 0.05)",
      text: "text-gray-200",
      liquid: "from-gray-700/50 via-gray-600/40 to-gray-700/50",
      iconColor: "text-gray-400"
    },
    darkEmerald: {
      base: "bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-emerald-900/70",
      border: "border border-emerald-500/30",
      glow: "0 0 15px rgba(16, 185, 129, 0.3), 0 0 25px rgba(5, 150, 105, 0.2)",
      text: "text-emerald-100",
      liquid: "from-emerald-700/60 via-emerald-600/50 to-emerald-700/60",
      iconColor: "text-emerald-300"
    }
  };

  // Use custom glow color if provided
  const glow = glowColor ? `0 0 20px ${glowColor}, 0 0 35px ${glowColor.replace('0.6', '0.4')}` : variants[variant].glow;

  return (
    <motion.a
      href={href}
      className={`group relative px-8 py-3.5 rounded-xl ${variants[variant].base} ${variants[variant].border} ${variants[variant].text} backdrop-blur-lg overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: glow
      }}
      whileTap={{
        scale: 0.98,
        boxShadow: glowColor ? `0 0 10px ${glowColor}` : variants[variant].glow.replace('0.6', '0.3').replace('0.5', '0.2')
      }}
      initial={{ 
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)"
      }}
      {...props}
    >
      {/* Liquid fill effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${variants[variant].liquid} rounded-xl opacity-0`}
        initial={{ width: 0 }}
        whileHover={{
          opacity: 1,
          width: "100%",
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
      
      {/* Glass refraction layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/10 opacity-30 rounded-xl pointer-events-none" />
      
      {/* Floating micro-bubbles */}
      {/* {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: `${Math.random() * 12 + 6}px`,
            height: `${Math.random() * 12 + 6}px`,
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 10],
            x: [0, (Math.random() - 0.5) * 8],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 6 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))} */}
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center gap-2.5">
        <span className="font-medium tracking-wide drop-shadow-md">
          {children}
        </span>
        {icon && (
          <motion.span 
            className={`transition-all duration-300 ${variants[variant].iconColor}`}
            whileHover={{ 
              x: 4,
              filter: "drop-shadow(0 0 6px currentColor)"
            }}
          >
            {icon}
          </motion.span>
        )}
      </div>
      
      {/* Moving highlight */}
      <motion.div 
        className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white/30 via-white/10 to-transparent pointer-events-none"
        initial={{ 
          opacity: 0,
          transform: "skewX(-15deg) translateX(-80px)"
        }}
        whileHover={{ 
          opacity: 0.3,
          transform: "skewX(-15deg) translateX(250px)",
          transition: { duration: 1 }
        }}
      />
      
      {/* Edge glow */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-transparent pointer-events-none"
        whileHover={{
          borderColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "inset 0 0 15px rgba(255, 255, 255, 0.1)",
          transition: { duration: 0.3 }
        }}
      />

      {/* Subtle pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.a>
  );
};

export default GlassButton;