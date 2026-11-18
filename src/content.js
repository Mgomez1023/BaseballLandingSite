// Site content. Every fact here comes from the current resume
// (public/MartinGomez_Resume.pdf). Do not add claims that are not on it.
import networkXpertsHomepage from './HomePages/NetworkXpertsHomepage.png'
import maromPaintingHomepage from './HomePages/MaromPaintingHomepage.png'
import mgmFloorsHomepage from './HomePages/MGMFloorsHomepage.png'

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
