# Javier Ortiz — showreel (adapted from María Mora's)

Source: `javier.html` (same system as `index.html`). Render it with:

    PAGE=javier.html node showreel/render.mjs 1 30 showreel/out/javier.mp4                     # web cut (40.9 s, loops)
    PAGE=javier.html QUERY=end=mail node showreel/render.mjs 1 30 showreel/out/javier-mail.mp4  # cut for sending (46.85 s, mail closing)

**Two cuts.** The web cut ends on "Let's build something great *together.*" and loops: its last frame (a square dot at 676 px, centred) is the first frame of "Hi." (the dot of the i at 7×). The mail cut keeps the mail closing; open the page with `?end=mail`.

**The ball.** The dot of the i in "Javier" travels through the film. Instrument Sans' dots are squares, so the ball is a square too: when it lands it *is* the glyph's dot (sizes and positions come from the font's outlines, `BL` in the source). Route: it hops off the i of "Hi." (leaving it bare), leaves the three dots of "I think…", lands as the dot of the i in "Javier", runs the wires of Product Strategy, builds "Systems *Thinking.*", hops through the toolchain in AI-Driven Design, bursts into the letters of "complexity", becomes the dot of "next?" and, in the web cut, the full stop of "together.", then grows into the opening dot.

**Visual identity, taken from javierortizalmagro.com**
- **Theme:** every scene is black (#121514 with #f1f3ed). There is no colour accent and no glow or blur: flat white line art.
- **Type:** Instrument Sans throughout. Display is semibold 600 at −0.045em; statements are medium 500 at −0.035em.
- **Highlights:** a word is highlighted only by italic semibold or by an outline.
- **Labels:** Fragment Mono for the "01 / 03" counters.

Fonts are in `fonts/javier/` (SIL OFL 1.1, licences included). Outlined words use `instrument-sans-latin-600-outline.woff2`, a static 600 instance with its overlapping contours merged (fontTools removeOverlaps), so strokes show no internal joins.

The copy is Javier's script, plus connectors that add no new facts. They are marked "added" below; Javier should approve them. The only image is his portrait (`media/javier/portrait-badge.jpg`, a crop of `hero-system.jpg` from his site) on the badge in scene 06; every other scene is typographic or line art. Silent for now. Product Strategy is a flat line infographic (style reference: Netlify's "What is Netlify?" film, without its glow); AI-Driven Design is a hub-and-spoke map after "how AI agents work" diagrams.

| # | Time (s) | Theme | On screen | Motion |
|---|---|---|---|---|
| 01 | 0.00–1.35 | black | Hi. | Opens on the square dot of the i at 7×, pulls back to the word; the dot hops off and leaves the i bare |
| 02 | 1.30–2.75 | black | If you're looking for | Typewriter and cursor |
| 03 | 2.70–5.60 | black | a Senior Product Designer | Camera stops on each word, then pulls back to the line |
| 04 | 5.55–6.95 | black | I think… | Tracking compresses; the ball bounces three times and each bounce leaves one of the dots |
| 05 | 6.90–7.95 | black | I know one. | Extreme close-up punch |
| 06 | 7.90–10.50 | black | I'm Javier Ortiz. | Letters rise from a mask with a bare i; the ball drops onto it and settles as its dot. A lanyard badge with his portrait, name and "Senior Product Designer" drops in on the right and swings to rest |
| 07 | 10.45–12.90 | black | Designing *complex* products. | Masked lines rise; the other lines fade and the camera zooms into "complex" |
| 07b | 12.90–13.90 | black | Bringing together *(added)* | Letter cascade |
| 08 | 13.85–18.05 | black | Product *Strategy.* · 01 / 03 | The structure of his rule-editor flow drawn as a line infographic (no product UI or data): outlined blocks with line icons, skeleton bars and generic Fragment Mono labels (trigger, filter, query, calculate, store, send, tag) build one by one. White wires draw between them, the ball runs along the wires and hops over each block, and the camera travels along the flow and pulls back to show it whole |
| 09 | 18.00–20.60 | black | Systems *Thinking.* · 02 / 03 | One white ball falls in and bounces along the line (stretch and squash on each landing). Each landing generates a word, its letters springing out from the impact point: "Systems", then "*Thinking*". Two smaller bounces and it comes to rest as the full stop. Centred, 210 px, no illustration |
| 10 | 20.55–24.55 | black | AI-Driven *Design.* · 03 / 03 | His toolchain as a hub-and-spoke map: the AI sparkle in the centre, his tools in dotted groups — design (Figma, FigJam), build (Claude, Codex, Higgsfield), ship & learn (FullStory, Jira, Confluence). Line icons and names only, no brand logos. The ball hops tool to tool, each lights up as it lands, and it ends on the hub |
| 12 | 24.50–26.50 | black | I've learned that great products need | Builds; all dims except "need" |
| 13 | 26.45–27.55 | black | clear thinking, (outline) | Horizontal pass, dive into the comma |
| 14 | 27.50–28.60 | black | strong collaboration, | Perspective roll over an outline ghost |
| 15 | 28.55–29.70 | black | and thoughtful *execution.* | Echo marquee |
| 16 | 29.65–32.25 | black | Turning *complexity* into **clarity** | The ball drops in and bursts into orbiting letters that snap into the word |
| 16b | 32.25–34.25 | black | is what *drives* me. *(added, completes the line)* | Masked rise, hold, sink |
| 17 | 34.20–36.95 | black | So, what's *next?* | Masked rise and sink; the ball lands as the dot of the question mark and leaps off as the words sink |
| 18 | 36.90–46.85 | black | (mail cut) Closing, after María's: a mail composer (his dark style). To: javier6165@gmail.com (his public contact address, from his site), Subject: Senior Product Designer, body: "Hey, Javier! / Let's build something / great *together.*" (his own closing line). The pointer clicks Send, the window flies off, his address glides to centre with "Sent ✓" above and javierortizalmagro.com beneath | Typed, with a caret per line |
| 19 | 36.90–40.90 | black | (web cut) Let's build something / great *together.* | The first line rises; the ball falls in and each landing springs a word out ("great", "together"), it settles as the full stop, the text fades and the dot glides to centre and grows into the opening frame |


"3 promotions in 5 years." (and its added lead-in "So far:") was removed from Javier's script at María's request.
