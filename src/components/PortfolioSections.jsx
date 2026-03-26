const aboutAreas = [
  {
    title: 'Current Focus',
    description:
      'Building reliable full-stack applications, sharpening product thinking, and creating software that balances performance, usability, and maintainability.',
  },
  {
    title: 'Technologies',
    description:
      'React, TypeScript, C++, Node.js, Express, PostgreSQL, REST APIs',
  },
  {
    title: 'Interests',
    description:
      'Distributed systems, thoughtful interface design, developer experience, backend architecture, and software engineering internships with strong mentorship.',
  },
]

const projectCards = [
  {
    title: 'Project Alpha',
    description:
      'A concise placeholder for a flagship project. Replace this with the product problem, the user value, and the engineering scope.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Outline the main feature or workflow delivered.',
      'Call out a measurable result, optimization, or technical decision.',
      'Mention collaboration, deployment, or architecture impact.',
    ],
    links: [
      { label: 'Demo', href: 'https://your-demo-url.com' },
      { label: 'GitHub', href: 'https://github.com/your-username/project-alpha' },
    ],
  },
  {
    title: 'Project Beta',
    description:
      'Use this card for a second strong example with a different technical profile, such as a data-driven app, internal tool, or API-focused build.',
    stack: ['TypeScript', 'Express', 'MongoDB'],
    highlights: [
      'Describe the business or user-facing objective.',
      'Highlight a key implementation detail worth discussing.',
      'Note testing, scalability, or developer workflow improvements.',
    ],
    links: [
      { label: 'Demo', href: 'https://your-demo-url.com/project-beta' },
      { label: 'GitHub', href: 'https://github.com/your-username/project-beta' },
    ],
  },
  {
    title: 'Project Gamma',
    description:
      'Reserve this space for a project that shows range: performance work, automation, design systems, or an end-to-end application.',
    stack: ['Next.js', 'Supabase', 'Tailwind CSS'],
    highlights: [
      'Summarize the technical challenge addressed.',
      'Point to an important design or architectural choice.',
      'Mention production readiness, CI/CD, or reliability considerations.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/your-username/project-gamma' }],
  },
]

const coursework = [
  'Data Structures and Algorithms',
  'Database Systems',
  'Operating Systems',
  'Software Engineering',
]

const contactLinks = [
  { label: 'Email', value: 'your.email@example.com', href: 'mailto:your.email@example.com' },
  { label: 'GitHub', value: 'github.com/your-username', href: 'https://github.com/your-username' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/your-profile',
    href: 'https://www.linkedin.com/in/your-profile',
  },
  { label: 'Resume', value: 'Resume PDF placeholder', href: '/resume.pdf' },
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
        title="Thoughtful software engineering with a product-first mindset."
        description="Use this section to introduce your background, what you are working toward, and the kind of engineering problems you want to solve."
      />

      <div className="about-layout">
        <p className="about-intro">
          I am a software engineer focused on building polished, dependable applications with
          clean implementation details and clear user value. I enjoy leveraging AI and traditional programming approaches to ship thoughtful-reliable work.
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
        title="Featured work presented with clarity."
        description="Each card is structured so you can quickly replace placeholders with real project outcomes, technical depth, and links."
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
        title="Academic foundation and relevant coursework."
        description="Keep this section direct and factual so the most important academic details are easy to scan."
      />

      <article className="education-card">
        <div className="education-overview">
          <div>
            <p className="detail-label">School</p>
            <h3>University Name Placeholder</h3>
          </div>

          <div className="education-meta">
            <div>
              <p className="detail-label">Degree</p>
              <p>B.S. in Computer Science Placeholder</p>
            </div>

            <div>
              <p className="detail-label">Expected Graduation</p>
              <p>Month 20XX</p>
            </div>
          </div>
        </div>

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
        description="Use these placeholders for the best ways to reach you and the materials you want recruiters or collaborators to review."
      />

      <div className="contact-layout">
        <div className="contact-copy">
          <p>
            I am currently open to software engineering internships, collaborative projects, and
            early-career opportunities where I can contribute across product development and
            implementation.
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
