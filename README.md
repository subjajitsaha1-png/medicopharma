# Pharmacology High-Yield

A colorful, exam-focused medical pharmacology study app for Indian MBBS students — fact sheets, spaced-repetition flashcards, NEET PG-style MCQ practice, animated mechanism diagrams, and a searchable drug quick-reference.

Built with Vite + React + TypeScript + Tailwind CSS v4 — the same stack as the companion Physiology High-Yield app, so it can be built, deployed, and extended the same way.

## What's inside

- **11 units** matching a typical NMC MBBS pharmacology syllabus (General Pharmacology, Autonomic, Cardiovascular, CNS, Analgesics/NSAIDs, Antimicrobial, Antiviral/Antifungal/Antiparasitic, Endocrine, GI/Respiratory, Chemotherapy, Toxicology)
- **High-yield facts** with a clinical pearl per unit
- **NEET PG-style MCQs** with instant feedback and explanations
- **11 original animated SVG diagrams** — dose-response curves, first-order elimination/half-life, CYP450 induction vs inhibition, autonomic receptor map, RAAS pathway, antiarrhythmic classes on the action potential, coagulation cascade, opioid mechanism/analgesic ladder, antibiotic mechanism sites, insulin signaling/antidiabetic targets, cell cycle/chemotherapy targets
- **Drug Quick Reference** — searchable by drug name, mechanism, or keyword, tap-to-expand
- Landing page, spaced-repetition scheduling (stored in the browser), no external backend required

## Modern features added beyond the original template

- **Dark mode** — toggle in the header/landing page, respects system preference on first load, persisted in `localStorage`
- **Offline-capable PWA** — a minimal service worker (`public/sw.js`) caches the app shell so it keeps working with patchy or no connectivity; installable via `public/manifest.webmanifest`
- **Bookmarked facts** — star any fact sheet entry and review just your starred items from a dedicated view
- **Progress export/import** — download your spaced-repetition progress as JSON and re-import it (e.g. on a new device), since progress otherwise lives only in the browser

## Deploying to Lovable

**Option A — Import from GitHub (recommended):**
1. Push this folder to a new GitHub repository (`git init && git add -A && git commit -m "Initial commit"` then push to a new repo).
2. In Lovable, choose "Import from GitHub" and select the repo.

**Option B — Upload directly:**
1. Unzip this project.
2. In Lovable, start a new project and use its file upload / "Edit code" import option to bring in the `src/`, `public/`, and config files.

## Running locally

```bash
npm install
npm run dev       # starts a local dev server
npm run build     # production build to dist/
```

## Extending it

To keep expanding it:
- Add more facts to `src/data/facts.ts` (same shape: `{ id, topicId, fact, question, answer }`)
- Add more MCQs to `src/data/mcqs.ts`
- Add more drug entries to `src/data/drug-reference.ts`
- Add more animated diagrams to `src/components/pathway-diagrams.tsx` and register them in the `DIAGRAMS` array in `src/App.tsx`

## Content notes

High-yield facts, clinical pearls, and MCQs are original summaries written from general pharmacology knowledge for exam revision — not copied from any specific textbook or coaching institute's material. Always cross-check against your own course material, textbook, and current prescribing references (drug information changes over time).
