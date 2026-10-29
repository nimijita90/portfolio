# Company cuts of María's showreel: the template

María's standing instruction (29 Oct 2026): **every new job application starts from `maria-dna.html`.**
Copy it, change only the per-company parts below, preview, and export only once she approves.

## What stays as it is

The structure is 62.8 s on `music/score-d2.m4a`, with no music re-edit. The order is:

1. Hi.
2. **[company logo]**
3. If you're looking for… a Lead Product Designer.
4. I think. I know one. I'm María Mora.
5. 10+ years. The number sits inside the frame; it must not be cropped at the top.
6. Designing digital products. Uses the XSITE casino page.
7. "I've learned that great products need". No dimming of the other words.
8. Evidence, Direction.
9. Nordice. The entrance shot only; the couple shot is not in this cut.
10. Runar.
11. Craft, Cashier and XSITE Sportsbook, then the XSITE lobby + sign-up scene.
12. My work spans… 7 designers led. / 22 branded sites launched. / 5 design systems managed.
13. Logos, then the remaining scenes.
14. The mail closing.

Do not remove or swap images or footage that María has not asked about. Ask first.

## What changes per company

| What | Where in the file | Notes |
|---|---|---|
| Logo | `#s01b` markup + the `// 01b` block (lands on the first hit at 1.35 s, exits `x: -1900` at `a + 1.85`) | Rebuild the logo as clean vector shapes or trace it. Ivory on black; brand colours are allowed. Never invent a logo; ask for the official SVG. If the brand has a video or colour world, it can live inside the letters (see the DNA colour field). |
| Role | `#dlStrip` spans + one `stop("#id")` per word in `// 03` | The camera stops on each word. Long words are framed whole automatically. |
| Mail subject | `typeIn("#mSub", …)` | Speed up the step for long titles. |
| Mail body | `#mBody1` "Hey, María!" → `#mBody2` wink line → `#mBody3` "Let's talk." | Base the wink on the company's real tagline. Look it up on their site and never make one up; if none is found, propose options to María. Keep each line short enough to fit the card. Each line has its own text cursor (`#mBodyC1`, `#mBodyC2`, `#mBodyC`). |
| Title | `<title>[Company cut] …` | |

**Timing check for the mail.** Typing must finish before the pointer sets off at `tc − .75`, and the Send click stays at `tc = a + 5.68`, which is 59.03 s, the final hit. The card fades as it flies so it never crosses the address.

## Workflow María asked for

1. `cp maria-dna.html maria-<company>.html`, then edit the parts above. Put assets in `media/<company>/`.
2. Check stills with `scratchpad/shots.mjs`, which jump-seeks; the real render is always correct.
3. **Quick preview first.** Use low quality and send one file only:
   `PAGE=maria-<company>.html node render.mjs 0.5 30 out/preview-<company>-silent.mp4`
   Then mux it with `music/score-d2.m4a` using `-c:v copy -c:a aac -b:a 128k -shortest`.
4. When she says it's good, run the full export:
   `node render.mjs 1 30 out/maria-<company>-silent.mp4`
   Then mux with `-c:v libx264 -crf 16 -preset slow -tune animation -c:a aac -b:a 256k -shortest -movflags +faststart` to make `out/maria-<company>-1080p.mp4`.
5. Lighter versions on request:
   - ≤10 MB: two-pass x264 at about 1050k video and 128k audio.
   - About 2 MB: 720p, 2-pass at about 195k video and 48k audio.

## Lessons from her feedback

- Ask before changing content. She decides; propose options with a recommendation.
- No blur on graphics, no dimming of text, no fades between shots of people.
- Client websites are usually blocked by this session's network. Ask her to upload assets or allow the domain.
- Never fabricate slogans, metrics, logos or footage.
