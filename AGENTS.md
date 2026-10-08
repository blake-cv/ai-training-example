# AGENTS.md

## Project overview

**From idea to live link** is an eight-chapter, interactive presentation for a 10–15 minute beginner talk about AI-generated websites, Git, GitHub, and hosting. Its fictional example is **Cohort launchpad**.

The user has explicitly approved replacing the original portfolio, making `blake-cv/ai-training-example` public, and publishing this presentation with GitHub Pages. This supersedes the original local-only restriction.

## Stack and files

- Plain HTML, CSS, and vanilla JavaScript. No framework, bundler, npm dependency, or build step.
- Space Grotesk and JetBrains Mono from Google Fonts, with system fallbacks.
- `index.html`: all content and semantic page structure.
- `styles.css`: all presentation styling and design tokens in `:root`.
- `script.js`: fragment navigation, simulations, file selector, and clipboard behavior.
- `favicon.svg`: decorative local icon.
- `.nojekyll`: disable Jekyll processing for GitHub Pages.
- `README.md`: setup, speaking cues, AI prompt, publishing, and verification.

The actual repository root is the parent `Ai-training-demo` directory; the nested `ai-training-example` folder is not the site root. Do not initialize another Git repository there.

## Run locally

```bash
python3 -m http.server 3000
```

Open http://localhost:3000. There is nothing to build. Serve over HTTP rather than opening the file directly.

## Design and behavior

- Keep the existing dark palette, using CSS variables: `--bg`, `--text`, `--muted`, `--cyan`, `--violet`, `--pink`, and `--grad`.
- Large presentation typography, generous space, and a recurring miniature browser preview.
- Motion follows actions and respects `prefers-reduced-motion`.
- The responsive breakpoint is 860px. Verify 375px width after layout changes.
- Navigation uses stable fragments: `#start`, `#create`, `#github`, `#commits`, `#branches`, `#publish`, `#proof`, and `#your-turn`.
- Support browser history, direct links, and keyboard navigation without intercepting arrows inside editable controls.
- All simulations stay in browser memory. Do not connect demo buttons to GitHub or deployment APIs. Clearly distinguish simulations from real destination links.
- Use semantic HTML, accessible labels and status updates, visible keyboard focus, and text-safe rendering of input.
- Content remains readable without JavaScript. Clipboard failures must leave text selectable.
- Content belongs in HTML, presentation in CSS, and behavior in JavaScript. No inline scripts or inline styles.

## Boundaries

**Always:** keep the site dependency-free, responsive, and working without a build step. Use relative asset paths for the GitHub Pages project URL.

**Ask first:** adding libraries, fonts, additional site pages, a backend, form handling, a custom domain, or publishing to a different hosting provider.

**Never:** add personal contact information, secrets, tracking, or analytics. Do not fabricate a live deployment result inside a simulation.

**Approved hosting:** the public repository `blake-cv/ai-training-example`, with GitHub Pages publishing from `main` at `/(root)` to https://blake-cv.github.io/ai-training-example/.

## Verify changes

There is no installed test suite. Use browser checks without adding project dependencies:

1. Walk through all eight chapters with Next/Back, arrow keys, and the menu.
2. Verify fragment links, refresh, unknown fragments, and browser Back/Forward.
3. Save and select multiple versions, review/merge a branch, advance publishing, and reset all demos.
4. Verify inputs preserve arrow-key behavior, text renders safely, and copying has a selectable fallback.
5. Check projection-sized desktop viewports and 375px width for overflow and clipping.
6. Check reduced motion, keyboard focus, and JavaScript-disabled readability.
7. Check browser console/network for errors and missing assets.
8. After publishing, check the deployed site and repository while signed out.

Keep temporary browser-test artifacts out of commits.
