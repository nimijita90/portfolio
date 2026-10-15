# Showreel music brief

Length: **62.4 s** (the video runs 0:00–1:02.4). Instrumental only, no vocals.

## Direction

Dynamic and catchy, but premium: a confident electronic track with a clear melodic hook that people remember. It should sit between minimal techno and modern fashion-film electronica. Punchy, dry drums, a rolling sub bass, crisp plucks and one memorable synth hook that comes back. It must not sound like EDM festival music, an epic trailer, stock "corporate inspiration" music or ukulele pop. The ending is playful: the viewer writes María an email and clicks Send.

- Tempo: **120 BPM**, 4/4 (one beat is 0.5 s, so cuts can be locked to the grid).
- Key: A minor, lifting to C major for the final chord.
- Reference mood (genre only): fashion-house campaign films, Apple keynote openers, minimal electro-pop.

## Structure, locked to the edit

| Time | Picture | Music |
|---|---|---|
| 0:00–0:03.5 | "Hi." → over99 logo | The hook, played once on a filtered pluck; a short riser lands on a hit at **0:03.0** (logo) |
| 0:03.5–0:09.8 | "If you're looking for a Design Lead… I know one." | Hi-hats and clicks; the pulse starts |
| 0:09.8 | "I'm María Mora." | **Kick and bass enter**; the groove is on |
| 0:11–0:17.5 | 10+ years, products, "I've learned…" | Groove builds, with a riser into the next hit |
| 0:17.5 | "Evidence." | Accent hit |
| 0:21.0 | "Direction." → Nordice / Runar footage | **Full energy: the hook in full**, with bass and drums |
| 0:21–0:40.5 | Work, 43 brands, 22 / 15 markets, logos | Driving and steady, with variation every 8 bars and no breakdown |
| 0:40.5–0:46.0 | Product strategy, design systems, leadership | Peak: an extra arpeggio layer; a reverse swell into **0:45.9** |
| 0:45.9 | "complexity" bursts into letters | Impact plus a short stop (a half-beat of silence), then the groove snaps back as the letters lock |
| 0:48.5 | "Is the kind of design problem I love." | Drums thin out; bass and hook only |
| 0:51.2 | "So, what's next?" | Almost silence: one held note, a breath |
| 0:53.6–0:58.5 | A mail composer types "Hey, María! Welcome on board." | Playful and light: a ticking pluck groove in the rhythm of the typing, with the hook teased |
| **0:58.6** | The pointer clicks **Send** | **Button hit**: a satisfying stab, then the window flies off on a whoosh |
| 0:59.2–1:02.4 | Only the address stays, centred, "Sent ✓" | A warm resolved chord (C major) with the hook's last notes; decays to silence at about 1:02 |

## Prompt for Higgsfield (Sonilo) or another music generator

> Instrumental, 62 seconds, 120 BPM, A minor. Dynamic, catchy, premium electronic for a design lead's portfolio showreel. Punchy dry drums, rolling sub bass, crisp plucks and one memorable synth hook that returns. Starts with the hook alone on a filtered pluck and a riser hitting at 3 s. Hi-hats from 4 s, kick and bass at 10 s, the full hook at 21 s, driving and steady until 46 s, with an extra arpeggio from 40 s. Impact and a half-beat stop at 46 s, then back in. Drums thin out at 48 s, near silence at 51 s. At 54 s a light, playful ticking groove, then a bright stab at 58.6 s and a warm C major chord ringing out to silence by 62 s. No vocals, no EDM drop, no trailer drums, no guitar.

Short version (if the prompt field is limited):

> Instrumental 62s, 120 BPM, A minor. Catchy premium electronic showreel: punchy dry drums, sub bass, plucks, memorable synth hook. Builds from 0–21s, full hook 21–46s, impact + short stop at 46s, breaks down at 51s, playful light groove 54s, bright stab at 58.6s, warm major chord fading out by 62s. No vocals, no EDM drop.

## Library alternative (licence-free)

If the generator cannot follow the structure, a licensed library track works too; Pixabay Music is free for commercial use without attribution. Keywords: *minimal electronic, fashion, catchy, upbeat, 120 bpm, modern, sleek*. Choose a track with a clean ending.

## Generating it with Sonilo (video-to-music)

Sonilo's `video-to-music` scores the silent cut directly, reading its pacing and cuts, while the prompt and timed segments steer style and hit points. Everything is in `music/sonilo/`:

- `prompt.txt`: the overall style (sleek, elegant, 120 BPM, a catchy hook).
- `segments.json`: six timed sections that follow the table above (0, 10, 21, 40, 46 and 53.5 s).
- `run.sh`: the command, with `--prompt-influence 0.6` so the picture leads the timing and the prompt leads the style, `--format wav`, and three variants to choose from.

Run it on a machine that can reach api.sonilo.com:

    pip install sonilo-cli && sonilo login
    bash showreel/music/sonilo/run.sh showreel/out/showreel-silent.mp4   # VARIANTS=1 for the free-trial run

Then drop the chosen `showreel-music.N.wav` into `showreel/audio/` for the mix.

## Delivery

WAV or high-quality MP3, at least 62 s, placed in `showreel/audio/`. The cuts are then fine-tuned to the beat and the track is mixed into the master, with the outro decaying naturally on the email.
