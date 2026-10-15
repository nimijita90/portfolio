# Handback: the music for María's showreel

**Chosen track:** `showreel-music-D2-edit.wav` (WAV, 44.1 kHz, 24-bit, stereo, 63.0 s, peak −1 dBFS).
**María's verdict:** *"me gusta mucho, mucho, mucho"*. She picked it clearly over every other take (A, B, C, A2, D, D3, D4, E, F, plus two 150 s takes, L1 and L2, that were also edited).
She preferred the D style: neo-baroque, like Vivaldi recomposed by Max Richter for a Dior runway, with staccato strings, harpsichord, marcato cellos and an electronic kick. Her one firm note was that **the beat has to slam in when the over99 logo appears, not build up slowly**.

## How it was made
- Generator: Higgsfield CLI `sonilo_music`, 63 s. Job `source-take/takeD2.json` (prompt in `promptD2.txt`, original file `takeD2.m4a`).
- Sonilo ignored the timestamps in the prompts: the steady kick always arrived at ~23 s. So the track was **re-edited by bar** (it is exactly 120.00 BPM, with the bar grid on the source at 1.535 + 2k s). Each cut sits 12 ms before a downbeat, with an 8 ms equal-power crossfade.
- Edit list (source seconds → in order): `0–1.535 | 23.535–35.535 | 43.535–59.535 | 23.535–43.535 | 49.535–62.97`. After that: normalised to −1 dBFS, a 0.25 s fade on the tail and padded to 63.0 s.
- Licence: still to be confirmed against Higgsfield's terms for commercial use (see the guardrails in the original handoff).

## Map of the edited track (times in the WAV)
- **Tempo:** 120 BPM. **Downbeats at 1.535 + 2k s** (1.535, 3.535, 5.535 …). Beats every 0.5 s from 0.035.
- **0.00–1.54:** staccato strings alone (the "Hi.").
- **1.54:** the kick and bass slam in. This is the strongest onset of the opening, made for the over99 logo.
- **1.54–41.5:** a driving beat with strings and harpsichord. Section changes at **13.535** and **29.535**. Each has a ~0.3 s bass dip just before it (13.61 and 29.73), which works like a drum break. The material at 13.5–29.5 is the densest part.
- **41.53:** last strong hit before the break. **42–44:** the bass and kick fade out. **44–49.5:** strings only, a breather. This is where "complexity" / "I love." / "So, what's next?" fall. **The break arrives about 2.5 s earlier than the old cue at 45.95.**
- **49.54:** the beat comes back in hard (a good candidate for the email window / typing).
- **59.05:** the final hit and the resolved chord, made for the **Send** click. The old cue was 58.5.
- **~61.9:** below −40 dBFS; silent at 63.0.

## Suggested sync
Move the "complexity" burst and the stop near **41.5–44**, put "So, what's next?" in the strings-only breather (44–49.5), let the email window and typing ride the return at **49.54**, and put the Send click on **59.05**.
