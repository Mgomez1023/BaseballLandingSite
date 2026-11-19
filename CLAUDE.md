# CLAUDE.md: Martin Gomez portfolio (martingomez.dev)

Personal portfolio for Martin Gomez, a UIC computer science student applying for software and baseball-systems internships. Recruiters land here from his resume, so it has to be accurate, fast, and polished.

## Stack and commands

- Vite + React 19, plain CSS (`src/index.css`, `src/App.css`). No UI framework, no TypeScript.
- Components: `src/components/BaseballField.jsx` (the diamond navigation), `HeroSection.jsx`, `PortfolioSections.jsx`.
- Images: `src/HomePages/` (site screenshots), `src/ProjectLogos/`. Public files: `public/` (logo, resume PDF).
- `npm install`, then `npm run dev` (local), `npm run build` (must pass before every commit), `npm run preview`.

## Git rules

- Work only on the `redesign` branch. Never commit to or push `main`; `main` is the live site.
- Commit small and often, one idea per commit, with a clear message.
- Do not add dependencies without asking first.

## What must NOT change

- **The baseball-diamond navigation** (home plate = Contact, bases = Projects / Education / Experience). It is the signature of the site. Restyle it, never remove or replace it.
- Do not invent facts, numbers, titles, or dates. The resume facts below are the source of truth.

## Design direction: "The Hat" (cream and navy)
- Page is cream all the way down. No dark sections, no dark mode, no gradients, no glows, no box-shadows.
- Tokens (the only colors allowed, defined once in :root in index.css):
  --cream: #F2ECDC; --cream-deep: #E9E1CC (cards); --navy: #17233F;
  --navy-soft: #2A3A5F; --muted: #5B6479 (subtext); --base: #FFFFFF (bases)
- Text is navy. Subtext is --muted. Cards are --cream-deep with a thin dashed navy "stitch" border.
- Hero: keep the diamond nav and chalk-line draw-in. The field is a NAVY OUTLINE on cream
  (diamond 3.5px, outfield arc and foul lines same navy at ~55% opacity), white bases with navy
  borders, pitcher's circle in navy, base labels in navy.
- Do not copy the reference hat's logo. Use my own monogram/LogoTransparent.png.
- Projects: lineup card for experience; projects are baseball cards in a **fanned card spread**
  (replaces the old scrolling carousel, see Concept). Flip on click/tap and keyboard (real <button>
  labeled by action), pure CSS 3D, prefers-reduced-motion falls back to a crossfade.
  The front must stand alone without the flip.

## Concept: lineup card + baseball cards

- Keep the chalk-line diamond reveal and diamond navigation as the entry point.
- Experience is shown as a **lineup card** (batting order, numbered 1 to 3).
- Projects are a **fanned card spread** of baseball cards, strongest first (the order in the Projects list
  below), Pitch Whiff Model leading. The scrolling carousel is retired.
  - Only five cards are fanned: Pitch Whiff Model, Benito Juarez, Destiny Copilot, Sell Plushies, Loaner
    Vehicle Management System. Everything else (Build a Wall!, PitchSearch, Cookie Clicker, Wall Building
    Simulator) sits in a **"Minor leagues"** row below the fan.
  - Fan poses are subtle: ±1–2° rotation and small vertical offsets. The fan reads as a pile: Pitch Whiff
    fully face-up (~300px wide, normal art window, description below); each later card shows a ~180px strip
    tucked behind the previous one. Overlay scrim is navy at ~50%.
  - Strips show a short name; the overlay shows the full name.
  - Years: only the dates listed in this file. Leave a year off rather than guess.
  - Desktop: horizontal fan. Each covered card shows a **peek strip** (project name, year, small mark).
    Rotation and offset are fixed per card via `:nth-child`, never random. Hover/focus on a card moves its
    neighbors aside.
  - Mobile (390px): vertical stack with the same peek-strip idea; tap pulls a card out.
  - Click/tap: the card lifts to center in an overlay (focus trapped, Esc closes, focus returns to the card).
    The front shows the graphic/screenshot, year, name, one-liner, and tags; flipping shows the **stat line**
    (Stack, What I built, Result, Link) using only facts from the content section below. Buttons are labeled by link
    type (GitHub, Live site, Play on Roblox, Live demo); no link, no button. A write-up button only if one
    exists. Never link an AWS URL.
  - Flip uses a real <button> whose label states the action ("Stat line" / "Front"; no aria-pressed, since
    the label already carries the state). Pure CSS 3D transform with backface-visibility. With
    prefers-reduced-motion, crossfade instead of rotating, and no lift or fan animation.
  - Accessibility: real buttons, arrow-key navigation across the spread, visible focus.
  - No new dependencies: CSS transforms plus React state only; no animation library unless asked.
