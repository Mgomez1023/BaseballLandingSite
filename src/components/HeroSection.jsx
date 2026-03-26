import { BaseballField } from './BaseballField.jsx'

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-center">
        <BaseballField />
        <p className="hero-instruction">Select a base or scroll to explore</p>
      </div>
    </section>
  )
}
