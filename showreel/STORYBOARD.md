# María Mora — Portfolio showreel (v2 storyboard and motion spec)

Editable source: `showreel/index.html` (one GSAP timeline, scene times in the `T` object).
Preview in a browser: open the file; space plays/pauses, ←/→ jump one second.
Render: `node showreel/render.mjs <scale> <fps> <out.mp4>`. Use `0.5 25` for a 540p draft and `1 25` (or `1 50`) for the 1080p master.

Runtime: 52.5 s at 1920×1080 (draft: 960×540).

## Motion language

- **Palette:** black #000 with ivory #f5f4f1 type. Muted grey for small captions. Colour comes only from the real product imagery and the Nordice/Runar footage.
- **Type:** Silk Serif carries the expressive statements, Onest the clear ones.
- **Kinetic vocabulary, adapted from the Envato reference** (each move is used once or twice, never on every scene):
  - typewriter with blinking cursor (02, 30);
  - echo roll: a stack of outlined copies scrolls and lands on the solid word (03);
  - tracking compression (04, 20);
  - extreme close-up punch out to the full line (01, 05);
  - glow reveal from blur (06);
  - horizontal camera pass through an oversized word (10);
  - perspective drum roll over a ghost copy (12, and shared by the titles in 25–27 so the trio reads as one series);
  - echo marquee of outlined and solid rows (17);
  - letter cascade (24).
- **Movement:** horizontal displacement and push-outs link the scenes; product visuals move slower than type.
- **Rhythm:** fast `expo` moves for short statements, slow `power3.inOut` for the closing message and the portrait. Black beats of 0.2 s or less, never empty pauses.

## Scenes (renumbered)

