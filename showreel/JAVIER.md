# Javier Ortiz — showreel (adapted from María Mora's)

Source: `javier.html` (same system as `index.html`). Render it with:

    PAGE=javier.html node showreel/render.mjs 1 30 showreel/out/javier.mp4                     # web cut (40.9 s, loops)
    PAGE=javier.html QUERY=end=mail node showreel/render.mjs 1 30 showreel/out/javier-mail.mp4  # cut for sending (46.65 s, mail closing)

**Two cuts.** The web cut ends on "Let's *talk.*", which rises, holds and fades to black so the video can loop. The mail cut keeps the mail closing; open the page with `?end=mail`. Render at 60 fps (`render.mjs 1 60`).

**The dot.** Only Systems Thinking keeps the bouncing square (Instrument Sans' dots are square): it builds the two words and lands as the full stop. The travelling i-dot tried in v14–v16 was removed at María's request.

**Visual identity, taken from javierortizalmagro.com**
- **Theme:** every scene is black (#121514 with #f1f3ed). There is no colour accent and no glow or blur: flat white line art.
- **Type:** Instrument Sans throughout. Display is semibold 600 at −0.045em; statements are medium 500 at −0.035em.
- **Highlights:** a word is highlighted only by italic semibold or by an outline.
- **Labels:** Fragment Mono for the "01 / 03" counters.

Fonts are in `fonts/javier/` (SIL OFL 1.1, licences included). Outlined words use `instrument-sans-latin-600-outline.woff2`, a static 600 instance with its overlapping contours merged (fontTools removeOverlaps), so strokes show no internal joins.

The copy is Javier's script, plus connectors that add no new facts. They are marked "added" below; Javier should approve them. The only footage is in scene 06: `media/javier/javier-turn.webm` (and an `.mp4` fallback), an AI-generated 3 s clip of Javier made from his portrait, supplied by María, mirrored so he first looks towards his name. Javier must approve its use. Renders drive the clip frame by frame (`syncVid`). `portrait-badge.jpg` (the earlier badge) is kept for reference but no longer used. Every other scene is typographic or line art. Silent for now. Product Strategy is a flat line infographic (style reference: Netlify's "What is Netlify?" film, without its glow); AI-Driven Design is a hub-and-spoke map after "how AI agents work" diagrams.

| # | Time (s) | Theme | On screen | Motion |
|---|---|---|---|---|
| 01 | 0.00–1.35 | black | Hi. | Extreme close-up of the H pulls back |
| 02 | 1.30–2.75 | black | If you're looking for | Typewriter and cursor |
| 03 | 2.70–5.60 | black | a Senior Product Designer | Camera stops on each word, then pulls back to the line |
| 04 | 5.55–6.95 | black | I think… | Tracking compresses; the dots arrive one by one |
| 05 | 6.90–7.95 | black | I know one. | Extreme close-up punch |
| 06 | 7.90–10.50 | black | I'm Javier Ortiz. | Letters rise from a mask; the full stop pops. On the right Javier (clip, graded to the black and faded into it) looks towards his name, then turns to camera with a smile; he lifts out of frame with the letters (no fade) |
| 07 | 10.45–12.90 | black | Designing *complex* products. | Masked lines rise; the other lines fade and the camera zooms into "complex" |
| 07b | 12.90–14.70 | black | Bringing together *(added)* | Letter cascade |
| 08 | 14.65–18.85 | black | Product *Strategy.* · 01 / 03 | The structure of his rule-editor flow drawn as a line infographic (no product UI or data): outlined blocks with line icons, skeleton bars and generic Fragment Mono labels (trigger, filter, query, calculate, store, send, tag) build one by one. White wires draw between them, small flat pulses run along the wires, and the camera travels along the flow and pulls back to show it whole |
| 09 | 18.80–21.40 | black | Systems *Thinking.* · 02 / 03 | One white ball falls in and bounces along the line (stretch and squash on each landing). Each landing generates a word, its letters springing out from the impact point: "Systems", then "*Thinking*". Two smaller bounces and it comes to rest as the full stop. Centred, 210 px, no illustration |
| 10 | 21.35–25.35 | black | AI-Driven *Design.* · 03 / 03 | His toolchain as a hub-and-spoke map: the AI sparkle in the centre, his tools in dotted groups — design (Figma, FigJam), build (Claude, Codex, Higgsfield), ship & learn (FullStory, Jira, Confluence). Line icons and names only, no brand logos. The tools light up one after another, then the hub |
| 12 | 25.30–27.30 | black | I've learned that great products need | Builds; all dims except "need" |
| 13 | 27.25–28.35 | black | clear thinking, (outline) | Horizontal pass, dive into the comma |
| 14 | 28.30–29.40 | black | strong collaboration, | Perspective roll over an outline ghost |
| 15 | 29.35–30.50 | black | and thoughtful *execution.* | Echo marquee |
| 16 | 30.45–33.05 | black | Turning *complexity* into **clarity** | A point bursts into orbiting letters that snap into the word |
| 16b | 33.05–35.05 | black | is what *drives* me. *(added, completes the line)* | Masked rise, hold, sink |
| 17 | 35.00–37.75 | black | So, what's *next?* | Masked rise and sink |
| 18 | 37.70–46.65 | black | (mail cut) Closing, after María's: a mail composer (his dark style). To: javier6165@gmail.com (his public contact address, from his site), Subject: Senior Product Designer, body: "Hey, Javier! / Let's *talk.*" (replaces his "Let's build something great together." at María's request). The pointer clicks Send, the window flies off, his address glides to centre with "Sent ✓" above and javierortizalmagro.com beneath | Typed, with a caret per line |
| 19 | 37.70–41.20 | black | (web cut) Let's *talk.* (replaces "Let's build something great together." at María's request) | Both words rise from masks, hold, and fade to black for the loop |


"3 promotions in 5 years." (and its added lead-in "So far:") was removed from Javier's script at María's request.
