"""Re-cuts the Sonilo take D2 (music/sonilo/D2/takeD2.m4a) bar by bar so its hits land on the showreel's cuts.

The take is exactly 120 BPM, with downbeats at 1.535 + 2k s. Same method as the handback edit: every cut sits
12 ms before a downbeat with an 8 ms equal-power crossfade, then the track is normalised to -1 dBFS.

In the video (downbeats at 1.35 + 2k s):
  1.35   kick and bass slam in with the over99 logo
  45.35  last big hit and bass fall-away: the "complexity" burst
  47.35  strings only under "I love." and "So, what's next?"
  53.35  the beat returns as the mail window rises
  58.865 the final hit on the Send click; the chord rings out to 62.8 s

    python3 showreel/music/edit_d2.py  ->  showreel/music/score-d2.wav
"""
import subprocess
import wave
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
SRC = HERE / "sonilo" / "D2" / "takeD2.m4a"
OUT = HERE / "score-d2.wav"
SR = 44100
PRE, XF = .012, .008
LENGTH = 62.8

# source spans (seconds); bars start at 1.535 + 2k
SEGMENTS = [
    (0.185, 1.535),    # strings alone, trimmed so the slam lands at 1.35
    (23.535, 35.535),  # bars 11-16: the beat
    (43.535, 59.535),  # bars 21-28: the densest section
    (19.535, 43.535),  # bars 9-20: two extra bars of beat, the last hit (bar 17) and the strings-only break
    (49.535, 51.535),  # bar 23: the beat comes back
    (55.535, 62.97),   # bars 26-29: the final hit and the ringing chord
]

raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(SRC), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"],
                     capture_output=True, check=True).stdout
src = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()

nx = int(XF * SR)
fade_in, fade_out = np.sin(np.linspace(0, np.pi / 2, nx))[:, None], np.cos(np.linspace(0, np.pi / 2, nx))[:, None]
out = np.zeros((0, 2), np.float32)
for k, (a, b) in enumerate(SEGMENTS):
    i0 = int(round((a - (PRE if k else 0)) * SR))
    i1 = min(len(src), int(round((b - PRE) * SR)) + nx) if k < len(SEGMENTS) - 1 else len(src)
    seg = src[i0:i1].copy()
    if k == 0:
        seg[:int(.005 * SR)] *= np.linspace(0, 1, int(.005 * SR))[:, None]  # no click on the trimmed start
    if len(out):
        seg[:nx] = out[-nx:] * fade_out + seg[:nx] * fade_in
        out = np.concatenate([out[:-nx], seg])
    else:
        out = seg

n = int(LENGTH * SR)
out = out[:n] if len(out) >= n else np.concatenate([out, np.zeros((n - len(out), 2), np.float32)])
tail = int(.25 * SR)
end = min(len(out), int(62.785 * SR))
out[end - tail:end] *= np.linspace(1, 0, tail)[:, None]
out[end:] = 0
out *= 10 ** (-1 / 20) / np.abs(out).max()

with wave.open(str(OUT), "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((np.clip(out, -1, 1) * 32767).astype(np.int16).tobytes())
print("wrote", OUT, f"{len(out) / SR:.3f}s")
