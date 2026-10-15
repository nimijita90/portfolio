# Handoff: the soundtrack for María Mora's showreel

To the Claude session receiving this: you are joining a project in its last step. Another Claude session (cloud, no access to Higgsfield) built the whole video with María over several days. Your job is **only the music**: generate it with the Higgsfield CLI (Sonilo), choose the best take with María, and hand the audio back. The other session will then lock the cuts to the beat and do the final mix. Talk to María in **Spanish**. She is a senior designer, not an audio engineer, so keep explanations short and show her things instead of describing them.

---

## 1. The task in one paragraph

Create an **instrumental, 63-second, dynamic and catchy but elegant** track for a 62.4-second portfolio showreel. It must have energy and a hook (María's words: *"dinámica y movida, con los beats que encajen bien, pero elegante, que no desentone con la estética de la brand"*). Use `sonilo_music` through the **Higgsfield CLI** (`~/.local/bin/higgsfield`, already signed in). Do **not** use the Higgsfield MCP `generate_audio` tool. Generate a few takes, check them against the cue sheet below, put each take under the silent video so María can watch it, and return the files she picks.

## 2. Who María is and what the video is for

- **María Mora García:** Design Lead in iGaming, with 10+ years of experience. Contact: design@mariamoragarcia.com.
- **Facts used in the video** (do not invent others): 43 operator brands, 22 launched across 15 markets, 40% faster client delivery, 10+ years.
- **What the showreel is:** a 62-second showreel she will send to companies **after a job interview**, together with a separate personalised "trailer" made with each company's brand. It has to feel confident, premium and memorable, and must not come across as cheesy or salesy.
- **Tone:** editorial, minimal, sure of itself, with a wink of humour at the end (the viewer "sends" her an email saying *Hey, María! Welcome on board.*).

## 3. The visual language (what the music must not clash with)

- **Colour:** always a black background. Ivory text (#f5f4f1), muted grey (#8d8a84), and a single deep-blue halo behind her company logo at the start. It never flashes to white.
- **Type:** Silk Serif (an elegant editorial serif, often in italic) and Onest (a clean sans-serif). Most of the film is **kinetic typography**: words rise from masks, the camera passes along giant words, letters burst and snap into place.
- **Footage:** real product work, mostly dark casino and sportsbook UIs (Nordice, Runar, XSITE, WAND design system), a Figma plugin and a delivery roadmap.
- **Editing:** cuts and pushes, **no fades**, many hard stops on the beat. The pace is quick (scenes last 1–2.5 s) with two breaths: before "I love." and on "So, what's next?". The ending is slower and playful.
- **Feel:** the reference in spirit is a fashion-house campaign film or an Apple keynote opener. Precise, sleek and expensive-looking.

### What this means for the music

| Wanted | Not wanted |
|---|---|
| A clear, catchy **melodic hook** that returns | EDM festival drops, risers into dubstep |
| A tight, dry, punchy groove at ~**120 BPM** (one beat = 0.5 s) | Epic trailer drums, orchestral "hits" |
| Deep sub bass, crisp plucks, refined synths | Guitars, ukulele, whistling, claps-and-"hey" pop |
| Dynamic: builds, peaks, stops on cue, then a light playful ending | Stock "corporate inspiration" piano and strings |
| Dark, minimal, premium (black-and-ivory sound) | Vocals of any kind, including chopped vocal samples |
| A clean musical **ending** that resolves | A track that just fades out mid-groove or cuts abruptly |

## 4. What has been tried before (so you don't repeat it)

1. **A synthesised score made in code** (an early version): María rejected it. *"La música que has elegido no me convence nada."* It sounded like generic synth programming.
2. **A licence-free library track** was discussed but never used: she has no music licence.
3. **A second synthesised score, v2** (current placeholder, made in code, 120 BPM in A minor): it is locked to the cuts, but María explicitly wants a **Higgsfield/Sonilo** track instead. Treat v2 only as a timing reference, not as a sound reference.
4. **Higgsfield via MCP** was blocked for music. That is why the CLI is used, as another Claude on María's computer confirmed: `sonilo_music` takes only `--prompt` and `--duration`, is instrumental, and costs about 3.75 credits per 60 s.

## 5. The cue sheet (exact times in the current cut, 62.4 s)

The video is 1920×1080, 30 fps. Every time below is where the picture changes; the hits that matter most are in **bold**.

| Time (s) | Picture | Music should… |
|---|---|---|
| 0.00 | Black. "Hi." in a giant serif, pulling back | Start immediately, with no long intro and no silence |
| 1.35 | The over99 logo (María's company) builds letter by letter, deep-blue glow behind | Build up |
| **3.0** | The logo's shockwave | **Clean hit** |
| 3.5–9.85 | Typewriter "If you're looking for" → "a Design Lead." → "I think…" → "I know one." | Light ticking pulse (hats), anticipation, no kick yet |
| **9.85** | "I'm María Mora." | **Kick and bass enter**: the groove starts |
| 11.25–17.5 | "10+ years.", "Designing digital products.", "I've learned that great products need" | Groove builds |
| **17.55** | "Evidence." | **Accent** |
| 18.5–21.0 | "40% faster client delivery" plus Figma plugin footage | Riser into the next hit |
| **21.05** | "Direction." → casino footage (Nordice, Runar) | **Full energy, the hook in full** |
| 21–40.6 | Work montage, "Craft.", sportsbook, "43 operator brands.", "22 launched across 15 markets.", 18 operator logos scrolling | Driving and steady; vary every 8 bars; no breakdown |
| 40.6–46.0 | "Product strategy.", "Design systems.", "Design leadership." (a field of lines turning towards one point, then converging) | Peak: an extra layer, rising, with a reverse swell into 46 s |
| **45.95** | The point bursts into the letters of "complexity" | **Big impact plus a short stop** (half a beat of silence), then back in as the letters snap together (~46.8–47.6) |
| 48.55 | "Is the kind of design problem I love." | Drums thin out |
| 49.85–50.65 | The camera zooms into "I love." until it fills the frame | A swell |
| **51.25** | "So, what's next?" | **Near silence**: one held note, a breath |
| 53.6 | A minimal dark email window rises | A light, playful groove returns |
| 54.15–57.72 | Typing: To: design@mariamoragarcia.com → Subject: Design Lead → "Hey, María!" → "*Welcome on board.*" | A ticking, bouncy feel that matches the typing (tease the hook on bell-like sounds) |
| **58.5** | The pointer clicks **Send** | **A bright, satisfying stab** |
| 58.8–60.2 | The window flies off; only the email address stays and glides to the centre; "Sent ✓" | A warm, resolved major chord, with the hook's last notes |
| 62.4 | End | Decayed to silence (generate 63 s so the tail rings) |

Nobody expects the generator to hit these to the millisecond. What matters is that the **sections, the energy curve and the overall length** follow this map. The other session will retime cuts to the beats of the chosen take afterwards.

## 6. How to generate

Check the cost and the CLI first (and check `--help` for any prompt length limit):

    higgsfield generate cost sonilo_music --prompt "test" --duration 63
    higgsfield generate create sonilo_music --help

Generate one take per prompt below. Three takes cost about 12 credits in total; ask María before spending more:

    higgsfield generate create sonilo_music --duration 63 --prompt "<PROMPT>" --wait --json

Each response contains a `result_url` (.m4a); download it. Keep the JSON (job id, prompt) next to each file.

### Prompt A: fashion-film minimal electronic (main recommendation)

> Instrumental, 63 seconds, 120 BPM, A minor. Sleek, elegant and dynamic electronic track for a luxury design-lead portfolio showreel: dark, minimal and confident, like a fashion-house campaign film. Tight dry drums, deep rolling sub bass, crisp plucked synths and one catchy melodic synth hook that keeps returning. Structure: 0-3 s the hook alone on a soft filtered pluck, riser landing on a clean hit at 3 s; 3-10 s ticking hi-hats build anticipation; 10 s kick and deep bass enter, four-on-the-floor groove; 17.5 s accent hit; 21 s full energy, the main hook with drums and bass, driving and steady; 40 s extra shimmering arpeggio, energy rising; 46 s big impact and a short stop, then the groove returns; 48.5 s drums drop out, bass and hook only; 51-53.5 s near silence, one held note; 53.5 s light playful ticking groove with bell-like synths; 58.5 s bright satisfying stab, then a warm major chord ringing out to silence by 63 s. No vocals, no EDM drop, no trailer drums, no guitar, not corporate.

### Prompt B: elegant nu-disco / French-touch (more fun, still premium)

> Instrumental, 63 seconds, 120 BPM. Elegant, glossy nu-disco with a French-touch feel for a luxury design portfolio showreel: catchy, dynamic and stylish, never cheesy. Filtered disco chord stabs, a tight punchy kick, crisp open hats, a melodic synth bass line and one memorable synth hook. Structure: 0-3 s filtered hook building to a hit at 3 s; 3-10 s filtered groove with hats only, filter slowly opening; 10 s kick and bass enter; 21 s filter fully open, the full hook, driving; 40 s extra layer and rising energy; 46 s impact and a short stop, then back in; 48.5 s drums drop, chords and bass only; 51-53.5 s near silence; 53.5 s light playful groove; 58.5 s bright final stab and a warm resolved chord fading to silence by 63 s. No vocals, no EDM drop, no guitar, no trailer drums.

### Prompt C: modern keynote electro-pop (brightest, most "hooky")

> Instrumental, 63 seconds, 120 BPM. Modern, confident electro-pop instrumental, like a premium tech keynote opener: bright, bouncy and catchy but refined and minimal, with dark undertones. Punchy dry drums, snappy claps, a deep bass, bouncy plucks and a big memorable synth lead hook. Structure: 0-3 s the hook on a soft pluck, rising to a hit at 3 s; 3-10 s ticking percussion builds; 10 s kick and bass enter; 21 s the full hook with all drums, driving; 40 s energy peak with an extra layer; 46 s impact and a short stop, then back in; 48.5 s breakdown, drums out; 51-53.5 s near silence; 53.5 s light playful bouncy groove; 58.5 s bright stab and a warm major chord ringing out to silence by 63 s. No vocals, no EDM drop, no guitar, not corporate.

If a take is close but not right, iterate on that prompt (for example "darker", "less busy", "stronger hook", "more bass") rather than starting from scratch.

## 7. How to judge a take before showing it to María

Listen yourself if you can; otherwise analyse. Useful checks (`pip install librosa` if needed):

```python
import librosa, numpy as np
y, sr = librosa.load("take.m4a", sr=None, mono=True)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units="time")
print("tempo", tempo, "length", len(y)/sr)
rms = librosa.feature.rms(y=y)[0]; t = librosa.times_like(rms, sr=sr)
for a, b in [(0,3),(3,10),(10,21),(21,40),(40,46),(46,48.5),(48.5,51),(51,53.5),(53.5,58.5),(58.5,63)]:
    m = (t>=a)&(t<b); print(f"{a:>5}-{b:<5} {20*np.log10(rms[m].mean()+1e-9):6.1f} dB")
onset = librosa.onset.onset_strength(y=y, sr=sr); ot = librosa.times_like(onset, sr=sr)
for hit in [3.0, 9.85, 17.55, 21.05, 45.95, 51.25, 58.5]:
    w = (ot>hit-.4)&(ot<hit+.4); print("hit", hit, "strongest onset at", round(ot[w][onset[w].argmax()],2))
```

A good take:
- is at least 62.4 s long, starts strong, and has a clear ending;
- has an energy curve that matches the section table (quiet → groove → full → peak → stop → breath → light ending);
- has no vocals and a recognisable hook;
- has a tempo near 120 BPM. Not essential, but it makes the re-sync easier.

## 8. Preview for María

Mux each take under the silent video (sent with this file as `showreel-silent.mp4`) so she can judge it with picture:

    ffmpeg -i showreel-silent.mp4 -i takeA.m4a -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest preview-A.mp4

Show her the previews side by side, recommend one in a sentence, and let her pick.

## 9. What to hand back

- The chosen take(s) as the **original files** (.m4a, or .wav if available), not re-encoded, plus the JSON response (prompt, job id) for each.
- One line saying which one María prefers and anything she said about it (e.g. "más oscura", "el final me encanta").
- Do not edit the video itself. The source is an HTML/GSAP composition in the public repo `nimijita90/portfolio`, branch `claude/optimistic-cori-g5au0p`, folder `showreel/` (`index.html`, `STORYBOARD.md`, `MUSIC-BRIEF.md`). You can read it for context, but the final sync and mix happen in the other session.

## 10. Guardrails

- **Licence:** check that Higgsfield's terms allow commercial and professional use of `sonilo_music` output. The video will be sent to companies.
- **Credits:** ask María before going beyond about 3 takes.
- **Keep it instrumental:** if a take has any voice-like sounds, discard it.
- **No new claims:** don't change or add any claims, copy or visuals; this task is audio only.
