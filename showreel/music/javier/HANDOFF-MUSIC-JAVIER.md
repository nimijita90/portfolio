# Handoff: the soundtrack for Javier Ortiz's showreel

To the Claude session receiving this: you are joining a project at its last step. Another Claude session (cloud, no Higgsfield CLI) built the video with María Mora. Your job is **only the music**, exactly as you did for María's own showreel (see `../sonilo/D2/HANDBACK-MUSIC.md`): generate it with the **Higgsfield CLI** (`sonilo_music`), choose the best take with María, and hand back the audio. Talk to María in **Spanish**; keep it short and show her previews instead of describing them. Do **not** use the Higgsfield MCP `generate_audio` tool for music.

## 1. The brief, in María's words

> *"Una música animada, buen rollera, que te emocione al escucharla… quizás un poquito épica… en plan, soy la polla."*

So: **uplifting, feel-good, euphoric, confident, a touch epic**, the kind of track that gives you goosebumps and makes you feel unstoppable. It must still feel premium and modern (the visuals are minimal black-and-white typography), so **not cheesy, not corporate, not a trailer**.

This is deliberately different from María's own track (dark neo-baroque strings). Javier's film should feel **brighter and warmer**.

## 2. The video

- **Javier Ortiz, Senior Product Designer.** The film is ~54.5 s, 1920×1080, 60 fps, all black with ivory type (Instrument Sans) and white line art. It is sent to companies after an interview.
- Kinetic typography, hard cuts, no fades. One live-action shot: Javier turning to camera (8.5 s).
- The silent reference video is sent with this file as `javier-silent.mp4`.

| Wanted | Not wanted |
|---|---|
| A big, catchy, **singable hook** that returns | Vocals of any kind (incl. chopped vocals) |
| Euphoric build-ups and a real **drop** | Dubstep / festival EDM drops |
| Warm synth chords, soaring leads, punchy drums, claps | Epic orchestral trailer drums and "braams" |
| A clear **climax** and a clear **ending** that resolves | Corporate "inspiration" ukulele/piano |
| ~120–124 BPM so the cuts can be locked to the beat | Fades out mid-groove or abrupt cut |

## 3. Cue sheet (exact times in the current cut, 54.45 s)

| Time (s) | Picture | Music should… |
|---|---|---|
| 0.00 | Black; "Hi" is built from its own rectangles; the i's dot lands at **1.14** | Start immediately (no silence); small hit on 1.14 is a bonus |
| 1.9–8.5 | "If you're looking for" → "a Senior Product Designer" → "I think…" → "I know one." | Build anticipation, no full drums yet |
| **8.5** | "I'm Javier Ortiz." + Javier turns to camera | **The drop: drums, bass and hook in** |
| 11.05 | "Designing complex products." (big staircase) | Driving |
| **14.35** | "Bringing together": the two words meet in the middle | **Accent** |
| 15.25–28.15 | "Product Strategy." (flow diagram) → "Systems Thinking." → "AI-Powered Design Workflows." (a chat that answers "You need Javier Ortiz.") | Full, joyful groove with the hook; can lift on each title (15.25, 20.3, 22.85) |
| 28.1–35.4 | "I've learned that great products need" → "clear thinking," → "strong collaboration," → "and thoughtful execution." | **Build**, rising |
| **35.35** | A point bursts into the letters of "complexity", they orbit and snap into "clarity" (~36.7) | **Climax**: the biggest, most epic moment |
| 37.95–39.95 | "is what drives me." | Sustain the climax, anthemic |
| **39.9** | "So, what's next?" (one word at a time) | **Break: near silence**, one held chord |
| 42.95–49.4 | A mail composer: To: javier6165@gmail.com, Subject, "Hey, Javier! Let's talk." typed | Light, playful pulse; tease the hook (bells/plucks) |
| **49.45** | The pointer clicks **Send** | **One big, bright final hit** |
| 49.75–54.45 | The window flies off; his address centred, "Sent ✓" beneath | Warm resolved major chord ringing out to silence |

Generate **57 s** so the tail rings past 54.45. Sonilo tends to ignore exact timestamps (with María's track the kick always arrived at ~23 s); that's fine. What matters is that the **sections and the energy curve** are there. The video session will re-cut the take bar by bar to the picture, as it did with María's D2 (`../edit_d2.py`).

## 4. How to generate

    higgsfield generate cost sonilo_music --prompt "test" --duration 57
    bash higgsfield.sh                     # one take each of prompts A, B, C (~3.5 credits per take)

Prompts:
- **A, euphoric electronic anthem** (`prompt-A.txt`), main recommendation.
- **B, cinematic indie-electronic, heroic** (`prompt-B.txt`).
- **C, swaggering nu-disco/electro-funk** (`prompt-C.txt`), the most "soy la polla".

Ask María before spending more than ~3–4 takes. Iterate on the closest prompt ("more epic", "warmer", "bigger hook", "less busy") rather than starting over.

## 5. Preview and hand back

    ffmpeg -i javier-silent.mp4 -i take-A1.m4a -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest preview-A1.mp4

Hand back the original files of the chosen take(s) (.m4a/.wav), their JSON (prompt, job id) and one line with María's verdict. Put them in `showreel/music/javier/` on branch `claude/optimistic-cori-g5au0p` of `nimijita90/portfolio`, or send them back to the video session, which will lock the cuts to the beat and mix.

## 6. Guardrails

- Instrumental only; discard takes with voice-like sounds.
- Confirm Higgsfield's licence terms allow commercial/professional use of `sonilo_music` output.
- Don't change the video, copy or claims; audio only.
