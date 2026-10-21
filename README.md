# Samisoftz — Landing Page Source Code

High-converting, responsive landing page built with React, Vite, and Tailwind CSS.

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Install Dependencies
Open your terminal inside this folder and run:
```bash
npm install
```

### 2. Run Local Development Server
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the landing page.

### 3. Build for Production
To generate the optimized static files for deployment (hosting):
```bash
npm run build
```
This will create a `dist/` folder containing the minified HTML, CSS, and JS ready to upload to any web hosting (cPanel, Hostinger, Vercel, Netlify, Cloudflare Pages).

## Deploy on Vercel

1. Import this repository in Vercel and use the **Vite** framework preset.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add the domain `offer.samisoftz.com`.
5. At the DNS provider, add a CNAME record named `offer` pointing at `cname.vercel-dns.com`.

---

## 📁 Project Structure

```
├── public/                 # Static assets (logos, favicon)
│   ├── logo.png           # Light mode logo
│   ├── logo-white.png     # Dark mode logo
│   └── red-bg-logo.jpg    # Brand crest
├── src/
│   ├── App.jsx            # Main landing page component & all sections
│   ├── index.css          # Tailwind CSS & custom cursor styles
│   └── main.jsx           # React application entry point
├── index.html             # HTML shell with Google Fonts (Sora & Outfit)
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration & brand color palette
└── vite.config.js         # Vite bundler configuration
```

---

## ✨ Features Included
- **Standardized CTA Buttons:** All conversion buttons use the exact label `Talk to expert`.
- **Interactive Cursor Effects:** Smooth dual-layer cursor with hover states (auto-disabled on touch devices).
- **Light & Dark Mode:** Complete theme toggle with persistent user preference in `localStorage`.
- **Case Studies Showcase:** Symmetrical 5-column grid dock on desktop + mobile interactive slider with previews.
- **Conversion Modal:** Free 30-min strategy call scheduler, WhatsApp direct chat, and quick scope intake.
- **Mobile First:** Tested and responsive across all viewports (320px to 4K).
