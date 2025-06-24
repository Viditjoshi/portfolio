import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaAws } from "react-icons/fa";
import { SiTypescript, SiRedux, SiJavascript, SiPhp, SiReact, SiNodedotjs, SiExpress, SiNestjs, SiNextdotjs, SiMongodb, SiMiraheze, SiSequelize } from "react-icons/si";
import VtechLogo from "../../assets/images/vtechelite-logo-white.png";
const About = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const experiences = [
    {
      company: "Vtech Elite Private Limited",
      role: "Full Stack Developer",
      duration: "Present",
      logo: VtechLogo,
      description: [
        "Built and maintained client websites using JavaScript and jQuery",
        "Assisted in migration from legacy PHP systems to modern stack",
        "Implemented SEO best practices across 20+ client sites"
      ],
      technologies: [
        { name: "React", icon: <SiReact className="text-yellow-400" /> },
         { name: "React Native", icon: <SiReact className="text-yellow-400" /> },
        { name: "Redux", icon: <SiRedux className="text-indigo-500" /> },
        { name: "Node", icon: <SiNodedotjs className="text-blue-300" /> },
        { name: "Express", icon: <SiExpress className="text-orange-500" /> },
        
        { name: "Nest", icon: <SiNestjs className="text-indigo-500" /> },
        { name: "Next", icon: <SiNextdotjs className="text-blue-300" /> },
        { name: "Mongodb", icon: <SiMongodb className="text-orange-500" /> },
         { name: "Sequelize", icon: <SiSequelize className="text-orange-500" /> }
      ]
    }
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const tabVariants = {
    active: {
      backgroundColor: "rgba(30, 58, 138, 0.7)",
      borderColor: "rgba(99, 102, 241, 0.8)"
    },
    inactive: {
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      borderColor: "rgba(30, 58, 138, 0.5)"
    }
  };

  const accordionVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      className="min-h-screen w-full py-20 px-4 sm:px-8 bg-gradient-to-t from-[#3e7fee]/50 to-[#000000] backdrop-blur-3xl relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Professional <span className="text-blue-400">Experience</span>
        </motion.h2>

        <motion.p
          className="text-blue-100 mb-12 max-w-2xl text-lg"
          variants={itemVariants}
        >
          My journey through the tech industry, with a focus on creating impactful digital experiences.
        </motion.p>

        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          variants={itemVariants}
        >
          {/* Tabs */}
          <motion.div
            className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0"
            variants={itemVariants}
          >
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                className={`px-10  rounded-lg border-2 text-left whitespace-nowrap transition-colors flex items-center gap-3 ${activeTab === index ? 'text-white' : 'text-blue-200'}`}
                onClick={() => setActiveTab(index)}
                initial="inactive"
                animate={activeTab === index ? "active" : "inactive"}
                variants={tabVariants}
              >
                <img 
                  src={exp.logo} 
                  alt={`${exp.company} logo`} 
                  className="w-20 h-20 rounded-sm object-contain" 
                />
                {exp.company}
              </motion.button>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1 backdrop-blur-2xl bg-slate-900/50 border-2 border-blue-900/50 rounded-xl p-8 shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={activeTab}
          >
            <div className="flex items-start gap-4 mb-6">
              <img 
                src={experiences[activeTab].logo} 
                alt={`${experiences[activeTab].company} logo`} 
                className="w-16 h-16 rounded-lg object-contain border border-blue-900/50" 
              />
              <div>
                <motion.h3
                  className="text-2xl font-bold text-white mb-1"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                >
                  {experiences[activeTab].role}
                </motion.h3>
                <motion.p
                  className="text-blue-300"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {experiences[activeTab].company} • {experiences[activeTab].duration}
                </motion.p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Technologies Used:</h4>
              <div className="flex flex-wrap gap-3">
                {experiences[activeTab].technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-900/30 rounded-lg border border-blue-700/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.icon}
                    <span className="text-blue-100 text-sm">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <h4 className="text-lg font-semibold text-white mb-3">Key Responsibilities:</h4>
            <motion.ul className="space-y-3">
              {experiences[activeTab].description.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <button 
                    className="flex items-start text-left"
                    onClick={() => toggleItem(i)}
                  >
                    <span className="text-blue-400 mr-2 mt-1">▹</span>
                    <span className="text-blue-50 flex-1">{item}</span>
                  </button>
                  
                  <motion.div
                    variants={accordionVariants}
                    initial="closed"
                    animate={expandedItems[i] ? "open" : "closed"}
                    className="overflow-hidden pl-6"
                  >
                    <div className="py-2 text-blue-200 text-sm">
                      {expandedItems[i] && (
                        <p>
                          More details about this responsibility. Lorem ipsum dolor sit amet, 
                          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                        </p>
                      )}
                    </div>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Floating tech icons */}
        <motion.div 
          className="absolute top-1/3 right-10 text-blue-400/20 text-7xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <FaReact />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-20 text-blue-300/20 text-5xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <SiTypescript />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;