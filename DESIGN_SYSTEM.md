# KEV mini design system (P1)

All tokens live at the top of `assets/css/site.css` (`:root`). Legacy names (`--acc`, `--navy`, `--r`, …) are aliases of these tokens, so existing rules inherit the system.

## Colour
| Token | Value | Use |
|---|---|---|
| `--c-violet` / `--c-blue` / `--c-cyan` | #7739F7 / #258BFF / #12D9E8 | Brand gradient stops |
| `--grad-brand` | violet → blue → cyan (110°) | Accent rules, secondary-button border. Never behind body text. |
| `--c-cyan-d` | #0A7381 | Accent text on light surfaces (AA ≥ 4.5:1 on #F4F3EF) |
| `--c-navy` / `--c-navy-2` / `--c-navy-3` | #080D28 / #0E1538 / #111940 | Dark surfaces (cinema hall) |
| `--c-off` / `--c-white` | #F4F3EF / #FFF | Light surfaces |
Semantic: `--bg --surface --ink --mute --line --hl` switch per theme and per `[data-band]`.

## Type
Arabic: **Cairo** (`--f-ar`); English: **Montserrat** (`--f-en`). Both share `--lh-body: 1.75`. Montserrat is set to 0.97× because it reads wider; Arabic headings use line-height 1.3 (diacritics) and English 1.12, giving equal optical weight in RTL and LTR.
Scale: `--fs-xs .8125rem · --fs-sm .9375rem · --fs-md 1.0625rem · --fs-lg · --fs-xl · --fs-2xl (h2) · --fs-3xl/--fs-display (h1)` (fluid clamps).

## Spacing & radii
`--sp-1…--sp-9` = 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Radii `--r-xs 8 · --r-sm 12 · --r-md 18 (cards) · --r-lg 28 · --r-pill`.

## Components
- **Buttons**: `.btn` primary (solid cyan, navy ink, 11:1), `.btn.secondary` (gradient hairline), `.btn.ghost` (transparent, ink border), `.btn.sm`.
- **Cards**: `.box .tst .work .panel .formcard` share `--r-md`, `--sh-1/--sh-2`, and a 3px lift on hover (pointer devices only).
- **Icons**: inline SVG, `currentColor`, sizes `--icon-sm 18 · --icon-md 24 · --icon-lg 34`. Directional icons get `.dir-i` and are mirrored in RTL.
- **Focus**: `--focus-ring` (navy + cyan double ring) on every `:focus-visible`.
- **Motion**: `--dur-1/2/3`, `--ease`; `.rv` reveal-on-scroll; everything disabled under `prefers-reduced-motion`.

## Studio motifs
Hero reel (vertical promo in a viewfinder frame, REC badge, pause button), hero waveform bar, ambient light on dark bands. Logo is never glowed.

## RTL rules
Use logical properties only (`margin-inline`, `inset-inline-start`, `border-inline-*`). Physical left/right are allowed only inside intentionally LTR content (code editor mock, timecode badges).
