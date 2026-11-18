// Site content. Every fact here comes from the current resume
// (public/MartinGomez_Resume.pdf). Do not add claims that are not on it.
import networkXpertsHomepage from './HomePages/NetworkXpertsHomepage.png'
import maromPaintingHomepage from './HomePages/MaromPaintingHomepage.png'
import mgmFloorsHomepage from './HomePages/MGMFloorsHomepage.png'
import benitoJuarezHomepage from './HomePages/BenitoJuarezHomepage.png'
import buildAWallThumbnail from './HomePages/Thumbnail.png'
import chiLogo from './ProjectLogos/ChiLogo.png'
import cookieClickerLogo from './ProjectLogos/CookieClicker.jpg'
import pitchSearchLogo from './ProjectLogos/PitchSearchLogo.png'
import wallBuildingLogo from './ProjectLogos/Box.png'

// Baseball cards, newest and strongest first.
// Front: image, kind, name, tagline, year. Back: the stat line (stack, role, result, links).
// The four newest cards use only the project facts listed in CLAUDE.md.
// `year: null` means the year is not on record yet; the card leaves it off rather than guess.
export const projects = [
  {
    id: 'pitch-whiff-model',
    name: 'Pitch Whiff Model',
    kind: 'Machine learning',
    year: 'Nov. 2026',
    tagline:
      'ML pipeline on a full season of MLB Statcast data, testing whether pitch sequencing improves whiff prediction.',
    initials: 'PW',
    stack: ['FastAPI', 'Docker', 'GitHub Actions', 'AWS'],
    role: 'ML pipeline served through FastAPI, containerized with Docker, with GitHub Actions CI.',
    result: '0.768 ROC AUC on a time-based holdout. Deployed on AWS (ECR, ECS Fargate).',
    links: [{ label: 'GitHub', href: 'https://github.com/Mgomez1023/pitch-sequencing-model' }],
  },
  {
    id: 'benito-juarez-platform',
    name: "Benito Juarez Men's League Platform",
    kind: 'League platform',
    year: 'Feb. 2026 – Present',
    tagline: 'Site for a 10-team, 150+ player amateur baseball league, in English and Spanish.',
    image: benitoJuarezHomepage,
    imageAlt: "Homepage of the Benito Juarez Men's League website.",
    imageFit: 'cover',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Vercel'],
    role: 'Schedules, standings, rosters, JWT auth, CSV game import, and English/Spanish support.',
    result: 'Live site for a 10-team, 150+ player amateur league.',
    links: [{ label: 'Live site', href: 'https://mens-league-web.vercel.app/' }],
  },
  {
    id: 'destiny-copilot',
    name: 'Destiny Copilot',
    kind: 'AI app',
    year: 'Sep. 2026 – Present',
    tagline: 'AI companion for Destiny 2, with Bungie OAuth sign-in.',
    initials: 'DC',
    stack: ['FastAPI', 'Bungie OAuth', 'GitHub Actions'],
    role: 'Bungie OAuth sign-in, a tool-calling FastAPI backend, and GitHub Actions CI.',
    result: 'Ongoing since Sep. 2026.',
    links: [{ label: 'GitHub', href: 'https://github.com/Mgomez1023/DestinyCopilot' }],
  },
  {
    id: 'sell-plushies',
    name: 'Sell Plushies',
    kind: 'Roblox game',
    year: 'Oct. 2026 – Present',
    tagline: 'Roblox idle-collector game with a server-authoritative economy.',
    initials: 'SP',
    stack: ['Roblox', 'Luau'],
    role: 'Server-authoritative game economy, written in Luau.',
    result: 'Ongoing since Oct. 2026.',
    links: [],
    linkNote: 'No public link yet',
  },
  {
    id: 'build-a-wall',
    name: 'Build a Wall!',
    kind: 'Roblox game',
    year: null,
    tagline: 'Roblox package-handling tycoon inspired by working at UPS.',
    image: buildAWallThumbnail,
    imageAlt: 'Build a Wall! game art: a player stacking packages into a wall in a warehouse.',
    imageFit: 'cover',
    stack: ['Roblox Studio', 'Luau'],
    role: 'Built server-authoritative systems for base claiming, purchases, worker installation, package routing, and progression.',
    result: 'Playable on Roblox, with persistent player profiles, challenges, and rebirths.',
    links: [{ label: 'Play on Roblox', href: 'https://www.roblox.com/games/75842793514825/Build-a-Wall' }],
  },
  {
    id: 'pitchsearch',
    name: 'PitchSearch',
    kind: 'Baseball analytics',
    year: null,
    tagline: 'Pitch-level MLB analytics tool for exploring pitch tendencies and player breakdowns.',
    image: pitchSearchLogo,
    imageAlt: 'PitchSearch logo.',
    imageFit: 'contain',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'Docker', 'Vercel'],
    role: 'Built it as a Washington Nationals interview project.',
    result: 'Live demo with pitch filters and player-level breakdowns.',
    links: [
      { label: 'Demo', href: 'https://pitch-search.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/PitchSearch' },
    ],
  },
  {
    id: 'loaner-vehicle-system',
    name: 'Loaner Vehicle Management System',
    kind: 'Internship project',
    year: '2024',
    tagline: 'Digital loaner-vehicle checkout and return for Chicago Tire and Auto.',
    image: chiLogo,
    imageAlt: 'Chicago Tire and Auto Repair logo.',
    imageFit: 'contain',
    stack: ['WordPress', 'Elementor Pro', 'jQuery', 'Google Apps Script', 'Google Sheets'],
    role: 'Built it during my Software Developer internship at Chicago Tire and Auto.',
    result: 'Replaced paper intake with QR forms, e-signatures, and automated document delivery.',
    links: [{ label: 'GitHub', href: 'https://github.com/Mgomez1023/Loaner-Vehicle-Project' }],
  },
  {
    id: 'cookie-clicker',
    name: 'Cookie Clicker in C++',
    kind: 'C++ game',
    year: null,
    tagline: 'The Cookie Clicker game remade in C++ with the SFML graphics library.',
    image: cookieClickerLogo,
    imageAlt: 'A chocolate chip cookie on a navy background.',
    imageFit: 'cover',
    stack: ['C++', 'SFML'],
    role: 'Final project for my Advanced Computer Science class.',
    result: 'Presented in a live classroom demonstration.',
    links: [{ label: 'GitHub', href: 'https://github.com/Mgomez1023/Cookie-Clicker' }],
  },
  {
    id: 'wall-building-simulator',
    name: 'Wall Building Simulator',
    kind: 'Browser game',
    year: null,
    tagline: 'UPS-inspired 2D game: stack increasingly random packages into a wall for a high score.',
    image: wallBuildingLogo,
    imageAlt: 'A cardboard package on a yellow background.',
    imageFit: 'cover',
    stack: ['TypeScript'],
    role: 'Built it to turn loading a trailer into a quick, replayable game.',
    result: 'Playable in the browser.',
    links: [
      { label: 'Demo', href: 'https://wall-building-simulator.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/WallBuildingSimulator' },
    ],
  },
]