- The front must be fully understandable without flipping.
- Remove the diagonal stripe background; use a flat var(--cream) field so the navy lines stand out.

## Working method

1. Make a small change, then look at the result before the next one: take a screenshot at 1440px and 390px if a browser tool is available, review it critically, and fix what is off.
2. Work in passes: (a) color tokens, (b) content, (c) layout and spacing, (d) typography, (e) motion and polish. Do not try to do everything in one shot.
3. Run `npm run build` after each pass.

## Content source of truth (from the current resume)

**Education:** University of Illinois Chicago, B.S. Computer Science (expected May 2028), Aug. 2025 to present. Moraine Valley Community College, Associate in Science, Aug. 2023 to May 2025.

**Experience** (keep titles and dates exactly):
- Freelance Web Developer: Marom Painting; MGM Floors LLC; Network Xperts Group. Apr. 2026 to present.
- Software Developer Intern: Chicago Tire and Auto (Burbank, IL). May 2024 to Aug. 2024.
- Package Handler: UPS, Chicago Area Consolidation Hub (Hodgkins, IL). Aug. 2022 to present.

**Projects** (newest and strongest first):
- Pitch Whiff Model (Nov. 2026): ML pipeline on a full season of MLB Statcast data testing whether pitch sequencing improves whiff prediction (0.768 ROC AUC on a time-based holdout; a pre-registered rule kept the simpler model); FastAPI, Docker, GitHub Actions CI, deployed on AWS (ECR, ECS Fargate). Repo: https://github.com/Mgomez1023/pitch-sequencing-model
- Benito Juarez Men's League Platform (Feb. 2026 to present): React, TypeScript, FastAPI, PostgreSQL, Vercel. 10-team, 150+ player amateur baseball league site with schedules, standings, rosters, JWT auth, CSV game import, English/Spanish support.
- Destiny Copilot (Sep. 2026 to present): AI companion for Destiny 2 with Bungie OAuth, tool-calling FastAPI backend, GitHub Actions CI. Repo: https://github.com/Mgomez1023/DestinyCopilot
- Sell Plushies (Oct. 2026 to present): Roblox idle-collector game, server-authoritative economy, Luau.
- Older projects already on the site (Build a Wall!, PitchSearch, Loaner Vehicle Management System, Cookie Clicker in C++, Wall Building Simulator) may stay, but below the newer ones.
- Pitch Whiff Model builds on PitchSearch; say so on its stat line. Its write-up is the repo README: https://github.com/Mgomez1023/pitch-sequencing-model#readme
- Loaner Vehicle Management System (2024): take tech and details only from this file or what Martin pastes. No demo button, no invented results.

**Contact:** mgome20@uic.edu, linkedin.com/in/martin-gomez-, github.com/Mgomez1023. Do not add a phone number to the site unless it is already there.

## First tasks (in this order)

1. Fix factual mismatches: the Benito Juarez role currently shows "Feb 2026 - May 2026" (should be Feb. 2026 to present); the internship title should be "Software Developer Intern".
2. Fix typos ("SFML Grpahics", "recieve") and proofread all copy.
3. Add Pitch Whiff Model, Destiny Copilot, Sell Plushies, and the Benito Juarez platform to Projects.
4. Replace `public/MartinGomez_Resume.pdf` with the newest resume PDF (Martin will supply it).
5. Move all colors to the CSS variables above and apply the Hat (cream and navy) palette.
6. Then layout, typography, and polish passes.
