import { useEffect, useRef } from 'react'
import benitoLogo from '../ProjectLogos/BenitoLogo.png'
import chiLogo from '../ProjectLogos/ChiLogo.png'
import eatThisLogo from '../ProjectLogos/EatThisLogo.png'
import nl2sqlLogo from '../ProjectLogos/nl2sqlLogo.png'
import pitchSearchLogo from '../ProjectLogos/PitchSearchLogo.png'
import proPic from '../ProjectLogos/ProPic.jpeg'

const aboutAreas = [
  {
    title: 'What I am doing now',
    description:
      'I am studying computer science at UIC and spending most of my time outside class building full-stack apps with real data, auth, and admin workflows.',
  },
  {
    title: 'What I keep coming back to',
    description:
      'Baseball software, analytics tools, internal products, and AI-assisted interfaces where the output still needs to feel understandable and reliable.',
  },
]

const featuredProject = {
  title: 'Men’s League Platform',
  logo: benitoLogo,
  logoAlt: 'Men’s League Platform logo',
  description:
    'A full-stack operations platform for a local men’s baseball league, built with public-facing league pages and separate workflows for commissioners and team managers.',
  stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
  summary: [
    'Handles teams, rosters, standings, schedules, league posts, and administrative updates in one system.',
    'Includes role-based access so league staff and team managers can work in the same product without sharing the same permissions.',
    'Supports bilingual content and league-specific configuration instead of forcing a generic sports template.',
  ],
  highlights: [
    'Built the app as a React + Vite frontend with a FastAPI backend, then carried the deployment through as separate web and API services.',
    'Added league operations flows like roster management, player records, schedule editing, standings, and short social-style updates for league communication.',
    'Worked through persistence, uploads, auth, and environment-specific deployment issues so the project could function like a real product rather than a mock portfolio build.',
  ],
  links: [
    { label: 'Demo', href: 'https://mens-league-web.vercel.app/' },
    { label: 'GitHub', href: 'https://github.com/Mgomez1023/mens-league-mvp' },
  ],
}

const secondaryProjects = [
  {
    title: 'NL→SQL Explorer',
    logo: nl2sqlLogo,
    logoAlt: 'NL→SQL Explorer logo',
    description:
      'A full-stack analytics app that turns plain-English questions into validated SQL over uploaded datasets.',
    context:
      'I built this around transparency: users can inspect the schema, review the generated query, and see the results without the AI feeling like a black box.',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQL', 'OpenAI API', 'Vercel'],
    links: [
      { label: 'Demo', href: 'https://nl2sql-frontend-jet.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/NL2SQL' },
    ],
  },
  {
    title: 'PitchSearch',
    logo: pitchSearchLogo,
    logoAlt: 'PitchSearch logo',
    description:
      'A pitch-level MLB analytics tool for exploring pitch tendencies, filters, and player-level breakdowns.',
    context:
      'This started as a Washington Nationals interview project, so I focused on making the baseball data usable quickly instead of overcomplicating the interface.',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'Docker', 'Vercel'],
    links: [
      { label: 'Demo', href: 'https://pitch-search.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/PitchSearch' },
    ],
  },
  {
    title: 'EatThis - Food Picker',
    logo: eatThisLogo,
    logoAlt: 'EatThis logo',
    description:
      'A restaurant discovery app built to make the “where should we eat?” decision faster and less annoying.',
    context:
      'The project is intentionally lightweight: simple local search, cleaner place details, and a shorter path from browsing to picking a spot.',
    stack: ['React', 'Vite', 'Google Places API', 'Tailwind CSS', 'Vercel'],
    links: [
      { label: 'Demo', href: 'https://eat-this-app-mgomez1023s-projects.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/EatThis-App' },
    ],
  },
  {
    title: 'Loaner Vehicle Management System',
    logo: chiLogo,
    logoAlt: 'Chicago Tire and Auto logo',
    description:
      'A workflow system for Chicago Tire and Auto that digitized loaner vehicle checkout and return for both staff and customers.',
    context:
      'Built during an internship to replace paper-heavy tracking with QR-accessible forms, signature capture, and automatic contract delivery.',
    stack: ['WordPress', 'Elementor Pro', 'jQuery', 'Google Apps Script', 'Google Sheets'],
    links: [{ label: 'GitHub', href: 'https://github.com/Mgomez1023/Loaner-Vehicle-Project' }],
  },
]

