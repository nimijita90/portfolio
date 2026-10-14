"""Showreel score v2: dynamic, hook-led electronic track, 120 BPM, A minor, 62.4 s.

Everything is synthesised here (no samples), so there is nothing to license.
Cue points follow showreel/MUSIC-BRIEF.md and the scene times in index.html.

    python3 showreel/music/compose_v2.py  ->  showreel/music/score-v2.wav
"""
import re
from pathlib import Path

import numpy as np
from scipy.signal import butter, sosfilt, sosfilt_zi
from pedalboard import Pedalboard, Reverb, Delay, Compressor, Limiter, Chorus, HighpassFilter, LowpassFilter, Gain

SR = 44100
DUR = 62.4
N = int(SR * DUR)
rng = np.random.default_rng(7)
HERE = Path(__file__).resolve().parent

# ---------- helpers ----------
NOTE = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}


def hz(name):
    m = re.fullmatch(r"([A-G]#?)(-?\d)", name)
    return 440.0 * 2 ** ((NOTE[m.group(1)] + 12 * (int(m.group(2)) + 1) - 69) / 12)


def bus():
    return np.zeros((2, N), dtype=np.float32)


def place(b, t0, sig, gain=1.0, pan=0.0):
    """Add a mono or stereo signal to bus b at time t0 (seconds)."""
    i = int(round(t0 * SR))
    if i >= N:
        return
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        sig = np.vstack([sig * l * 1.414, sig * r * 1.414])
    j = min(N, i + sig.shape[1])
    s = max(0, -i)
    b[:, max(i, 0):j] += gain * sig[:, s:j - i]


_tables = {}


def table(harm):
    """Band-limited saw wavetable with `harm` harmonics."""
    if harm not in _tables:
        ph = np.arange(4096) / 4096
        k = np.arange(1, harm + 1)[:, None]
        _tables[harm] = (np.sin(2 * np.pi * k * ph) / k).sum(0) * (2 / np.pi)
    return _tables[harm]


def saw(freq, n, phase=0.0):
    harm = max(1, min(256, int(18000 / freq)))
    ph = (phase + np.arange(n) * freq / SR) % 1.0
    return np.interp(ph * 4096, np.arange(4096), table(harm)).astype(np.float32)


def env(n, a, d, s, r_start, r):
    """ADSR as arrays: attack a, decay d to level s, release r beginning at sample r_start."""
    e = np.full(n, s, dtype=np.float32)
    na, nd = max(1, int(a * SR)), max(1, int(d * SR))
    e[:na] = np.linspace(0, 1, na)
    e[na:na + nd] = np.linspace(1, s, len(e[na:na + nd]))
    rs = min(n, int(r_start * SR))
    nr = n - rs
    if nr > 0:
        e[rs:] = e[rs - 1 if rs else 0] * np.exp(-np.arange(nr) / (r * SR))
    return e


def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR * .45) / (SR / 2), output="sos"), x).astype(np.float32)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc / (SR / 2), btype="high", output="sos"), x).astype(np.float32)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo / (SR / 2), hi / (SR / 2)], btype="band", output="sos"), x).astype(np.float32)


def noise(n):
    return rng.standard_normal(n).astype(np.float32)


# ---------- instruments ----------
def pluck(f, dur, bright=1.0):
    n = int((dur + .5) * SR)
    x = .5 * saw(f * 2 ** (-6 / 1200), n) + .5 * saw(f * 2 ** (6 / 1200), n, .3)
    x += .35 * np.sign(np.sin(2 * np.pi * f / 2 * np.arange(n) / SR)).astype(np.float32)  # sub-octave square body
    t = np.arange(n) / SR
    fenv = np.exp(-t / (.09 + .1 * bright))
    y = fenv * lp(x, 1800 + 6500 * bright) + (1 - fenv) * lp(x, 700 + 600 * bright)
    return y * env(n, .003, .18, .25, dur, .12)


