// Site content. Every fact here comes from the current resume
// (public/MartinGomez_Resume.pdf). Do not add claims that are not on it.
import networkXpertsHomepage from './HomePages/NetworkXpertsHomepage.png'
import maromPaintingHomepage from './HomePages/MaromPaintingHomepage.png'
import mgmFloorsHomepage from './HomePages/MGMFloorsHomepage.png'
import benitoJuarezHomepage from './HomePages/BenitoJuarezHomepage.png'
import buildAWallThumbnail from './HomePages/Thumbnail.png'
import cookieClickerLogo from './ProjectLogos/CookieClicker.jpg'
import pitchSearchLogo from './ProjectLogos/PitchSearchLogo.png'
import wallBuildingLogo from './ProjectLogos/Box.png'

// Link types decide the button label. Never add an AWS URL.
export const linkLabels = {
  github: 'GitHub',
  live: 'Live site',
  roblox: 'Play on Roblox',
  demo: 'Live demo',
}

// Projects are baseball cards. Facts come only from CLAUDE.md (or, for the
// Minor leagues, copy that was already on the site). `year: null` means the
// year is not on record: the card leaves it off rather than guess.
//
// Card fields
//   name / shortName   full name in the overlay, short name on the peek strip
//   initials           the small mark on the strip (and the graphic when there is no image)
//   tagline            the one-liner on the overlay front
//   stack              tags on the front, Stack on the stat line
//   role, result       stat line rows ("What I built", "Result"); omitted when nothing is on record
//   links              [{ type, href }], labeled by type
//   writeup            optional write-up URL
//   buildsOn           optional extra stat line row

// The fan: five cards, strongest first (CLAUDE.md order).
export const featuredProjects = [
  {
    id: 'pitch-whiff-model',
    name: 'Pitch Whiff Model',
    shortName: 'Pitch Whiff',
    initials: 'PW',
    year: 'Nov. 2026',
    tagline:
      'ML pipeline on a full season of MLB Statcast data, testing whether pitch sequencing improves whiff prediction.',
    stack: ['FastAPI', 'Docker', 'GitHub Actions', 'AWS'],
    role: 'ML pipeline served through FastAPI, containerized with Docker, with GitHub Actions CI.',
    result:
      '0.768 ROC AUC on a time-based holdout. A pre-registered rule kept the simpler model. Deployed on AWS (ECR, ECS Fargate).',
    buildsOn: 'PitchSearch (in the Minor leagues below)',
    links: [{ type: 'github', href: 'https://github.com/Mgomez1023/pitch-sequencing-model' }],
    writeup: 'https://github.com/Mgomez1023/pitch-sequencing-model#readme',
  },
  {
    id: 'benito-juarez-platform',
    name: "Benito Juarez Men's League Platform",
    shortName: 'Benito Juarez League',
    initials: 'BJ',
    year: 'Feb. 2026 – Present',
    tagline: 'Site for a 10-team, 150+ player amateur baseball league, in English and Spanish.',
    image: benitoJuarezHomepage,
    imageAlt: "Homepage of the Benito Juarez Men's League website.",
    imageFit: 'cover',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Vercel'],
    role: 'Schedules, standings, rosters, JWT auth, CSV game import, and English/Spanish support.',
    result: 'Live site for a 10-team, 150+ player amateur league.',
    links: [{ type: 'live', href: 'https://mens-league-web.vercel.app/' }],
  },
  {
    id: 'destiny-copilot',
    name: 'Destiny Copilot',
    shortName: 'Destiny Copilot',
    initials: 'DC',
    year: 'Sep. 2026 – Present',
    tagline: 'AI companion for Destiny 2, with Bungie OAuth sign-in.',
    stack: ['FastAPI', 'Bungie OAuth', 'GitHub Actions'],
    role: 'Bungie OAuth sign-in, a tool-calling FastAPI backend, and GitHub Actions CI.',
    result: 'Ongoing since Sep. 2026.',
    links: [{ type: 'github', href: 'https://github.com/Mgomez1023/DestinyCopilot' }],
  },
  {
    id: 'sell-plushies',
    name: 'Sell Plushies',
    shortName: 'Sell Plushies',
    initials: 'SP',
    year: 'Oct. 2026 – Present',
    tagline: 'Roblox idle-collector game with a server-authoritative economy.',
    stack: ['Roblox', 'Luau'],
    role: 'Server-authoritative game economy, written in Luau.',
    result: 'Ongoing since Oct. 2026.',
    links: [],
  },
  {
    // Only the name and year (2024, from Martin) are on record. Tech, what was
    // built and results stay empty until he supplies them. The repo link was
    // already on the live site.
    id: 'loaner-vehicle-system',
    name: 'Loaner Vehicle Management System',
    shortName: 'Loaner Vehicles',
    initials: 'LV',
    year: '2024',
    tagline: 'A system for managing loaner vehicles.',
    stack: [],
    links: [{ type: 'github', href: 'https://github.com/Mgomez1023/Loaner-Vehicle-Project' }],
  },
]

