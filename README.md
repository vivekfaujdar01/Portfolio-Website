# Vivek Faujdar — Portfolio

A modern, dark-themed developer portfolio built with:
- **React 18** + **Vite** (blazing fast dev server)
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (smooth animations)
- **Lucide React** (clean icons)

---

## 🚀 Getting Started (Run Locally)

### Step 1 — Install Node.js
Download from: https://nodejs.org (choose LTS version)
Verify: `node -v` and `npm -v` in your terminal

### Step 2 — Install dependencies
```bash
cd vivek-portfolio
npm install
```

### Step 3 — Start dev server
```bash
npm run dev
```
Open http://localhost:5173 — your portfolio is live! 🎉

---

## ✏️ Customizing Your Portfolio

### All your content lives in ONE file:
```
src/data/portfolio.js
```

Edit this to update:
- Your name, email, socials
- Skills and proficiency levels
- Projects (title, description, tech stack, GitHub links)
- Experience / education timeline
- Stats (LeetCode count, projects, etc.)

### To add your photo:
1. Put your photo in `public/` folder (e.g. `public/avatar.jpg`)
2. In `src/sections/About.jsx`, replace the `VF` placeholder div with:
```jsx
<img src="/avatar.jpg" alt="Vivek" className="w-28 h-28 object-cover" />
```

### To add project screenshots:
1. Put images in `public/projects/` (e.g. `public/projects/devflow.png`)
2. In `src/data/portfolio.js`, update the `image` field:
```js
image: "/projects/devflow.png"
```

### To add your resume:
1. Put your PDF in `public/resume.pdf`
2. The navbar "Resume" button and About section download will work automatically

---

## 📬 Setting up Contact Form (EmailJS — Free)

1. Create account at https://emailjs.com
2. Add a service (Gmail works)
3. Create an email template
4. Install: `npm install @emailjs/browser`
5. Replace the `handleSubmit` function in `Contact.jsx`:

```js
import emailjs from '@emailjs/browser'

const handleSubmit = (e) => {
  e.preventDefault()
  emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    { from_name: form.name, from_email: form.email, message: form.message },
    'YOUR_PUBLIC_KEY'
  ).then(() => setSent(true))
}
```

---

## 🌍 Deploying to Vercel (Free, 5 minutes)

### Option A — GitHub + Vercel (recommended)
1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio
git push -u origin main
```

2. Go to https://vercel.com → "New Project" → Import your GitHub repo
3. Click Deploy — done! You get `vivekfaujdar.vercel.app`

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Custom domain
In Vercel dashboard → Settings → Domains → Add `vivekfaujdar.dev`
(Buy domain cheap at Namecheap ~$10/yr)

---

## 🏗️ Build for Production

```bash
npm run build        # creates /dist folder
npm run preview      # preview the production build
```

---

## 📁 Project Structure

```
vivek-portfolio/
├── public/
│   ├── resume.pdf        ← add your resume here
│   └── projects/         ← add project screenshots here
├── src/
│   ├── components/
│   │   ├── Cursor.jsx    ← custom cursor
│   │   ├── Navbar.jsx    ← navigation
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx      ← landing section
│   │   ├── About.jsx     ← bio + timeline
│   │   ├── Skills.jsx    ← skills grid
│   │   ├── Projects.jsx  ← project cards
│   │   └── Contact.jsx   ← contact form
│   ├── hooks/
│   │   └── useInView.js  ← scroll animation hook
│   ├── data/
│   │   └── portfolio.js  ← ⭐ ALL YOUR CONTENT HERE
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🎨 Customizing Colors

In `tailwind.config.js`, change:
- `accent: '#00d4ff'`  → your preferred highlight color
- `green: '#39d353'`   → secondary accent
- `bg: '#080c10'`      → background color

---

## 💡 Next Steps to Level Up

1. **Add a blog** — use MDX or a headless CMS like Contentful
2. **Add animations** — explore more Framer Motion features
3. **SEO** — add react-helmet for meta tags
4. **Analytics** — add Vercel Analytics (free)
5. **Dark/Light toggle** — add a theme switcher

---

Built with ❤️ by Vivek Faujdar