def bell(f, dur):
    n = int((dur + 1.4) * SR)
    t = np.arange(n) / SR
    idx = 2.2 * np.exp(-t / .35)
    y = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * 3.5 * t))
    y += .25 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t / .3)
    return (y * np.exp(-t / .9) * env(n, .002, .05, 1, dur + 1.2, .2)).astype(np.float32)


def supersaw(freqs, dur, a=.6, r=1.0, cut=1600):
    n = int((dur + r * 3) * SR)
    out = np.zeros((2, n), np.float32)
    for f in freqs:
        for k, c in enumerate((-14, -8, -3, 0, 3, 8, 14)):
            v = saw(f * 2 ** (c / 1200), n, rng.random())
            out[k % 2] += v
    out = np.vstack([lp(out[0], cut), lp(out[1], cut)]) / (len(freqs) * 4)
    return out * env(n, a, .5, .85, dur, r)


def bass(f, dur):
    n = int((dur + .08) * SR)
    t = np.arange(n) / SR
    sub = np.sin(2 * np.pi * f * t)
    grit = lp(saw(f, n), 380)
    return ((.7 * sub + .6 * grit) * env(n, .004, .08, .8, dur, .03)).astype(np.float32)


def kick(level=1.0):
    n = int(.5 * SR)
    t = np.arange(n) / SR
    f = 46 + 110 * np.exp(-t / .035)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .28)
    y[:120] += np.linspace(1, 0, 120) * .6 * noise(120)  # click
    return (np.tanh(1.6 * y) * level).astype(np.float32)


def clap():
    n = int(.45 * SR)
    x = bp(noise(n), 900, 3200)
    e = np.zeros(n, np.float32)
    for o in (0, .011, .022):
        i = int(o * SR)
        e[i:] += np.exp(-np.arange(n - i) / (.006 * SR)) * .6
    e += np.exp(-np.arange(n) / (.09 * SR)) * .5 * (np.arange(n) > int(.03 * SR))
    return x * e


def hat(open_=False):
    n = int((.32 if open_ else .06) * SR)
    x = hp(noise(n), 7500, 3)
    return x * np.exp(-np.arange(n) / ((.11 if open_ else .014) * SR)) * (.55 if open_ else .5)


def click(f=3200, d=.012):
    n = int(d * 3 * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * np.exp(-t / (d / 3)) + .3 * hp(noise(n), 4000) * np.exp(-t / .003)).astype(np.float32)


def riser(dur, top=9000):
    n = int(dur * SR)
    x = noise(n)
    out = np.zeros(n, np.float32)
    blk = 1024
    for i in range(0, n, blk):
        p = i / n
        fc = 300 * (top / 300) ** p
        seg = x[i:i + blk]
        out[i:i + blk] = bp(seg, fc * .7, min(fc * 1.4, SR * .45), 1)
    return out * np.linspace(0, 1, n) ** 2


def impact(size=1.0):
    n = int(2.5 * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t / .08)) / SR) * np.exp(-t / .32)
    crash = hp(noise(n), 3000) * np.exp(-t / (.32 * size)) * .3
    return ((boom + crash) * size).astype(np.float32)


def whoosh(dur=.55, down=True):
    n = int(dur * SR)
    x = noise(n)
    out = np.zeros(n, np.float32)
    for i in range(0, n, 512):
        p = i / n
        fc = (6000 * (300 / 6000) ** p) if down else (300 * (6000 / 300) ** p)
        out[i:i + 512] = bp(x[i:i + 512], fc * .6, min(fc * 1.6, SR * .45), 1)
    return out * np.sin(np.pi * np.linspace(0, 1, n)) ** 1.5


# ---------- song map ----------
BEAT = .5
BAR = 2.0          # bars start on odd seconds: 1, 3, 5 … so the logo hit (3.0) and "Direction." (21.0) land on bar lines
PROG = {"Am": ["A3", "C4", "E4"], "F": ["F3", "A3", "C4"], "C": ["C4", "E4", "G4"], "G": ["G3", "B3", "D4"], "E": ["E3", "G#3", "B3"]}
ROOT = {"Am": "A1", "F": "F1", "C": "C2", "G": "G1", "E": "E1"}


