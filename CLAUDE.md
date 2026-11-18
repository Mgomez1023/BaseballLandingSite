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
- **The scrolling project cards** are intentional (a rolling view of all projects), not a bug.
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
- Projects: lineup card for experience, baseball cards for projects, flip on click/tap and keyboard
  (real <button>, aria-pressed), pure CSS 3D, prefers-reduced-motion falls back to a crossfade.
  The front must stand alone without the flip.

## Concept: lineup card + baseball cards

- Keep the chalk-line diamond reveal and diamond navigation as the entry point.
- Experience is shown as a **lineup card** (batting order, numbered 1 to 3).
- Each project and role is a **baseball card**: the front shows logo/screenshot, name, one-line tagline, and year;
  the back shows a **stat line** (Stack, Role, Result, Link) using only facts from the resume section above.
- Cards flip on click/tap and via keyboard (use a real <button>, aria-pressed). Pure CSS 3D transform with
  backface-visibility; no animation library unless asked. With prefers-reduced-motion, crossfade instead of rotating.
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
- Pitch Whiff Model (Nov. 2026): ML pipeline on a full season of MLB Statcast data testing whether pitch sequencing improves whiff prediction (0.768 ROC AUC on a time-based holdout); FastAPI, Docker, GitHub Actions CI, deployed on AWS (ECR, ECS Fargate). Repo: https://github.com/Mgomez1023/pitch-sequencing-model
- Benito Juarez Men's League Platform (Feb. 2026 to present): React, TypeScript, FastAPI, PostgreSQL, Vercel. 10-team, 150+ player amateur baseball league site with schedules, standings, rosters, JWT auth, CSV game import, English/Spanish support.
- Destiny Copilot (Sep. 2026 to present): AI companion for Destiny 2 with Bungie OAuth, tool-calling FastAPI backend, GitHub Actions CI. Repo: https://github.com/Mgomez1023/DestinyCopilot
- Sell Plushies (Oct. 2026 to present): Roblox idle-collector game, server-authoritative economy, Luau.
- Older projects already on the site (Build a Wall!, PitchSearch, Loaner Vehicle Management System, Cookie Clicker in C++, Wall Building Simulator) may stay, but below the newer ones.

**Contact:** mgome20@uic.edu, linkedin.com/in/martin-gomez-, github.com/Mgomez1023. Do not add a phone number to the site unless it is already there.

## First tasks (in this order)

1. Fix factual mismatches: the Benito Juarez role currently shows "Feb 2026 - May 2026" (should be Feb. 2026 to present); the internship title should be "Software Developer Intern".
2. Fix typos ("SFML Grpahics", "recieve") and proofread all copy.
3. Add Pitch Whiff Model, Destiny Copilot, Sell Plushies, and the Benito Juarez platform to Projects.
4. Replace `public/MartinGomez_Resume.pdf` with the newest resume PDF (Martin will supply it).
5. Move all colors to the CSS variables above and apply the Hat (cream and navy) palette.
6. Then layout, typography, and polish passes.
