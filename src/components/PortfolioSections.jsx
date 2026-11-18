import { useEffect, useRef, useState } from 'react'
import chiLogo from '../ProjectLogos/ChiLogo.png'
import eatThisLogo from '../ProjectLogos/EatThisLogo.png'
import nl2sqlLogo from '../ProjectLogos/nl2sqlLogo.png'
import pitchSearchLogo from '../ProjectLogos/PitchSearchLogo.png'
import proPic from '../ProjectLogos/ProPic.jpeg'
import CookieClickerLogo from '../ProjectLogos/CookieClicker.jpg'
import MarketMapLogo from '../ProjectLogos/MarketMapLogo.png'
import WallBuildingLogo from '../ProjectLogos/Box.png'
import RobloxThumbnail from '../HomePages/Thumbnail.png'
import {
  clientProjects,
  contactLinks,
  coursework,
  educationEntries,
  experienceEntries,
} from '../content.js'

const featuredProject = {
  title: 'Build a Wall!',
  thumbnail: RobloxThumbnail,
  thumbnailAlt:
    'Build a Wall Roblox game showing a player building a package wall in an industrial facility',
  description:
    'A Roblox package-handling tycoon inspired by my experience working at UPS. Players claim a facility, install workers, route packages, earn cash, complete challenges, and upgrade their operation.',
  stack: [
    'Roblox Studio',
    'Luau',
  ],
  summary: [
    'Players claim and develop their own package-handling facility using collectible workers that generate income.',
    'Progression combines worker upgrades, backpack and movement upgrades, challenges, minigames, and rebirths.',
    'The game includes a hands-on wall-building minigame inspired by the real process of loading package trailers.',
  ],
  highlights: [
    'Built server-authoritative systems for base claiming, purchases, worker installation, package routing, and progression.',
    'Created persistent player profiles for cash, upgrades, inventory, challenges, rewards, and rebirth progress.',
    'Designed custom industrial UI, responsive controls, minigames, visual package systems, and performance-conscious client effects.',
  ],
  links: [
    {
      label: 'Play Game',
      href: 'https://www.roblox.com/games/75842793514825/Build-a-Wall',
    },
  ],
}