def chord_at(t):
    if t < 3: return "Am"
    if 19 <= t < 21: return "E"
    if 45 <= t < 47: return "E"
    if t >= 58.5: return "C"
    base = 3 if t < 21 else 21
    return ["Am", "F", "C", "G"][int((t - base) // BAR) % 4]


HOOK_A = [(0, "A4", 2), (3, "C5", 1), (4, "E5", 2), (7, "A5", 1), (8, "G5", 2), (10, "E5", 2), (12, "D5", 1), (14, "E5", 2)]
HOOK_B = [(16, "C5", 2), (19, "D5", 1), (20, "E5", 2), (22, "G5", 2), (24, "E5", 3), (28, "D5", 1), (30, "C5", 2)]
HOOK_B2 = [(16, "C5", 2), (19, "D5", 1), (20, "E5", 2), (22, "D5", 2), (24, "A4", 6)]
S16 = BEAT / 4

drums, bassb, plk, padb, fx, bel, foley = bus(), bus(), bus(), bus(), bus(), bus(), bus()
kicks = []


def in_any(t, spans):
    return any(a <= t < b for a, b in spans)


# hook phrases (4 s each) from bar 1
for ph, t0 in enumerate(np.arange(1.0, 58.5, 4.0)):
    for s, nme, ln in HOOK_A + (HOOK_B2 if ph % 2 else HOOK_B):
        t = t0 + s * S16
        if t >= 58.5 or in_any(t, [(45, 46.5), (51, 53.5)]):
            continue
        if 53.5 <= t < 58.5:  # teased on the bell, first half of each bar only
            if s % 16 < 8:
                place(bel, t, bell(hz(nme), ln * S16), .32, pan=.25 if s % 2 else -.25)
            continue
        bright = 1.0 if (21 <= t < 45 or 46.5 <= t < 48.5) else .35
        g = .64 if t >= 21 else .42
        place(plk, t, pluck(hz(nme), ln * S16, bright), g, pan=-.15 if s % 4 else .15)
# pickup notes before the first bar
place(plk, .5, pluck(hz("E4"), S16 * 2, .3), .35)
place(plk, .75, pluck(hz("G4"), S16 * 2, .3), .35)

# arpeggio layer for the peak (37–45)
for t in np.arange(37.0, 45.0, S16):
    tones = PROG[chord_at(t)]
    k = int(round((t - 37) / S16))
    nme = tones[[0, 1, 2, 1][k % 4]]
    o = int(nme[-1]) + 1
    place(bel, t, bell(hz(nme[:-1] + str(o)), S16 * .8), .12, pan=.5 if k % 2 else -.5)

# pad: one supersaw chord per bar (bars start on odd seconds), split at the section points
cuts = sorted(set([0.0] + list(np.arange(1.0, 58.5, BAR)) + [45.0, 45.5, 46.5, 51.0, 53.5, 58.5]))
for t, nxt in zip(cuts[:-1], cuts[1:]):
    if in_any(t, [(45.5, 46.5), (51, 53.5)]):
        continue
    g = .36 if 21 <= t < 45 else .34
    place(padb, t, supersaw([hz(n) for n in PROG[chord_at(t)]], nxt - t, a=.15 if t > 3 else .8, r=.25, cut=1400 if t < 21 else 2200), g)
place(padb, 51.0, supersaw([hz("A3"), hz("E4")], 2.3, a=.8, r=.6, cut=1100), .45)  # the held breath on "So, what's next?"
place(padb, 58.5, supersaw([hz(n) for n in ("C3", "G3", "C4", "E4", "G4")], 1.4, a=.02, r=1.3, cut=2600), .7)  # final warm chord

# bass
for t in np.arange(10.0, 58.5, S16):
    if in_any(t, [(45.0, 46.5), (51.0, 53.5)]):
        continue
    step = int(round((t - 1) / S16)) % 16
    pat = [2, 3, 6, 7, 10, 11, 14, 15] if t < 53.5 else [2, 6, 10, 14]
    if step in pat:
        r = ROOT[chord_at(t)]
        f = hz(r) * (2 if step in (3, 11) and t < 53.5 else 1)
        place(bassb, t, bass(f, S16 * .9), .4)
place(bassb, 58.5, bass(hz("C2"), 2.6), .6)

# drums
for t in np.arange(0, 58.5, BEAT):
    if (10.0 <= t < 45.0) or (46.5 <= t < 51.0 and t < 48.5) or (53.5 <= t < 58.5):
        lvl = .85 if t < 53.5 else .55
        place(drums, t, kick(lvl), 1.0)
        kicks.append(t)
for t in np.arange(0, 58.5, S16):
    if in_any(t, [(45.0, 46.5), (48.5, 53.5)]) or t < 3.0:
        continue
    step = int(round((t - 1) / S16)) % 16
    acc = .9 if step % 4 == 2 else (.55 if step % 2 == 0 else .35)
    lvl = .35 if t < 10 else (.55 if t < 53.5 else .4)
    place(drums, t, hat(), lvl * acc, pan=.2)
    if t >= 21 and t < 53.5 and step % 4 == 2:
        place(drums, t, hat(True), .32, pan=-.2)
    if 3 <= t < 10 and step in (3, 6, 10, 13):
        place(drums, t, click(2600, .015), .25, pan=-.3)
for t in np.arange(13.0, 53.5, BEAT):
    if (t % 1.0) == .5 and not in_any(t, [(45.0, 46.5), (48.5, 53.5)]):
        place(drums, t, clap(), .55)
# fills
for t in np.arange(9.5, 10.0, S16):
    place(drums, t, clap(), .25 + .5 * (t - 9.5))
for k, t in enumerate(np.arange(20.0, 21.0, S16 / 2)):
    place(drums, t, clap(), .15 + .45 * k / 16)

# transitions and hits
place(fx, 1.5, riser(1.5), .35)
place(fx, 3.0, impact(1.0), .7)
place(fx, 8.0, riser(2.0), .3)
place(fx, 17.5, impact(.6), .45)
place(plk, 17.5, sum(pluck(hz(n), .4, 1) for n in ("A4", "C5", "E5")), .4)
place(fx, 19.0, riser(2.0, 12000), .4)
place(fx, 21.0, impact(.8), .55)
swell = supersaw([hz(n) for n in PROG["E"]], 1.0, a=.9, r=.1, cut=3000)[:, ::-1].copy()  # reverse swell into the burst
place(fx, 45.0, swell[:, -int(1.0 * SR):], .9)
place(fx, 45.0, riser(1.0, 14000), .45)
place(fx, 46.0, impact(1.2), .85)
place(fx, 57.6, riser(.9, 12000), .3)
place(drums, 58.5, kick(1.0), 1.0)
place(fx, 58.5, impact(.5), .4)
place(plk, 58.5, sum(pluck(hz(n), .5, 1) for n in ("C5", "E5", "G5", "C6")), .45)
place(bel, 58.5, bell(hz("C6"), .6), .35)
for t, n in ((59.0, "E5"), (59.25, "D5"), (59.5, "C5")):
    place(bel, t, bell(hz(n), .5), .28)

# foley synced to the closing mail (times mirror scene 31 in index.html)
a31 = 53.6
for txt, t0, step in (("design@mariamoragarcia.com", a31 + .55, .028), ("Design Lead", None, .045), ("Hey, María!", None, .05), ("Welcome on board.", None, .05)):
    if t0 is None:
        t0 = last + (.35 if txt.startswith("Welcome") else .3)
    for i, ch in enumerate(txt):
        if ch != " ":
            place(foley, t0 + i * step, click(rng.uniform(1700, 2600), .008), .13, pan=rng.uniform(-.2, .2))
    last = t0 + len(txt) * step
tc = 58.5
place(foley, tc, click(1300, .01), .5)
place(foley, tc + .06, click(1500, .008), .35)
place(fx, tc + .3, whoosh(.6), .55)

# ---------- mix ----------
# sidechain: duck bass, pad and plucks under each kick
sc = np.ones(N, np.float32)
tt = np.arange(int(.35 * SR)) / SR
duck = 1 - .75 * np.exp(-tt / .11)
for t in kicks:
    i = int(t * SR)
    j = min(N, i + len(duck))
    sc[i:j] = np.minimum(sc[i:j], duck[:j - i])
bassb *= sc
padb *= sc
plk *= (.55 + .45 * sc)

# intro filter: the hook opens up from 1 s to 21 s, then is fully bright
out = np.zeros_like(plk)
blk = 2048
zi = None
for i in range(0, N, blk):
    t = i / SR
    fc = 20000 if t >= 21 else 900 * (5500 / 900) ** max(0, (t - 1) / 20)
    sos = butter(2, min(fc, SR * .45) / (SR / 2), output="sos")
    if zi is None:
        zi = np.stack([sosfilt_zi(sos) * 0, sosfilt_zi(sos) * 0])
    for ch in range(2):
        out[ch, i:i + blk], zi[ch] = sosfilt(sos, plk[ch, i:i + blk], zi=zi[ch])
plk = out.astype(np.float32)

fxchain = {
    "plk": Pedalboard([Delay(delay_seconds=.375, feedback=.32, mix=.22), Reverb(room_size=.55, wet_level=.18, dry_level=.9, width=1)]),
    "bel": Pedalboard([Delay(delay_seconds=.375, feedback=.3, mix=.25), Reverb(room_size=.75, wet_level=.3, dry_level=.85)]),
    "pad": Pedalboard([Chorus(rate_hz=.4, depth=.3, mix=.4), Reverb(room_size=.8, wet_level=.3, dry_level=.8)]),
    "drums": Pedalboard([Compressor(threshold_db=-14, ratio=3, attack_ms=5, release_ms=80), Reverb(room_size=.25, wet_level=.06, dry_level=1)]),
    "bass": Pedalboard([LowpassFilter(cutoff_frequency_hz=900), Compressor(threshold_db=-12, ratio=4)]),
    "fx": Pedalboard([Reverb(room_size=.6, wet_level=.25, dry_level=.85)]),
    "foley": Pedalboard([HighpassFilter(cutoff_frequency_hz=900), Reverb(room_size=.2, wet_level=.08, dry_level=1)]),
}
mix = (fxchain["plk"](plk, SR) * .9 + fxchain["bel"](bel, SR) + fxchain["pad"](padb, SR) * .55 + fxchain["drums"](drums, SR) * .8
       + fxchain["bass"](bassb, SR) * .85 + fxchain["fx"](fx, SR) * .6 + fxchain["foley"](foley, SR) * .8)

# half-beat stop after the "complexity" impact: everything but the impact tail drops out 46.05–46.5
i0, i1 = int(46.05 * SR), int(46.5 * SR)
keep = fxchain["fx"](fx, SR)[:, i0:i1] * .6
mix[:, i0:i1] = keep

# gentle fade at the very end
nf = int(1.2 * SR)
mix[:, -nf:] *= np.linspace(1, 0, nf) ** 2

# section dynamics: quiet intro, lift at the kick, full chorus, breath, light playful ending
pts = [(0, .55), (3, .5), (9.9, .5), (10, .78), (20.9, .8), (21, 1.0), (45, 1.0), (46.5, 1.0), (48.4, 1.0), (48.6, .72), (51, .62), (53.5, .62), (53.6, .66), (58.4, .7), (58.5, .95), (DUR, .95)]
ga = np.interp(np.arange(N) / SR, [p[0] for p in pts], [p[1] for p in pts]).astype(np.float32)
mix *= ga

master = Pedalboard([HighpassFilter(cutoff_frequency_hz=28), Compressor(threshold_db=-10, ratio=2, attack_ms=20, release_ms=200), Gain(gain_db=1.5), Limiter(threshold_db=-1.2, release_ms=120)])
mix = master(mix.astype(np.float32), SR)
mix /= max(1e-6, np.abs(mix).max()) / .89

import wave
pcm = (np.clip(mix.T, -1, 1) * 32767).astype(np.int16)
with wave.open(str(HERE / "score-v2.wav"), "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", HERE / "score-v2.wav", f"{DUR}s")
