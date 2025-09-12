import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import hariomimage from '../../assets/screenshot/hariom/harihom.png'
import hariomimage1 from '../../assets/screenshot/hariom/hariom1.png'
import hariomimage2 from '../../assets/screenshot/hariom/hariom2.png'
import hariomimage3 from '../../assets/screenshot/hariom/hariom3.png'
import vegamovies1 from '../../assets/screenshot/vegamovies/vaga1.png'
import vegamovies2 from '../../assets/screenshot/vegamovies/vega2.png'
import vegamovies3 from '../../assets/screenshot/vegamovies/vaga5.png'
import vegamovies4 from '../../assets/screenshot/vegamovies/vega4.png'


const projects = [
  {
    id: 1,
    title: 'Jewellery E-Commerce Platform',
    description: 'Complete shopping experience with AI recommendations and 3D product previews',
    category: 'Web Dev',
    tags: ['React', 'Node.js', 'Three.js'],
    color: '#3b82f6',
    images: [
      hariomimage,
      hariomimage1,
      hariomimage2,
      hariomimage3
    ],
    github: 'https://github.com/Viditjoshi/Full_Stack_Ecommerce_FrontEnd',
    live: 'https://ecommere-jewellery-site-frontend.vercel.app/'
  },
  {
    id: 2,
    title: 'VegaMovies Clone',
    description: 'Movie streaming platform with advanced search, filtering, and responsive design',
    category: 'Web Dev',
    tags: ['React', 'Redux', 'API Integration'],
    color: '#3b82f6',
    images: [
      vegamovies1,
      vegamovies2,
      vegamovies3,
      vegamovies4
    ],
    github: 'https://github.com/Viditjoshi/vegamoviesClone',
    live: 'https://vegamoviesclone.vercel.app/vegamovie/'
  }
];

const ProjectSection = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const containerRef = useRef(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section
      ref={containerRef}
      className="relative py-24 px-4 sm:px-8 overflow-hidden bg-black"
    >
      <motion.div
        className="absolute mx-auto w-[50%] inset-0 rounded-full bg-gradient-to-t from-[#3e7fee]/50 to-[#000000] blur-3xl"
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: 1,
          scale: 1.5,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Projects where I pushed boundaries and solved complex problems
          </p>
        </motion.div>
        
        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '-50px' }}
              className="relative group"
            >
              {/* Project card with shadow effect */}
              <div
                className="h-full rounded-2xl overflow-hidden border border-gray-800 bg-transparent backdrop-blur-3xl transition-all duration-500 group-hover:border-blue-400/50 group-hover:shadow-lg"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {/* Project image with parallax */}
                <motion.div
                  className="h-48 overflow-hidden relative"
                >
                  <img
                    src={`${project.images[0]}?w=800&auto=format`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                
                {/* Project info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{
                        background: `${project.color}20`,
                        color: project.color
                      }}
                    >
                      {project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          aria-label="GitHub"
                        >
                          <FiGithub />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setExpandedProject(project)}
                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View case study <FiChevronRight className="mt-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Expanded project modal */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-white/10 via-gray-700/10 to-black/10 backdrop-blur-3xl flex items-center justify-center p-4"
            onClick={() => setExpandedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-gray-800 border border-gray-700 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors z-10 text-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              
              <div className="p-8">
                <div className="mb-8">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block"
                    style={{
                      background: `${expandedProject.color}20`,
                      color: expandedProject.color
                    }}
                  >
                    {expandedProject.category}
                  </span>
                  <h3 className="text-3xl font-bold mb-2 text-white">{expandedProject.title}</h3>
                  <p className="text-xl text-gray-400">{expandedProject.description}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Project Details</h4>
                    <p className="text-gray-400 mb-6">
                      {expandedProject.id === 1
                        ? 'A full-featured jewellery e-commerce platform with AI-powered recommendations, 3D product visualization, and secure payment processing. Built with modern React patterns and responsive design principles.'
                        : expandedProject.id === 2
                          ? 'A movie streaming platform clone featuring advanced search and filtering capabilities, responsive UI, and seamless API integration. Designed to handle large content libraries with smooth user experience.'
                          : 'An innovative web application that applies artistic styles to photos using neural networks. Built with TensorFlow.js for client-side processing and Canvas API for image manipulation.'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {expandedProject.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {expandedProject.github && (
                        <a
                          href={expandedProject.github}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                        >
                          <FiGithub /> View Code
                        </a>
                      )}
                      {expandedProject.live && (
                        <a
                          href={expandedProject.live}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-white"
                        >
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  
                </div>
                
                {/* Updated screenshots section */}
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-white">Screenshots</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {expandedProject.images.map((img, index) => (
                        <div key={index} className="rounded-lg overflow-hidden bg-gray-700 border border-gray-600">
                          <img
                            src={`${img}?w=400&auto=format&fit=crop&crop=entropy&q=80`}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;