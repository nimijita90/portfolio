# María Mora — Portfolio showreel (v2 storyboard and motion spec)

Editable source: `showreel/index.html` (one GSAP timeline, scene times in the `T` object).
Preview in a browser: open the file; space plays/pauses, ←/→ jump one second.
Render: `node showreel/render.mjs <scale> <fps> <out.mp4>`. Use `0.5 25` for a 540p draft and `1 25` (or `1 50`) for the 1080p master.

Runtime: 48 s at 1920×1080 (draft: 960×540).

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
| 02 | 1.30–2.75 | If you're looking for | — | Typewriter + cursor; pushed out left |
| 03 | 2.70–4.85 | A Lead Product Designer. | — | "Lead" echo roll lands; "Product Designer." slab from the opposite side; zoom through the full stop |
| 04 | 4.85–6.10 | I think… | — | Tracking compresses; the dots arrive one at a time |
| 05 | 6.10–7.15 | I know one. | — | Starts as an extreme close-up and snaps out to the full line |
| 06 | 7.15–9.30 | I'm María Mora. | — | Letters glow in from blur while the tracking tightens |
| 07 | 9.25–10.60 | 10+ years. | — | Oversized number bleeds off the frame; slides out |
| 08 | 10.55–12.10 | Designing digital products. | WAND UI kit | Type/product parallax; the product takes the frame |
| 09 | 12.10–13.30 | I've learned that great products need | — | Words build; all dim except "need" |
| 10 | 13.25–14.25 | Evidence. | — | Camera passes along the oversized word and dives into the full stop |
| 11 | 14.20–16.80 | 40% faster client delivery | Real Figma variables (WAND configure) | KPI + "Enabled by a multi-brand design system built with Figma variables." |
| 12 | 16.75–17.70 | Direction. | — | Drum roll over a ghost copy, then pushes into the footage |
| 13 | 17.65–19.25 | (caption) Nordice | Nordice clip, 2.6–4.0 s of the source | Slow settle; wiped off by Runar |
| 14 | 18.90–20.25 | (caption) Runar | Runar Viking clip, 12.5–13.9 s | Wipe in from the right |
| 15 | 20.20–21.00 | (caption) Runar | Runar rune, the first 0.8 s of the shot only | Brief flash before it starts rotating |
| 16 | 20.95–22.75 | (caption) XSITE · A white-label casino platform, rebuilt from the foundations | XSITE devices | Lateral camera; shrinks away |
| 17 | 22.70–23.60 | Craft. | — | Echo marquee (outlined and solid rows) |
| 18 | 23.55–25.25 | (caption) WAND · Cashier | WAND Cashier | Close-up pulls back to the full flow |
| 19 | 25.20–26.60 | (caption) XSITE · Loyalty & gamification | XSITE gamification | Enters as the Cashier exits |
| 20 | 26.55–27.40 | My work spans | — | Tracking compresses |
| 21 | 27.40–28.80 | 43 operator brands. | — | The number dominates (no count-up, so no wrong numbers ever on screen) |
| 22 | 28.75–30.50 | 22 launched across 15 markets. | — | Contrasting scales + footnote: "Brand skins designed for 43 operator brands within a multi-brand platform." |
| 23 | 30.45–32.90 | — | 18 real operator logos | Three rows; the middle row runs the opposite way |
| 24 | 32.90–33.75 | And I bring together | — | Letter cascade |
| 25 | 33.70–35.30 | Product strategy. | Process path (concept) | Title drum roll; insights → opportunities → prioritisation → roadmap |
| 26 | 35.25–36.95 | Design systems. | Components (concept) → real WAND UI kit | Components snap into order and resolve into the real kit |
| 27 | 36.90–38.85 | Design leadership. | María's portrait + 7 abstract avatars | Team ring; Product, Engineering and Research nodes; AI agents dashed |
| 28 | 38.80–41.00 | Because making complexity feel simple | — | Scattered letters resolve into "complexity" |
| 29 | 41.00–43.10 | Is the kind of design problem I love. | — | Slow masked reveal |
| 30 | 43.10–44.60 | So, what's next? | — | Typed; the "?" lands and carries the cut |
| 31 | 44.55–48.00 | MARÍA MORA · LEAD PRODUCT DESIGNER · moragarciamaria@gmail.com | Portfolio portrait | Portrait settles; text holds about 2.5 s |

## Accuracy checks

- Only the CV figures are used: 10+ years, 43 brands (skins), 22 launched across 15 markets, 40% faster client delivery, team of 7.
- The 43/22 distinction is stated on screen. The 40% is labelled as delivery efficiency, not revenue or conversion.
- Every product image is a real portfolio asset. The only invented elements are the abstract components in scene 23 and the process path in scene 22, both presented as concepts.
- The only AI footage is the supplied Nordice and Runar campaign clips. The failed rune rotation is excluded; only the first 0.8 s of that shot is used.

## Missing assets

1. The original showreel storyboard (previous v1) — not in the repo. This v2 is built from the brief.
3. The **Lexide** case study (benchmark-row reference). The logo rows follow the brief's description.
4. **Envato reference** — analysed from the preview MP4 (67 s, 4K).
5. **Music** — none yet. Add a licensed track; the cuts are not beat-locked, so retiming is easy.
6. **Silk Serif licence** — confirm it covers video use before publishing.
