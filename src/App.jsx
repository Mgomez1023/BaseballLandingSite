import { useEffect } from 'react'
import './App.css'
import { HeroSection } from './components/HeroSection.jsx'
import { PortfolioSections } from './components/PortfolioSections.jsx'

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
      <PortfolioSections />
    </div>
  )
}
