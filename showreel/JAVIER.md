# Javier Ortiz — showreel (adapted from María Mora's)

Source: `javier.html` (same system as `index.html`). Render it with:

    PAGE=javier.html node showreel/render.mjs 1 60 showreel/out/javier.mp4                     # the film (52.75 s, mail closing)
    PAGE=javier.html QUERY=end=web node showreel/render.mjs 1 60 showreel/out/javier-web.mp4   # optional short loop that closes on "Let's talk."

**One film.** It closes on the mail. A short loopable variant that ends on "Let's *talk.*" is kept behind `?end=web`, but only the mail film is exported.

**The dot.** Only Systems Thinking keeps the bouncing square (Instrument Sans' dots are square): it builds the two words and lands as the full stop. The travelling i-dot tried in v14–v16 was removed at María's request.

**Visual identity, taken from javierortizalmagro.com**
- **Theme:** every scene is black (#121514 with #f1f3ed). There is no colour accent and no glow or blur: flat white line art.
- **Type:** Instrument Sans throughout. Display is semibold 600 at −0.045em; statements are medium 500 at −0.035em.
- **Highlights:** a word is highlighted only by italic semibold or by an outline.
- **Labels:** Fragment Mono for small UI labels (the section counters were removed).

Fonts are in `fonts/javier/` (SIL OFL 1.1, licences included). Outlined words use `instrument-sans-latin-600-outline.woff2`, a static 600 instance with its overlapping contours merged (fontTools removeOverlaps), so strokes show no internal joins.

The copy is Javier's script, plus connectors that add no new facts. They are marked "added" below; Javier should approve them. The only footage is in scene 06: `media/javier/javier-turn.webm` (and an `.mp4` fallback), an AI-generated 3 s clip of Javier made from his portrait, supplied by María, mirrored so he first looks towards his name, and cut out of its studio backdrop (rembg isnet-general-use, frame by frame) onto the page black, so there is no halo. Javier must approve its use. Renders drive the clip frame by frame (`syncVid`). `portrait-badge.jpg` (the earlier badge) is kept for reference but no longer used. Every other scene is typographic or line art. Silent for now. Product Strategy is a flat line infographic (style reference: Netlify's "What is Netlify?" film, without its glow); AI-Driven Design is a chat.

| # | Time (s) | Theme | On screen | Motion |
|---|---|---|---|---|
| 01 | 0.00–1.95 | black | Hi | Opens on black and assembles the word from its own rectangles (Instrument Sans' H and i are nothing but rectangles): the left stem shoots up, the right one drops in, the bar spans them, the i rises and its square dot falls into place with a squash; the camera eases in, then the word lifts out |
| 02 | 1.90–3.35 | black | If you're looking for | Typewriter and cursor |
| 03 | 3.30–6.20 | black | a Senior Product Designer | Camera stops on each word, framing it whole (it pulls back as far as the word needs), then pulls back to the line |
| 04 | 6.15–7.55 | black | I think… | Tracking compresses; the dots arrive one by one |
| 05 | 7.50–8.55 | black | I know one. | Extreme close-up punch |
| 06 | 8.50–11.10 | black | I'm Javier Ortiz. | Letters rise from a mask; the full stop pops. On the right Javier (clip, cut out onto the black, no halo) looks towards his name, then turns to camera with a smile; the shot holds and simply cuts to the next scene |
| 07 | 11.05–13.50 | black | Designing *complex* products. | Masked lines rise; the other lines fade and the camera zooms into "complex" |
| 07b | 13.50–15.30 | black | Bringing together *(added)* | Letter cascade |
| 08 | 15.25–20.35 | black | Product *Strategy.* | The title lands big and centred letter by letter, then glides to its place; the structure of his rule-editor flow drawn as a line infographic (no product UI or data): outlined blocks with line icons, skeleton bars and generic Fragment Mono labels (trigger, filter, query, calculate, store, send, tag) build one by one. White wires draw between them, small flat pulses run along the wires, and the camera travels along the flow and pulls back to show it whole |
| 09 | 20.30–22.90 | black | Systems *Thinking.* | One white ball falls in and bounces along the line (stretch and squash on each landing). Each landing generates a word, its letters springing out from the impact point: "Systems", then "*Thinking*". Two smaller bounces and it comes to rest as the full stop. Centred, 210 px, no illustration |
| 10 | 22.85–27.85 | black | AI-Driven *Design.* | A chat, flat line art. "you": "Find me the best product designer in Spain." is typed in an outlined bubble and sent; the AI avatar (sparkle) appears, three square dots think, and the answer arrives word by word: "There's a brilliant one in Marbella: / *Javier Ortiz.* / Hire him right away." (copy suggested by María; Javier should approve it, including the Marbella reference) |
| 12 | 27.80–29.80 | black | I've learned that great products need | The sentence builds word by word |
| 13 | 29.75–30.85 | black | clear thinking, (outline) | Horizontal pass, dive into the comma |
| 14 | 30.80–31.90 | black | strong collaboration, | Perspective roll over an outline ghost |
| 15 | 31.85–33.70 | black | and thoughtful *execution.* | Echo marquee |
| 16 | 33.65–36.25 | black | Turning *complexity* into **clarity** | A point bursts into orbiting letters that snap into the word |
| 16b | 36.25–38.25 | black | is what *drives* me. *(added, completes the line)* | Masked rise, hold, sink |
| 17 | 38.20–41.30 | black | So, what's *next?* | One word at a time, alone, big and centred: "So," → "what's" → "*next?*"; then "next?" glides into the line as "So," and "what's" appear in place |
| 18 | 41.25–52.75 | black | Closing, after María's: a mail composer (his dark style). To: javier6165@gmail.com (his public contact address, from his site), Subject: Senior Product Designer, body: "Hey, Javier! / Let's *talk.*" (replaces his "Let's build something great together." at María's request). The pointer clicks Send, the window flies off, his address glides to centre with "Sent ✓" beneath — nothing else | Typed at a calm pace, with a caret per line; the final frame holds |


"3 promotions in 5 years." (and its added lead-in "So far:") was removed from Javier's script at María's request.
