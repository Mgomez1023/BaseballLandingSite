const aboutAreas = [
  {
    title: 'Current Focus',
    description:
      'Pursuing a B.S. in Computer Science at the University of Illinois Chicago while building full-stack applications centered on analytics, applied AI, and practical product development.',
  },
  {
    title: 'Technologies',
    description:
      'JavaScript, TypeScript, Python, SQL, C/C++, Java, React, FastAPI, Node.js, WordPress, Git, Linux, Vercel, and modern frontend tooling.',
  },
  {
    title: 'Interests',
    description:
      'Data-driven products, sports analytics, transparent AI workflows, polished interfaces, and software engineering internships where strong implementation and product thinking both matter.',
  },
]

const projectCards = [
  {
    title: 'NL→SQL Explorer',
    description:
      'A full-stack analytics application that converts natural-language questions into validated SQL queries over uploaded datasets.',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQL', 'OpenAI API', 'Vercel'],
    highlights: [
      'Built a CSV ingestion flow so users can upload, parse, and query their own tabular data.',
      'Integrated GPT-based query generation with SQL validation, execution, and error-safe fallback handling.',
      'Designed the interface to expose schema, generated SQL, and results for a more transparent analytics workflow.',
    ],
    links: [
      { label: 'Demo', href: 'https://nl2sql-frontend-jet.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/NL2SQL' },
    ],
  },
  {
    title: 'PitchSearch',
    description:
      'A pitch-level MLB analytics tool built to explore pitch tendencies, filtering workflows, and performance insights across large datasets.',
    stack: ['React', 'TypeScript', 'FastAPI', 'SQLite', 'Docker', 'Vercel'],
    highlights: [
      'Created for a second-round Washington Nationals interview with a focus on usable baseball analytics.',
      'Implemented multi-parameter search, sortable results, and detailed pitch views for exploratory analysis.',
      'Containerized the backend with Docker to keep development and deployment workflows consistent.',
    ],
    links: [
      { label: 'Demo', href: 'https://pitch-search.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/PitchSearch' },
    ],
  },
  {
    title: 'EatThis - Food Picker',
    description:
      'A restaurant discovery app that helps users make faster dining decisions with local search and cleaner place detail views.',
    stack: ['React', 'Vite', 'Google Places API', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Uses Google Places data to surface nearby restaurant options in a simple, guided flow.',
      'Built polished detail views for hours, address, reviews, and other decision-making context.',
      'Focused on a user-friendly frontend experience that keeps the path from search to choice lightweight.',
    ],
    links: [
      { label: 'Demo', href: 'https://eat-this-app-mgomez1023s-projects.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/Mgomez1023/EatThis-App' },
    ],
  },
  {
    title: 'Loaner Vehicle Management System',
    description:
      'A workflow system for a local auto shop that digitized loaner vehicle checkout and return for both customers and staff.',
    stack: ['WordPress', 'Elementor Pro', 'jQuery', 'Google Apps Script', 'Google Sheets'],
    highlights: [
      'Built QR-accessible forms for vehicle checkout and return with required signature capture.',
      'Automated PDF contract generation and email confirmation after form completion.',
      'Improved record logging and workflow reliability during a software developer internship at Chicago Tire and Auto.',
    ],
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
    expectedGraduation: 'Completed',
  },
]

const coursework = [
  'Data Structures and Algorithms',
  'Database Systems',
  'Operating Systems',
  'Software Engineering',
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

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  )
}

function AboutSection() {
  return (
    <section className="content-section" id="about">
      <SectionHeader
        eyebrow="About"
        title="Computer science student building practical full-stack software."
        description=""
      />

      <div className="about-layout">
        <p className="about-intro">
          I am a software engineer and computer science student at the University of Illinois
          Chicago with experience building full-stack applications, analytics tools, and
          user-facing web products. My recent work spans React, TypeScript, FastAPI, SQL, and
          WordPress, with an emphasis on shipping software that is technically sound, clear to
          users, and useful in real workflows.
        </p>

        <div className="info-grid">
          {aboutAreas.map((area) => (
            <article className="info-card" key={area.title}>
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
        eyebrow="Projects"
        title="Personal Projects"
        description=""
      />

      <div className="project-grid">
        {projectCards.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-card-header">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
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

            <div className="project-card-block">
              <span className="detail-label">Key Highlights</span>
              <ul className="project-highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            {project.links?.length ? (
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
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section className="content-section" id="education">
      <SectionHeader
        eyebrow="Education"
        title="Academic background and core coursework."
        description=""
      />

      <div className="education-grid">
        {educationEntries.map((entry) => (
          <article className="education-card" key={entry.school}>
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

      <article className="education-card education-coursework-card">
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
        eyebrow="Contact"
        title="Open to internships and software engineering opportunities."
        description=""
      />

      <div className="contact-layout">
        <div className="contact-copy">
          <p>
            I am currently seeking software engineering internships and early-career opportunities
            where I can contribute across frontend and full-stack product development.
          </p>
        </div>

        <div className="contact-card">
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
  return (
    <main className="content-stack">
      <AboutSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
