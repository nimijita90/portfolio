"""Original score for the showreel, synthesised from scratch (no samples, no third-party audio).

Minimal premium electronic, 120 BPM, A minor, locked to the scene times in index.html.
Usage: python3 showreel/music/compose.py <out.wav>
"""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100
BPM = 120
BEAT = 60 / BPM            # 0.5 s
BAR = 4 * BEAT             # 2 s
LENGTH = 60.25             # video length (s)
N = int(SR * (LENGTH + 0.5))
rng = np.random.default_rng(7)

# key moments from the edit (s)
LOGO_HIT = 3.0
KICK_IN = 10.0
EVIDENCE = 17.5
FULL = 21.0
ARP_IN = 40.5
DRUMS_OUT = 47.5
SWELL = 51.0
QUIET = 52.4
OUTRO = 54.75

def hz(note):
    names = {"C": -9, "C#": -8, "D": -7, "D#": -6, "E": -5, "F": -4, "F#": -3, "G": -2, "G#": -1, "A": 0, "A#": 1, "B": 2}
    name, octave = note[:-1], int(note[-1])
    return 440.0 * 2 ** ((names[name] + 12 * (octave - 4)) / 12)

def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)

def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)

def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], "band", fs=SR, output="sos"), x)

def place(buf, sig, t, gain=1.0):
    i = int(t * SR)
    if i >= len(buf):
        return
    sig = sig[: len(buf) - i]
    buf[i : i + len(sig)] += sig * gain

def tt(d):
    return np.arange(int(d * SR)) / SR

# ---------- instruments ----------
def kick():
    t = tt(0.45)
    f = 45 + 95 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t * 7.5)
    click = lp(rng.standard_normal(len(t)), 3500) * np.exp(-t * 260) * 0.25
    return np.tanh((body + click) * 1.6) * 0.9

def hat(open_=False):
    t = tt(0.25 if open_ else 0.06)
    n = hp(rng.standard_normal(len(t)), 7500, 4)
    return n * np.exp(-t * (14 if open_ else 75)) * 0.35

def click():
    t = tt(0.03)
    return bp(rng.standard_normal(len(t)), 1800, 5000) * np.exp(-t * 180) * 0.5

def clap():
    t = tt(0.35)
    n = bp(rng.standard_normal(len(t)), 900, 6000)
    env = np.exp(-t * 18)
    for k in (0.0, 0.011, 0.022):  # three quick bursts
        env += np.exp(-np.clip(t - k, 0, None) * 160) * (t >= k) * 0.7
    return n * env * 0.32

def felt_piano(f, dur, vel=1.0):
    t = tt(dur)
    out = np.zeros_like(t)
    for k, a in enumerate([1, .45, .22, .12, .06, .03], start=1):
        inh = f * k * (1 + 0.0004 * k * k)
        out += a * np.sin(2 * np.pi * inh * t) * np.exp(-t * (1.2 + 1.6 * k))
    att = np.minimum(1, t / 0.006)
    hammer = lp(rng.standard_normal(len(t)), 2200) * np.exp(-t * 90) * 0.04
    return lp((out * att + hammer) * vel, 3800) * 0.45

def pluck(f, dur, bright=2400):
    t = tt(dur)
    saw = 2 * ((f * t) % 1) - 1
    saw += 2 * ((f * 1.004 * t) % 1) - 1
    env = np.exp(-t * 9)
    return lp(saw * env, bright) * 0.12

def sub(f, dur):
    t = tt(dur)
    env = np.minimum(1, t / 0.01) * np.minimum(1, (dur - t) / 0.03).clip(0, 1)
    return np.sin(2 * np.pi * f * t) * env * 0.55

def pad(freqs, dur, cutoff=1400):
    t = tt(dur)
    out = np.zeros_like(t)
    for f in freqs:
        for d in (-0.006, 0, 0.007):
            out += 2 * ((f * (1 + d) * t + rng.random()) % 1) - 1
    env = np.minimum(1, t / 0.9) * np.minimum(1, (dur - t) / 0.9).clip(0, 1)
    return lp(out * env, cutoff, 2) * 0.035

def riser(dur):
    t = tt(dur)
    n = rng.standard_normal(len(t))
    out = np.zeros_like(t)
    seg = int(0.05 * SR)
    for i in range(0, len(t), seg):  # sweep a band-pass upwards
        c = 300 + 5000 * (i / len(t)) ** 2
        out[i : i + seg] = bp(n[i : i + seg + 200], c * 0.7, c * 1.3)[: len(out[i : i + seg])]
    return out * (t / dur) ** 2 * 0.25

