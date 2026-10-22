# Javier Ortiz — showreel (adapted from María Mora's)

Source: `javier.html` (same system as `index.html`). Render it with:

    PAGE=javier.html node showreel/render.mjs 1 30 showreel/out/javier.mp4                     # web cut (40.9 s, loops)
    PAGE=javier.html QUERY=end=mail node showreel/render.mjs 1 30 showreel/out/javier-mail.mp4  # cut for sending (47.65 s, mail closing)

**Two cuts.** The web cut ends on "Let's *talk.*", which rises, holds and fades to black so the video can loop. The mail cut keeps the mail closing; open the page with `?end=mail`. Render at 60 fps (`render.mjs 1 60`).

**The dot.** Only Systems Thinking keeps the bouncing square (Instrument Sans' dots are square): it builds the two words and lands as the full stop. The travelling i-dot tried in v14–v16 was removed at María's request.

**Visual identity, taken from javierortizalmagro.com**
- **Theme:** every scene is black (#121514 with #f1f3ed). There is no colour accent and no glow or blur: flat white line art.
- **Type:** Instrument Sans throughout. Display is semibold 600 at −0.045em; statements are medium 500 at −0.035em.
- **Highlights:** a word is highlighted only by italic semibold or by an outline.
- **Labels:** Fragment Mono for the "01 / 03" counters.

Fonts are in `fonts/javier/` (SIL OFL 1.1, licences included). Outlined words use `instrument-sans-latin-600-outline.woff2`, a static 600 instance with its overlapping contours merged (fontTools removeOverlaps), so strokes show no internal joins.

The copy is Javier's script, plus connectors that add no new facts. They are marked "added" below; Javier should approve them. The only footage is in scene 06: `media/javier/javier-turn.webm` (and an `.mp4` fallback), an AI-generated 3 s clip of Javier made from his portrait, supplied by María, mirrored so he first looks towards his name, and cut out of its studio backdrop (rembg isnet-general-use, frame by frame) onto the page black, so there is no halo. Javier must approve its use. Renders drive the clip frame by frame (`syncVid`). `portrait-badge.jpg` (the earlier badge) is kept for reference but no longer used. Every other scene is typographic or line art. Silent for now. Product Strategy is a flat line infographic (style reference: Netlify's "What is Netlify?" film, without its glow); AI-Driven Design is a chat.

| # | Time (s) | Theme | On screen | Motion |
|---|---|---|---|---|
| 01 | 0.00–1.35 | black | Hi | Opens on black: the word rises from its mask while the camera settles, then lifts out of frame (no full stop) |
| 02 | 1.30–2.75 | black | If you're looking for | Typewriter and cursor |
| 03 | 2.70–5.60 | black | a Senior Product Designer | Camera stops on each word, framing it whole (it pulls back as far as the word needs), then pulls back to the line |
| 04 | 5.55–6.95 | black | I think… | Tracking compresses; the dots arrive one by one |
| 05 | 6.90–7.95 | black | I know one. | Extreme close-up punch |
| 06 | 7.90–10.50 | black | I'm Javier Ortiz. | Letters rise from a mask; the full stop pops. On the right Javier (clip, cut out onto the black, no halo) looks towards his name, then turns to camera with a smile; he lifts out of frame with the letters (no fade) |
| 07 | 10.45–12.90 | black | Designing *complex* products. | Masked lines rise; the other lines fade and the camera zooms into "complex" |
| 07b | 12.90–14.70 | black | Bringing together *(added)* | Letter cascade |
| 08 | 14.65–18.85 | black | Product *Strategy.* · 01 / 03 | The structure of his rule-editor flow drawn as a line infographic (no product UI or data): outlined blocks with line icons, skeleton bars and generic Fragment Mono labels (trigger, filter, query, calculate, store, send, tag) build one by one. White wires draw between them, small flat pulses run along the wires, and the camera travels along the flow and pulls back to show it whole |
| 09 | 18.80–21.40 | black | Systems *Thinking.* · 02 / 03 | One white ball falls in and bounces along the line (stretch and squash on each landing). Each landing generates a word, its letters springing out from the impact point: "Systems", then "*Thinking*". Two smaller bounces and it comes to rest as the full stop. Centred, 210 px, no illustration |
| 10 | 21.35–26.35 | black | AI-Driven *Design.* · 03 / 03 | A chat, flat line art. "you": "Find me the best product designer in Spain." is typed in an outlined bubble and sent; the AI avatar (sparkle) appears, three square dots think, and the answer arrives word by word: "There's a brilliant one in Marbella: / *Javier Ortiz.* / Hire him right away." (copy suggested by María; Javier should approve it, including the Marbella reference) |
| 12 | 26.30–28.30 | black | I've learned that great products need | Builds; all dims except "need" |
| 13 | 28.25–29.35 | black | clear thinking, (outline) | Horizontal pass, dive into the comma |
| 14 | 29.30–30.40 | black | strong collaboration, | Perspective roll over an outline ghost |
| 15 | 30.35–31.50 | black | and thoughtful *execution.* | Echo marquee |
| 16 | 31.45–34.05 | black | Turning *complexity* into **clarity** | A point bursts into orbiting letters that snap into the word |
| 16b | 34.05–36.05 | black | is what *drives* me. *(added, completes the line)* | Masked rise, hold, sink |
| 17 | 36.00–38.75 | black | So, what's *next?* | Masked rise and sink |
| 18 | 38.70–47.65 | black | (mail cut) Closing, after María's: a mail composer (his dark style). To: javier6165@gmail.com (his public contact address, from his site), Subject: Senior Product Designer, body: "Hey, Javier! / Let's *talk.*" (replaces his "Let's build something great together." at María's request). The pointer clicks Send, the window flies off, his address glides to centre with "Sent ✓" above and javierortizalmagro.com beneath | Typed, with a caret per line |
| 19 | 38.70–42.20 | black | (web cut) Let's *talk.* (replaces "Let's build something great together." at María's request) | Both words rise from masks, hold, and fade to black for the loop |


"3 promotions in 5 years." (and its added lead-in "So far:") was removed from Javier's script at María's request.
