import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogData, categories } from '../../constant/Blog/blogData';
import {
  FaSearch,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaComment,
  FaArrowLeft,
  FaRegClock,
  FaTimes,
  FaFilter
} from 'react-icons/fa';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiNextdotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiTensorflow,
  SiPostgresql
} from 'react-icons/si';
import { BiMobileAlt } from 'react-icons/bi';

const iconComponents = {
  react: <SiReact className="text-blue-500" />,
  javascript: <SiJavascript className="text-yellow-400" />,
  nodejs: <SiNodedotjs className="text-green-500" />,
  typescript: <SiTypescript className="text-blue-600" />,
  nextjs: <SiNextdotjs className="text-black dark:text-white" />,
  python: <SiPython className="text-blue-400" />,
  mobile: <BiMobileAlt className="text-purple-500" />,
  database: <SiPostgresql className="text-blue-700" />,
  ai: <SiTensorflow className="text-orange-500" />
};

const BlogSection = () => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState(null);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique tags from all blogs
  const allTags = [...new Set(blogData.flatMap(blog => blog.tags))];

  // Filter blogs based on search, category, and tag
  const filterBlogs = useCallback(() => {
    setIsLoading(true);
    let filtered = blogData;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term) ||
        blog.content.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }
    
    if (selectedTag) {
      filtered = filtered.filter(blog => blog.tags.includes(selectedTag));
    }
    
    // Simulate loading for better UX
    setTimeout(() => {
      setFilteredBlogs(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchTerm, selectedCategory, selectedTag]);

  useEffect(() => {
    filterBlogs();
  }, [filterBlogs]);

  const toggleSaveBlog = (blogId) => {
    setSavedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId) 
        : [...prev, blogId]
    );
  };

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'auto';
  };

  const getCategoryCount = (categoryName) => {
    return blogData.filter(blog => blog.category === categoryName).length;
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedTag(null);
  };

  const shareBlog = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Web Share API not supported in your browser');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r border-gray-800 bg-black h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-blue-500">TechBlog</h1>
            <p className="text-gray-400 text-sm mt-1">Latest in technology</p>
          </div>
          
          <div className="p-4">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-gray-900 border border-gray-800 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-500" />
            </div>
            
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-sm ${
                      selectedCategory === "All" 
                        ? 'bg-gray-800 text-blue-500 font-medium' 
                        : 'hover:bg-gray-900 text-gray-300'
                    }`}
                    onClick={() => setSelectedCategory("All")}
                  >
                    <span>All Categories</span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {blogData.length}
                    </span>
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.name}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-sm ${
                        selectedCategory === category.name 
                          ? 'bg-gray-800 text-blue-500 font-medium' 
                          : 'hover:bg-gray-900 text-gray-300'
                      }`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="flex items-center gap-2">
                        {iconComponents[category.icon]}
                        {category.name}
                      </div>
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        {getCategoryCount(category.name)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedTag === tag 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider">Saved Articles</h3>
              {savedBlogs.length > 0 ? (
                <ul className="space-y-2">
                  {savedBlogs.slice(0, 3).map(blogId => {
                    const blog = blogData.find(b => b.id === blogId);
                    return (
                      <li 
                        key={blogId}
                        className="p-2 hover:bg-gray-900 rounded-lg cursor-pointer flex items-center gap-3 text-gray-300"
                        onClick={() => openBlog(blog)}
                      >
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <span className="text-xs line-clamp-1">{blog.title}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500 text-xs">No saved articles yet</p>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-70 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            >
              <motion.aside
                className="bg-gray-900 h-full w-4/5 max-w-sm absolute right-0 shadow-xl"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">Filters</h2>
                  <button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-800 text-gray-400"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 text-gray-400">Categories</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className={`text-left px-3 py-2 rounded-lg text-xs ${
                          selectedCategory === "All" 
                            ? 'bg-gray-800 text-blue-500' 
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}
                        onClick={() => setSelectedCategory("All")}
                      >
                        All
                      </button>
                      {categories.slice(0, 4).map(category => (
                        <button
                          key={category.name}
                          className={`text-left px-3 py-2 rounded-lg text-xs ${
                            selectedCategory === category.name 
                              ? 'bg-gray-800 text-blue-500' 
                              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          }`}
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-400">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.slice(0, 8).map(tag => (
                        <button
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs ${
                            selectedTag === tag 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          }`}
                          onClick={() => {
                            setSelectedTag(tag);
                            setMobileFiltersOpen(false);
                          }}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="mt-6 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-all"
                    onClick={() => {
                      resetFilters();
                      setMobileFiltersOpen(false);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {selectedBlog ? (
              <motion.article
                className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title} 
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <motion.button
                    className="absolute top-4 left-4 bg-black/80 hover:bg-black p-3 rounded-full shadow-md"
                    onClick={closeBlog}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowLeft className="text-white" />
                  </motion.button>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gray-800 text-blue-400 rounded-full text-xs font-medium">
                          {selectedBlog.category}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <FaRegClock className="text-blue-500" /> {selectedBlog.readTime}
                        </span>
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight text-white">
                        {selectedBlog.title}
                      </h1>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span>By {selectedBlog.author}</span>
                        <span>•</span>
                        <span>{selectedBlog.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        className="p-3 hover:bg-gray-800 rounded-full transition-all"
                        onClick={() => toggleSaveBlog(selectedBlog.id)}
                        aria-label={savedBlogs.includes(selectedBlog.id) ? "Unsave article" : "Save article"}
                      >
                        {savedBlogs.includes(selectedBlog.id) ? (
                          <FaBookmark className="text-blue-500" />
                        ) : (
                          <FaRegBookmark className="text-gray-400 hover:text-blue-500" />
                        )}
                      </button>
                      <button 
                        className="p-3 hover:bg-gray-800 rounded-full transition-all"
                        onClick={() => shareBlog(selectedBlog)}
                        aria-label="Share article"
                      >
                        <FaShare className="text-gray-400 hover:text-blue-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none my-6">
                    <div 
                      className="text-gray-300 leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: selectedBlog.content }} 
                    />
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-sm font-semibold mb-2 text-gray-400 uppercase tracking-wider">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedBlog.tags.map(tag => (
                            <motion.span 
                              key={tag} 
                              className="px-2 py-1 bg-gray-800 rounded-full text-xs hover:bg-gray-700 cursor-pointer transition-all text-gray-300"
                              onClick={() => {
                                setSelectedTag(tag);
                                closeBlog();
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              #{tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <FaComment className="text-blue-500" /> {selectedBlog.comments} comments
                        </span>
                        <span className="flex items-center gap-1">
                          👁️ {selectedBlog.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
                      {selectedTag && ` (Tag: #${selectedTag})`}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} found
                    </p>
                  </div>
                  <button 
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
                    aria-label="Open filters"
                  >
                    <FaFilter />
                  </button>
                </div>
                
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-800"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-800 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-800 rounded w-5/6 mb-4"></div>
                          <div className="h-2 bg-gray-800 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <AnimatePresence>
                    {filteredBlogs.length > 0 ? (
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                      >
                        {filteredBlogs.map(blog => (
                          <motion.article
                            key={blog.id}
                            className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                            whileHover={{ y: -5 }}
                            onClick={() => openBlog(blog)}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className="relative">
                              <img 
                                src={blog.image} 
                                alt={blog.title} 
                                className="w-full h-48 object-cover group-hover:opacity-90 transition-all"
                                loading="lazy"
                              />
                              <div className="absolute top-3 right-3">
                                <button 
                                  className="p-2 bg-black/80 hover:bg-black rounded-full shadow-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSaveBlog(blog.id);
                                  }}
                                  aria-label={savedBlogs.includes(blog.id) ? "Unsave article" : "Save article"}
                                >
                                  {savedBlogs.includes(blog.id) ? (
                                    <FaBookmark className="text-blue-500" />
                                  ) : (
                                    <FaRegBookmark className="text-gray-400 group-hover:text-blue-500" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-1 bg-gray-800 text-blue-400 rounded-full text-xs font-medium">
                                  {blog.category}
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  <FaRegClock /> {blog.readTime}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors text-white">
                                {blog.title}
                              </h3>
                              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {blog.excerpt}
                              </p>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">{blog.date}</span>
                                <div className="flex gap-3 text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <FaComment /> {blog.comments}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    👁️ {blog.views}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <h3 className="text-lg text-blue-400 mb-3">No articles found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Try adjusting your search or filters.
                        </p>
                        <button
                          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-all"
                          onClick={resetFilters}
                        >
                          Reset Filters
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <motion.button
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileFiltersOpen(true)}
          aria-label="Open filters"
        >
          <FaFilter />
        </motion.button>
      </div>
    </div>
  );
};

export default BlogSection;