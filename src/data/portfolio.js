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
  email: "vivek@example.com",        // ← change this
  github: "https://github.com/vivekfaujdar",   // ← change this
  linkedin: "https://linkedin.com/in/vivekfaujdar", // ← change this
  twitter: "https://twitter.com/vivekfaujdar",    // ← change this
  resumeUrl: "/resume.pdf",          // ← add your resume to /public/resume.pdf
  availableForWork: true,
}

export const skills = [
  // Frontend
  { name: "React / Next.js",  category: "Frontend",  level: 88, icon: "⚛️" },
  { name: "HTML & CSS",       category: "Frontend",  level: 92, icon: "🌐" },
  { name: "Tailwind CSS",     category: "Frontend",  level: 87, icon: "🎨" },
  { name: "JavaScript",       category: "Frontend",  level: 85, icon: "🟨" },
  // Backend
  { name: "Node.js / Express",category: "Backend",   level: 82, icon: "🟢" },
  { name: "Java",             category: "Backend",   level: 78, icon: "☕" },
  // Database & Tools
  { name: "SQL / NoSQL",      category: "Database",  level: 80, icon: "🗄️" },
  { name: "Git & GitHub",     category: "Tools",     level: 90, icon: "🐙" },
  { name: "Docker",           category: "DevOps",    level: 68, icon: "🐳" },
  { name: "Postman",          category: "Tools",     level: 85, icon: "📮" },
  { name: "DSA / Algorithms", category: "CS Fundamentals", level: 75, icon: "🧠" },
  { name: "TypeScript",       category: "Frontend",  level: 72, icon: "🔷" },
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
  { value: "10+", label: "Projects Built" },
  { value: "500+", label: "LeetCode Problems" },
  { value: "∞",   label: "Cups of Coffee" },
]
