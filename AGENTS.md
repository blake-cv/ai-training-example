# AGENTS.md

## Project overview
A personal portfolio site for **Alex Rivera** (placeholder name and copy), built as a
**demo only**. It is hosted on a local machine and is not deployed anywhere.
Goal: look polished and feel alive (aurora background, starfield, scroll reveals, tilt cards)
while staying tiny and dependency-free.

## Stack
- Plain **HTML + CSS + vanilla JavaScript**. No framework, no bundler, no build step, no npm.
- Fonts: Space Grotesk and JetBrains Mono, loaded from Google Fonts.
- Served by any static file server.

## File layout
| File | Purpose |
|---|---|
| `index.html` | All page content and structure (nav, hero, work, about, skills, contact) |
| `styles.css` | All styling. Design tokens live in `:root` at the top |
| `script.js` | Interactions: typing effect, reveal-on-scroll, count-up, cursor glow, card tilt, starfield |
| `AGENTS.md` | This file |

## Run it locally
```bash
python3 -m http.server 3000
```
Then open http://localhost:3000. Edits show up on refresh; there is nothing to build.
To expose it to other devices on the same network: `python3 -m http.server 3000 --bind 0.0.0.0`
and use the machine's LAN IP.

## Design system
- **Theme:** dark, with a cyan → violet → pink accent gradient. Change colors only via the CSS variables in `:root` (`--violet`, `--cyan`, `--pink`, `--grad`).
- **Type:** Space Grotesk for display and body, JetBrains Mono for small labels and code.
- **Motion:** every animated element must respect `prefers-reduced-motion` (already handled in `styles.css` and `script.js`; keep it that way).
- **Layout:** mobile-first responsive. The breakpoint is 860px. Check narrow widths after any layout change.
- New sections follow the existing pattern: `<section class="section">` with a `.head` containing an `.eyebrow` ("0N / Label") and an `<h2>`. Add the `reveal` class to animate in.

## Conventions
- Keep it dependency-free. **Ask before adding any library, font, or build tool.**
- Semantic HTML, with `alt` text or `aria-hidden` on decorative elements and visible focus states.
- Keep each file focused: content in HTML, presentation in CSS, behavior in JS. No inline `<script>` blocks and no inline styles, except the existing per-card `style` hooks.
- No real personal data. Name, email (`hello@example.com`), and social links are placeholders. Do not invent real-sounding contact details.
- Prefer CSS over JS for effects when possible. Performance matters: no layout thrashing, and the starfield uses a single canvas.

## Verifying changes
There is no test suite. After editing:
1. Reload http://localhost:3000 and check the browser console for errors.
2. Scroll the full page and confirm the sections reveal correctly.
3. Resize to about 375px wide and confirm nothing overflows horizontally.
4. Confirm no console 404s for missing files.

## Boundaries
**Always:** match the existing look, and keep the page working without a build step.
**Ask first:** adding dependencies, adding pages, changing the color palette or fonts, or adding a backend or form handling.
**Never:** commit real personal information, add tracking or analytics, or deploy the site anywhere. It stays local for this demo.

## Gotchas
- Open the site through the local server, not by double-clicking `index.html` (`file://`). Some browsers restrict things on `file://`.
- Google Fonts needs internet access. Offline, the site falls back to system fonts and still works.
- Project cards get their look from the `.a1`–`.a4` gradient classes in `styles.css`. To use real screenshots, replace the `.art` backgrounds with `<img>` elements and keep the overlay gradient (`.art::after`).

## Ideas for next steps
Real project screenshots, a working contact form, a blog page, a light-theme toggle, and deploying to Vercel when it is no longer a demo.
