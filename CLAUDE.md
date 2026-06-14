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
<nav class="site-nav">
  <div class="container">
    <a href="/" class="nav-name">Seh Na Mellick</a>
    <ul class="nav-links">
      <li><a href="/projects/">Projects</a></li>
      <li><a href="/notes/">Notes</a></li>
      <li><a href="/cv/">CV</a></li>
      <li><a href="https://github.com/melsehna">GitHub</a></li>
    </ul>
  </div>
</nav>

<main>
  <div class="container">
    <!-- content -->
  </div>
</main>

<footer class="site-footer">
  <div class="container">
    <p>&copy; 2026 Seh Na Mellick</p>
  </div>
</footer>
```

Interior pages use `<header class="page-header">` (projects, notes index, CV) or `<header class="article-header">` (individual notes). Article headers include `.article-back`, `.article-title`, and `<time class="article-date">`.

## CSS conventions

- Single stylesheet (`style.css`) — do not add page-specific `<style>` blocks. Exception: `activity/index.html` is a self-contained mini-app with inline styles.
- Cabin is self-hosted from `/fonts/`; do not add Google Fonts or other external font links.
- Mobile breakpoint is `640px` — keep responsive styles in the existing `@media (max-width: 640px)` block at the bottom of `style.css`. (The `700px` breakpoint in the file is only for `.research-illustration`.)
- CSS custom properties are defined on `:root` in `style.css`: `--bg`, `--surface`, `--border`, `--border-hover`, `--text`, `--text-2`, `--text-3`, `--accent` (`#6fa86f`), `--max`, `--pad`, `--radius`, `--transition`. Use these instead of hardcoded values.

## JavaScript (`script.js`)

`script.js` is included only on `index.html`. It handles:
- Typewriter effect for `#hero-role`
- Scroll reveal (`.reveal` → `.visible` via IntersectionObserver)
- Block highlight (`.block` → `.in-view` when centered in viewport)
- Cat photo carousel (cycles `.cat-photos img` with `.active`)

## Adding a new note

1. Create `notes/<slug>.html` — use the shared nav/footer shell, `<header class="article-header">` with `.article-back`, `.article-title`, and `<time class="article-date">`, and `<div class="article-body">` for prose.
2. Add a list item to `notes/index.html` following the existing pattern (title link + `.note-date` span).
