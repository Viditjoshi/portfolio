import React from 'react';
import { motion } from 'framer-motion';

const CircularButton = ({
  href = "#",
  size = "md",
  text = "EXPLORE MORE",
  className = "",
  icon = "arrow", // 'arrow' or 'plus'
  glowColor = "#1254A2",
  ...props
}) => {
  const sizes = {
    sm: "w-24 h-24 text-xs",
    md: "w-32 h-32 text-sm",
    lg: "w-40 h-40 text-base"
  };

  const icons = {
    arrow: (
      <path
        d="M12 19V5M5 12l7-7 7 7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    plus: (
      <path
        d="M12 5v14M5 12h14"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  };

  return (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      whileHover="hover"
      initial="initial"
      animate="animate"
    >
      {/* Background particles */}
      <motion.div 
        className="absolute inset-0 overflow-hidden rounded-full"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 0.3 },
          hover: { opacity: 0.6 }
        }}
        transition={{ duration: 0.5 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 20],
              x: [0, (Math.random() - 0.5) * 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Rotating Circular Text */}
      <motion.svg
        className="absolute inset-0 z-[2]"
        viewBox="0 0 100 100"
        variants={{
          initial: { rotate: 0 },
          animate: { rotate: 360 },
          hover: { rotate: 720 }
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          hover: { duration: 10 }
        }}
      >
        <defs>
          <path
            id="textcircle"
            d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
          />
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor={glowColor} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <text 
          className="select-none" 
          fill="url(#textGradient)" 
          fontSize="8" 
          fontWeight="bold" 
          letterSpacing="2" 
          textAnchor="middle"
        >
          <textPath xlinkHref="#textcircle" startOffset="50%">
            {text} • {text} • {text} • {text} •
          </textPath>
        </text>
      </motion.svg>

      {/* Main Button */}
      <motion.a
        href={href}
        className="absolute inset-0 rounded-full border-2 border-white/40 flex items-center justify-center backdrop-blur-md group bg-gradient-to-br from-black/90 to-gray-900/90 hover:from-black/70 hover:to-gray-900/70 transition-all duration-300"
        variants={{
          initial: { 
            boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.1)",
            y: 0
          },
          animate: { 
            y: [0, -4, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          },
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: "0 0 5px 2px rgba(255, 255, 255, 0.1)"
        }}
        {...props}
      >
        {/* Center Icon */}
        <motion.div
          className="text-white z-3"
          variants={{
            initial: { rotate: icon === "arrow" ? 45 : 0, scale: 1 },
            hover: { 
              rotate: icon === "arrow" ? 45 : 0, 
              scale: 1.2,
              transition: { type: "spring", stiffness: 500 }
            },
          }}
          whileTap={{ rotate: icon === "arrow" ? 95 : 45, scale: 0.9 }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <motion.g
              stroke="#ffffff"
              strokeDasharray="1"
              strokeDashoffset="0"
              initial={{ pathLength: 1 }}
              whileHover={{
                pathLength: [1, 0.8, 1],
                stroke: glowColor
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {icons[icon]}
            </motion.g>
          </svg>
        </motion.div>

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`
          }}
          variants={{
            initial: { scale: 0.3, opacity: 0 },
            animate: { 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
              transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            },
            hover: {
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          }}
        />

        {/* Outer ring pulse on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{ borderColor: glowColor }}
          variants={{
            initial: { scale: 1, opacity: 0 },
            hover: { 
              scale: 1.2, 
              opacity: [0, 0.5, 0],
              transition: { duration: 2, repeat: Infinity }
            }
          }}
        />
      </motion.a>
    </motion.div>
  );
};

export default CircularButton;