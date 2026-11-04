# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static marketing site for EMCO Drum Shells (Kansas City), made of three hand-written HTML pages that share one stylesheet:

- `index.html`: the one-page home page, with a small inline `<script>` for the press-tag hover and the Copy buttons
- `privacy.html` and `accessibility.html`: the legal pages linked from the footer
- `styles.css`: all CSS for every page
- `site.js`: script shared by every page (currently only the header menu's close behavior)
- `images/`: photos and logos

There is no build step, templating, package manager, linter, or test suite.

## Running locally

Open `index.html` directly in a browser, or serve the folder so the Clipboard API works (it needs a secure context such as `localhost`):

```bash
python3 -m http.server 8000
```

`.claude/launch.json` runs the same server for the Claude preview pane. Under `file://`, the Copy buttons in the order band fall back to selecting the text instead of copying it. That's intended, not a bug.

## Document shell

The site was originally a single Claude artifact, so the top-level markup is not indented under `<head>` and `<body>`. The viewport meta includes `viewport-fit=cover`, which the masthead, `.wrap` padding, and `body::before` need: they use `env(safe-area-inset-*)` to clear the notch on iOS. Keep it if you edit the viewport tag.

## Page structure

The comment at the top of `styles.css` gives the home page's layout order: black sticky masthead, then a hero (headline over `hero-shell.jpg`, then the shop-floor photo straddling the dark-to-light transition), then three `.chapter` sections (`#story`, `#quality`, `#goal`), then the `.ply-edge` band, the `#order` contact band, and the footer. CSS sections are delimited with `/* ---------- Name ---------- */` banners in roughly that order, and responsive overrides live together at the bottom under "Narrow screens" (breakpoints 1080 / 860 / 640 / 480px).

- **Header menu.** At ≤1080px the inline `.nav-links` are hidden, and a `<details class="menu">` after the Order button takes over. Its `<summary>` is the hamburger, and its `.menu-panel` list drops below the masthead, which is the panel's containing block because sticky counts as positioned. Opening and closing work natively without JavaScript. `site.js` adds closing on Escape (returning focus to the toggle), on an outside click, on a link click, and when the window widens past 1080px. At ≤480px the masthead tagline is hidden to make room for the logo, Order button, and hamburger.

- **Chapters** use a two-column grid: `.prose` plus a `.collage` figure, a large `.main` image with a matted `.inset` overlapping its lower corner. Adding `.flip` to a chapter swaps the columns and mirrors the inset. `.bio` (story: Brian Anderson's work-history timeline, the `.lineage` list) and `.factors` (goal: Brian's "thicker ply, less glue" mantra and its three parts) span both columns with `grid-column: 1 / -1`.
- **Document pages** use a black `.doc-head` title band, then a `.doc` > `.doc-body` reading column. Inside `.doc`, the focus outline switches to `--gold-ink`, because the bright `--gold` ring is only 1.8:1 against the light ground.
- **Ply graphics** (`.ply-edge`, `.ply-swatch`) are pure CSS stacked linear-gradients built from the `--veneer`, `--veneer-alt`, and `--glueline` variables, not images.

## Things that are coupled

- **Shared masthead and footer.** With no templating, every page carries its own copy of the `<head>` links (favicons, fonts, `styles.css`, `site.js`), the masthead, and the footer. Change all three pages together. Within each masthead, the section links appear twice, in `.nav-links` and in `.menu-panel`, so add or rename a section in both. They should differ only in link targets: `index.html` uses `#top` / `#story` and similar, the other pages use `index.html` / `index.html#story`, and each legal page marks its own footer link with `aria-current="page"`.
- **Theme tokens.** All colors and fonts are CSS custom properties on `:root`. The dark palette is defined **twice**, in `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` and in `:root[data-theme="dark"]`, and the two must stay identical. Nothing currently sets `data-theme`; it's a hook for a future toggle.
- **Press tags on the shop-floor photo.** Each `.press` is absolutely positioned using inline `--x`/`--y` percentages measured against `images/shop-floor.jpg`, and `.floor-photo` hardcodes `aspect-ratio: 2000 / 1120`. If the photo is replaced or recropped, re-measure the coordinates and update the aspect ratio. `--i` staggers the drop-in animation.
- **Press ↔ size-chip hover link.** The script pairs `.press[data-size]` tags with `.sizes li[data-size]` chips by matching `data-size`, so adding or removing a diameter means editing both lists. The press tags are hidden below 640px.
- **Image dimensions.** Every `<img>` has `width`/`height` attributes that match the file's actual pixel size (used for aspect ratio and layout stability). Update them when you swap an image. `hero-shell.jpg` is a CSS background, referenced in both `.hero-top` and its ≤640px override.
- **Favicons.** `favicon.ico` (16/32/48px), `images/icon-192.png`, and `apple-touch-icon.png` (180px, padded onto the site's black so iOS's corner mask doesn't clip the gold border) are all generated from the client's square "E" badge. If the badge changes, regenerate all three. `favicon.ico` and `apple-touch-icon.png` live at the site root because browsers and iOS request those paths by default.
- **Contact details** appear in the home page's `#order` band (as `tel:`/`mailto:` links with matching `id`s that the Copy buttons target through `data-copy`), in every page's footer Contact column, and in the contact paragraphs of both legal pages. Change them everywhere.
- **Legal page content describes the site's actual behavior.** The privacy policy says the site has no forms, cookies, analytics, or trackers, and that its only third-party request is Google Fonts. The accessibility statement lists features such as reduced-motion support, light and dark mode, AA text contrast, and reflow at 320px. If you add a form, analytics, embeds, or another third-party resource, or change those features, update the relevant page and its "Last updated" date.

## Client content rules

- **Don't name C&C Drums** anywhere except the 2008–2018 entry in Brian's work history (the `.bio` timeline in `#story`). That includes alt text, captions, and HTML comments.
- **Check new photos for C&C branding.** The shop's presses came from C&C, and some still show "C&C DRUM" stencils or a C&C crest. The hero's `shop-floor.jpg` shows the stencils on the right-hand presses, and the crest appears on a control box in the background of `veneer-into-mold.webp`.
- **Photos must show the real presses.** The client rejected earlier AI-generated images because their drum molds looked nothing like the real green-and-yellow ring presses. Use the client's own shop photos for anything showing presses or molds.

## Placeholders still in the site

- The phone number `123-456-7890` / `tel:+11234567890` is a placeholder.
- The social links (YouTube, Instagram, Facebook) point to `href="#"`.
- The privacy policy and accessibility statement are drafts written from what the site does. The client should confirm the statements about their own practices, such as how they use customer contact details and that they don't sell personal information.

## Fonts

The pages load these from Google Fonts: Big Shoulders Display, Big Shoulders Text, and Big Shoulders Stencil Display for display, label, and stencil type, and Source Serif 4 for body text. Use the `--display`, `--label`, `--stencil`, and `--body` variables rather than naming the families directly.