// The Minor leagues row: older projects, copy as it was on the site.
export const minorLeagueProjects = [
  {
    id: 'build-a-wall',
    name: 'Build a Wall!',
    shortName: 'Build a Wall!',
    initials: 'BW',
    year: null,
    tagline: 'Roblox package-handling tycoon inspired by working at UPS.',
    image: buildAWallThumbnail,
    imageAlt: 'Build a Wall! game art: a player stacking packages into a wall in a warehouse.',
    imageFit: 'cover',
    stack: ['Roblox Studio', 'Luau'],
    role: 'Server-authoritative systems for base claiming, purchases, worker installation, package routing, and progression.',
    result: 'Playable on Roblox, with persistent player profiles, challenges, and rebirths.',
    links: [{ type: 'roblox', href: 'https://www.roblox.com/games/75842793514825/Build-a-Wall' }],
  },
  {
    id: 'pitchsearch',
    name: 'PitchSearch',
    shortName: 'PitchSearch',
    initials: 'PS',
    year: null,
    tagline: 'Pitch-level MLB analytics tool for exploring pitch tendencies and player breakdowns.',
    image: pitchSearchLogo,
    imageAlt: 'PitchSearch logo.',
    imageFit: 'contain',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'Docker', 'Vercel'],
    role: 'Built as a Washington Nationals interview project.',
    result: 'Live demo with pitch filters and player-level breakdowns.',
    links: [
      { type: 'demo', href: 'https://pitch-search.vercel.app/' },
      { type: 'github', href: 'https://github.com/Mgomez1023/PitchSearch' },
    ],
  },
  {
    id: 'cookie-clicker',
    name: 'Cookie Clicker in C++',
    shortName: 'Cookie Clicker',
    initials: 'CC',
    year: null,
    tagline: 'The Cookie Clicker game remade in C++ with the SFML graphics library.',
    image: cookieClickerLogo,
    imageAlt: 'A chocolate chip cookie on a navy background.',
    imageFit: 'cover',
    stack: ['C++', 'SFML'],
    role: 'Final project for my Advanced Computer Science class.',
    result: 'Presented in a live classroom demonstration.',
    links: [{ type: 'github', href: 'https://github.com/Mgomez1023/Cookie-Clicker' }],
  },
  {
    id: 'wall-building-simulator',
    name: 'Wall Building Simulator',
    shortName: 'Wall Building Sim',
    initials: 'WB',
    year: null,
    tagline: 'UPS-inspired 2D game: stack increasingly random packages into a wall for a high score.',
    image: wallBuildingLogo,
    imageAlt: 'A cardboard package on a yellow background.',
    imageFit: 'cover',
    stack: ['TypeScript'],
    role: 'Built to turn loading a trailer into a quick, replayable game.',
    result: 'Playable in the browser.',
    links: [
      { type: 'demo', href: 'https://wall-building-simulator.vercel.app/' },
      { type: 'github', href: 'https://github.com/Mgomez1023/WallBuildingSimulator' },
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
