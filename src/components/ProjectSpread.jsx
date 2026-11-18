import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { featuredProjects, linkLabels, minorLeagueProjects } from '../content.js'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// One Tab stop per group; arrow keys, Home and End move between cards.
function useRovingFocus(count) {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  const move = (index) => {
    const next = (index + count) % count
    setActive(next)
    refs.current[next]?.focus()
  }

  const onKeyDown = (event, index) => {
    const keys = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: count - 1,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    move(keys[event.key])
  }

  return {
    setActive,
    onKeyDown,
    ref: (index) => (node) => {
      refs.current[index] = node
    },
    tabIndex: (index) => (index === active ? 0 : -1),
  }
}

// Visible strip text is the short name; the accessible name keeps it first (WCAG 2.5.3)
// and adds the full name and year.
function cardLabel(project) {
  const name =
    project.shortName === project.name ? project.name : `${project.shortName} (${project.name})`
  return project.year ? `${name}, ${project.year}` : name
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6 14 14 6m-5 0h5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FlipIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 8.5a6 6 0 0 1 10.6-3.1M16 11.5a6 6 0 0 1-10.6 3.1M14.8 2.5v3h-3M5.2 17.5v-3h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The card's picture: a screenshot or logo when there is one. Without one, the
 * fan shows the one-liner and the overlay shows the initials badge.
 */
function CardGraphic({ project, variant }) {
  if (project.image) {
    return (
      <span className={`card-graphic card-graphic-${project.imageFit}`}>
        <img src={project.image} alt={variant === 'dialog' ? project.imageAlt : ''} draggable="false" />
      </span>
    )
  }

  if (variant === 'fan') {
    return (
      <span className="card-graphic card-graphic-text" aria-hidden="true">
        <span>{project.tagline}</span>
      </span>
    )
  }

  return (
    <span className="card-graphic card-graphic-initials" aria-hidden="true">
      <span>{project.initials}</span>
    </span>
  )
}

function CardMark({ project }) {
  return (
    <span className="card-mark" aria-hidden="true">
      {project.initials}
    </span>
  )
}

function FanSpread({ projects, openId, onOpen }) {
  const [hot, setHot] = useState(null)
  const roving = useRovingFocus(projects.length)

  const position = (index) => {
    if (hot === null) return ''
    if (index < hot) return ' is-before'
    if (index > hot) return ' is-after'
    return ' is-hot'
  }

  return (
    <ul
      className="fan"
      aria-label="Featured projects, strongest first"
      onPointerLeave={() => setHot(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHot(null)
      }}
    >
      {projects.map((project, index) => (
        <li
          className={`fan-slot${position(index)}${openId === project.id ? ' is-out' : ''}`}
          key={project.id}
        >
          <button
            type="button"
            className="fan-card"
            ref={roving.ref(index)}
            tabIndex={roving.tabIndex(index)}
            aria-haspopup="dialog"
            aria-label={cardLabel(project)}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setHot(index)
            }}
            onFocus={() => {
              roving.setActive(index)
              setHot(index)
            }}
            onKeyDown={(event) => roving.onKeyDown(event, index)}
            onClick={(event) => onOpen(project, event.currentTarget)}
          >
            <span className="fan-art">
              <CardGraphic project={project} variant="fan" />
            </span>
            <span className="fan-strip">
              <CardMark project={project} />
              <span className="strip-name">{project.shortName}</span>
              {project.year ? <span className="strip-year">{project.year}</span> : null}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function MinorLeagues({ projects, openId, onOpen }) {
  const roving = useRovingFocus(projects.length)
  const headingId = useId()

  return (
    <div className="minor-leagues">
      <h3 className="minor-title" id={headingId}>
        Minor leagues
      </h3>
      <ul className="minor-row" aria-labelledby={headingId}>
        {projects.map((project, index) => (
          <li className={`minor-slot${openId === project.id ? ' is-out' : ''}`} key={project.id}>
            <button
              type="button"
              className="minor-card"
              ref={roving.ref(index)}
              tabIndex={roving.tabIndex(index)}
              aria-haspopup="dialog"
              aria-label={cardLabel(project)}
              onFocus={() => roving.setActive(index)}
              onKeyDown={(event) => roving.onKeyDown(event, index)}
              onClick={(event) => onOpen(project, event.currentTarget)}
            >
              <CardMark project={project} />
              <span className="strip-name">{project.shortName}</span>
              {project.year ? <span className="strip-year">{project.year}</span> : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatLine({ project }) {
  const links = [
    ...project.links.map((link) => ({ label: linkLabels[link.type], href: link.href })),
    ...(project.writeup ? [{ label: 'Write-up', href: project.writeup }] : []),
  ]
  const rows = [
    project.stack.length ? ['Stack', project.stack.join(', ')] : null,
    project.role ? ['Role', project.role] : null,
    project.result ? ['Result', project.result] : null,
    project.buildsOn ? ['Builds on', project.buildsOn] : null,
  ].filter(Boolean)

  return (
    <dl className="stat-line">
      {rows.map(([term, value]) => (
        <div className="stat-row" key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      <div className="stat-row">
        <dt>Link</dt>
        <dd className="stat-links">
          {links.length
            ? links.map((link) => (
                <a key={link.label} className="text-link" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))
            : 'No public link yet'}
        </dd>
      </div>
    </dl>
  )
}

/** Translate/scale that makes `card` sit exactly over `source`. */
function transformFrom(source, card) {
  const from = source.getBoundingClientRect()
  const to = card.getBoundingClientRect()
  const dx = from.left + from.width / 2 - (to.left + to.width / 2)
  const dy = from.top + from.height / 2 - (to.top + to.height / 2)
  return `translate(${dx}px, ${dy}px) scale(${from.width / to.width})`
}

/**
 * The pulled-out card. A native modal <dialog>: the page behind is inert, Esc
 * closes, and focus goes back to the card it came from. The card lifts from its
 * slot to the center and drops back on close (no motion when reduced).
 */
function ProjectDialog({ opened, onClosed }) {
  const dialogRef = useRef(null)
  const cardRef = useRef(null)
  const closingRef = useRef(false)
  const [flipped, setFlipped] = useState(false)
  const titleId = useId()
  const backId = useId()
  const project = opened?.project

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const card = cardRef.current
    if (!opened || !dialog || !card || dialog.open) return

    closingRef.current = false
    setFlipped(false)
    document.documentElement.classList.add('has-dialog')
    dialog.showModal()

    if (prefersReducedMotion()) return
    card.style.transition = 'none'
    card.style.transform = transformFrom(opened.source, card)
    card.getBoundingClientRect() // commit the start position before animating
    card.style.transition = ''
    card.style.transform = ''
  }, [opened])

  const finishClose = useCallback(() => {
    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()
    document.documentElement.classList.remove('has-dialog')
    onClosed(opened?.source)
  }, [opened, onClosed])

  const requestClose = useCallback(() => {
    const card = cardRef.current
    if (closingRef.current) return
    closingRef.current = true

    if (prefersReducedMotion() || !card || !opened?.source) {
      finishClose()
      return
    }

    dialogRef.current?.classList.add('is-closing')
    card.style.transform = transformFrom(opened.source, card)
    const done = () => {
      card.removeEventListener('transitionend', onEnd)
      clearTimeout(fallback)
      dialogRef.current?.classList.remove('is-closing')
      card.style.transform = ''
      finishClose()
    }
    const onEnd = (event) => {
      if (event.target === card && event.propertyName === 'transform') done()
    }
    const fallback = setTimeout(done, 600)
    card.addEventListener('transitionend', onEnd)
  }, [opened, finishClose])

  // Safety net: never leave the page scroll-locked.
  useEffect(() => () => document.documentElement.classList.remove('has-dialog'), [])

  const toggleFlip = () => setFlipped((value) => !value)

  // Keep Tab and Shift+Tab inside the overlay (native <dialog> would let focus
  // step out to the browser chrome once before wrapping).
  const trapTab = (event) => {
    if (event.key !== 'Tab') return
    const focusables = [...dialogRef.current.querySelectorAll('a[href], button')].filter(
      (node) => !node.closest('[inert]'),
    )
    if (!focusables.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="card-dialog"
      aria-labelledby={titleId}
      onKeyDown={trapTab}
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
    >
      {project ? (
        <div className="card-dialog-stage">
          <div
            ref={cardRef}
            className={`dialog-card${flipped ? ' is-flipped' : ''}`}
            onClick={(event) => {
              if (!event.target.closest('a, button')) toggleFlip()
            }}
          >
            <div className="dialog-card-inner">
              <div className="dialog-face dialog-front" inert={flipped}>
                <CardGraphic project={project} variant="dialog" />
                <div className="dialog-front-body">
                  {project.year ? <p className="dialog-year">{project.year}</p> : null}
                  <h3 className="dialog-name" id={titleId}>
                    {project.name}
                  </h3>
                  <p className="dialog-tagline">{project.tagline}</p>
                  {project.stack.length ? (
                    <ul className="tag-row dialog-tags" aria-label="Tech">
                      {project.stack.map((item) => (
                        <li className="tag-pill" key={item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>

              <div className="dialog-face dialog-back" id={backId} inert={!flipped}>
                <p className="dialog-back-name">{project.name}</p>
                <StatLine project={project} />
              </div>
            </div>
          </div>

          <div className="dialog-actions">
            <button
              type="button"
              className="dialog-button"
              aria-pressed={flipped}
              aria-controls={backId}
              onClick={toggleFlip}
            >
              <FlipIcon />
              Stat line
            </button>
            {project.links.map((link) => (
              <a
                key={link.href}
                className="dialog-button"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {linkLabels[link.type]}
                <ExternalIcon />
              </a>
            ))}
            {project.writeup ? (
              <a className="dialog-button" href={project.writeup} target="_blank" rel="noreferrer">
                Write-up
                <ExternalIcon />
              </a>
            ) : null}
            <button type="button" className="dialog-button dialog-close" onClick={requestClose}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

export function ProjectSpread() {
  const [opened, setOpened] = useState(null)
  const returnFocusRef = useRef(null)
  const openId = opened?.project.id
  const open = useCallback((project, source) => setOpened({ project, source }), [])
  const closed = useCallback((source) => {
    returnFocusRef.current = source
    setOpened(null)
  }, [])

  // Return focus only after the source card is visible again (it is hidden
  // while its copy is out in the overlay, and hidden elements cannot take focus).
  useEffect(() => {
    if (opened || !returnFocusRef.current) return
    returnFocusRef.current.focus({ preventScroll: true })
    returnFocusRef.current = null
  }, [opened])

  return (
    <>
      <FanSpread projects={featuredProjects} openId={openId} onOpen={open} />
      <MinorLeagues projects={minorLeagueProjects} openId={openId} onOpen={open} />
      <ProjectDialog opened={opened} onClosed={closed} />
    </>
  )
}
