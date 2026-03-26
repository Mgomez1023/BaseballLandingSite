import { useEffect } from 'react'
import './App.css'
import { HeroSection } from './components/HeroSection.jsx'

const placeholderSections = [
  {
    id: 'about',
    title: 'About',
    description: 'Placeholder section for a concise introduction, experience summary, and technical point of view.',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Placeholder section for selected work, case studies, and engineering outcomes.',
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Placeholder section for formal education, certifications, and continuous learning.',
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Placeholder section for email, social links, and a direct way to start a conversation.',
  },
]

export default function App() {
  useEffect(() => {
    const { history } = window
    const previousScrollRestoration = history.scrollRestoration

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    if (window.location.hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [])

  return (
    <div className="portfolio-shell">
      <HeroSection />

      <main className="placeholder-stack">
        {placeholderSections.map((section) => (
          <section className="placeholder-section" id={section.id} key={section.id}>
            <div className="placeholder-content">
              <p className="section-kicker">Base Destination</p>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