const secondaryProjects = [
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
  {
    title: 'AI Market Map',
    logo: MarketMapLogo,
    logoAlt: 'Market Map logo',
    description:
      'Allows users to generate an accurate graph designed to visualize oppurtunites with a prompt. Uses Tavily API for real-time web searches and OpenAI\'s mini model for quick interpretation.',
    context:
      'This project was built for UIC\'s CS Expo in which students were able to show off their projects in a science fair like fashion.',
    stack: ['React', 'TypeScript', 'FastAPI', 'Tavily API', 'OpenAI API' ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/Cookie-Clicker' },
    ],
  },
  {
    title: 'NL to SQL Explorer',
    logo: nl2sqlLogo,
    logoAlt: 'NL to SQL Explorer logo',
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
      'A restaurant discovery app built to make the question of where to eat faster and less annoying.',
    context:
      'The project is intentionally lightweight: simple local search, cleaner place details, and a shorter path from browsing to picking a spot.',
    stack: ['React', 'Vite', 'Google Places API', 'Tailwind CSS', 'Vercel'],
    links: [
      { label: 'Demo', href: 'https://eat-this-app-mgomez1023s-projects.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/EatThis-App' },
    ],
  },
  {
    title: 'Cookie Clicker in C++',
    logo: CookieClickerLogo,
    logoAlt: 'CookieClicker logo',
    description:
      'The popular Cookie Clicker game remade in C++ using the SFML graphics library.',
    context:
      'This project was built as my final project for my Advanced Computer Science class. I presented this project through a live classroom demonstration.',
    stack: ['C++', 'SFML'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/Cookie-Clicker' },
    ],
  },
  {
    title: 'Wall Building Simulator',
    logo: WallBuildingLogo,
    logoAlt: 'WallBuilder logo',
    description:
      'A UPS-inspired 2D wall building game built with TypeScript. Players receive increasingly random packages, build walls, and aim for high scores.',
    context:
      'Working at UPS, I always thought the concept of loading a trailer would actually make a fun game. I built this to be quick, fun, and replayable.',
    stack: ['TypeScript'],
    links: [
      { label: 'Demo', href: 'https://wall-building-simulator.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/WallBuildingSimulator' },
    ],
  },
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
              Most of my work starts with a specific use case. I like building
              products that have real users, real constraints, and enough technical depth to be
              worth solving properly, whether that means working through data flow, auth,
              deployment, or the details that make an interface feel dependable.
            </p>
          </div>

          <div className="about-photo-wrap" data-reveal style={{ '--reveal-delay': '0.08s' }}>
            <img className="about-photo" src={proPic} alt="Martin Gomez" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section className="content-section" id="experience">
      <SectionHeader title="Experience" />

      <div className="lineup-card stitched" data-reveal>
        <div className="lineup-head" aria-hidden="true">
          <span>No.</span>
          <span>Role</span>
          <span className="lineup-head-dates">Dates</span>
        </div>

        <ol className="lineup-list" role="list">
          {experienceEntries.map((entry, index) => (
            <li className="lineup-row" key={entry.id}>
              <span className="lineup-number" aria-hidden="true">{index + 1}</span>
              <div className="lineup-main">
                <h3 className="lineup-title">
                  <span className="visually-hidden">{`${index + 1}. `}</span>
                  {entry.title}
                </h3>
                <p className="lineup-org">
                  {entry.org}
                  <span className="lineup-location">{entry.location}</span>
                </p>
                <ul className="lineup-notes">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                {entry.link ? (
                  <a className="text-link lineup-link" href={entry.link.href}>
                    {entry.link.label}
                  </a>
                ) : null}
              </div>
              <p className="lineup-dates">{entry.dates}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function SecondaryProjectCarousel() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const frameRef = useRef(null)
  const lastTimeRef = useRef(null)
  const reducedMotionRef = useRef(false)
  const interactionRef = useRef({ pointerId: null, startX: 0, startY: 0, lastX: 0, dragging: false, locked: false })
  const suppressClickRef = useRef(false)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined
    const normalize = (offset) => { const width = loopWidthRef.current; if (!width) return offset; const remainder = offset % width; return remainder > 0 ? remainder - width : remainder }
    const render = () => { track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)` }
    const measure = () => {
      const first = track.querySelector('.project-card-secondary')
      const clone = track.querySelector('.project-card-secondary-clone')
      if (!first || !clone) return
      loopWidthRef.current = clone.offsetLeft - first.offsetLeft
      offsetRef.current = normalize(offsetRef.current)
      render()
    }
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => { reducedMotionRef.current = motionQuery.matches; lastTimeRef.current = null }
    const animate = (time) => {
      if (!reducedMotionRef.current && interactionRef.current.pointerId === null && loopWidthRef.current) {
        if (lastTimeRef.current !== null) { const elapsed = Math.min(time - lastTimeRef.current, 100); offsetRef.current = normalize(offsetRef.current - (loopWidthRef.current * elapsed) / 48000); render() }
        lastTimeRef.current = time
      } else lastTimeRef.current = null
      frameRef.current = requestAnimationFrame(animate)
    }
    const finishInteraction = (event) => {
      const interaction = interactionRef.current

      if (interaction.pointerId === null) return
      if (event && event.pointerId !== interaction.pointerId) return

      const pointerId = interaction.pointerId
      const wasDragging = interaction.dragging

      // Clear state before releasing capture because release can emit
      // another lostpointercapture event.
      interactionRef.current = {
        pointerId: null,
        startX: 0,
        startY: 0,
        lastX: 0,
        dragging: false,
        locked: false
      }

      viewport.classList.remove('is-dragging')
      lastTimeRef.current = null

      if (wasDragging && event?.type === 'pointerup') {
        suppressClickRef.current = true
      }

      if (
        event?.type !== 'lostpointercapture' &&
        viewport.hasPointerCapture(pointerId)
      ) {
        viewport.releasePointerCapture(pointerId)
      }
    }
    const onPointerDown = (event) => {
      if (!event.isPrimary) return
      if (event.pointerType === 'mouse' && event.button !== 0) return

      interactionRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        dragging: false,
        locked: false
      }
    }
    const onPointerMove = (event) => {
      const interaction = interactionRef.current

      if (event.pointerId !== interaction.pointerId) return

      const deltaX = event.clientX - interaction.startX
      const deltaY = event.clientY - interaction.startY
      const absoluteX = Math.abs(deltaX)
      const absoluteY = Math.abs(deltaY)

      if (!interaction.locked) {
        const movementDistance = Math.hypot(deltaX, deltaY)
        const directionThreshold = 10
        const directionBias = 1.15

        // Ignore normal finger jitter until the gesture is intentional.
        if (movementDistance < directionThreshold) return

        // Clearly vertical: abandon carousel control and let the page scroll.
        if (absoluteY > absoluteX * directionBias) {
          interaction.pointerId = null
          lastTimeRef.current = null
          return
        }

        // Direction is still ambiguous. Wait for another movement event.
        if (absoluteX <= absoluteY * directionBias) return

        // Clearly horizontal: begin controlling the carousel.
        interaction.locked = true
        interaction.dragging = true

        viewport.setPointerCapture(event.pointerId)
        viewport.classList.add('is-dragging')
      }

      if (event.cancelable) {
        event.preventDefault()
      }

      const movementX = event.clientX - interaction.lastX

      offsetRef.current = normalize(
        offsetRef.current + movementX
      )

      interaction.lastX = event.clientX
      render()
}
    const onLostPointerCapture = (event) => {
      // Ignore bubbled capture-loss events from cards, links, and children.
      if (event.target !== viewport) return

      finishInteraction(event)
    }
    const onClickCapture = (event) => { if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation(); suppressClickRef.current = false } }
    const preventNativeDrag = (event) => event.preventDefault()
    viewport.addEventListener('pointerdown', onPointerDown); viewport.addEventListener('pointermove', onPointerMove); viewport.addEventListener('pointerup', finishInteraction); viewport.addEventListener('pointercancel', finishInteraction); viewport.addEventListener('lostpointercapture', onLostPointerCapture); viewport.addEventListener('click', onClickCapture, true); viewport.addEventListener('dragstart', preventNativeDrag)
    motionQuery.addEventListener('change', updateMotionPreference)
    updateMotionPreference(); measure()
    const resizeObserver = new ResizeObserver(measure); resizeObserver.observe(track)
    frameRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frameRef.current); resizeObserver.disconnect(); motionQuery.removeEventListener('change', updateMotionPreference)
      viewport.removeEventListener('pointerdown', onPointerDown); viewport.removeEventListener('pointermove', onPointerMove); viewport.removeEventListener('pointerup', finishInteraction); viewport.removeEventListener('pointercancel', finishInteraction); viewport.removeEventListener('lostpointercapture', onLostPointerCapture); viewport.removeEventListener('click', onClickCapture, true); viewport.removeEventListener('dragstart', preventNativeDrag)
    }
  }, [])

  return <div className="secondary-project-carousel" data-reveal ref={viewportRef} aria-label="Secondary projects carousel"><div className="secondary-project-carousel-track" ref={trackRef}>{[...secondaryProjects, ...secondaryProjects].map((project, index) => {
    const isClone = index >= secondaryProjects.length
    const originalIndex = index % secondaryProjects.length
    return <article className={`project-card project-card-secondary${isClone ? ' project-card-secondary-clone' : ''}`} key={`${project.title}-${isClone ? 'clone' : 'original'}`} aria-hidden={isClone ? 'true' : undefined} data-reveal={isClone ? undefined : ''} style={isClone ? undefined : { '--reveal-delay': `${0.08 + 0.06 * originalIndex}s` }}><div className="project-title-row"><ProjectLogo logo={project.logo} logoAlt={project.logoAlt} placeholder={project.placeholder} /><div className="project-card-header"><h3>{project.title}</h3><p>{project.description}</p></div></div><div className="project-card-block"><span className="detail-label">Context</span><p className="project-context">{project.context}</p></div><div className="project-card-block"><span className="detail-label">Tech Stack</span><div className="tag-row">{project.stack.map((item) => <span className="tag-pill" key={item}>{item}</span>)}</div></div><div className="project-links">{project.links.map((link) => <a key={link.label} className="text-link" href={link.href} target="_blank" rel="noreferrer" tabIndex={isClone ? -1 : undefined}>{link.label}</a>)}</div></article>
  })}</div></div>
}

function ProjectsSection() {
  const playLink = featuredProject.links.find((link) =>
    link.href && !link.href.startsWith('TODO_')
  )

  return (
    <section className="content-section" id="projects">
      <SectionHeader
        title="Projects"
        description=""
      />

      <article className="featured-project-card" data-reveal>
        <div className="featured-project-layout">
          <div className="featured-project-visual">
            <div className="featured-project-thumbnail">
              <img src={featuredProject.thumbnail} alt={featuredProject.thumbnailAlt} />
            </div>
            <div className="featured-project-intro">
              <p className="detail-label">Featured Project</p>
              <h3>{featuredProject.title}</h3>
              <p className="featured-project-description">{featuredProject.description}</p>
            </div>
            <div className="tag-row">
              {featuredProject.stack.map((item) => (
                <span className="tag-pill" key={item}>{item}</span>
              ))}
            </div>
            <div className="featured-project-actions">
              {playLink ? (
                <a className="text-link featured-project-play-link" href={playLink.href} target="_blank" rel="noreferrer" aria-label={`Play ${featuredProject.title} on Roblox`}>
                  <span>{playLink.label}</span>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6 14 14 6m-5 0h5v5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <span className="featured-project-coming-soon">Coming Soon</span>
              )}
            </div>
          </div>
          <div className="featured-project-details">
            <div className="featured-project-detail-block">
              <p className="detail-label">Gameplay</p>
              <div className="featured-project-gameplay">
                {featuredProject.summary.map((item) => <p key={item}>{item}</p>)}
              </div>
            </div>
            <div className="featured-project-detail-block">
              <p className="detail-label">What I Built</p>
              <ul className="project-highlights">
                {featuredProject.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </article>

      <SecondaryProjectCarousel />
      <div className="projects-footer" data-reveal style={{ '--reveal-delay': '0.12s' }}>
        <a
          className="projects-github-button"
          href="https://github.com/Mgomez1023"
          target="_blank"
          rel="noreferrer"
        >
          <span>More on my GitHub</span>
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

function ClientWorkSection() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [layout, setLayout] = useState({ visibleCount: 3, slideStep: 0 })

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    const updateLayout = () => {
      const visibleCount = window.matchMedia('(max-width: 720px)').matches
        ? 1
        : window.matchMedia('(max-width: 960px)').matches
          ? 2
          : 3
      const firstCard = track.querySelector('.client-project-card')
      const cardGap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
      const slideStep = firstCard ? firstCard.getBoundingClientRect().width + cardGap : 0
      setLayout({ visibleCount, slideStep })
    }

    const resizeObserver = new ResizeObserver(updateLayout)
    resizeObserver.observe(viewport)
    updateLayout()
    return () => resizeObserver.disconnect()
  }, [])

  const maxIndex = Math.max(0, clientProjects.length - layout.visibleCount)

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, maxIndex))
  }, [maxIndex])

  const canGoPrevious = activeIndex > 0
  const canGoNext = activeIndex < maxIndex

  return (
    <section className="content-section client-work-section" id="client-work">
      <SectionHeader
        title="Client Work"
        description="I’ve sought opportunities to build for real organizations with real users. These projects required me to translate business needs, operational challenges, and brand identities into practical digital products."
      />

      <div className="client-carousel" data-reveal>
        <div className="client-carousel-viewport" ref={viewportRef}>
          <div
            className="client-carousel-track"
            ref={trackRef}
            style={{ transform: `translate3d(-${activeIndex * layout.slideStep}px, 0, 0)` }}
          >
            {clientProjects.map((project) => (
              <article className="client-project-card" key={project.id}>
                <div className="client-project-screenshot">
                  <img src={project.screenshot} alt={project.screenshotAlt} />
                </div>

                <div className="client-project-content">
                  <div className="client-project-summary">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="tag-row">
                    {project.stack.map((item) => <span className="tag-pill" key={item}>{item}</span>)}
                  </div>
                  <div className="client-project-link">
                    {project.liveUrl ? (
                      <a className="text-link client-project-visit" href={project.liveUrl} target="_blank" rel="noreferrer">
                        <span>Visit Website</span>
                        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 14 14 6m-5 0h5v5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {canGoPrevious || canGoNext ? (
          <div className="client-carousel-controls" aria-label="Client project carousel controls">
            <button type="button" className="client-carousel-button" onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} disabled={!canGoPrevious} aria-label="Previous client project">
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m11.5 5-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="client-carousel-button" onClick={() => setActiveIndex((index) => Math.min(maxIndex, index + 1))} disabled={!canGoNext} aria-label="Next client project">
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8.5 5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        ) : null}
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
                  <p className="detail-label">Status</p>
                  <p>{entry.status}</p>
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
        description="I am looking for software engineering and baseball-systems internships where I can contribute to real product work."
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
      <ExperienceSection />
      <ProjectsSection />
      <ClientWorkSection />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