const educationEntries = [
  {
    school: 'University of Illinois Chicago',
    degree: 'B.S. in Computer Science',
    location: 'Chicago, IL',
    timeline: 'Aug 2025 - Present',
    expectedGraduation: 'May 2027',
  },
  {
    school: 'Moraine Valley Community College',
    degree: 'Associate in Applied Science',
    location: 'Palos Hills, IL',
    timeline: 'Aug 2023 - May 2025',
    expectedGraduation: 'Graduated',
  },
]

const coursework = [
  'Data Structures',
  'Algorithms',
  'C++',
  'Java',
  'UNIX',
]

const contactLinks = [
  { label: 'Email', value: 'mgome20@uic.edu', href: 'mailto:mgome20@uic.edu' },
  { label: 'GitHub', value: 'github.com/Mgomez1023', href: 'https://github.com/Mgomez1023' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/martin-gomez-',
    href: 'https://www.linkedin.com/in/martin-gomez-',
  },
  { label: 'Resume', value: 'MartinGomez_Resume.pdf', href: '/MartinGomez_Resume.pdf' },
]

function useScrollReveal() {
  const contentRef = useRef(null)

  useEffect(() => {
    const contentNode = contentRef.current

    if (!contentNode) {
      return undefined
    }

    const revealNodes = contentNode.querySelectorAll('[data-reveal]')

    if (!revealNodes.length) {
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealNodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    revealNodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  return contentRef
}

function SectionHeader({ title, description }) {
  return (
    <div className="section-header" data-reveal>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  )
}

function ProjectLogo({ logo, logoAlt, placeholder, featured = false }) {
  const frameClassName = featured
    ? 'project-logo-frame project-logo-frame-featured'
    : 'project-logo-frame'

  if (logo) {
    return (
      <div className={frameClassName}>
        <img className="project-logo-image" src={logo} alt={logoAlt} />
      </div>
    )
  }

  return (
    <div className={`${frameClassName} project-logo-frame-placeholder`} aria-label="Project logo placeholder">
      <span className="project-logo-placeholder">{placeholder}</span>
    </div>
  )
}

function AboutSection() {
  return (
    <section className="content-section" id="about">
      <div className="about-layout">
        <div className="about-top">
          <div className="about-copy">
            <SectionHeader
              title="About"
              description="I am Martin Gomez, a computer science student at UIC focused on full-stack software, sports-related products, and tools that solve practical problems without feeling overbuilt."
            />

            <p className="about-intro" data-reveal>
              Most of my work starts with a specific use case, not a trend. I like building
              products that have real users, real constraints, and enough technical depth to be
              worth solving properly, whether that means working through data flow, auth,
              deployment, or the details that make an interface feel dependable.
            </p>
          </div>

          <div className="about-photo-wrap" data-reveal style={{ '--reveal-delay': '0.08s' }}>
            <img className="about-photo" src={proPic} alt="Martin Gomez profile picture" />
          </div>
        </div>

        <div className="info-grid">
          {aboutAreas.map((area, index) => (
            <article
              className="info-card"
              key={area.title}
              data-reveal
              style={{ '--reveal-delay': `${0.06 * index}s` }}
            >
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section className="content-section" id="projects">
      <SectionHeader
        title="Projects"
        description="The league platform is the clearest example of how I like to work: strong product structure, real backend logic, and enough detail to feel like an actual system."
      />

      <article className="featured-project-card" data-reveal>
        <div className="featured-project-main">
          <div className="project-title-row project-title-row-featured">
            <ProjectLogo
              logo={featuredProject.logo}
              logoAlt={featuredProject.logoAlt}
              featured
            />

            <div className="project-card-header">
              <p className="detail-label">Featured Project</p>
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.description}</p>
            </div>
          </div>

          <div className="featured-project-summary">
            {featuredProject.summary.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="featured-project-body">
          <div className="project-card-block">
            <span className="detail-label">Tech Stack</span>
            <div className="tag-row">
              {featuredProject.stack.map((item) => (
                <span className="tag-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="project-card-block">
            <span className="detail-label">What I Built</span>
            <ul className="project-highlights">
              {featuredProject.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-links">
          {featuredProject.links.map((link) => (
            <a
              key={link.label}
              className="text-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </article>

      <div className="secondary-project-grid">
        {secondaryProjects.map((project, index) => (
          <article
            className="project-card project-card-secondary"
            key={project.title}
            data-reveal
            style={{ '--reveal-delay': `${0.08 + 0.06 * index}s` }}
          >
            <div className="project-title-row">
              <ProjectLogo
                logo={project.logo}
                logoAlt={project.logoAlt}
                placeholder={project.placeholder}
              />

              <div className="project-card-header">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>

            <div className="project-card-block">
              <span className="detail-label">Context</span>
              <p className="project-context">{project.context}</p>
            </div>

            <div className="project-card-block">
              <span className="detail-label">Tech Stack</span>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span className="tag-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-links">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  className="text-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="projects-footer" data-reveal style={{ '--reveal-delay': '0.12s' }}>
        <a
          className="projects-github-button"
          href="https://github.com/Mgomez1023"
          target="_blank"
          rel="noreferrer"
        >
          <span>More on on my GitHub</span>
          <svg
            className="projects-github-button-icon"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M4.5 10h10m0 0-4-4m4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section className="content-section" id="education">
      <SectionHeader
        title="Education"
        description="My coursework has pushed me toward systems, data, and product-minded engineering, and I have tried to reflect that in the projects I build outside class."
      />

      <div className="education-grid">
        {educationEntries.map((entry, index) => (
          <article
            className="education-card"
            key={entry.school}
            data-reveal
            style={{ '--reveal-delay': `${0.05 * index}s` }}
          >
            <div className="education-overview">
              <div>
                <p className="detail-label">School</p>
                <h3>{entry.school}</h3>
                <p className="education-location">{entry.location}</p>
              </div>

              <div className="education-meta">
                <div>
                  <p className="detail-label">Degree</p>
                  <p>{entry.degree}</p>
                </div>

                <div>
                  <p className="detail-label">Timeline</p>
                  <p>{entry.timeline}</p>
                </div>

                <div>
                  <p className="detail-label">Expected Graduation</p>
                  <p>{entry.expectedGraduation}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <article className="education-card education-coursework-card" data-reveal>
        <div className="education-coursework">
          <p className="detail-label">Relevant Coursework</p>
          <div className="tag-row">
            {coursework.map((course) => (
              <span className="tag-pill" key={course}>
                {course}
              </span>
            ))}
          </div>
        </div>
      </article>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="content-section content-section-last" id="contact">
      <SectionHeader
        title="Contact"
        description="I am looking for software engineering internships and early-career roles where I can contribute on real product work, especially across frontend and full-stack development."
      />

      <div className="contact-layout">
        <div className="contact-copy" data-reveal>
          <p>
            
          </p>
        </div>

        <div className="contact-card" data-reveal style={{ '--reveal-delay': '0.06s' }}>
          {contactLinks.map((link) => (
            <a
              key={link.label}
              className="contact-row"
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
            >
              <span className="detail-label">{link.label}</span>
              <span className="contact-value">{link.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PortfolioSections() {
  const contentRef = useScrollReveal()

  return (
    <main className="content-stack" ref={contentRef}>
      <AboutSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
