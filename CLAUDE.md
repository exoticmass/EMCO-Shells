# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing site for EMCO Drum Shells (Kansas City). The entire site is `index.html` — inline `<style>`, markup, and a small inline `<script>` — plus photos and logos in `images/`. There is no build step, package manager, linter, or test suite.

## Running locally

Open `index.html` directly in a browser, or serve the folder so the Clipboard API works (it needs a secure context such as `localhost`):

```bash
python3 -m http.server 8000
```

Under `file://`, the Copy buttons in the order band fall back to selecting the text instead of copying it. That's intended, not a bug.

## Document shell

The page was originally authored as a Claude artifact, so the top-level markup is not indented under `<head>` and `<body>`. The viewport meta includes `viewport-fit=cover`, which the masthead, `.wrap` padding, and `body::before` need: they use `env(safe-area-inset-*)` to clear the notch on iOS. Keep it if you edit the viewport tag.

## Page structure

The comment at the top of the `<style>` block gives the layout order: black sticky masthead, then a hero (headline over `hero-shell.jpg`, then the shop-floor photo straddling the dark-to-light transition), then three `.chapter` sections (`#story`, `#quality`, `#goal`), then the `.ply-edge` band, the `#order` contact band, and the footer. CSS sections are delimited with `/* ---------- Name ---------- */` banners in that same order, and responsive overrides live together at the bottom under "Narrow screens" (breakpoints 1080 / 860 / 640 / 480px).

- **Chapters** use a two-column grid: `.prose` plus a `.collage` figure, a large `.main` image with a matted `.inset` overlapping its lower corner. Adding `.flip` to a chapter swaps the columns and mirrors the inset. `.lineage` (story) and `.factors` (goal) span both columns with `grid-column: 1 / -1`.
- **Ply graphics** (`.ply-edge`, `.ply-swatch`) are pure CSS stacked linear-gradients built from the `--veneer`, `--veneer-alt`, and `--glueline` variables, not images.

## Things that are coupled across the file

- **Theme tokens.** All colors and fonts are CSS custom properties on `:root`. The dark palette is defined **twice**, in `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` and in `:root[data-theme="dark"]`, and the two must stay identical. Nothing currently sets `data-theme`; it's a hook for a future toggle.
- **Press tags on the shop-floor photo.** Each `.press` is absolutely positioned using inline `--x`/`--y` percentages measured against `images/shop-floor.jpg`, and `.floor-photo` hardcodes `aspect-ratio: 2000 / 1120`. If the photo is replaced or recropped, re-measure the coordinates and update the aspect ratio. `--i` staggers the drop-in animation.
- **Press ↔ size-chip hover link.** The script pairs `.press[data-size]` tags with `.sizes li[data-size]` chips by matching `data-size`, so adding or removing a diameter means editing both lists. The press tags are hidden below 640px.
- **Image dimensions.** Every `<img>` has `width`/`height` attributes that match the file's actual pixel size (used for aspect ratio and layout stability). Update them when you swap an image. `hero-shell.jpg` is a CSS background, referenced in both `.hero-top` and its ≤640px override.
- **Favicons.** `favicon.ico` (16/32/48px), `images/icon-192.png`, and `apple-touch-icon.png` (180px, padded onto the site's black so iOS's corner mask doesn't clip the gold border) are all generated from the client's square "E" badge. If the badge changes, regenerate all three. `favicon.ico` and `apple-touch-icon.png` live at the site root because browsers and iOS request those paths by default.
- **Contact details** appear in both the `#order` band (as `tel:`/`mailto:` links with matching `id`s that the Copy buttons target through `data-copy`) and the footer's Contact column. Change them in both places.

## Placeholders still in the page

- The phone number `123-456-7890` / `tel:+11234567890` is a placeholder.
- The social links (YouTube, Instagram, Facebook) and the Privacy Policy / Accessibility Statement links all point to `href="#"`.

## Fonts

The page loads these from Google Fonts: Big Shoulders Display, Big Shoulders Text, and Big Shoulders Stencil Display for display, label, and stencil type, and Source Serif 4 for body text. Use the `--display`, `--label`, `--stencil`, and `--body` variables rather than naming the families directly.