def boom():
    t = tt(2.0)
    f = 38 + 50 * np.exp(-t * 6)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2) * 0.7

# ---------- harmony ----------
# i – VI – III – v, one chord per bar
CHORDS = [("A", ["A3", "C4", "E4"]), ("F", ["F3", "A3", "C4"]), ("C", ["C4", "E4", "G4"]), ("E", ["E3", "G3", "B3"])]
ROOT = {"A": "A1", "F": "F1", "C": "C2", "E": "E1"}
MOTIF = [("E5", 0, 1), ("C5", 1, .5), ("D5", 1.5, .5), ("E5", 2, 1), ("A4", 3, 1),
         ("G4", 4, 1), ("A4", 5, .5), ("C5", 5.5, 1.5), ("B4", 7, 1)]  # beats over 2 bars

def chord_at(t):
    return CHORDS[int(t // BAR) % 4]

# ---------- arrangement ----------
dry = np.zeros((2, N))
wet_send = np.zeros(N)
duck = np.ones(N)

def L(sig, t, g=1.0, pan=0.0, send=0.0):
    l, r = np.sqrt(0.5 * (1 - pan)), np.sqrt(0.5 * (1 + pan))
    place(dry[0], sig, t, g * l * 1.414)
    place(dry[1], sig, t, g * r * 1.414)
    if send:
        place(wet_send, sig, t, g * send)

# 0–3: motif alone + riser into the logo hit
for bar0 in (0.0,):
    for note, b, d in MOTIF[:5]:
        L(felt_piano(hz(note), d * BEAT + 1.2, .8), bar0 + b * BEAT * 0.75, .9, -.15, .6)
L(riser(2.4), LOGO_HIT - 2.4, .9, 0, .4)
L(boom(), LOGO_HIT, .9, 0, .5)
L(felt_piano(hz("A3"), 3.0, 1.0), LOGO_HIT, .8, 0, .7)

# beat grid
steps = np.arange(0, DRUMS_OUT, BEAT / 4)
for s in steps:
    i16 = int(round(s / (BEAT / 4)))
    if 3.5 <= s < DRUMS_OUT:  # hats / clicks
        accent = 1.0 if i16 % 2 == 0 else 0.55
        if s < KICK_IN:
            if i16 % 2 == 0:
                L(click() if i16 % 8 == 4 else hat(), s, .6 * accent, .25)
        else:
            L(hat(open_=(i16 % 4 == 2 and s >= FULL)), s, .75 * accent, .3)
    if KICK_IN <= s < DRUMS_OUT and i16 % 4 == 0:
        L(kick(), s, 1.0)
        i = int(s * SR)
        env = 1 - 0.55 * np.exp(-np.arange(int(.25 * SR)) / SR * 16)
        duck[i : i + len(env)] = np.minimum(duck[i : i + len(env)], env)
    if FULL <= s < DRUMS_OUT and i16 % 16 in (4, 12):
        L(clap(), s, .8, -.1, .35)
    if KICK_IN <= s < FULL and i16 % 16 == 12:
        L(click(), s, .9, -.3, .3)

# accents
L(riser(1.6), EVIDENCE - 1.6, .6, 0, .3)
L(clap(), EVIDENCE, 1.0, 0, .8)
L(boom(), EVIDENCE, .5, 0, .3)
L(riser(2.0), FULL - 2.0, .8, 0, .4)
L(boom(), FULL, .8, 0, .4)

# motif returns through the film
for bar0 in np.arange(10.0, DRUMS_OUT, 2 * BAR):
    lvl = .55 if bar0 < FULL else .7
    for note, b, d in MOTIF:
        L(felt_piano(hz(note), d * BEAT + .6, .9), bar0 + b * BEAT, lvl, -.2, .45)

# bass + plucks from FULL
pattern = [0, .75, 1.5, 2, 2.75, 3.5]  # beats within the bar
for bar0 in np.arange(FULL, DRUMS_OUT + 4 * BAR, BAR):
    name, notes = chord_at(bar0)
    rootf = hz(ROOT[name])
    if bar0 < DRUMS_OUT:
        for b in pattern:
            L(sub(rootf, BEAT * .7), bar0 + b * BEAT, .9)
            L(pluck(rootf * 2, BEAT * .6, 900), bar0 + b * BEAT, .7)
        for k, b in enumerate([.5, 1.5, 2.5, 3.5]):
            L(pluck(hz(notes[k % 3]) * 2, BEAT * .5), bar0 + b * BEAT, .55, .35 if k % 2 else -.35, .3)

# pad from KICK_IN to the swell, sustained bass after the drums drop
for bar0 in np.arange(KICK_IN, SWELL + BAR, BAR):
    name, notes = chord_at(bar0)
    L(pad([hz(n) for n in notes], BAR + 1.0, 1100 if bar0 < FULL else 1700), bar0, 1.0, 0, .5)
for bar0 in np.arange(DRUMS_OUT, QUIET, BAR):
    name, _ = chord_at(bar0)
    t = tt(BAR)
    L(sub(hz(ROOT[name]), BAR) * np.sin(np.pi * t / BAR) ** .6, bar0, .35)

# intro bed: a low pad and a sparse echo of the motif before the kick
L(pad([hz("A2"), hz("E3"), hz("C4")], KICK_IN - 3.3, 800), 3.3, .8, 0, .5)
for note, b, d in MOTIF[:5]:
    L(felt_piano(hz(note), d * BEAT + 1.0, .7), 5.0 + b * BEAT, .5, .2, .7)

# arpeggio layer for the capabilities section
for s in np.arange(ARP_IN, DRUMS_OUT, BEAT / 2):
    name, notes = chord_at(s)
    k = int(round((s - ARP_IN) / (BEAT / 2)))
    f = hz(notes[k % 3]) * (4 if k % 4 == 3 else 2)
    L(pluck(f, BEAT * .45, 3200), s, .4, .5 if k % 2 else -.5, .5)

# leadership: a soft tick on each capability as it arrives (scene 27 starts at 43.8, one every 0.27 s)
for i in range(8):
    L(click(), 43.9 + i * .27, .9, .4 if i % 2 else -.4, .4)
    L(felt_piano(hz(["A5", "C6", "E5", "G5", "A5", "B5", "C6", "E6"][i]), .8, .6), 43.9 + i * .27, .35, 0, .6)
L(boom(), 43.9 + 8 * .27, .5, 0, .4)

# swell under "I love."
t = tt(1.8)
sw = pad([hz("A3"), hz("C4"), hz("E4"), hz("A4")], 1.8, 2600)
sw *= np.minimum(1, t / 1.4)
L(sw * 3.0, SWELL - .2, 1.0, 0, .8)

# "So, what's next?": one held note
L(felt_piano(hz("E4"), 3.0, .8), QUIET + .05, .7, 0, .9)
L(pad([hz("A2"), hz("E3")], 2.4, 700), QUIET, .8, 0, .6)

# outro on the email: the motif once more, slower, resolving on A
slow = 1.55
for note, b, d in MOTIF[:5]:
    L(felt_piano(hz(note), 3.5, .85), OUTRO + .05 + b * BEAT * slow, .8, -.1, 1.0)
L(felt_piano(hz("A3"), 5.0, .7), OUTRO + .05, .55, .1, 1.0)
L(felt_piano(hz("E3"), 5.0, .5), OUTRO + .05, .45, -.1, 1.0)
L(pad([hz("A3"), hz("C4"), hz("E4")], LENGTH - OUTRO + .5, 900), OUTRO, 1.0, 0, .9)

# ---------- mix ----------
mix = dry * duck
ir_t = tt(2.8)
ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 2.4)
irL, irR = lp(ir, 5000), lp(rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 2.4), 5000)
wet = np.stack([fftconvolve(wet_send, irL)[:N], fftconvolve(wet_send, irR)[:N]])
wet = hp(wet, 250) / np.max(np.abs(wet)) * 0.18
mix = mix + wet

# fade in and the final decay to silence
t = np.arange(N) / SR
mix *= np.minimum(1, t / 0.05)
fade_from = LENGTH - 1.6
mix *= np.where(t > fade_from, np.clip(1 - (t - fade_from) / 1.6, 0, 1) ** 2, 1)

mix = np.tanh(mix / np.max(np.abs(mix)) * 1.4) * 0.89
out = (mix.T * 32767).astype(np.int16)[: int(LENGTH * SR)]

import wave
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(out.tobytes())
print("wrote", sys.argv[1], f"{len(out) / SR:.2f}s")
