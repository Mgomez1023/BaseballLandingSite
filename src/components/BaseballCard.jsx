import { useId, useState } from 'react'

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

function CardArt({ project }) {
  if (project.image) {
    return (
      <div className={`bb-card-art bb-card-art-${project.imageFit}`}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" draggable="false" />
      </div>
    )
  }

  // No screenshot or logo yet: initials in a pitcher's-circle badge.
  return (
    <div className="bb-card-art bb-card-art-initials" aria-hidden="true">
      <span className="bb-card-initials">{project.initials}</span>
    </div>
  )
}

/**
 * A project as a baseball card. The front stands alone (art, kind, name,
 * tagline, year); the back is the stat line. A real <button> with
 * aria-pressed flips it; clicking anywhere else on the card (except a link)
 * does the same for pointer users.
 */
export function BaseballCard({ project, isClone = false }) {
  const [flipped, setFlipped] = useState(false)
  const backId = useId()
  const toggle = () => setFlipped((value) => !value)
  const focusable = isClone ? -1 : undefined

  const handleCardClick = (event) => {
    if (event.target.closest('a, button')) return
    toggle()
  }

  return (
    <article className={`bb-card${flipped ? ' is-flipped' : ''}`} onClick={handleCardClick}>
      {/* First in DOM order so Tab goes toggle -> stat line links. */}
      <button
        type="button"
        className="bb-card-flip"
        aria-pressed={flipped}
        aria-controls={backId}
        aria-label={`Stat line for ${project.name}`}
        tabIndex={focusable}
        onClick={toggle}
      >
        <FlipIcon />
        <span>Stats</span>
      </button>
      <div className="bb-card-inner">
        <div className="bb-card-face bb-card-front" inert={flipped}>
          <CardArt project={project} />
          <div className="bb-card-body">
            <p className="bb-card-kind">{project.kind}</p>
            <h3 className="bb-card-name">{project.name}</h3>
            <p className="bb-card-tagline">{project.tagline}</p>
          </div>
          <div className="bb-card-foot">
            {project.year ? <span className="bb-card-year">{project.year}</span> : null}
          </div>
        </div>

        <div className="bb-card-face bb-card-back" id={backId} inert={!flipped}>
          <p className="bb-card-kind">Stat line</p>
          <h3 className="bb-card-name bb-card-name-back">{project.name}</h3>
          <dl className="bb-stats">
            <div className="bb-stat">
              <dt>Stack</dt>
              <dd>{project.stack.join(' · ')}</dd>
            </div>
            <div className="bb-stat">
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div className="bb-stat">
              <dt>Result</dt>
              <dd>{project.result}</dd>
            </div>
            <div className="bb-stat">
              <dt>Link</dt>
              <dd className="bb-stat-links">
                {project.links.length
                  ? project.links.map((link) => (
                      <a
                        key={link.label}
                        className="text-link"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={focusable}
                      >
                        {link.label}
                      </a>
                    ))
                  : project.linkNote}
              </dd>
            </div>
          </dl>
        </div>
      </div>

    </article>
  )
}
