# Landing Page Optimization — Design Spec

**Date:** 2026-07-08
**Repo:** magnifyimpact-website (GitHub Pages → magnifyimpact.ai)
**Current live state:** Coming Soon placeholder (commit `5e3c5af`). Full page recoverable from `4df14d8`.
**End state:** Optimized full landing page live at magnifyimpact.ai, replacing the placeholder.

---

## Goals (all four, per Philip)

1. AI search visibility (AEO/GEO) — quotable by ChatGPT, Claude, Perplexity, Google AI Overviews
2. Classic SEO — indexable, keyword-sane, share-ready
3. Copy & conversion — finish the annotated DRAFT-REWRITES decisions, tighten CTA
4. Restore the real page as the working base first

Explicitly out of scope: blog/video sections (deferred until articles/videos exist — no
empty shelves at relaunch), paid tooling, redesign of visual layout.

---

## Work Items

### 1. Base restore
- `git checkout 4df14d8 -- index.html` into the working tree.
- Placeholder stays live until the final push; nothing publishes before Philip's approval.

### 2. Copy pass
- Diff restored copy against annotated decisions in `DRAFT-REWRITES.md`:
  - §1 Approach heading → keep current ("AI for all. Right-sized for you.")
  - §2 Approach body → Philip's edits ("See changes in current copy") — verify applied
  - §3 Tech card eyebrow → "Customized for Results"
  - §4 Tech card title/body → Philip's edits ("Changed current copy above") — verify applied
  - §5 CTA → keep current
- Apply any decision not yet reflected in the restored page. No new voice; brand anchor is
  the live-site voice per CMO.md.
- Conversion tightening only: one consistent CTA repeated, no competing asks.

### 3. FAQ section (new, between About and Contact)
5–7 questions in Philip's voice, 2–4 sentence answers, honest-AI-conversation tone.
Three questions tee up the planned articles (link added when each article publishes):

| FAQ question | Future article |
|---|---|
| Why does AI matter for small nonprofits and small businesses? | #1 Why AI Matters Even More… |
| Is there an AI divide between large and small organizations? | #2 The Growing AI Divide |
| How do I know where my organization stands with AI? | #3 The AI Evolutionary Scale |

Plus practical: what an engagement looks like / cost approach; "Will AI replace my staff?";
donor-data privacy. Styled with existing section/card CSS patterns — no new design system.

### 4. Classic SEO
- `<title>`: mission + keyword, e.g. "Magnify Impact — AI Consulting & Adoption for Nonprofits | SF Bay Area" (final wording at implementation)
- Rewritten meta description (~155 chars, outcome-first)
- Open Graph + Twitter card tags (og:title, og:description, og:image, og:url)
- `rel=canonical` → https://magnifyimpact.ai/
- `sitemap.xml` + `robots.txt` (allow all, reference sitemap; explicitly allow AI crawlers
  GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- Alt-text audit on images/logo; semantic heading order check (single h1, ordered h2/h3)
- Favicon presence check

### 5. AEO layer
- JSON-LD in `<head>`:
  - `ProfessionalService` — name, URL, description, `areaServed`: SF Bay Area, `audience`: nonprofits/small businesses
  - `FAQPage` — mirrors FAQ section exactly
  - `Person` — Philip Kum, founder (bio from Knowledge Base/about-me.md; only facts Philip confirms)
- `llms.txt` at site root: one-page markdown summary — who Magnify Impact is, who it serves,
  the two Core Commitments, contact.
- Copy stays plain HTML (already static — no JS-rendered content).

### 6. Article-ready structure (structure only, no content)
- URL convention decided now: `magnifyimpact.ai/articles/<slug>/` (folder-per-article with
  index.html — clean URLs on GitHub Pages)
- Slugs reserved: `why-ai-matters-for-nonprofits`, `the-growing-ai-divide`, `ai-evolutionary-scale`
- sitemap.xml structured so adding an article is one `<url>` entry
- No nav link, no empty section, until the first article is real.

### 7. Ship
1. Philip reviews the finished page locally in a browser
2. Philip approves
3. Single commit, push to `main` → GitHub Pages deploys → placeholder replaced
4. Post-ship: submit sitemap in Google Search Console (Philip's account) — flagged as a
   follow-up, not blocking

---

## Success criteria

- Page renders identically-or-better locally vs. the pre-placeholder version
- All DRAFT-REWRITES annotated decisions verifiably applied
- FAQ section present, matches FAQPage JSON-LD 1:1
- JSON-LD validates (schema.org validator), no console errors
- sitemap.xml, robots.txt, llms.txt reachable at root after deploy
- Live site no longer shows Coming Soon after final push

## Risks / notes

- Repo is public and Pages serves committed files — this spec lives in `docs/specs/` and is
  harmless if crawled, but no internal-sensitive content goes in the repo.
- Ethics-review pause (Jun 20) — Philip has decided to republish at end of this task; that
  decision is his and is recorded here.
- CMO.md must be updated same-session when the site goes live (role-file self-update rule).