// Batting order: 1 to 3, most recent first.
export const experienceEntries = [
  {
    id: 'freelance-web-developer',
    title: 'Freelance Web Developer',
    org: 'Marom Painting; MGM Floors LLC; Network Xperts Group',
    location: 'Chicago, IL',
    dates: 'Apr. 2026 – Present',
    highlights: [
      'Designed and launched websites for three local businesses (painting, flooring, IT services) with SEO groundwork: sitemap, robots.txt, and structured pages. One client came by referral from the league platform.',
      'Built an internal FastAPI, React, and Supabase platform that turns completed jobs into reviewable marketing drafts with LLM agents, covered by pytest tests.',
    ],
    link: { label: 'See the client sites', href: '#client-work' },
  },
  {
    id: 'software-developer-intern',
    title: 'Software Developer Intern',
    org: 'Chicago Tire and Auto',
    location: 'Burbank, IL',
    dates: 'May 2024 – Aug. 2024',
    highlights: [
      'Built a digital loaner-vehicle checkout system with WordPress, Google Apps Script, Google Sheets, and jQuery, replacing paper intake with QR forms, e-signatures, and automated document delivery.',
    ],
  },
  {
    id: 'ups-package-handler',
    title: 'Package Handler',
    org: 'UPS, Chicago Area Consolidation Hub',
    location: 'Hodgkins, IL',
    dates: 'Aug. 2022 – Present',
    highlights: [
      'Coordinate bulk-package flow for a time-critical outbound operation serving about 20 trailers with high scan accuracy; recognized by management with multiple performance rewards.',
    ],
  },
]

// Freelance client sites, in the order the resume lists them.
export const clientProjects = [
  {
    id: 'marom-painting',
    title: 'Marom Painting',
    description:
      'A React website for a local painting business, with services, about, and contact sections and a portfolio with CRUD features backed by PostgreSQL.',
    screenshot: maromPaintingHomepage,
    screenshotAlt: 'Homepage screenshot for Marom Painting.',
    stack: ['React', 'TypeScript', 'Vite', 'PostgreSQL'],
    liveUrl: 'https://marompainting.org/',
  },
  {
    id: 'mgm-floors',
    title: 'MGM Floors LLC',
    description:
      'A marketing website for a Chicagoland flooring contractor, with service pages, an interactive installation guide, project galleries, and a quote request flow.',
    screenshot: mgmFloorsHomepage,
    screenshotAlt: 'Homepage screenshot for MGM Floors LLC.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    liveUrl: 'https://mgmflooring.vercel.app/',
  },
  {
    id: 'network-xperts-group',
    title: 'Network Xperts Group',
    description:
      'A responsive website for an IT consulting company, with service information, pricing, company details, and lead-generation forms.',
    screenshot: networkXpertsHomepage,
    screenshotAlt: 'Homepage screenshot for Network Xperts Group.',
    stack: ['React', 'TypeScript', 'Vite'],
    liveUrl: 'https://www.networkxpertsgroup.com/',
  },
]

export const educationEntries = [
  {
    school: 'University of Illinois Chicago',
    degree: 'B.S. Computer Science',
    location: 'Chicago, IL',
    timeline: 'Aug. 2025 – Present',
    status: 'Expected May 2028',
  },
  {
    school: 'Moraine Valley Community College',
    degree: 'Associate in Science',
    location: 'Palos Hills, IL',
    timeline: 'Aug. 2023 – May 2025',
    status: 'Completed',
  },
]

export const coursework = [
  'Systems Programming',
  'Computer Security',
  'Cryptography',
  'Data Structures & Algorithms',
]

export const contactLinks = [
  { label: 'Email', value: 'mgome20@uic.edu', href: 'mailto:mgome20@uic.edu' },
  { label: 'GitHub', value: 'github.com/Mgomez1023', href: 'https://github.com/Mgomez1023' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/martin-gomez-',
    href: 'https://www.linkedin.com/in/martin-gomez-',
  },
  { label: 'Resume', value: 'MartinGomez_Resume.pdf', href: '/MartinGomez_Resume.pdf' },
]