| # | Time (s) | On-screen text | Visual / source | Move |
|---|---|---|---|---|
| 01 | 0.00–1.35 | Hi. | — | Extreme close-up of the "H" pulls back; the word lifts out of frame |
| 01b | 1.35–3.55 | — | over99 logo (`media/over99.svg`, María's own animation) with a deep blue halo glowing up behind it | Letters rise from the baseline, the "v" turns into ">", a shockwave releases the second 9; driven frame by frame by the timeline |
| 02 | 1.30–2.75 | If you're looking for | — | Typewriter + cursor; pushed out left |
| 03 | — | a Design Lead. | — | Camera pass along the oversized line: "a" → "Design" → "Lead." with hard stops, then a pull-back reveals the full sentence on one line, which holds; clean cut to "I think…" |
| 04 | 4.85–6.10 | I think… | — | Tracking compresses; the dots arrive one at a time |
| 05 | 6.10–7.15 | I know one. | — | Starts as an extreme close-up and snaps out to the full line |
| 06 | 7.15–9.30 | I'm María Mora. | — | The letters rise crisply from a mask and the full stop pops; the letters drop out the same way |
| 07 | 9.25–10.60 | 10+ years. | — | Counter climbs 0 → 10 at an even pace; the number bleeds off the frame |
| 08 | 10.55–12.10 | Designing digital products. | XSITE casino page (`media/xsite-casino-page.webp`) | Page frame rises and scrolls; type and frame exit together |
| 09 | 12.10–13.30 | I've learned that great products need | — | Words build; all dim except "need" |
| 10 | 13.25–14.25 | Evidence. | — | Camera passes along the oversized word and dives into the full stop |
| 11 | 14.20–16.80 | 40% faster client delivery | Figma variables export plugin (`media/plugin-variables.webm`) | KPI + "Enabled by a multi-brand design system built with Figma variables." |
| 12 | 16.75–17.70 | Direction. | — | Drum roll over a ghost copy, then pushes into the footage |
| 13 | 17.65–19.25 | (caption) Nordice | Nordice clip, 2.6–4.0 s of the source | Slow settle; wiped off by Runar |
| 14 | 18.90–20.25 | (caption) Runar | Runar Viking clip, 11.35–12.7 s (symbols visible, before the explosion) | Wipe in from the right |
| 15 | 20.20–21.00 | (caption) Runar | Runar rune, the first 0.8 s of the shot only | Brief flash before it starts rotating |
| 16 | 20.75–22.75 | (caption) XSITE · One platform, multiple brands — Nordice & Runar | Nordice and Runar pages side by side | The pages slide in from opposite edges, open close on their hero banners, then pull back and scroll |
| 17 | 22.70–23.60 | Craft. | — | Echo marquee (outlined and solid rows) |
| 18 | 23.55–25.25 | (caption) XSITE · Sportsbook | `media/xsite-sports-page.webp` | Tilted frame turns towards the camera while the page scrolls |
| 19 | — | (caption) XSITE · Casino lobby & sign-up | `media/xsite-lobby-desktop.webp` + `media/xsite-signup-modal.webp` | The lobby slides in; the background dims, the sign-up modal pops with a quick overshoot and the camera leans in |
| 20 | 26.55–27.40 | My work spans | — | Tracking compresses |
| 21 | 27.40–28.80 | 43 operator brands. | — | The number dominates (no count-up, so no wrong numbers ever on screen) |
| 22 | 28.75–30.50 | 22 launched across 15 markets. | — | Contrasting scales + footnote: "Brand skins designed for 43 operator brands within a multi-brand platform." |
| 23 | 30.45–32.90 | — | 18 real operator logos | Three rows; the middle row runs the opposite way |
| 24 | 32.90–33.75 | And I bring together | — | Letter cascade |
| 25 | 33.70–35.30 | Product strategy. | Real XSITE delivery roadmap (`media/xsite-roadmap.png`) | Title drum roll; the roadmap rises in perspective and the camera drifts across the timeline |
| 26 | — | Design systems. | Real WAND UI kit footage (`media/wand-ui-kit.webm`) | Inverted layout: the footage drops into a frame at the top, title drum roll below it |
| 27 | 43.80–46.00 | "Design *leadership.*" (push in from the right, same title roll as 25–26). Below it, a restless field of 26×10 hairlines, each pointing its own way. An ivory point enters from the left and crosses to the centre; as it passes, the lines turn to face it in a wave, stretching and brightening near it. In the last half-second the whole field converges on the point, the title fades and only the point remains. After React Bits' *MagnetLines* (MIT + Commons Clause), rebuilt as a deterministic canvas. Idea: a team oriented to a shared direction. |
| 28 | 45.95–48.55 | The point left by scene 27 bursts into the ten letters of *complexity*, which hang in a slowly turning orbit around it, rotated and dimmed; then they snap into one clean Silk italic word (power4.inOut). "Because making" and "feel **simple**" rise in after it. Exit: up and out. |
| 29 | 48.55–51.25 | Is the kind of design problem I love. | — | Masked reveal, then the camera zooms into "I love." until it fills the frame (the rest of the line leaves the edges); hard cut |
| 30 | 51.25–53.65 | "So, what's *next?*" — centred Silk line, words rise from masks and sink back out. |
| 31 | 53.60–62.40 | Closing: the viewer answers. A minimal dark mail composer (no real brand) rises in; "To" types design@mariamoragarcia.com, Subject "Design Lead", body in Silk: "Hey María! / *Welcome on board.*" A pointer glides to Send and clicks; the window flies off, the pointer leaves, and only the address stays, gliding to centre and scaling up. A small "Sent ✓" appears under it; hold to the end. Black throughout. |

## Accuracy checks

- Only the CV figures are used: 10+ years, 43 brands (skins), 22 launched across 15 markets, 40% faster client delivery, team of 7.
- The 43/22 distinction is stated on screen. The 40% is labelled as delivery efficiency, not revenue or conversion.
- Only material supplied by María is used (folder "material porfolio"): XSITE roadmap, Nordice/Runar/casino/sports pages, the Figma variables plugin video, the WAND UI kit video and the Nordice/Runar clips. Plus the portfolio portrait and operator logos from the live site. None of the older repo images (`wand-visual-*`, `xsite-visual-*`) appear.
- The only AI footage is the supplied Nordice and Runar campaign clips. The failed rune rotation is excluded; only the first 0.8 s of that shot is used.

## Missing assets

1. The original showreel storyboard (previous v1) — not in the repo. This v2 is built from the brief.
2. The **Lexide** case study (benchmark-row reference). The logo rows follow the brief's description.
3. **Envato reference** — analysed from the preview MP4 (67 s, 4K).
4. **Music** — original score synthesised by `showreel/music/compose.py` (no samples, no third-party audio), locked to the scene times. Re-run it after retiming scenes. A licensed track can replace it later.
5. **Silk Serif licence** — confirm it covers video use before publishing.

> Times in the table above are from v3. v4 inserts the over99 logo (+2.2 s) and slows scenes 07–09 (+2.3 s); the live values are in the `T` object in `index.html`.
