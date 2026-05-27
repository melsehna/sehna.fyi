# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static personal website for Seh Na Mellick (sehna.fyi) — a computational biology PhD student at CMU. No build system, no package manager, no framework. Pure HTML and CSS files served directly.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

All asset paths are root-relative (e.g., `/style.css`, `/images/sehna.jpg`), so the server must be run from the repo root.

## Site structure

| Path | Purpose |
|---|---|
| `index.html` | Home page |
| `projects/index.html` | Research projects list |
| `notes/index.html` | Notes index |
| `notes/<slug>.html` | Individual note pages |
| `cv/index.html` | CV page |
| `style.css` | Single shared stylesheet |
| `fonts/` | Self-hosted Cabin font (TTF, multiple weights) |
| `images/` | Photos |
| `assets/papers/` | PDF files linked from projects |

## Page conventions

Every page shares the same shell — copy it when adding a new page:

```html
<header class="site-header">
  <nav class="nav">
    <a href="/">Home</a>
    <a href="/projects/">Projects</a>
    <a href="/notes/">Notes</a>
    <a href="/cv/">CV</a>
    <a href="https://github.com/melsehna">GitHub</a>
  </nav>
</header>

<main>
  <section class="hero">
    <h1>Page Title</h1>
    <p class="subtitle">One-line description.</p>
  </section>
  <!-- content sections -->
</main>

<footer class="site-footer">
  <p>Footer text</p>
</footer>
```

## CSS conventions

- Single stylesheet (`style.css`) — do not add page-specific `<style>` blocks.
- Cabin is self-hosted from `/fonts/`; do not add Google Fonts or other external font links.
- Use inline `style="margin-top:1.2rem;"` sparingly for one-off spacing between list items (as seen in `projects/index.html`). Prefer adding a class to `style.css` for anything reused.
- Mobile breakpoint is `700px` — keep responsive styles in the existing `@media (max-width: 700px)` block at the bottom of `style.css`.

## Adding a new note

1. Create `notes/<slug>.html` — include the shared nav/footer shell and link back with `<a href="/notes/">← All notes</a>`.
2. Add a list item to `notes/index.html` following the existing pattern (title link + date span).
