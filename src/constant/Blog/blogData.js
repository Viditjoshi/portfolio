// src/data/blogData.js

const generateBlogContent = (index) => `
  <p>This is blog post #${index}, packed with in-depth insights and code examples for developers of all levels.</p>
  <h3>Highlights</h3>
  <ul>
    <li>Key concept #1 for blog ${index}</li>
    <li>Key concept #2: Best practices</li>
    <li>Key concept #3: Real-world use cases</li>
  </ul>
  <p>Further explanations and walkthroughs follow for blog ${index} to deepen your understanding of the topic.</p>
`;

export const blogData = Array.from({ length: 50 }, (_, i) => {
  const index = i + 1;
  const categories = ["React", "Node.js", "JavaScript", "TypeScript", "Next.js", "Python", "Cloud", "AI/ML", "Database"];
  const authors = ["Sarah Johnson", "Michael Chen", "David Wilson", "Emily Davis", "John Miller"];
  const tags = [
    ["frontend", "javascript", "webdev"],
    ["backend", "nodejs", "performance"],
    ["cloud", "kubernetes", "devops"],
    ["ai", "ml", "python"],
    ["typescript", "nextjs", "modernjs"]
  ];

  return {
    id: index,
    title: `Blog Post #${index}: Insights & Techniques`,
    author: authors[i % authors.length],
    date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    category: categories[i % categories.length],
    tags: tags[i % tags.length],
    excerpt: `This is a short preview of blog post #${index}, covering valuable techniques and tools.`,
    content: generateBlogContent(index),
   image: `https://picsum.photos/seed/blog${index}/800/600`,
    views: Math.floor(Math.random() * 8000) + 1000,
    comments: Math.floor(Math.random() * 100),
    readTime: `${Math.floor(Math.random() * 8) + 5} min`
  };
});

export const categories = [
  { name: "React", icon: "react", count: 12 },
  { name: "JavaScript", icon: "javascript", count: 15 },
  { name: "Node.js", icon: "nodejs", count: 10 },
  { name: "TypeScript", icon: "typescript", count: 8 },
  { name: "Next.js", icon: "nextjs", count: 5 },
  { name: "Python", icon: "python", count: 7 },
  { name: "Mobile", icon: "mobile", count: 4 },
  { name: "Database", icon: "database", count: 6 },
  { name: "Cloud", icon: "cloud", count: 9 },
  { name: "AI/ML", icon: "ai", count: 5 }
];
