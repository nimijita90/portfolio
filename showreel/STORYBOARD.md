# María Mora — Portfolio showreel (v2 storyboard and motion spec)

Editable source: `showreel/index.html` (one GSAP timeline, scene times in the `T` object).
Preview in a browser: open the file; space plays/pauses, ←/→ jump one second.
Render: `node showreel/render.mjs <scale> <fps> <out.mp4>`. Use `0.5 25` for a 540p draft and `1 25` (or `1 50`) for the 1080p master.

Runtime: 47.5 s at 1920×1080 (draft: 960×540).

## Motion language

- **Palette:** black #000 with ivory #f5f4f1 type. Muted grey #8d8a84 for captions. Colour comes only from the real product imagery.
- **Type:** Silk Serif (regular and italic) carries the expressive statements, Onest carries the clear statements. One serif and one sans word share the frame whenever two ideas meet (e.g. "Lead" / "Product Designer.").
- **Scale:** each statement has one scale decision: oversized and bleeding off the frame (Hi., Lead, 10+, 43), restrained and small (I think…, My work spans), or zoom-through (A Lead Product Designer. → I think…, Evidence. → data).
- **Movement:** horizontal displacement is the main transition device. Words and product frames push each other out of shot, and opposing slabs move in opposite directions. Product visuals move slower than type (parallax).
- **Rhythm:** fast `expo.out` entrances for short statements. Slow `power3.inOut` for the closing message and the final portrait. Short black beats (≤0.2 s) as punctuation, never empty pauses.
- **Avoided:** rotation of product screens, glitches, shakes, generic fades between every scene.

## Scenes (renumbered)

| # | Time (s) | On-screen text | Visual / source | Type treatment | Motion → transition |
|---|---|---|---|---|---|
| 01 | 0.00–1.35 | Hi. | — | Silk italic, 760 px | Starts as an extreme close-up of the "H", pulls back to the word; the word lifts out of frame |
| 02 | 1.30–2.65 | If you're looking for | — | Onest light, small | Words rise from below in the wake of "Hi."; slow camera drift; sentence pushed out left |
| 03 | 2.60–4.75 | A Lead Product Designer. | — | "Lead" Silk 520 px; "Product Designer." Onest semibold 190 px | Two slabs enter from opposite sides and keep drifting apart; camera zooms through the full stop into black |
| 04 | 4.75–6.05 | I think… | — | Silk italic, quiet | Dots appear one at a time (comic timing) |
| 05 | 6.05–7.15 | I know one. | — | Onest semibold 250 px | Hard cut with a scale punch; pushed out left |
| 06 | 7.15–9.35 | I'm María Mora. | — | "I'm" small sans; name Silk 250 px | Letters rise one by one while the tracking tightens; lifts out of frame |
| 07 | 9.30–10.70 | 10+ years. | — | "10+" Silk 1180 px, bleeds off the frame | Rises from below; slides out left |
| 08 | 10.65–12.25 | Designing digital products. | WAND UI kit (`wand-visual-complete-v2`) | Silk, three masked lines | Type and product move at different speeds; the product frame expands to full screen |
| 09 | 12.25–13.50 | I've learned that great products need | — | Onest light | Words build; everything dims except "need"; pushed left |
| 10 | 13.45–14.35 | Evidence. | — | Silk italic | Grows until the camera passes through the word |
| 11 | 14.30–17.20 | 40% faster client delivery | Real Figma variables (`wand-visual-configure-v2`) | KPI Silk 400 px + caption | KPI counts to 40%; caption: "Enabled by a multi-brand design system built with Figma variables." No other metrics |
| 12 | 17.15–18.75 | Direction. | XSITE brand card | Onest semibold 380 px | The word crosses the whole frame; XSITE emerges behind it |
| 13 | 18.10–20.60 | (caption) XSITE · A white-label casino platform, rebuilt from the foundations | `xsite-visual-devices` | Caption only | Wipe reveal, slow lateral camera; shrinks away |
| 14 | 20.55–21.40 | Craft. | — | Silk | Small and precise, then a sudden scale snap |
| 15 | 21.35–23.35 | (caption) WAND · Cashier | `wand-visual-cashier-v2` | Caption | Close-up on the UI that pulls back to the full flow; pushed out left |
| 16 | 23.30–25.20 | (caption) XSITE · Loyalty & gamification | `xsite-visual-gamification` | Caption | Enters as the Cashier leaves; slow push-in |
| 17 | 25.20–25.95 | My work spans | — | Onest light | Quiet set-up |
| 18 | 25.95–27.35 | 43 operator brands. | — | "43" Silk 1000 px | Grows and counts; drops out of frame |
| 19 | 27.30–29.10 | 22 launched across 15 markets. | — | 22 (roman) and 15 (italic) at contrasting scales | Footnote: "Brand skins designed for 43 operator brands within a multi-brand platform." |
| 20 | 29.05–31.80 | — | 18 real operator logos | — | Three rows; rows 1 and 3 move left, row 2 moves right |
| 21 | 31.80–32.60 | And I bring together | — | Onest light | Words converge from both sides |
| 22 | 32.55–34.20 | Product strategy. | Abstract process path | Silk title | Insights → Opportunities → Prioritisation → Roadmap drawn as one path (process, not invented documents) |
| 23 | 34.15–35.95 | Design systems. | Abstract components → real WAND UI kit | Silk title | Scattered components (button, input, tokens, card, type) snap into order, then resolve into the real kit |
| 24 | 35.90–37.85 | Design leadership. | María's portrait + 7 abstract designer avatars | Silk title | Team ring around María; Product, Engineering and Research nodes; AI agents shown dashed as a tool, not as people |
| 25 | 37.80–40.20 | Because making complexity feel simple | — | "complexity" Silk italic 250 px | Scattered letters resolve into one clean word |
| 26 | 40.20–42.50 | Is the kind of design problem I love. | — | Silk, two masked lines | Slow, deliberate reveal with room to breathe |
| 27 | 42.50–43.90 | So, what's next? | — | Oversized italic "?" | The question mark grows and carries the cut |
| 28 | 43.85–47.50 | MARÍA MORA · LEAD PRODUCT DESIGNER · moragarciamaria@gmail.com | `canva/hero-photo.jpg` (the portfolio portrait) | Silk name, tracked Onest role | Portrait settles; text enters in order and holds about 2.5 s |

## Accuracy checks

- Only the CV figures are used: 10+ years, 43 brands (skins), 22 launched across 15 markets, 40% faster client delivery, team of 7.
- The 43/22 distinction is stated on screen. The 40% is labelled as delivery efficiency, not revenue or conversion.
- Every product image is a real portfolio asset. The only invented elements are the abstract components in scene 23 and the process path in scene 22, both presented as concepts.
- No AI-generated footage is used. Runar is left out (see below).

## Missing assets

1. The original showreel storyboard (previous v1) — not in the repo. This v2 is built from the brief.
2. **Nordice** and **Runar** clips. Only the Runar still is available, and the earlier generated clips must not be used. Drop the first 1–2 s of the original Runar video into scene 13 or 16 when it is available.
3. The **Lexide** case study (benchmark-row reference). The logo rows follow the brief's description.
4. **Envato reference** — elements.envato.com blocks automated access, so it was interpreted from the brief. A downloaded preview MP4 would allow a closer motion match.
5. **Music** — none yet. Add a licensed track; the cuts are not beat-locked, so retiming is easy.
6. **Silk Serif licence** — confirm it covers video use before publishing.
