// ============================================================
// 🎯 YOUR PORTFOLIO DATA — Edit everything here!
// ============================================================

export const personalInfo = {
  name: "Vivek Faujdar",
  role: "Full Stack Developer",
  tagline: "I build fast, scalable, and clean software.",
  description:
    "A Computer Science student passionate about building end-to-end digital products. I love turning complex problems into elegant, efficient solutions — from backend APIs to polished UIs.",
  location: "India",
  email: "vivekfaujdar06@gmail.com",        // ← change this
  github: "https://github.com/vivekfaujdar01",   // ← change this
  linkedin: "https://www.linkedin.com/in/vivekfaujdar01/", // ← change this
  twitter: "https://twitter.com/vivekfaujdar",    // ← change this
  resumeUrl: "/resume.pdf",          // ← add your resume to /public/resume.pdf
  availableForWork: true,
  githubUsername: "vivekfaujdar01",    // ← used for GitHub heatmap & stats embeds
  leetcodeUsername: "vivekfaujdar01",  // ← used for LeetCode live stats
}

export const skills = [
  // Languages
  { name: "Java",               category: "Languages", level: 80, icon: "☕" },
  { name: "JavaScript (ES6+)",  category: "Languages", level: 88, icon: "🟨" },

  // Web Development
  { name: "HTML5 & CSS3",       category: "Web Development", level: 92, icon: "🌐" },
  { name: "Tailwind CSS",       category: "Web Development", level: 87, icon: "🎨" },
  { name: "React.js",           category: "Web Development", level: 88, icon: "⚛️" },
  { name: "Express.js",         category: "Web Development", level: 82, icon: "🚂" },
  { name: "Node.js",            category: "Web Development", level: 83, icon: "🟢" },

  // Database Management
  { name: "MongoDB",            category: "Database Management", level: 80, icon: "🍃" },
  { name: "MySQL",              category: "Database Management", level: 75, icon: "🐬" },

  // Version Control
  { name: "GitHub",             category: "Version Control", level: 90, icon: "🐙" },
  { name: "GitLab",             category: "Version Control", level: 78, icon: "🦊" },

  // Development & Utility
  { name: "Linux",              category: "Development & Utility", level: 72, icon: "🐧" },
  { name: "Postman",            category: "Development & Utility", level: 85, icon: "📮" },
  { name: "Docker",             category: "Development & Utility", level: 68, icon: "🐳" },

  // Soft Skills
  { name: "Problem-Solving",    category: "Soft Skills", level: 92, icon: "🧩" },
  { name: "Team Player",        category: "Soft Skills", level: 90, icon: "🤝" },
  { name: "Adaptability",       category: "Soft Skills", level: 88, icon: "🔄" },
  { name: "Time Management",    category: "Soft Skills", level: 85, icon: "⏱️" },
]

export const projects = [
  {
    id: 1,
    title: "DevFlow",
    subtitle: "Full Stack Task Manager",
    description:
      "A real-time project management tool built with React, Node.js, and MongoDB. Features include drag-and-drop boards, JWT auth, WebSocket updates, and REST API.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    github: "https://github.com/vivekfaujdar",
    live: "#",
    accent: "#00d4ff",
    featured: true,
    // Replace with your actual screenshot path in /public/projects/
    image: null,
  },
  {
    id: 2,
    title: "AlgoViz",
    subtitle: "Algorithm Visualizer",
    description:
      "Interactive DSA visualizer for sorting & pathfinding algorithms. Built with React and vanilla JS animations to make learning algorithms intuitive.",
    tech: ["React", "JavaScript", "CSS Animations", "Tailwind"],
    github: "https://github.com/vivekfaujdar",
    live: "#",
    accent: "#39d353",
    featured: true,
    image: null,
  },
  {
    id: 3,
    title: "ShopAPI",
    subtitle: "E-Commerce REST API",
    description:
      "Scalable REST API for an e-commerce platform. JWT authentication, role-based access, product CRUD, order management, and PostgreSQL database.",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT", "Docker"],
    github: "https://github.com/vivekfaujdar",
    live: null,
    accent: "#f78166",
    featured: false,
    image: null,
  },
  {
    id: 4,
    title: "PortfolioGen",
    subtitle: "Portfolio Generator CLI",
    description:
      "A CLI tool in Java that scaffolds a customizable portfolio site from a JSON config. Generates HTML/CSS output automatically.",
    tech: ["Java", "CLI", "JSON", "HTML/CSS"],
    github: "https://github.com/vivekfaujdar",
    live: null,
    accent: "#d2a8ff",
    featured: false,
    image: null,
  },
]

export const experience = [
  {
    year: "2024 – Present",
    role: "Open Source Contributor",
    org: "Various Projects",
    desc: "Contributing to open source React and Node.js projects. Focus on performance optimization and documentation.",
  },
  {
    year: "2023 – 2024",
    role: "Freelance Developer",
    org: "Self-employed",
    desc: "Built 3 full-stack web apps for local clients using React and Node.js. Managed deployment on AWS EC2.",
  },
  {
    year: "2022 – Present",
    role: "B.Tech Computer Science",
    org: "Your University Name",   // ← change this
    desc: "Studying Data Structures, DBMS, OS, Computer Networks. Active in coding clubs and hackathons.",
  },
]

export const stats = [
  { value: "13+", label: "Technologies" },
  { value: "4+", label: "Projects Built" },
  { value: "300+", label: "LeetCode Problems" },
  { value: "∞",   label: "Cups of Coffee" },
]
