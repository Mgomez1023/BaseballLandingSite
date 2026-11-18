import { useEffect, useRef, useState } from 'react'
import proPic from '../ProjectLogos/ProPic.jpeg'
import { BaseballCard } from './BaseballCard.jsx'
import {
  clientProjects,
  contactLinks,
  coursework,
  educationEntries,
  experienceEntries,
  projects,
} from '../content.js'

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

const IDLE_INTERACTION = { pointerId: null, startX: 0, startY: 0, lastX: 0, dragging: false, locked: false }

// The rolling view of all projects. It drifts on its own, can be dragged,
// and pauses while hovered, focused, or while any card shows its stat line.
function ProjectCarousel() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const frameRef = useRef(null)
  const lastTimeRef = useRef(null)
  const reducedMotionRef = useRef(false)
  const pauseRef = useRef({ hover: false, focus: false })
  const interactionRef = useRef({ ...IDLE_INTERACTION })
  const suppressClickRef = useRef(false)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    const normalize = (offset) => {
      const width = loopWidthRef.current
      if (!width) return offset
      const remainder = offset % width
      return remainder > 0 ? remainder - width : remainder
    }
    const render = () => {
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }
    const measure = () => {
      const first = track.querySelector('.carousel-slot')
      const clone = track.querySelector('.carousel-slot-clone')
      if (!first || !clone) return
      loopWidthRef.current = clone.offsetLeft - first.offsetLeft
      offsetRef.current = normalize(offsetRef.current)
      render()
    }
    const isPaused = () =>
      reducedMotionRef.current ||
      interactionRef.current.pointerId !== null ||
      pauseRef.current.hover ||
      pauseRef.current.focus ||
      track.querySelector('.bb-card.is-flipped') !== null

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches
      lastTimeRef.current = null
    }
    const animate = (time) => {
      if (!isPaused() && loopWidthRef.current) {
        if (lastTimeRef.current !== null) {
          const elapsed = Math.min(time - lastTimeRef.current, 100)
          offsetRef.current = normalize(offsetRef.current - (loopWidthRef.current * elapsed) / 64000)
          render()
        }
        lastTimeRef.current = time
      } else {
        lastTimeRef.current = null
      }
      frameRef.current = requestAnimationFrame(animate)
    }

    const finishInteraction = (event) => {
      const interaction = interactionRef.current
      if (interaction.pointerId === null) return
      if (event && event.pointerId !== interaction.pointerId) return

      const { pointerId, dragging: wasDragging } = interaction
      // Clear state before releasing capture: release can emit another lostpointercapture.
      interactionRef.current = { ...IDLE_INTERACTION }
      viewport.classList.remove('is-dragging')
      lastTimeRef.current = null

      if (wasDragging && event?.type === 'pointerup') suppressClickRef.current = true
      if (event?.type !== 'lostpointercapture' && viewport.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId)
      }
    }
    const onPointerDown = (event) => {
      if (!event.isPrimary) return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      interactionRef.current = {
        ...IDLE_INTERACTION,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
      }
    }
    const onPointerMove = (event) => {
      const interaction = interactionRef.current
      if (event.pointerId !== interaction.pointerId) return

      const deltaX = event.clientX - interaction.startX
      const deltaY = event.clientY - interaction.startY

      if (!interaction.locked) {
        const directionBias = 1.15
        // Ignore finger jitter until the gesture is intentional.
        if (Math.hypot(deltaX, deltaY) < 10) return
        // Clearly vertical: let the page scroll.
        if (Math.abs(deltaY) > Math.abs(deltaX) * directionBias) {
          interaction.pointerId = null
          lastTimeRef.current = null
          return
        }
        // Still ambiguous: wait for the next move.
        if (Math.abs(deltaX) <= Math.abs(deltaY) * directionBias) return

        interaction.locked = true
        interaction.dragging = true
        viewport.setPointerCapture(event.pointerId)
        viewport.classList.add('is-dragging')
      }

      if (event.cancelable) event.preventDefault()
      offsetRef.current = normalize(offsetRef.current + event.clientX - interaction.lastX)
      interaction.lastX = event.clientX
      render()
    }
    const onLostPointerCapture = (event) => {
      // Ignore bubbled capture-loss events from cards and links.
      if (event.target !== viewport) return
      finishInteraction(event)
    }
    const onClickCapture = (event) => {
      if (!suppressClickRef.current) return
      event.preventDefault()
      event.stopPropagation()
      suppressClickRef.current = false
    }
    const preventNativeDrag = (event) => event.preventDefault()

    const onPointerEnter = (event) => {
      if (event.pointerType === 'mouse') pauseRef.current.hover = true
    }
    const onPointerLeave = () => {
      pauseRef.current.hover = false
    }

    // Keyboard users: bring the focused card fully into view.
    const revealFocusedSlot = (slot) => {
      viewport.scrollLeft = 0
      const viewportWidth = viewport.clientWidth
      const left = slot.offsetLeft + offsetRef.current
      if (left >= 0 && left + slot.offsetWidth <= viewportWidth) return
      const centered = -slot.offsetLeft + (viewportWidth - slot.offsetWidth) / 2
      const minimum = -(track.scrollWidth - viewportWidth)
      offsetRef.current = Math.min(0, Math.max(minimum, centered))
      render()
    }
    const onFocusIn = (event) => {
      pauseRef.current.focus = true
      const slot = event.target.closest('.carousel-slot')
      if (!slot) return
      revealFocusedSlot(slot)
      requestAnimationFrame(() => revealFocusedSlot(slot))
    }
    const onFocusOut = (event) => {
      if (!viewport.contains(event.relatedTarget)) pauseRef.current.focus = false
    }

    const listeners = [
      ['pointerdown', onPointerDown],
      ['pointermove', onPointerMove],
      ['pointerup', finishInteraction],
      ['pointercancel', finishInteraction],
      ['lostpointercapture', onLostPointerCapture],
      ['dragstart', preventNativeDrag],
      ['pointerenter', onPointerEnter],
      ['pointerleave', onPointerLeave],
      ['focusin', onFocusIn],
      ['focusout', onFocusOut],
    ]
    listeners.forEach(([type, handler]) => viewport.addEventListener(type, handler))
    viewport.addEventListener('click', onClickCapture, true)
    motionQuery.addEventListener('change', updateMotionPreference)

    updateMotionPreference()
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      resizeObserver.disconnect()
      motionQuery.removeEventListener('change', updateMotionPreference)
      listeners.forEach(([type, handler]) => viewport.removeEventListener(type, handler))
      viewport.removeEventListener('click', onClickCapture, true)
    }
  }, [])

  return (
    <div
      className="project-carousel"
      data-reveal
      ref={viewportRef}
      role="region"
      aria-label="Projects, newest first"
    >
      <div className="project-carousel-track" ref={trackRef}>
        {[...projects, ...projects].map((project, index) => {
          const isClone = index >= projects.length
          return (
            <div
              className={`carousel-slot${isClone ? ' carousel-slot-clone' : ''}`}
              key={`${project.id}-${isClone ? 'clone' : 'original'}`}
              aria-hidden={isClone ? 'true' : undefined}
            >
              <BaseballCard project={project} isClone={isClone} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section className="content-section" id="projects">
      <SectionHeader
        title="Projects"
        description="Newest first. Click or tap a card, or press its Stats button, to flip it over for the stat line."
      />

      <ProjectCarousel />

      <div className="projects-footer" data-reveal style={{ '--reveal-delay': '0.12s' }}>
        <a
          className="button-solid"
          href="https://github.com/Mgomez1023"
          target="_blank"
          rel="noreferrer"
        >
          <span>More on my GitHub</span>
          <svg className="button-icon" viewBox="0 0 20 20" aria-hidden="true">
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
              <article className="client-project-card stitched" key={project.id}>
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
            className="education-card stitched"
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

      <article className="education-card education-coursework-card stitched" data-reveal>
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

        <div className="contact-card stitched" data-reveal style={{ '--reveal-delay': '0.06s' }}>
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
