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
    title: "SmartLearn",
    subtitle: "Full Stack Learning Platform",
    description:
      "A full-stack educational platform built with React (Frontend) and Express.js (Backend). SmartLearn enables students to learn through courses and articles, while instructors can create and manage educational content.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    github: "https://github.com/vivekfaujdar01/SmartLearn",
    live: "https://smart-learn01.vercel.app/",
    accent: "#00d4ff",
    featured: true,
    // Replace with your actual screenshot path in /public/projects/
    image: null,
  },
  {
    id: 2,
    title: "ProjectCamp",
    subtitle: "Project Management Platform Backend",
    description: `Built a secure backend system with JWT-based authentication (access & refresh tokens), email verification using Nodemailer & Mailgen, and password encryption via Bcrypt.
Implemented secure cookie handling and a health-check API to ensure reliability and scalability.`,
    tech: ["Node.js", "Express.js", "JWT", "Bcrypt", "Nodemailer", "Mailgen"],
    github: "https://github.com/vivekfaujdar01/ProjectCamp",
    live: null,
    accent: "#39d353",
    featured: true,
    image: null,
  },
  {
    id: 3,
    title: "React Activties",
    subtitle: "React Activties",
    description:
      "A collection of small React activities and example projects to learn and practice React fundamentals (components, state, hooks, routing, styling, and more).",
    tech: ["React", "Tailwind CSS"],
    github: "https://github.com/vivekfaujdar01/React_Activities",
    live: null,
    accent: "#f78166",
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

export const certifications = [
  {
    id: 1,
    title: "Cloud Computing",
    issuer: "NPTEL",
    date: "2025",
    description: "Gaining a strong foundation in cloud architecture, virtualization, and distributed systems. Developed practical understanding of cloud service models (IaaS, PaaS, SaaS) and modern computing infrastructure used in scalable applications.",
    link: "https://drive.google.com/file/d/1Xntx73FupcBPYvPlvCjO_lGARw4wPe_I/view",
    accent: "#ff9900"
  },
  {
    id: 2,
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    date: "2024",
    description: "Building a solid understanding of networking fundamentals, protocols, and data transmission. Gained hands-on knowledge of network models, troubleshooting, and how the internet enables communication between systems.",
    link: "https://drive.google.com/file/d/1Uq5vAbuUoKbRbOKzbUFoaFw5IWrCB609/view",
    accent: "#0668E1"
  },
  {
    id: 3,
    title: "Java Programming",
    issuer: "IamNeo",
    date: "2025",
    description: "Building a solid understanding of Java fundamentals, syntax, and object-oriented programming. Gained hands-on knowledge of core Java concepts, data structures, and problem-solving techniques.",
    link: "https://drive.google.com/file/d/1Vzr9GOCEOJxhFinBhc8YfKhTtENgED9p/view",
    accent: "#0668E1"
  }
]
